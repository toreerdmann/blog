'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, query, where, onSnapshot, serverTimestamp } from 'firebase/firestore';
import styles from './comments.module.css';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

const Comment = ({ comment, onReply }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [author, setAuthor] = useState('');

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyText.trim() === '' || author.trim() === '') return;
    onReply({
      text: replyText,
      author,
      parentId: comment.id,
    });
    setReplyText('');
    setAuthor('');
    setShowReplyForm(false);
  };

  return (
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        <strong>{comment.author}</strong>
        <span> - {new Date(comment.createdAt?.toDate()).toLocaleString()}</span>
      </div>
      <p>{comment.text}</p>
      <button className={styles.replyButton} onClick={() => setShowReplyForm(!showReplyForm)}>
        Reply
      </button>
      {showReplyForm && (
        <form onSubmit={handleReplySubmit} className={styles.replyForm}>
          <input
            type="text"
            className={styles.input}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name"
            required
          />
          <textarea
            className={styles.textarea}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply"
            required
          />
          <button className={styles.button} type="submit">Submit Reply</button>
        </form>
      )}
      {comment.children && (
        <div className={styles.replies}>
          {comment.children.map((child) => (
            <Comment key={child.id} comment={child} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'comments'), where('postId', '==', postId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const commentsData = [];
      querySnapshot.forEach((doc) => {
        commentsData.push({ ...doc.data(), id: doc.id });
      });

      const buildHierarchy = (comments) => {
        const commentMap = {};
        const roots = [];

        comments.forEach(comment => {
          commentMap[comment.id] = { ...comment, children: [] };
        });

        comments.forEach(comment => {
          if (comment.parentId) {
            commentMap[comment.parentId]?.children.push(commentMap[comment.id]);
          } else {
            roots.push(commentMap[comment.id]);
          }
        });
        return roots;
      }
      setComments(buildHierarchy(commentsData));
    });

    return () => unsubscribe();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === '' || author.trim() === '') return;

    await addDoc(collection(db, 'comments'), {
      postId,
      text: newComment,
      author,
      createdAt: serverTimestamp(),
      parentId: null,
    });

    setNewComment('');
    setAuthor('');
  };

  const handleReply = async (reply) => {
    await addDoc(collection(db, 'comments'), {
      postId,
      ...reply,
      createdAt: serverTimestamp(),
    });
  };

  return (
    <div className={styles.container}>
      <h2>Comments</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.input}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your name"
          required
        />
        <textarea
          className={styles.textarea}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          required
        />
        <button className={styles.button} type="submit">Submit</button>
      </form>
      <div className={styles.commentsList}>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} onReply={handleReply} />
        ))}
      </div>
    </div>
  );
}

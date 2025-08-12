---
title: 'First Post'
date: '2025-08-12'
---

Hello world! These are some notes on how I've built this blog.

I started with [astro](https://astro.build/) and had something working. I went
on to setup github pages and, after a few tries, had it setup so it would
deploy on each push on the main branch. Then, my partner told me I needed
comments, which I hadn't thought about. This turned out more complicated than I
thought. After looking at the options: [disqus](https://disqus.com) would
introduce ads, which I didn't want, and
[utterences](https://github.com/utterance/utterances) would only allow people
with github accounts to comment.

Since I recently learned about next.js through a project at work, I'd thought
why not use that to write my own comments component and learn more about react?
As the blog would we build into a static page, I chose firebase to persist the
comments, as I've used that in the past to collect data during my time as a
researcher (more on that another time).

Setting up the initial blog with nextjs was quite smooth, as the tutorial had
me do exactly what I wanted: take a folder of markdown files and turn them into
html blog posts. Next I made a start on the comments component, only to give up
after a while and spin up gemini-cli. I had tried that earlier on the astro
blog, where it got to something working locally. However, it spit out a single
file, which I did not know how to split into the "static" and client side part
easily, so I abandoned that approach and started over with nextjs. After I knew
more closely how it should look like, it was easier to evaluate the changes
gemini was proposing. Initially, I asked for comments with firestore
persistence, and then asked to extend it to nested comments. Finally, I added a
dark mode toggle, because why not.

When everything was looking fine, I got to work on the deployment again, which
I managed quickly thanks to [this blog post](https://zulfikawr.github.io/blog/deploying-nextjs-github-pages).

All in all, I enjoyed the process. I hope this will get me to write more
regularly. Stay tuned for some content on stats, ML, programming and whatever
else!

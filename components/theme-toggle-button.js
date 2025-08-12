import { useTheme } from '../context/theme';
import styles from './theme-toggle-button.module.css';

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={styles.toggleButton}
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
    >
      {theme === 'light' ? '☾' : '☼'}
    </button>
  );
}

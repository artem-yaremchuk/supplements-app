import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle theme"
      className="border-ui-border bg-soft-bg hover:border-hover flex h-7 w-11 items-center justify-center rounded-full border transition-colors"
    >
      {isDark ? <Moon size={17} /> : <Sun size={17} />}
    </button>
  );
};

export default ThemeToggle;

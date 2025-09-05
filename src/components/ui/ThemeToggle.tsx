import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="border-ui-border text-btn-text bg-ui-bg dark:hover:bg-hover dark:hover:border-hover hover:bg-soft-bg rounded border px-3 py-2 text-sm whitespace-nowrap transition-colors"
    >
      Toogle theme
    </button>
  );
};

export default ThemeToggle;

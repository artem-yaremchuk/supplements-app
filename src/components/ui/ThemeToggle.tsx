import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="border-btn-border text-btn-text bg-btn-bg dark:hover:bg-hover dark:hover:border-hover rounded border px-3 py-2 text-sm whitespace-nowrap transition-colors hover:bg-gray-100"
    >
      Toogle theme
    </button>
  );
};

export default ThemeToggle;

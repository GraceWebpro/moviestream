import { useTheme } from '../contexts/ThemeContext';
import '../styles/Main.css';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className={isDarkMode ? "navbar dark" : "navbar light"}>
      <h1>🎬 My Movie App</h1>
      <button className="primary-btn" onClick={toggleTheme}>
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
};

export default Navbar;

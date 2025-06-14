import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png'
import '../styles/Main.css';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); // Get the current route location

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Determine if we are in the Movie section or Music section
  const isMoviePage = location.pathname.startsWith("/movie");
  const isMusicPage = location.pathname.startsWith("/music");

  // Define nav items for Movie and Music sections
  const movieNavItems = [
    { name: "Home", path: "/movie-homepage" },
    { name: "Movies", path: "/movies" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" }
  ];

  const musicNavItems = [
    { name: "Home", path: "/music-homepage" },
    { name: "Songs", path: "/songs" },
    { name: "Albums", path: "/albums" },
    { name: "Dj Mix", path: "/dj-mix" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" }
  ];

  // Choose the correct nav items based on the current section (Movie or Music)
  const navItems = isMoviePage ? movieNavItems : isMusicPage ? musicNavItems : [];

  return (
    <nav style={{ 
      position: 'fixed', 
      top: 0, 
      background: '#121212', 
      zIndex: 1000 
    }} className={isDarkMode ? 'navbar' : 'navbar'}>
      <div className="navbar-container">
      <Link to='/' style={{ color: 'white', textDecoration: 'none' }}>
        <div className="logo">
          <img src={logo} alt='PlayBox' width={40} height={40}/>
          <span>PlayBox</span>
        </div>
        </Link>

        {/* Navigation links */}
        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.name}
            </Link>
          ))}
          
          <button className="theme-toggle">
            Contact Us
          </button>
        </div>

        {/* Hamburger icon for mobile menu */}
        <div className="hamburger" onClick={handleMenuToggle}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

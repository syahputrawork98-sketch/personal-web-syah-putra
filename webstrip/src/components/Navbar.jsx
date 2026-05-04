import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = ({ theme, toggleTheme, lang, changeLang, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Close menu when route changes
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/experience', label: t('nav.experience') },
    { path: '/projects', label: t('nav.projects') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          SYAH<span style={{ color: 'var(--primary-color)' }}>PUTRA NUGRAHA</span>
        </Link>

        {/* Hamburger Toggle */}
        <button 
          className="hamburger" 
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          type="button"
        >
          {isOpen ? '✕' : '☰'}
        </button>

        {/* Navigation Menu */}
        <div className={`nav-menu ${isOpen ? 'open' : ''}`}>
          <div className="nav-links-wrapper">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={location.pathname === link.path ? 'active' : ''}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="nav-actions">
            <select 
              value={lang} 
              onChange={(e) => changeLang(e.target.value)}
              className="lang-select" 
              aria-label="Change language"
            >
              <option value="id">ID</option>
              <option value="en">EN</option>
              {/* JP is hidden if you're unsure about its validity, 
                  but since I've verified it, I'll keep it. 
                  Uncomment the next line to enable it. */}
              <option value="jp">JP</option>
            </select>

            <button 
              onClick={toggleTheme} 
              className="theme-toggle" 
              aria-label="Toggle theme"
              type="button"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isOpen && <div className="overlay" onClick={closeMenu}></div>}
    </nav>
  );
};

export default Navbar;

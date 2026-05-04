import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = ({ theme, toggleTheme, lang, changeLang, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    closeMenu();
  }, [location]);

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
        <Link to="/" className="logo" style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--text-primary)' }}>
          SYAH<span style={{ color: 'var(--primary-color)' }}>PUTRA NUGRAHA</span>
        </Link>

        {/* Hamburger Toggle */}
        <button 
          className="hamburger" 
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? '✕' : '☰'}
        </button>

        {/* Navigation Menu */}
        <div className={`nav-menu ${isOpen ? 'open' : ''}`}>
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
          
          <div className="nav-actions">
            <select 
              value={lang} 
              onChange={(e) => changeLang(e.target.value)}
              className="btn-secondary" 
              style={{ padding: '6px 10px', borderRadius: 'var(--radius-md)', cursor: 'pointer', outline: 'none' }}
              aria-label="Change language"
            >
              <option value="id">ID</option>
              <option value="en">EN</option>
              <option value="jp">JP</option>
            </select>

            <button 
              onClick={toggleTheme} 
              className="btn-secondary" 
              style={{ padding: '6px 12px', borderRadius: 'var(--radius-md)', fontSize: '1.1rem' }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isOpen && <div className="overlay" onClick={closeMenu} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 999 }}></div>}
    </nav>
  );
};

export default Navbar;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogo from './BrandLogo';
import '../styles/navbar.css';

const Navbar = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'Beranda' },
    { path: '/about', label: 'Tentang' },
    { path: '/experience', label: 'Pengalaman' },
    { path: '/credentials', label: 'Sertifikat' },
    { path: '/projects', label: 'Proyek' },
    { path: '/learn', label: 'Learn' },
    { path: '/contact', label: 'Kontak' },
  ];

  const menuVariants = {
    closed: { x: '100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30, staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const linkVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <BrandLogo />
        </Link>

        {/* Hamburger Toggle */}
        <button 
          className="hamburger" 
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          type="button"
        >
          <motion.div animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} style={{ width: 24, height: 2, background: 'currentColor', marginBottom: 6 }} />
          <motion.div animate={isOpen ? { opacity: 0 } : { opacity: 1 }} style={{ width: 24, height: 2, background: 'currentColor', marginBottom: 6 }} />
          <motion.div animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} style={{ width: 24, height: 2, background: 'currentColor' }} />
        </button>

        {/* Desktop Menu */}
        <div className="nav-menu-desktop">
          <div className="nav-links-wrapper">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={location.pathname === link.path ? 'active' : ''}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="nav-actions">
            <button onClick={toggleTheme} className="theme-toggle" type="button" aria-label="Toggle theme">
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div 
                className="overlay" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={closeMenu} 
              />
              <motion.div 
                className="nav-menu-mobile"
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="nav-links-wrapper">
                  {navLinks.map((link) => (
                    <motion.div key={link.path} variants={linkVariants}>
                      <Link 
                        to={link.path} 
                        className={location.pathname === link.path ? 'active' : ''}
                        onClick={closeMenu}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <motion.div className="nav-actions" variants={linkVariants}>
                  <button onClick={toggleTheme} className="theme-toggle" type="button" aria-label="Toggle theme">
                    {theme === 'dark' ? '🌙' : '☀️'}
                  </button>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;

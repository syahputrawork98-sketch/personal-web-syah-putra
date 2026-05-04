import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ theme, toggleTheme, lang, changeLang, t }) => {
  return (
    <nav className="navbar">
      <div className="container flex-center" style={{ justifyContent: 'space-between', height: '80px' }}>
        <Link to="/" className="logo" style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--text-primary)' }}>
          SYAH<span style={{ color: 'var(--primary-color)' }}>PUTRA NUGRAHA</span>
        </Link>
        <div className="nav-links" style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
          <Link to="/">{t('nav.home')}</Link>
          <Link to="/about">{t('nav.about')}</Link>
          <Link to="/experience">{t('nav.experience')}</Link>
          <Link to="/projects">{t('nav.projects')}</Link>
          <Link to="/contact">{t('nav.contact')}</Link>
          
          <select 
            value={lang} 
            onChange={(e) => changeLang(e.target.value)}
            className="btn-secondary" 
            style={{ padding: '4px 8px', borderRadius: 'var(--radius-md)', cursor: 'pointer', outline: 'none', borderColor: 'var(--border-color)', background: 'var(--surface-color)', color: 'var(--text-primary)' }}
          >
            <option value="id">ID</option>
            <option value="en">EN</option>
            <option value="jp">JP</option>
          </select>

          <button onClick={toggleTheme} className="btn-secondary" style={{ padding: '4px 12px', borderRadius: 'var(--radius-md)', fontSize: '1rem' }}>
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

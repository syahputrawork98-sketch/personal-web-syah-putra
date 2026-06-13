import React from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { removeToken } from '../lib/auth';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    removeToken();
    navigate('/admin/login');
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  const linkStyle = (active) => ({
    display: 'block',
    padding: '10px 16px',
    textDecoration: 'none',
    color: active ? 'var(--primary-color)' : 'var(--text-color)',
    backgroundColor: active ? '#f0fdf4' : 'transparent',
    borderRadius: '4px',
    fontWeight: active ? '600' : '400',
    marginBottom: '4px',
    transition: 'all 0.2s ease',
    opacity: active ? 1 : 0.8
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', backgroundColor: 'var(--card-bg)', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: 'var(--space-6) var(--space-4)', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>PW Admin</h2>
        </div>
        
        <nav style={{ padding: 'var(--space-4)', flex: 1, overflowY: 'auto' }}>
          {/* System Section */}
          <div>
            <div style={{ marginBottom: 'var(--space-2)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-color)', opacity: 0.5, fontWeight: 'bold', paddingLeft: '16px' }}>System</div>
            <Link to="/admin" style={linkStyle(isActive('/admin') && location.pathname === '/admin')}>Dashboard</Link>
          </div>

          {/* Content Management Section */}
          <div style={{ marginTop: 'var(--space-6)' }}>
            <div style={{ marginBottom: 'var(--space-2)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-color)', opacity: 0.5, fontWeight: 'bold', paddingLeft: '16px' }}>Content Management</div>
            <Link to="/admin/projects" style={linkStyle(isActive('/admin/projects'))}>Projects</Link>
            <Link to="/admin/experience" style={linkStyle(isActive('/admin/experience'))}>Experience</Link>
            <Link to="/admin/education" style={linkStyle(isActive('/admin/education'))}>Education</Link>
            <Link to="/admin/skills" style={linkStyle(isActive('/admin/skills'))}>Skills</Link>
            <Link to="/admin/certifications" style={linkStyle(isActive('/admin/certifications'))}>Credentials</Link>
            <Link to="/admin/learning" style={linkStyle(isActive('/admin/learning'))}>Learning</Link>
          </div>

          {/* CV Tools Section */}
          <div style={{ marginTop: 'var(--space-6)' }}>
            <div style={{ marginBottom: 'var(--space-2)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-color)', opacity: 0.5, fontWeight: 'bold', paddingLeft: '16px' }}>CV Tools</div>
            <Link to="/admin/cv-builder" style={linkStyle(isActive('/admin/cv-builder'))}>CV Builder</Link>
          </div>

          {/* Profile & Website Settings Section */}
          <div style={{ marginTop: 'var(--space-6)' }}>
            <div style={{ marginBottom: 'var(--space-2)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-color)', opacity: 0.5, fontWeight: 'bold', paddingLeft: '16px' }}>Profile & Website Settings</div>
            <Link to="/admin/settings/hero" style={linkStyle(isActive('/admin/settings/hero'))}>Hero</Link>
            <Link to="/admin/settings/profile" style={linkStyle(isActive('/admin/settings/profile'))}>Profile</Link>
            <Link to="/admin/contact" style={linkStyle(isActive('/admin/contact'))}>Contact</Link>
            <Link to="/admin/account" style={linkStyle(isActive('/admin/account'))}>Account</Link>
          </div>
        </nav>
        
        <div style={{ padding: 'var(--space-4)', borderTop: '1px solid var(--border-color)', fontSize: '0.8rem', opacity: 0.6, textAlign: 'center' }}>
          &copy; {new Date().getFullYear()} Admin Panel
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Topbar */}
        <header style={{ backgroundColor: 'var(--card-bg)', borderBottom: '1px solid var(--border-color)', padding: 'var(--space-3) var(--space-6)', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 'var(--space-4)' }}>
          <Link to="/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'var(--primary-color)', fontSize: '0.9rem', fontWeight: '500' }}>
            View Site ↗
          </Link>
          <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)' }}></div>
          <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.85rem', borderColor: 'transparent' }}>
            Logout
          </button>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: 'var(--space-8)', overflowY: 'auto' }}>
          <div className="container" style={{ margin: 0, maxWidth: '100%' }}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

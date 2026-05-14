import React from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { removeToken } from '../../lib/auth';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: 'var(--space-4) 0', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}>
            <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Dashboard Admin</h2>
            <nav style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              <Link to="/admin/projects" style={{ textDecoration: 'none', color: 'var(--text-color)', opacity: 0.8 }}>Proyek</Link>
              <Link to="/admin/skills" style={{ textDecoration: 'none', color: 'var(--text-color)', opacity: 0.8 }}>Keahlian</Link>
              <Link to="/admin/experience" style={{ textDecoration: 'none', color: 'var(--text-color)', opacity: 0.8 }}>Pengalaman</Link>
              <Link to="/admin/education" style={{ textDecoration: 'none', color: 'var(--text-color)', opacity: 0.8 }}>Pendidikan</Link>
              <Link to="/admin/certifications" style={{ textDecoration: 'none', color: 'var(--text-color)', opacity: 0.8 }}>Sertifikasi</Link>
              <Link to="/admin/settings/hero" style={{ textDecoration: 'none', color: 'var(--text-color)', opacity: 0.8 }}>Pengaturan Hero</Link>
              <Link to="/admin/settings/profile" style={{ textDecoration: 'none', color: 'var(--text-color)', opacity: 0.8 }}>Pengaturan Profil</Link>
              <Link to="/admin/account" style={{ textDecoration: 'none', color: 'var(--text-color)', opacity: 0.8 }}>Akun</Link>
              <Link to="/admin/contact" style={{ textDecoration: 'none', color: 'var(--text-color)', opacity: 0.8 }}>Kontak</Link>
            </nav>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
            Logout
          </button>
        </div>
      </header>
      
      <main style={{ flex: 1, padding: 'var(--space-8) 0' }}>
        <div className="container">
          <Outlet />
        </div>
      </main>
      
      <footer style={{ padding: 'var(--space-4) 0', borderTop: '1px solid var(--border-color)', textAlign: 'center', opacity: 0.6, fontSize: '0.8rem' }}>
        &copy; {new Date().getFullYear()} Admin Panel
      </footer>
    </div>
  );
};

export default AdminLayout;

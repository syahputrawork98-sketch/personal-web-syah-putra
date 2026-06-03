import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const moduleCards = [
    { title: 'Projects', path: '/admin/projects', desc: 'Manage portfolio projects' },
    { title: 'Credentials', path: '/admin/certifications', desc: 'Manage credentials and certificates' },
    { title: 'Skills', path: '/admin/skills', desc: 'Manage skills' },
    { title: 'Experience', path: '/admin/experience', desc: 'Manage experience' },
    { title: 'Education', path: '/admin/education', desc: 'Manage education' }
  ];

  const settingsCards = [
    { title: 'Hero Settings', path: '/admin/settings/hero', desc: 'Configure hero section' },
    { title: 'Profile Settings', path: '/admin/settings/profile', desc: 'Configure profile section' },
    { title: 'Contact Settings', path: '/admin/contact', desc: 'Configure contact information' },
    { title: 'Account Settings', path: '/admin/account', desc: 'Configure admin account' }
  ];

  return (
    <div className="container" style={{ maxWidth: '1200px' }}>
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{ marginBottom: 'var(--space-2)' }}>Admin Dashboard</h1>
        <p style={{ opacity: 0.7, fontSize: '1.1rem' }}>
          Kelola konten portfolio, credentials, skills, experience, education, dan settings dari satu tempat.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-12)' }}>
        <div className="card" style={{ padding: 'var(--space-6)', backgroundColor: '#f8fafc', borderLeft: '4px solid #3b82f6' }}>
          <h3 style={{ margin: '0 0 var(--space-2) 0', color: '#1e40af' }}>Backend API</h3>
          <div style={{ fontWeight: 'bold', color: '#047857' }}>Runtime Verified ✓</div>
        </div>
        <div className="card" style={{ padding: 'var(--space-6)', backgroundColor: '#f8fafc', borderLeft: '4px solid #10b981' }}>
          <h3 style={{ margin: '0 0 var(--space-2) 0', color: '#065f46' }}>Database</h3>
          <div style={{ fontWeight: 'bold', color: '#047857' }}>Local Runtime Verified ✓</div>
        </div>
        <div className="card" style={{ padding: 'var(--space-6)', backgroundColor: '#fffbeb', borderLeft: '4px solid #f59e0b' }}>
          <h3 style={{ margin: '0 0 var(--space-2) 0', color: '#92400e' }}>Production</h3>
          <div style={{ fontWeight: 'bold', color: '#b45309' }}>Pending Deployment (F10) ⏳</div>
        </div>
      </div>

      <h2 style={{ marginBottom: 'var(--space-4)', fontSize: '1.4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-2)' }}>Main Modules</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
        {moduleCards.map((card, idx) => (
          <div key={idx} className="card" style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: '0 0 var(--space-2) 0' }}>{card.title}</h3>
            <p style={{ margin: '0 0 var(--space-4) 0', fontSize: '0.9rem', opacity: 0.7, flex: 1 }}>{card.desc}</p>
            <Link to={card.path} className="btn btn-primary" style={{ textAlign: 'center', width: '100%', padding: '8px' }}>Open</Link>
          </div>
        ))}
      </div>

      <h2 style={{ marginBottom: 'var(--space-4)', fontSize: '1.4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-2)' }}>Configuration & Settings</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
        {settingsCards.map((card, idx) => (
          <div key={idx} className="card" style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: '0 0 var(--space-2) 0' }}>{card.title}</h3>
            <p style={{ margin: '0 0 var(--space-4) 0', fontSize: '0.9rem', opacity: 0.7, flex: 1 }}>{card.desc}</p>
            <Link to={card.path} className="btn btn-secondary" style={{ textAlign: 'center', width: '100%', padding: '8px' }}>Open</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;

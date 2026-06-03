import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../lib/api';
import { setToken } from '../../lib/auth';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginAdmin(email, password);
      setToken(data.token);
      navigate('/admin/projects');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-padding" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: '400px' }}>
        <div className="card" style={{ padding: 'var(--space-8)' }}>
          <h1 style={{ textAlign: 'center', marginBottom: 'var(--space-6)', fontSize: '1.5rem' }}>Admin Login</h1>
          
          {error && (
            <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: 'var(--space-3)', borderRadius: '4px', marginBottom: 'var(--space-4)', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3)', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '4px', fontSize: '0.85rem' }}>
              <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: '#166534' }}>Development Login Helper</p>
              <p style={{ margin: '0 0 4px 0', color: '#15803d' }}>Local dev email: <code>admin@example.com</code></p>
              <p style={{ margin: '0 0 8px 0', color: '#15803d' }}>Local dev password: <code>qwerty123</code></p>
              <p style={{ margin: '0 0 8px 0', fontSize: '0.75rem', color: '#166534', opacity: 0.8 }}>*Catatan: password di Prisma Studio tampil sebagai hash.</p>
              <button 
                type="button" 
                onClick={() => { setEmail('admin@example.com'); setPassword('qwerty123'); }}
                style={{ background: '#16a34a', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
              >
                Use Local Dev Login
              </button>
            </div>

            <div style={{ marginBottom: 'var(--space-4)' }}>
              <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.9rem' }}>Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
                required
              />
            </div>
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.9rem' }}>Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
                required
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '12px' }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

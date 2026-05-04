import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminAccount, updateAdminEmail, updateAdminPassword } from '../../lib/api';
import { removeToken } from '../../lib/auth';

const AdminAccount = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emailForm, setEmailForm] = useState({ email: '', currentPassword: '' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [emailStatus, setEmailStatus] = useState({ type: '', message: '' });
  const [passwordStatus, setPasswordStatus] = useState({ type: '', message: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const data = await getAdminAccount();
        setAdmin(data.admin);
        setEmailForm(prev => ({ ...prev, email: data.admin.email }));
      } catch (err) {
        handleAuthError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAccount();
  }, []);

  const handleAuthError = (err) => {
    if (err.message.includes('401') || err.message.toLowerCase().includes('unauthorized')) {
      removeToken();
      navigate('/admin/login');
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setEmailStatus({ type: 'loading', message: 'Updating email...' });
    try {
      await updateAdminEmail(emailForm);
      setEmailStatus({ type: 'success', message: 'Email updated! Redirecting to login...' });
      setTimeout(() => {
        removeToken();
        navigate('/admin/login', { state: { message: 'Email updated successfully. Please login with your new email.' } });
      }, 2000);
    } catch (err) {
      handleAuthError(err);
      setEmailStatus({ type: 'error', message: err.message });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordStatus({ type: 'loading', message: 'Updating password...' });
    try {
      await updateAdminPassword(passwordForm);
      setPasswordStatus({ type: 'success', message: 'Password updated! Redirecting to login...' });
      setTimeout(() => {
        removeToken();
        navigate('/admin/login', { state: { message: 'Password updated successfully. Please login with your new password.' } });
      }, 2000);
    } catch (err) {
      handleAuthError(err);
      setPasswordStatus({ type: 'error', message: err.message });
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>Loading account settings...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: 'var(--space-8)' }}>Account Settings</h1>

      <div style={{ display: 'grid', gap: 'var(--space-8)' }}>
        {/* Change Email Form */}
        <section className="card" style={{ padding: 'var(--space-6)' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: 'var(--space-4)' }}>Change Email</h2>
          {emailStatus.message && (
            <div style={{ 
              padding: 'var(--space-3)', 
              borderRadius: '4px', 
              marginBottom: 'var(--space-4)',
              backgroundColor: emailStatus.type === 'error' ? '#fee2e2' : (emailStatus.type === 'success' ? '#dcfce7' : '#f3f4f6'),
              color: emailStatus.type === 'error' ? '#dc2626' : (emailStatus.type === 'success' ? '#166534' : '#374151')
            }}>
              {emailStatus.message}
            </div>
          )}
          <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div>
              <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontSize: '0.9rem', opacity: 0.7 }}>Current Email</label>
              <input type="text" value={admin?.email || ''} readOnly style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', opacity: 0.6 }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontSize: '0.9rem' }}>New Email</label>
              <input 
                type="email" 
                required 
                value={emailForm.email} 
                onChange={(e) => setEmailForm(prev => ({ ...prev, email: e.target.value }))}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontSize: '0.9rem' }}>Current Password</label>
              <input 
                type="password" 
                required 
                value={emailForm.currentPassword} 
                onChange={(e) => setEmailForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} 
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: 'var(--space-2)' }}>
              Update Email
            </button>
          </form>
        </section>

        {/* Change Password Form */}
        <section className="card" style={{ padding: 'var(--space-6)' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: 'var(--space-4)' }}>Change Password</h2>
          {passwordStatus.message && (
            <div style={{ 
              padding: 'var(--space-3)', 
              borderRadius: '4px', 
              marginBottom: 'var(--space-4)',
              backgroundColor: passwordStatus.type === 'error' ? '#fee2e2' : (passwordStatus.type === 'success' ? '#dcfce7' : '#f3f4f6'),
              color: passwordStatus.type === 'error' ? '#dc2626' : (passwordStatus.type === 'success' ? '#166534' : '#374151')
            }}>
              {passwordStatus.message}
            </div>
          )}
          <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div>
              <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontSize: '0.9rem' }}>Current Password</label>
              <input 
                type="password" 
                required 
                value={passwordForm.currentPassword} 
                onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontSize: '0.9rem' }}>New Password</label>
              <input 
                type="password" 
                required 
                minLength={8}
                value={passwordForm.newPassword} 
                onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontSize: '0.9rem' }}>Confirm New Password</label>
              <input 
                type="password" 
                required 
                value={passwordForm.confirmPassword} 
                onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} 
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: 'var(--space-2)' }}>
              Change Password
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AdminAccount;

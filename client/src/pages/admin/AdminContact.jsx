import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminContact, updateAdminContact } from '../../lib/api';
import { removeToken } from '../../lib/auth';

const AdminContact = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    whatsapp: '',
    github: '',
    linkedin: '',
    instagram: '',
    location: '',
    website: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data = await getAdminContact();
        if (data.contact) {
          setFormData(data.contact);
        }
      } catch (err) {
        if (err.message.includes('401') || err.message.toLowerCase().includes('unauthorized')) {
          removeToken();
          navigate('/admin/login');
        } else {
          setStatus({ type: 'error', message: err.message });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: '', message: '' });

    try {
      await updateAdminContact(formData);
      setStatus({ type: 'success', message: 'Contact settings updated successfully!' });
    } catch (err) {
      if (err.message.includes('401') || err.message.toLowerCase().includes('unauthorized')) {
        removeToken();
        navigate('/admin/login');
      } else {
        setStatus({ type: 'error', message: err.message });
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>Loading contact settings...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: 'var(--space-8)' }}>Contact Settings</h1>

      <form onSubmit={handleSubmit} className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {status.message && (
          <div style={{ 
            padding: 'var(--space-3)', 
            borderRadius: '4px', 
            marginBottom: 'var(--space-2)',
            backgroundColor: status.type === 'error' ? '#fee2e2' : '#dcfce7',
            color: status.type === 'error' ? '#dc2626' : '#166534'
          }}>
            {status.message}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Email</label>
            <input 
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
            />
          </div>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Location</label>
            <input 
              name="location"
              value={formData.location}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Phone Number</label>
            <input 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +62..."
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
            />
          </div>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>WhatsApp</label>
            <input 
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="e.g. 628..."
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
            />
          </div>
        </div>

        <h3 style={{ fontSize: '1rem', marginTop: 'var(--space-4)', opacity: 0.7 }}>Social Media Links</h3>
        
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Website / Portfolio URL</label>
          <input 
            name="website"
            value={formData.website}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          />
        </div>

        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>GitHub URL</label>
          <input 
            name="github"
            value={formData.github}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          />
        </div>

        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>LinkedIn URL</label>
          <input 
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          />
        </div>

        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Instagram URL</label>
          <input 
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={saving} style={{ marginTop: 'var(--space-4)', padding: '12px' }}>
          {saving ? 'Saving...' : 'Save Contact Settings'}
        </button>
      </form>
    </div>
  );
};

export default AdminContact;

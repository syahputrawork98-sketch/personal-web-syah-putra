import React, { useState, useEffect } from 'react';
import { 
  getAdminEducation, 
  createAdminEducation, 
  updateAdminEducation, 
  deleteAdminEducation 
} from '../../lib/api';

const AdminEducation = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    period: '',
    description: '',
    sortOrder: 0,
    isActive: true
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const fetchEducation = async () => {
    try {
      const data = await getAdminEducation();
      setEducation(data.education);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to fetch education: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetForm = () => {
    setFormData({
      school: '',
      degree: '',
      period: '',
      description: '',
      sortOrder: 0,
      isActive: true
    });
    setEditingId(null);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      school: item.school,
      degree: item.degree,
      period: item.period,
      description: item.description || '',
      sortOrder: item.sortOrder,
      isActive: item.isActive
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    try {
      if (editingId) {
        await updateAdminEducation(editingId, formData);
        setMessage({ type: 'success', text: 'Education updated successfully' });
      } else {
        await createAdminEducation(formData);
        setMessage({ type: 'success', text: 'Education created successfully' });
      }
      resetForm();
      fetchEducation();
    } catch (err) {
      setMessage({ type: 'error', text: 'Operation failed: ' + err.message });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this education?')) return;
    try {
      await deleteAdminEducation(id);
      setMessage({ type: 'success', text: 'Education deleted successfully' });
      fetchEducation();
    } catch (err) {
      setMessage({ type: 'error', text: 'Delete failed: ' + err.message });
    }
  };

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)' }}>
        <h1>Education Manager</h1>
        {editingId && (
          <button className="btn btn-secondary" onClick={resetForm}>Cancel Edit</button>
        )}
      </div>

      {message.text && (
        <div style={{ 
          padding: 'var(--space-4)', 
          marginBottom: 'var(--space-6)', 
          borderRadius: '4px',
          backgroundColor: message.type === 'success' ? '#dcfce7' : '#fee2e2',
          color: message.type === 'success' ? '#166534' : '#991b1b'
        }}>
          {message.text}
        </div>
      )}

      {/* Form Section */}
      <div className="card" style={{ marginBottom: 'var(--space-10)', padding: 'var(--space-6)' }}>
        <h3>{editingId ? 'Edit Education' : 'Add New Education'}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <div className="form-group">
              <label>School/University</label>
              <input 
                name="school" 
                value={formData.school} 
                onChange={handleChange} 
                required 
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
              />
            </div>
            <div className="form-group">
              <label>Degree/Major</label>
              <input 
                name="degree" 
                value={formData.degree} 
                onChange={handleChange} 
                required 
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 'var(--space-4)' }}>
            <div className="form-group">
              <label>Period (e.g. 2013 – 2017)</label>
              <input 
                name="period" 
                value={formData.period} 
                onChange={handleChange} 
                required 
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
              />
            </div>
            <div className="form-group">
              <label>Sort Order</label>
              <input 
                type="number" 
                name="sortOrder" 
                value={formData.sortOrder} 
                onChange={handleChange} 
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
              />
            </div>
            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: 'var(--space-6)' }}>
              <input 
                type="checkbox" 
                name="isActive" 
                id="isActive" 
                checked={formData.isActive} 
                onChange={handleChange} 
              />
              <label htmlFor="isActive" style={{ margin: 0 }}>Active</label>
            </div>
          </div>

          <div className="form-group">
            <label>Description (Optional)</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              rows="2"
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', resize: 'vertical' }}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
            {editingId ? 'Update Education' : 'Save Education'}
          </button>
        </form>
      </div>

      {/* List Section */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
            <tr>
              <th style={{ padding: 'var(--space-4)', textAlign: 'left' }}>School</th>
              <th style={{ padding: 'var(--space-4)', textAlign: 'left' }}>Degree</th>
              <th style={{ padding: 'var(--space-4)', textAlign: 'left' }}>Period</th>
              <th style={{ padding: 'var(--space-4)', textAlign: 'center' }}>Order</th>
              <th style={{ padding: 'var(--space-4)', textAlign: 'center' }}>Status</th>
              <th style={{ padding: 'var(--space-4)', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {education.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: 'var(--space-4)' }}><strong>{item.school}</strong></td>
                <td style={{ padding: 'var(--space-4)' }}>{item.degree}</td>
                <td style={{ padding: 'var(--space-4)' }}>{item.period}</td>
                <td style={{ padding: 'var(--space-4)', textAlign: 'center' }}>{item.sortOrder}</td>
                <td style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
                  <span style={{ 
                    padding: '2px 8px', 
                    borderRadius: '12px', 
                    fontSize: '0.75rem',
                    backgroundColor: item.isActive ? '#dcfce7' : '#f3f4f6',
                    color: item.isActive ? '#166534' : '#4b5563'
                  }}>
                    {item.isActive ? 'Active' : 'Hidden'}
                  </span>
                </td>
                <td style={{ padding: 'var(--space-4)', textAlign: 'right' }}>
                  <button 
                    onClick={() => handleEdit(item)} 
                    className="btn btn-secondary" 
                    style={{ padding: '4px 8px', fontSize: '0.8rem', marginRight: 'var(--space-2)' }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)} 
                    className="btn btn-secondary" 
                    style={{ padding: '4px 8px', fontSize: '0.8rem', color: '#dc2626' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {education.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: 'var(--space-8)', textAlign: 'center', opacity: 0.6 }}>No education records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminEducation;

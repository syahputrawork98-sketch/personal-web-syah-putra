import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createLearningItem } from '../../lib/api';

const AdminLearningCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Programming Languages',
    status: 'PLANNED',
    level: '',
    description: '',
    topics: '',
    repoUrl: '',
    notesUrl: '',
    orderIndex: 0,
    featured: false,
    isPublished: false
  });

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: formData.slug || generateSlug(title)
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createLearningItem(formData);
      navigate('/admin/learning');
    } catch (err) {
      setError(err.message || 'Failed to create learning item');
      setLoading(false);
    }
  };

  const inputStyle = { width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'transparent', color: 'var(--text-color)' };
  const labelStyle = { display: 'block', marginBottom: '8px', fontWeight: '500' };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <h1 style={{ margin: 0 }}>Add New Learning Item</h1>
        <Link to="/admin/learning" className="btn btn-secondary">Cancel</Link>
      </div>

      {error && <div style={{ color: 'red', marginBottom: '1rem', padding: '1rem', backgroundColor: '#fee2e2', borderRadius: '4px' }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ backgroundColor: 'var(--card-bg)', padding: 'var(--space-6)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
          <div>
            <label style={labelStyle}>Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleTitleChange} required style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Slug *</label>
            <input type="text" name="slug" value={formData.slug} onChange={handleChange} required style={inputStyle} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
          <div>
            <label style={labelStyle}>Category *</label>
            <select name="category" value={formData.category} onChange={handleChange} required style={inputStyle}>
              <option value="Programming Languages">Programming Languages</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Database & Data">Database & Data</option>
              <option value="DevOps & Deployment">DevOps & Deployment</option>
              <option value="Tools & Workflow">Tools & Workflow</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Status *</label>
            <select name="status" value={formData.status} onChange={handleChange} required style={inputStyle}>
              <option value="PLANNED">Planned</option>
              <option value="LEARNING">Learning</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Level</label>
            <input type="text" name="level" value={formData.level} onChange={handleChange} style={inputStyle} placeholder="e.g. Beginner, Intermediate" />
          </div>
        </div>

        <div style={{ marginBottom: 'var(--space-4)' }}>
          <label style={labelStyle}>Description *</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required style={{ ...inputStyle, minHeight: '120px' }} />
        </div>

        <div style={{ marginBottom: 'var(--space-4)' }}>
          <label style={labelStyle}>Topics (comma separated)</label>
          <input type="text" name="topics" value={formData.topics} onChange={handleChange} style={inputStyle} placeholder="e.g. React, Hooks, Router" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
          <div>
            <label style={labelStyle}>Repository URL</label>
            <input type="url" name="repoUrl" value={formData.repoUrl} onChange={handleChange} style={inputStyle} placeholder="https://github.com/..." />
          </div>
          <div>
            <label style={labelStyle}>Notes URL</label>
            <input type="url" name="notesUrl" value={formData.notesUrl} onChange={handleChange} style={inputStyle} placeholder="https://..." />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-6)', padding: 'var(--space-4)', backgroundColor: 'rgba(0,0,0,0.02)', borderRadius: '4px' }}>
          <div>
            <label style={labelStyle}>Order Index</label>
            <input type="number" name="orderIndex" value={formData.orderIndex} onChange={handleChange} style={inputStyle} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px', paddingTop: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
              Featured Item
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleChange} />
              Publish publicly
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Creating...' : 'Create Learning Item'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLearningCreate;

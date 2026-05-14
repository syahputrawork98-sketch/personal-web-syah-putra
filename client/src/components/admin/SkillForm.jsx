import React, { useState } from 'react';

const SkillForm = ({ initialData, onSubmit, saving }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    type: initialData?.type || 'TECHNICAL',
    category: initialData?.category || '',
    icon: initialData?.icon || '',
    level: initialData?.level || '',
    description: initialData?.description || '',
    order: initialData?.order || 0,
    visible: initialData?.visible !== undefined ? initialData.visible : true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? parseInt(value) : value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Skill Name*</label>
          <input 
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. React"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          />
        </div>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Type*</label>
          <select 
            name="type"
            required
            value={formData.type}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          >
            <option value="TECHNICAL">TECHNICAL</option>
            <option value="SOFT">SOFT</option>
            <option value="TOOL">TOOL</option>
            <option value="LANGUAGE">LANGUAGE</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Category</label>
          <input 
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g. Frontend"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          />
        </div>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Level</label>
          <input 
            name="level"
            value={formData.level}
            onChange={handleChange}
            placeholder="e.g. Advanced"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Icon Name (CSS class or Emoji)</label>
          <input 
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            placeholder="e.g. fab fa-react"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          />
        </div>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Display Order</label>
          <input 
            name="order"
            type="number"
            value={formData.order}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          />
        </div>
      </div>

      <div className="form-group">
        <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Description</label>
        <textarea 
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="e.g. Briefly explain your expertise or use of this skill"
          rows={3}
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', resize: 'vertical' }}
        />
      </div>
      <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
        <input 
          id="visible"
          name="visible"
          type="checkbox"
          checked={formData.visible}
          onChange={handleChange}
        />
        <label htmlFor="visible">Visible on Public Portfolio</label>
      </div>

      <button type="submit" className="btn btn-primary" disabled={saving} style={{ marginTop: 'var(--space-4)', padding: '12px' }}>
        {saving ? 'Saving...' : (initialData ? 'Update Skill' : 'Create Skill')}
      </button>
    </form>
  );
};

export default SkillForm;

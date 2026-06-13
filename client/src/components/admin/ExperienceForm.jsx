import React, { useState } from 'react';

const ExperienceForm = ({ initialData, onSubmit, saving }) => {
  const [formData, setFormData] = useState({
    role: initialData?.role || '',
    company: initialData?.company || '',
    location: initialData?.location || '',
    type: initialData?.type || '',
    startDate: initialData?.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : '',
    endDate: initialData?.endDate ? new Date(initialData.endDate).toISOString().split('T')[0] : '',
    isCurrent: initialData?.isCurrent || false,
    description: initialData?.description || '',
    highlights: initialData?.highlights ? initialData.highlights.join('\n') : '',
    techStack: initialData?.techStack ? initialData.techStack.join(', ') : '',
    status: initialData?.status || 'PUBLISHED',
    experienceKind: initialData?.experienceKind || 'FORMAL_WORK',
    order: initialData?.order || 0
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
    const submissionData = {
      ...formData,
      highlights: formData.highlights.split('\n').filter(h => h.trim() !== ''),
      techStack: formData.techStack.split(',').map(s => s.trim()).filter(s => s !== '')
    };
    onSubmit(submissionData);
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Role / Title*</label>
          <input 
            name="role"
            required
            value={formData.role}
            onChange={handleChange}
            placeholder="e.g. Senior Web Developer"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          />
        </div>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Company Name*</label>
          <input 
            name="company"
            required
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g. Google"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Location</label>
          <input 
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Jakarta, Indonesia (Remote)"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          />
        </div>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Employment Type</label>
          <input 
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="e.g. Full-time, Freelance"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)', alignItems: 'end' }}>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Start Date</label>
          <input 
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          />
        </div>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>End Date</label>
          <input 
            name="endDate"
            type="date"
            disabled={formData.isCurrent}
            value={formData.endDate}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', opacity: formData.isCurrent ? 0.5 : 1 }}
          />
        </div>
        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', paddingBottom: '12px' }}>
          <input 
            id="isCurrent"
            name="isCurrent"
            type="checkbox"
            checked={formData.isCurrent}
            onChange={handleChange}
          />
          <label htmlFor="isCurrent">Currently Working</label>
        </div>
      </div>

      <div className="form-group">
        <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Short Description</label>
        <textarea 
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          placeholder="Brief summary of your role..."
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', resize: 'vertical' }}
        />
      </div>

      <div className="form-group">
        <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Highlights (One per line)</label>
        <textarea 
          name="highlights"
          rows="5"
          value={formData.highlights}
          onChange={handleChange}
          placeholder="Developed a scalable API...&#10;Led a team of 5 developers..."
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', resize: 'vertical' }}
        />
      </div>

      <div className="form-group">
        <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Tech Stack (Comma-separated)</label>
        <input 
          name="techStack"
          value={formData.techStack}
          onChange={handleChange}
          placeholder="React, Node.js, GraphQL"
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Experience Kind</label>
          <select
            name="experienceKind"
            value={formData.experienceKind}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-color)',
              color: 'var(--text-color)',
              fontWeight: '600',
              borderLeft: formData.experienceKind === 'IT_FREELANCE'
                ? '4px solid #6366f1'
                : formData.experienceKind === 'GENERAL_FREELANCE'
                  ? '4px solid #f59e0b'
                  : '4px solid #22c55e'
            }}
          >
            <option value="FORMAL_WORK">Formal Work</option>
            <option value="IT_FREELANCE">IT Freelance</option>
            <option value="GENERAL_FREELANCE">General Freelance</option>
          </select>
          <small style={{ display: 'block', marginTop: '4px', opacity: 0.6, fontSize: '0.78rem' }}>
            Segmentasi jenis pengalaman kerja untuk tampilan publik
          </small>
        </div>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Status</label>
          <select 
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '4px', 
              border: '1px solid var(--border-color)', 
              backgroundColor: 'var(--bg-color)', 
              color: formData.status === 'PUBLISHED' ? '#166534' : '#854d0e',
              fontWeight: '600',
              borderLeft: formData.status === 'PUBLISHED' ? '4px solid #22c55e' : '4px solid #eab308'
            }}
          >
            <option value="DRAFT">DRAFT (Hidden from Public)</option>
            <option value="PUBLISHED">PUBLISHED (Visible to Public)</option>
          </select>
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

      <button type="submit" className="btn btn-primary" disabled={saving} style={{ marginTop: 'var(--space-4)', padding: '12px' }}>
        {saving ? 'Saving...' : (initialData ? 'Update Experience' : 'Create Experience')}
      </button>
    </form>
  );
};

export default ExperienceForm;

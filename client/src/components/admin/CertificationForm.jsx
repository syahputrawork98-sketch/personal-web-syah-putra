import React, { useState } from 'react';

const CertificationForm = ({ initialData, onSubmit, saving }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    issuer: initialData?.issuer || '',
    type: initialData?.type || 'CERTIFICATE',
    category: initialData?.category || 'PROFESSIONAL',
    credentialId: initialData?.credentialId || '',
    credentialUrl: initialData?.credentialUrl || '',
    certificateUrl: initialData?.certificateUrl || '',
    driveUrl: initialData?.driveUrl || '',
    imageUrl: initialData?.imageUrl || '',
    issuedAt: initialData?.issuedAt ? new Date(initialData.issuedAt).toISOString().split('T')[0] : '',
    expiredAt: initialData?.expiredAt ? new Date(initialData.expiredAt).toISOString().split('T')[0] : '',
    doesNotExpire: initialData?.doesNotExpire !== undefined ? initialData.doesNotExpire : true,
    skills: initialData?.skills ? initialData.skills.join(', ') : '',
    description: initialData?.description || '',
    featured: initialData?.featured || false,
    status: initialData?.status || 'DRAFT',
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
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s !== '')
    };
    onSubmit(submissionData);
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <h3 style={{ fontSize: '1.1rem', margin: '0 0 var(--space-2) 0', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-2)', color: 'var(--primary-color)' }}>Basic Info</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Certification Title*</label>
          <input 
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. AWS Certified Solutions Architect"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          />
        </div>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Issuer*</label>
          <input 
            name="issuer"
            required
            value={formData.issuer}
            onChange={handleChange}
            placeholder="e.g. Amazon Web Services"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Type*</label>
          <select 
            name="type"
            required
            value={formData.type}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          >
            <option value="CERTIFICATE">CERTIFICATE (Sertifikat)</option>
            <option value="SUPPORTING_DOCUMENT">SUPPORTING_DOCUMENT (Dokumen Pendukung)</option>
          </select>
        </div>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Category*</label>
          <select 
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          >
            <option value="PROFESSIONAL">PROFESSIONAL</option>
            <option value="TECHNICAL">TECHNICAL</option>
            <option value="ACADEMIC">ACADEMIC</option>
            <option value="TRAINING">TRAINING</option>
            <option value="SOFT_SKILL">SOFT SKILL</option>
            <option value="EVENT">EVENT</option>
            <option value="OTHER">OTHER</option>
          </select>
        </div>
      </div>

      <h3 style={{ fontSize: '1.1rem', margin: 'var(--space-2) 0', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-2)', color: 'var(--primary-color)' }}>Certificate & Drive Links</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Credential ID</label>
          <input 
            name="credentialId"
            value={formData.credentialId}
            onChange={handleChange}
            placeholder="e.g. ABC-123-XYZ"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          />
        </div>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Credential URL</label>
          <input 
            name="credentialUrl"
            type="text"
            value={formData.credentialUrl}
            onChange={handleChange}
            placeholder="https://... or relative path"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Certificate URL</label>
          <input 
            name="certificateUrl"
            type="text"
            value={formData.certificateUrl}
            onChange={handleChange}
            placeholder="https://... or relative path"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          />
        </div>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Drive URL</label>
          <input 
            name="driveUrl"
            type="text"
            value={formData.driveUrl}
            onChange={handleChange}
            placeholder="https://drive.google.com/..."
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          />
          <span style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '4px', display: 'block', lineHeight: 1.3 }}>
            Gunakan URL Google Drive untuk production. Untuk localhost, bisa menggunakan path lokal (e.g. <code>/cv/sertifikat.pdf</code>).
          </span>
        </div>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Image URL</label>
          <input 
            name="imageUrl"
            type="text"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://... or relative path"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          />
        </div>
      </div>

      <h3 style={{ fontSize: '1.1rem', margin: 'var(--space-2) 0', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-2)', color: 'var(--primary-color)' }}>Metadata & Skills</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)', alignItems: 'end' }}>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Issued Date</label>
          <input 
            name="issuedAt"
            type="date"
            value={formData.issuedAt}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          />
        </div>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Expiration Date</label>
          <input 
            name="expiredAt"
            type="date"
            disabled={formData.doesNotExpire}
            value={formData.expiredAt}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', opacity: formData.doesNotExpire ? 0.5 : 1 }}
          />
        </div>
        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', paddingBottom: '12px' }}>
          <input 
            id="doesNotExpire"
            name="doesNotExpire"
            type="checkbox"
            checked={formData.doesNotExpire}
            onChange={handleChange}
          />
          <label htmlFor="doesNotExpire">Does Not Expire</label>
        </div>
      </div>

      <div className="form-group">
        <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Skills (Comma-separated)</label>
        <input 
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="Cloud, Security, Architecture"
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
        />
      </div>

      <h3 style={{ fontSize: '1.1rem', margin: 'var(--space-2) 0', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-2)', color: 'var(--primary-color)' }}>Visibility & Status</h3>
      <div className="form-group" style={{ display: 'flex', gap: 'var(--space-6)', marginTop: 'var(--space-2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <input 
            id="featured"
            name="featured"
            type="checkbox"
            checked={formData.featured}
            onChange={handleChange}
          />
          <label htmlFor="featured">Featured (Show on top/home)</label>
        </div>
      </div>

      <div className="form-group">
        <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Description</label>
        <textarea 
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          placeholder="What did you learn or achieve with this certification?"
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', resize: 'vertical' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Status</label>
          <select 
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          >
            <option value="DRAFT">DRAFT</option>
            <option value="PUBLISHED">PUBLISHED</option>
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
        {saving ? 'Saving...' : (initialData ? 'Update Certification' : 'Create Certification')}
      </button>
    </form>
  );
};

export default CertificationForm;

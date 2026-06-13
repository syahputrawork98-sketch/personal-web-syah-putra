import React from 'react';

const CvIdentityForm = ({ activeVariant, updateActiveVariant, profileName, profileTitle }) => {
  if (!activeVariant) return null;

  return (
    <div className="card" style={{ padding: 'var(--space-4)' }}>
      <h3 style={{ margin: '0 0 var(--space-4) 0', fontSize: '1.1rem' }}>CV Identity Information</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>CV Display Name</label>
          <input 
            type="text" 
            value={activeVariant.displayName || ''} 
            onChange={(e) => updateActiveVariant({ displayName: e.target.value })} 
            placeholder={profileName || 'Your Name'} 
            className="form-input" 
            style={{ width: '100%', boxSizing: 'border-box' }} 
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>Professional Title</label>
          <input 
            type="text" 
            value={activeVariant.professionalTitle || ''} 
            onChange={(e) => updateActiveVariant({ professionalTitle: e.target.value })} 
            placeholder={profileTitle || 'e.g. Full Stack Developer'} 
            className="form-input" 
            style={{ width: '100%', boxSizing: 'border-box' }} 
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>Target Role (Optional)</label>
          <input 
            type="text" 
            value={activeVariant.targetRole || ''} 
            onChange={(e) => updateActiveVariant({ targetRole: e.target.value })} 
            placeholder="e.g. Senior Frontend Engineer" 
            className="form-input" 
            style={{ width: '100%', boxSizing: 'border-box' }} 
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>Phone Number Override</label>
          <input 
            type="text" 
            value={activeVariant.phone || ''} 
            onChange={(e) => updateActiveVariant({ phone: e.target.value })} 
            placeholder="e.g. 0851 6265 4466" 
            className="form-input" 
            style={{ width: '100%', boxSizing: 'border-box' }} 
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>Website URL Override</label>
          <input 
            type="text" 
            value={activeVariant.website || ''} 
            onChange={(e) => updateActiveVariant({ website: e.target.value })} 
            placeholder="e.g. https://syahputran.vercel.app/" 
            className="form-input" 
            style={{ width: '100%', boxSizing: 'border-box' }} 
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>LinkedIn Link Override</label>
          <input 
            type="text" 
            value={activeVariant.linkedin || ''} 
            onChange={(e) => updateActiveVariant({ linkedin: e.target.value })} 
            placeholder="e.g. https://bit.ly/4xrqAWN" 
            className="form-input" 
            style={{ width: '100%', boxSizing: 'border-box' }} 
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>GitHub Link Override</label>
          <input 
            type="text" 
            value={activeVariant.github || ''} 
            onChange={(e) => updateActiveVariant({ github: e.target.value })} 
            placeholder="e.g. https://github.com/username" 
            className="form-input" 
            style={{ width: '100%', boxSizing: 'border-box' }} 
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>Email Override</label>
          <input 
            type="text" 
            value={activeVariant.email || ''} 
            onChange={(e) => updateActiveVariant({ email: e.target.value })} 
            placeholder="e.g. email@example.com" 
            className="form-input" 
            style={{ width: '100%', boxSizing: 'border-box' }} 
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>Location Override</label>
          <input 
            type="text" 
            value={activeVariant.location || ''} 
            onChange={(e) => updateActiveVariant({ location: e.target.value })} 
            placeholder="e.g. Jakarta, Indonesia" 
            className="form-input" 
            style={{ width: '100%', boxSizing: 'border-box' }} 
          />
        </div>
      </div>
    </div>
  );
};

export default CvIdentityForm;

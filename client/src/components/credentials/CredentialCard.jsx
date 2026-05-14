import React from 'react';
import { motion } from 'framer-motion';

const CredentialCard = ({ credential, onClick }) => {
  return (
    <motion.div 
      className="card credential-card"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      whileHover={{ y: -5 }}
    >
      <div style={{ padding: 'var(--space-6)', flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-2)' }}>
          <p className="credential-category" style={{ margin: 0 }}>{credential.category}</p>
          <div style={{ display: 'flex', gap: '4px' }}>
            {credential.featured && (
              <span style={{ fontSize: '0.65rem', background: 'var(--primary-color)', color: 'white', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>STAR</span>
            )}
            {credential.status === 'supporting' && (
              <span style={{ fontSize: '0.65rem', background: 'var(--surface-color)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>SUPPORTING</span>
            )}
            {credential.status === 'duplicate-review' && (
              <span style={{ fontSize: '0.65rem', background: '#FEE2E2', color: '#EF4444', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>REVIEW</span>
            )}
          </div>
        </div>
        <h3 className="credential-title">{credential.title}</h3>
        <p className="credential-issuer">{credential.issuer}</p>
        <p className="credential-date">{credential.date}</p>
        
        <div className="credential-skills">
          {credential.skills.slice(0, 3).map((skill, idx) => (
            <span key={idx} className="credential-skill-badge">{skill}</span>
          ))}
          {credential.skills.length > 3 && (
            <span className="credential-skill-badge">+{credential.skills.length - 3}</span>
          )}
        </div>

        <button 
          className="btn btn-secondary" 
          style={{ marginTop: 'var(--space-6)', width: '100%', fontSize: '0.85rem' }}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          Lihat Sertifikat
        </button>
      </div>
    </motion.div>
  );
};

export default CredentialCard;

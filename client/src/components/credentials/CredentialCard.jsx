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
      <div style={{ padding: 'var(--space-6)', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p className="credential-category">{credential.category}</p>
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

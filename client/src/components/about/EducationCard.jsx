import React from 'react';

const EducationCard = ({ school, degree, period, description }) => {
  return (
    <div className="card" style={{ padding: 'var(--space-6)' }}>
      <p style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px' }}>{school}</p>
      <p style={{ color: 'var(--primary-color)', fontWeight: 600, fontSize: '0.95rem' }}>{degree}</p>
      <p style={{ opacity: 0.6, fontSize: '0.85rem', marginBottom: 'var(--space-3)' }}>{period}</p>
      {description && <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.5 }}>{description}</p>}
    </div>
  );
};

export default EducationCard;

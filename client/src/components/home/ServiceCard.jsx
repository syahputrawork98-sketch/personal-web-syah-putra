import React from 'react';

const ServiceCard = ({ title, desc }) => {
  return (
    <div className="card" style={{ padding: 'var(--space-4)', textAlign: 'center', background: 'rgba(var(--primary-color-rgb), 0.05)', border: '1px solid rgba(var(--primary-color-rgb), 0.1)' }}>
      <h4 style={{ fontSize: '0.95rem', marginBottom: 'var(--space-1)', color: 'var(--primary-color)' }}>{title}</h4>
      <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>{desc}</p>
    </div>
  );
};

export default ServiceCard;

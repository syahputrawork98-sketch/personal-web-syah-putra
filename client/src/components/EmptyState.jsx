import React from 'react';
import { motion } from 'framer-motion';

const EmptyState = ({ message, icon }) => {
  return (
    <motion.div 
      style={{ 
        textAlign: 'center', 
        padding: 'var(--space-12) var(--space-4)', 
        opacity: 0.6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-4)'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ duration: 0.5 }}
    >
      {icon && <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-2)' }}>{icon}</div>}
      <p style={{ fontSize: '1.1rem' }}>{message || 'Data belum tersedia.'}</p>
    </motion.div>
  );
};

export default EmptyState;

import React from 'react';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: 'var(--space-4)'
    }}>
      <div className="card" style={{
        backgroundColor: 'var(--card-bg)',
        width: '100%',
        maxWidth: '400px',
        padding: 'var(--space-6)',
        borderRadius: '8px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}>
        <h2 style={{ 
          marginTop: 0, 
          marginBottom: 'var(--space-4)', 
          fontSize: '1.25rem',
          color: 'var(--text-color)'
        }}>
          {title}
        </h2>
        <p style={{ 
          marginBottom: 'var(--space-6)', 
          color: 'var(--text-color)', 
          opacity: 0.8,
          lineHeight: 1.5
        }}>
          {message}
        </p>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: 'var(--space-3)' 
        }}>
          <button 
            onClick={onCancel} 
            disabled={isDeleting}
            className="btn btn-secondary"
            style={{ padding: '8px 16px' }}
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            disabled={isDeleting}
            className="btn btn-primary"
            style={{ 
              padding: '8px 16px',
              backgroundColor: '#dc2626',
              borderColor: '#dc2626',
              opacity: isDeleting ? 0.7 : 1,
              cursor: isDeleting ? 'not-allowed' : 'pointer'
            }}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

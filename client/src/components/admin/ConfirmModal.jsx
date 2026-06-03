import React from 'react';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'grid',
      placeItems: 'center',
      zIndex: 9999,
      padding: 'var(--space-4)',
      minHeight: '100dvh',
      width: '100vw',
      boxSizing: 'border-box',
      transform: 'translateZ(0)'
    }}>
      <div className="card" style={{
        backgroundColor: 'var(--card-bg)',
        width: '100%',
        height: 'fit-content',
        maxWidth: '320px',
        margin: 0,
        padding: '16px 18px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}>
        <h2 style={{
          marginTop: 0,
          marginBottom: '8px',
          fontSize: '1rem',
          color: 'var(--text-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span style={{ color: '#dc2626' }}>⚠️</span> {title}
        </h2>
        <p style={{
          marginBottom: '16px',
          color: 'var(--text-color)',
          opacity: 0.8,
          lineHeight: 1.4,
          fontSize: '0.85rem'
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
            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="btn btn-primary"
            style={{
              padding: '6px 12px',
              fontSize: '0.8rem',
              backgroundColor: '#dc2626',
              borderColor: '#dc2626',
              opacity: isDeleting ? 0.7 : 1,
              cursor: isDeleting ? 'not-allowed' : 'pointer'
            }}
          >
            {isDeleting ? 'Menghapus...' : 'Hapus'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

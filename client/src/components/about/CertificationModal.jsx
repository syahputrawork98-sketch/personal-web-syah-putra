import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CertificationModal = ({ isOpen, onClose, certification }) => {
  if (!certification) return null;

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="modal-overlay" 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000,
            padding: 'var(--space-4)',
            backdropFilter: 'blur(8px)'
          }}
          onClick={onClose}
        >
          <motion.div 
            className="modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '650px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              position: 'relative',
              padding: 'var(--space-8)',
              backgroundColor: 'var(--bg-color)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              color: 'var(--text-secondary)'
            }}
          >
            <button 
              onClick={onClose}
              style={{
                position: 'absolute',
                top: 'var(--space-4)',
                right: 'var(--space-4)',
                background: 'var(--surface-color)',
                border: '1px solid var(--border-color)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                zIndex: 10
              }}
            >
              &times;
            </button>

            <div style={{ marginBottom: 'var(--space-6)' }}>
              <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <span style={{ 
                  fontSize: '0.7rem', 
                  fontWeight: 'bold', 
                  color: 'var(--primary-color)', 
                  textTransform: 'uppercase', 
                  letterSpacing: '1px',
                  backgroundColor: 'rgba(56, 189, 248, 0.1)',
                  padding: '2px 8px',
                  borderRadius: '4px'
                }}>
                  {certification.category}
                </span>
                <span style={{ 
                  fontSize: '0.7rem', 
                  fontWeight: 'bold', 
                  color: 'var(--secondary-color)', 
                  textTransform: 'uppercase', 
                  padding: '2px 8px'
                }}>
                  {certification.type === 'CERTIFICATE' ? 'Sertifikat' : 'Dokumen'}
                </span>
              </div>
              
              <h2 style={{ fontSize: '1.75rem', marginBottom: 'var(--space-2)', color: 'var(--text-primary)', lineHeight: 1.2 }}>{certification.title}</h2>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', fontSize: '0.9rem', opacity: 0.8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <strong>Penerbit:</strong> {certification.issuer}
                </div>
                {certification.issueDate && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <strong>Tanggal:</strong> {formatDate(certification.issueDate)}
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginBottom: 'var(--space-8)' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: 'var(--space-3)', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-2)' }}>Detail Sertifikat</h4>
              <p style={{ lineHeight: 1.7, fontSize: '1rem', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>
                {certification.summary || 'Tidak ada deskripsi tambahan tersedia untuk sertifikat ini.'}
              </p>
            </div>

            {certification.skills && certification.skills.length > 0 && (
              <div style={{ marginBottom: 'var(--space-8)' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: 'var(--space-4)', color: 'var(--text-primary)' }}>Kompetensi & Keahlian</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  {certification.skills.map((skill, idx) => {
                    // Logic for skill colors based on keywords or type (if we had it)
                    const isSoft = ['Leadership', 'Thinking', 'Communication', 'Teamwork', 'Development', 'Adaptability'].some(k => skill.includes(k));
                    const isTool = ['CAD', 'GIS', 'Azure', 'Node', 'React', 'Git', 'SQL'].some(k => skill.includes(k));
                    
                    return (
                      <span key={idx} style={{ 
                        fontSize: '0.75rem', 
                        padding: '6px 14px', 
                        background: isSoft ? 'rgba(129, 140, 248, 0.1)' : (isTool ? 'rgba(56, 189, 248, 0.1)' : 'var(--surface-color)'), 
                        color: isSoft ? 'var(--accent-color)' : (isTool ? 'var(--primary-color)' : 'var(--text-primary)'),
                        borderRadius: '20px',
                        border: '1px solid var(--border-color)',
                        fontWeight: 600,
                        transition: 'all 0.2s ease'
                      }}>
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            <div style={{ 
              display: 'flex', 
              gap: 'var(--space-4)', 
              marginTop: 'var(--space-8)',
              paddingTop: 'var(--space-4)',
              borderTop: '1px solid var(--border-color)'
            }}>
              {certification.driveUrl && (
                <a 
                  href={certification.driveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary"
                  style={{ flex: 1, textDecoration: 'none' }}
                >
                  Buka Link Sertifikat &rarr;
                </a>
              )}
              <button 
                onClick={onClose} 
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Kembali
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CertificationModal;

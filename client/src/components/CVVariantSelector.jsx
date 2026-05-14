import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cvVariants } from '../data/cvVariants';
import NewspaperCVWireframe from './NewspaperCVWireframe';

const CVVariantSelector = ({ isOpen, onClose }) => {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleSelectVariant = (variant) => {
    setSelectedVariant(variant);
    setShowPreview(true);
  };

  const handleBack = () => {
    setShowPreview(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 3000,
            padding: 'var(--space-4)',
            backdropFilter: 'blur(10px)'
          }}
          onClick={onClose}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            style={{
              maxWidth: showPreview ? '1000px' : '900px',
              width: '100%',
              backgroundColor: 'var(--background-color)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: 'var(--space-8)',
              position: 'relative',
              border: '1px solid var(--border-color)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(15, 23, 42, 0.7)',
                border: '1px solid var(--border-color)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              &times;
            </button>

            {!showPreview ? (
              <>
                <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
                  <h2 style={{ fontSize: '2rem', marginBottom: 'var(--space-2)' }}>Pilih Versi CV</h2>
                  <p style={{ opacity: 0.7, maxWidth: '500px', margin: '0 auto' }}>
                    Sesuaikan CV dengan kebutuhan bidang yang ingin Anda lihat. Setiap versi memiliki penekanan skill dan portfolio yang berbeda.
                  </p>
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
                  gap: 'var(--space-6)' 
                }}>
                  {cvVariants.map(variant => (
                    <div 
                      key={variant.id}
                      className="card"
                      style={{ 
                        padding: 'var(--space-6)', 
                        display: 'flex', 
                        flexDirection: 'column',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        border: '1px solid var(--border-color)'
                      }}
                      onClick={() => handleSelectVariant(variant)}
                    >
                      <h3 style={{ marginBottom: 'var(--space-1)', color: 'var(--primary-color)' }}>{variant.title}</h3>
                      <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: 'var(--space-4)', fontWeight: 600 }}>{variant.subtitle}</p>
                      
                      <div style={{ flex: 1, marginBottom: 'var(--space-6)' }}>
                        <p style={{ fontSize: '0.85rem', lineHeight: 1.5, opacity: 0.7, marginBottom: 'var(--space-4)' }}>
                          {variant.description}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                          {variant.skills.slice(0, 3).map(skill => (
                            <span key={skill} style={{ fontSize: '0.65rem', background: 'rgba(var(--primary-color-rgb), 0.1)', color: 'var(--primary-color)', padding: '2px 8px', borderRadius: '4px' }}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <button className="btn btn-primary" style={{ width: '100%', fontSize: '0.85rem' }}>
                          Lihat Wireframe CV
                        </button>
                        <button 
                          className="btn btn-secondary" 
                          disabled={!variant.pdfUrl}
                          style={{ width: '100%', fontSize: '0.85rem', opacity: variant.pdfUrl ? 1 : 0.5 }}
                        >
                          {variant.pdfUrl ? 'Unduh PDF' : 'PDF Belum Tersedia'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--space-6)', gap: 'var(--space-4)' }}>
                  <button 
                    onClick={handleBack}
                    style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', fontWeight: 700, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '5px' }}
                  >
                    &larr; Kembali
                  </button>
                  <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Wireframe Preview: {selectedVariant?.title}</h2>
                </div>

                <div style={{ marginBottom: 'var(--space-8)' }}>
                  <NewspaperCVWireframe variant={selectedVariant} />
                </div>

                <div style={{ textAlign: 'center', padding: 'var(--space-6)', background: 'rgba(var(--primary-color-rgb), 0.05)', borderRadius: 'var(--radius-lg)' }}>
                  <h4 style={{ marginBottom: 'var(--space-2)' }}>Konsep CV Koran (Newspaper/Editorial)</h4>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8, maxWidth: '700px', margin: '0 auto 20px' }}>
                    Ini adalah wireframe konsep tata letak CV satu halaman bergaya editorial koran. Versi PDF final akan menggunakan tipografi dan penataan yang lebih presisi untuk dicetak atau dikirim secara digital.
                  </p>
                  <button className="btn btn-secondary" disabled style={{ opacity: 0.5 }}>
                    Unduh Versi PDF (Coming Soon)
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CVVariantSelector;

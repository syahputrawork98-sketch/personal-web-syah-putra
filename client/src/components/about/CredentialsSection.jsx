import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getPublicCertifications } from '../../lib/api';
import EmptyState from '../EmptyState';
// You might need to import a css file here if you want specific styles. 
// Reusing certs-grid from experience.css but it might be better to use inline or a new file.

import CertificationModal from './CertificationModal';

const CredentialsSection = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Modal State
  const [selectedCert, setSelectedCert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter Logic - Re-prioritized for Recruiters
  const tabs = [
    { id: 'ALL', label: 'All' },
    { id: 'CERTIFICATE', label: 'Programming / IT' },
    { id: 'PROFESSIONAL', label: 'Professional' },
    { id: 'ACADEMIC', label: 'Academic' },
    { id: 'SOFT_SKILL', label: 'Soft Skill / Other' },
  ];

  const [activeTab, setActiveTab] = useState('CERTIFICATE');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const certData = await getPublicCertifications();
        if (certData.certifications) setCertifications(certData.certifications);
      } catch (err) {
        console.warn('CredentialsSection: API Fetch failed:', err.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredCerts = certifications.filter(cert => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'CERTIFICATE') return cert.category === 'TECHNICAL';
    if (activeTab === 'SOFT_SKILL') return cert.category === 'SOFT_SKILL';
    return cert.category === activeTab;
  });

  const openModal = (cert) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
  };

  // Helper to truncate text
  const truncate = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: 'var(--space-6)', gap: 'var(--space-4)' }}>
        <motion.h3 
          style={{ color: 'var(--primary-color)', margin: 0 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Kredensial & Sertifikasi
        </motion.h3>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: 'var(--space-2)', overflowX: 'auto', paddingBottom: '4px' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '6px 16px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                background: activeTab === tab.id ? 'var(--primary-color)' : 'var(--surface-color)',
                color: activeTab === tab.id ? '#FFF' : 'var(--text-secondary)',
                border: '1px solid var(--border-color)',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {loading && <p style={{ opacity: 0.6, fontSize: '0.9rem', textAlign: 'center' }}>Memuat data sertifikat...</p>}
      {error && !loading && <EmptyState message="Gagal memuat data sertifikat." />}
      {!loading && !error && filteredCerts.length === 0 ? (
        <EmptyState message={`Belum ada data untuk kategori ${tabs.find(t => t.id === activeTab)?.label}.`} />
      ) : (
        <motion.div 
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-4)' }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          key={activeTab}
          viewport={{ once: true, amount: 0.1 }}
        >
          {filteredCerts.map(cert => (
            <motion.div 
              key={cert.id} 
              className="cert-item card"
              variants={itemVariants}
              whileHover={{ y: -5, borderColor: 'var(--primary-color)' }}
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-start', 
                height: '100%', 
                textAlign: 'left', 
                padding: 'var(--space-5)',
                transition: 'border-color 0.3s ease, transform 0.3s ease'
              }}
            >
              <div style={{ 
                fontSize: '0.65rem', 
                fontWeight: 700, 
                opacity: 0.6, 
                textTransform: 'uppercase', 
                marginBottom: 'var(--space-2)',
                letterSpacing: '0.5px',
                color: 'var(--primary-color)'
              }}>
                {cert.category === 'TECHNICAL' ? 'Programming / IT' : 
                 cert.category === 'PROFESSIONAL' ? 'Professional' : 
                 cert.category === 'ACADEMIC' ? 'Academic' : 
                 cert.category === 'SOFT_SKILL' ? 'Soft Skill' : 'Other'}
              </div>
              
              <h4 style={{ 
                fontWeight: 600, 
                fontSize: '1rem', 
                marginBottom: 'var(--space-2)', 
                lineHeight: 1.3,
                color: 'var(--text-primary)' 
              }}>
                {cert.title}
              </h4>
              
              <p style={{ 
                fontSize: '0.85rem', 
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-4)', 
                lineHeight: 1.5,
                flexGrow: 1
              }}>
                {truncate(cert.summary, 80)}
              </p>
              
              <button 
                onClick={() => openModal(cert)}
                className="btn btn-secondary"
                style={{ 
                  fontSize: '0.75rem', 
                  padding: '6px 12px', 
                  width: '100%',
                  fontWeight: 600,
                  border: '1px solid var(--border-color)'
                }}
              >
                Lihat Detail
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Certification Detail Modal */}
      <CertificationModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        certification={selectedCert} 
      />
    </>
  );
};

export default CredentialsSection;

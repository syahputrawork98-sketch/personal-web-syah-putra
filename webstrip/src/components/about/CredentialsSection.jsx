import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getPublicCertifications } from '../../lib/api';
import EmptyState from '../EmptyState';
// You might need to import a css file here if you want specific styles. 
// Reusing certs-grid from experience.css but it might be better to use inline or a new file.

const CredentialsSection = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const certData = await getPublicCertifications();
        if (certData.certifications) setCertifications(certData.certifications);
      } catch (err) {
        console.warn('CredentialsSection: API Fetch failed:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <>
      <motion.h3 
        style={{ marginTop: 'var(--space-12)', marginBottom: 'var(--space-6)', color: 'var(--primary-color)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Kredensial / Sertifikat
      </motion.h3>
      
      {loading && <span style={{ opacity: 0.6, fontSize: '0.9rem' }}>Memuat data...</span>}
      
      {!loading && certifications.length === 0 ? (
        <EmptyState message="Data sertifikat belum tersedia." />
      ) : (
        <motion.div 
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-6)' }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {certifications.map(cert => (
            <motion.div 
              key={cert.id} 
              className="cert-item card"
              variants={itemVariants}
              whileHover={{ scale: 1.02, borderColor: 'var(--primary-color)' }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: 'auto', textAlign: 'left', padding: 'var(--space-4)' }}
            >
              <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '4px' }}>{cert.title}</div>
              {cert.issuer && (
                <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '8px' }}>
                  {cert.issuer} {cert.issueDate && `• ${new Date(cert.issueDate).getFullYear()}`}
                </div>
              )}
              {cert.summary && (
                <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '12px' }}>{cert.summary}</p>
              )}
              {cert.skills && cert.skills.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
                  {cert.skills.map((skill, idx) => (
                    <span key={idx} style={{ fontSize: '0.7rem', padding: '2px 6px', background: 'var(--bg-tertiary)', borderRadius: '4px' }}>{skill}</span>
                  ))}
                </div>
              )}
              {cert.driveUrl && (
                <a 
                  href={cert.driveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ fontSize: '0.8rem', color: 'var(--primary-color)', marginTop: 'auto', textDecoration: 'none', fontWeight: 600 }}
                >
                  Lihat Kredensial &rarr;
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
};

export default CredentialsSection;

import React from 'react';
import { motion } from 'framer-motion';
import { certificates, supportingDocuments, certificateCards, featuredCredentials } from '../data/credentialDraft';
import '../styles/credentials.css'; // I'll need to create this style file or use inline

const Credentials = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="section-padding">
      <div className="container">
        <header style={{ marginBottom: 'var(--space-12)' }}>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-2)' }}
          >
            Kredensial <span style={{ color: 'var(--primary-color)' }}>& Sertifikasi</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ color: 'var(--text-secondary)', maxWidth: '600px' }}
          >
            Daftar sertifikasi formal, pelatihan kompetensi, dan dokumen pendukung profesional dalam bidang IT, Maritim, dan Blue Economy.
          </motion.p>
        </header>

        {/* Featured Section */}
        <section style={{ marginBottom: 'var(--space-16)' }}>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{ color: 'var(--primary-color)' }}>★</span> Sorotan Utama
          </h2>
          <div className="grid-2">
            {featuredCredentials.map((feat) => {
              const fullCert = certificates.find(c => c.id === feat.id);
              if (!fullCert) return null;
              
              return (
                <motion.div 
                  key={feat.id}
                  className="card featured-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  style={{ padding: 'var(--space-6)', borderLeft: '4px solid var(--primary-color)' }}
                >
                  <span style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', color: 'var(--primary-color)', fontWeight: 'bold' }}>{feat.category}</span>
                  <h3 style={{ margin: 'var(--space-2) 0' }}>{feat.title}</h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>{feat.reason}</p>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                    Penerbit: {fullCert.issuer}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* All Certificates Grid */}
        <section style={{ marginBottom: 'var(--space-16)' }}>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-6)' }}>Semua Sertifikasi</h2>
          <motion.div 
            className="grid-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {certificates.map((cert) => (
              <motion.div key={cert.id} className="card" variants={itemVariants} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: 'var(--space-6)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
                    <span className="badge-category">{cert.category}</span>
                    {cert.verificationStatus === 'needs_manual_verification' && (
                      <span className="badge-verify">Perlu Verifikasi</span>
                    )}
                  </div>
                  <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>{cert.title}</h3>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }}>
                    {cert.issuer} • {cert.issueDate ? String(cert.issueDate).slice(0, 4) : 'N/A'}
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)', lineBreak: 'anywhere' }}>
                    {cert.summary}
                  </p>
                  <div className="tech-badges" style={{ marginTop: 'auto', marginBottom: 'var(--space-6)' }}>
                    {cert.skills.slice(0, 6).map(skill => (
                      <span key={skill} className="tech-badge" style={{ fontSize: '10px' }}>{skill}</span>
                    ))}
                    {cert.skills.length > 6 && <span className="tech-badge" style={{ fontSize: '10px' }}>+{cert.skills.length - 6}</span>}
                  </div>
                  {cert.driveUrl && (
                    <a 
                      href={cert.driveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-secondary" 
                      style={{ width: '100%', fontSize: 'var(--text-sm)', textAlign: 'center', padding: 'var(--space-2)' }}
                    >
                      Lihat Dokumen
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Supporting Documents */}
        <section>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-6)' }}>Dokumen Pendukung</h2>
          <div className="grid-2">
            {supportingDocuments.map((doc) => (
              <motion.div 
                key={doc.id} 
                className="card" 
                style={{ padding: 'var(--space-6)', display: 'flex', gap: 'var(--space-4)' }}
                whileHover={{ y: -5 }}
              >
                <div style={{ fontSize: '2rem', opacity: 0.5 }}>📄</div>
                <div>
                  <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-1)' }}>{doc.title}</h3>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>
                    {doc.documentType} • {doc.institutionOrContext}
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
                    {doc.summary.length > 120 ? doc.summary.slice(0, 120) + '...' : doc.summary}
                  </p>
                  {doc.driveUrl && (
                    <a href={doc.driveUrl} target="_blank" rel="noopener noreferrer" className="btn-text">
                      Buka File →
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Credentials;

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CredentialsSection = () => {
  return (
    <div className="card" style={{ padding: 'var(--space-8)', textAlign: 'center', background: 'rgba(var(--primary-color-rgb), 0.03)', border: '1px dashed var(--border-color)' }}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 style={{ color: 'var(--primary-color)', marginBottom: 'var(--space-4)' }}>Kredensial & Sertifikasi Profesional</h3>
        <p style={{ maxWidth: '600px', margin: '0 auto var(--space-6)', opacity: 0.8, lineHeight: 1.6 }}>
          Saya memiliki berbagai sertifikasi kompetensi nasional (BNSP) dan pelatihan teknologi yang memvalidasi keahlian saya di bidang pengembangan web, manufaktur, dan manajemen konstruksi.
        </p>
        <Link to="/credentials" className="btn btn-primary" style={{ display: 'inline-block' }}>
          Lihat Semua Sertifikat &rarr;
        </Link>
      </motion.div>
    </div>
  );
};

export default CredentialsSection;

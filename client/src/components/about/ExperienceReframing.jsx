import React from 'react';
import { experienceReframing } from '../../data/aboutData';

const ExperienceReframing = () => {
  return (
    <div className="card" style={{ padding: 'var(--space-8)', borderLeft: '5px solid var(--primary-color)' }}>
      <h3 style={{ marginBottom: 'var(--space-4)', fontSize: '1.5rem' }}>8+ Tahun Fondasi IT & Digitalisasi</h3>
      <p style={{ fontSize: '1.05rem', lineHeight: 1.7, opacity: 0.9, marginBottom: 'var(--space-6)' }}>
        Bukan sekadar pengalaman masa lalu, 8 tahun berkecimpung di dunia IT sistem telah membentuk cara saya berpikir dalam membangun aplikasi. Saya membawa keahlian dalam:
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
        {experienceReframing.map((item, i) => (
          <div key={i}>
            <p style={{ fontWeight: 700, color: 'var(--primary-color)', marginBottom: '4px' }}>{item.title}</p>
            <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceReframing;

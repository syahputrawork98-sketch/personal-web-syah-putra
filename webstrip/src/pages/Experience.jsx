import React from 'react';
import { useI18n } from '../layouts/MainLayout';

const Experience = () => {
  const { t } = useI18n();
  const experiences = [1, 2, 3, 4, 5];

  return (
    <section id="experience" className="section-padding">
      <div className="container">
        <h2 style={{ marginBottom: 'var(--space-8)' }}>{t('experience.title')}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: '900px' }}>
          {experiences.map(id => (
            <div key={id} className="card" style={{ borderLeft: '4px solid var(--primary-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <h3 style={{ marginBottom: 0 }}>{t(`experience.exp${id}.role`)}</h3>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-color)', background: 'rgba(56, 189, 248, 0.1)', padding: '4px 12px', borderRadius: 'var(--radius-full)' }}>
                  {t(`experience.exp${id}.date`)}
                </span>
              </div>
              <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>{t(`experience.exp${id}.company`)}</p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>{t(`experience.exp${id}.desc`)}</p>
            </div>
          ))}
        </div>
        
        <h2 style={{ marginTop: 'var(--space-12)', marginBottom: 'var(--space-8)' }}>{t('edu_cert.cert_title')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-4)' }}>
          {[1, 2, 3, 4, 5].map(id => (
            <div key={id} className="cert-item">
              {t(`edu_cert.cert${id}`)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

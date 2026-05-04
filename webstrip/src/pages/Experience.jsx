import React from 'react';
import { useI18n } from '../layouts/MainLayout';
import '../styles/experience.css';

const Experience = () => {
  const { t } = useI18n();
  const experiences = [1, 2, 3, 4, 5];
  const certs = [1, 2, 3, 4, 5, 6, 7]; // Updated to show all 7 certs from JSON

  return (
    <section id="experience" className="section-padding">
      <div className="container">
        <h2 style={{ marginBottom: 'var(--space-8)' }}>{t('experience.title')}</h2>
        <div className="experience-list">
          {experiences.map(id => (
            <div key={id} className="card experience-card">
              <div className="experience-header">
                <h3 style={{ marginBottom: 0 }}>{t(`experience.exp${id}.role`)}</h3>
                <span className="experience-date">
                  {t(`experience.exp${id}.date`)}
                </span>
              </div>
              <p className="experience-company">{t(`experience.exp${id}.company`)}</p>
              <p className="experience-desc">{t(`experience.exp${id}.desc`)}</p>
            </div>
          ))}
        </div>
        
        <h2 style={{ marginTop: 'var(--space-12)', marginBottom: 'var(--space-8)' }}>{t('edu_cert.cert_title')}</h2>
        <div className="certs-grid">
          {certs.map(id => (
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

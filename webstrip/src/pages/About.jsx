import React from 'react';
import { useI18n } from '../layouts/MainLayout';

const About = () => {
  const { t } = useI18n();
  const softSkills = t('about.soft_skills').split(', ');

  return (
    <section id="about" className="section-padding">
      <div className="container">
        <h2 style={{ marginBottom: 'var(--space-6)' }}>{t('about.title')}</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-8)', alignItems: 'start' }}>
          <div>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: 'var(--space-3)' }}>{t('about.summary_title')}</h3>
            <p dangerouslySetInnerHTML={{ __html: t('about.summary') }} style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: 'var(--space-6)' }}></p>
            
            <h3 style={{ color: 'var(--primary-color)', marginBottom: 'var(--space-3)' }}>{t('about.soft_skills_title')}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {softSkills.map((skill, index) => (
                <span key={index} className="cert-item" style={{ padding: '4px 12px', fontSize: '0.85rem', borderLeft: 'none', borderBottom: '2px solid var(--primary-color)', borderRadius: 'var(--radius-sm)' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div className="card">
              <h3 style={{ marginBottom: 'var(--space-4)' }}>Contact Info</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: '0.95rem' }}>
                <p><strong>Location:</strong> {t('about.location')}</p>
                <p><strong>Email:</strong> <a href={`mailto:${t('about.email')}`}>{t('about.email')}</a></p>
                <p><strong>Phone:</strong> {t('about.phone')}</p>
                <div style={{ marginTop: 'var(--space-3)', display: 'flex', gap: 'var(--space-3)' }}>
                  <a href={t('about.github')} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>GitHub</a>
                  <a href={t('about.portfolio')} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Portfolio</a>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 style={{ marginBottom: 'var(--space-3)' }}>{t('edu_cert.edu_title')}</h3>
              <p><strong>{t('edu_cert.edu1.school')}</strong></p>
              <p style={{ color: 'var(--primary-color)', fontSize: '0.9rem', fontWeight: 600 }}>{t('edu_cert.edu1.major')}</p>
              <p style={{ opacity: 0.8, fontSize: '0.85rem' }}>{t('edu_cert.edu1.date')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

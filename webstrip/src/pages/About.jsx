import React from 'react';
import { useI18n } from '../layouts/MainLayout';
import '../styles/about.css';

const About = () => {
  const { t } = useI18n();
  const softSkills = t('about.soft_skills').split(', ');

  return (
    <section id="about" className="section-padding">
      <div className="container">
        <h2 style={{ marginBottom: 'var(--space-6)' }}>{t('about.title')}</h2>
        
        <div className="about-grid">
          <div>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: 'var(--space-3)' }}>{t('about.summary_title')}</h3>
            <p dangerouslySetInnerHTML={{ __html: t('about.summary') }} className="about-summary"></p>
            
            <h3 style={{ color: 'var(--primary-color)', marginBottom: 'var(--space-3)' }}>{t('about.soft_skills_title')}</h3>
            <div className="soft-skills-container">
              {softSkills.map((skill, index) => (
                <span key={index} className="cert-item soft-skill-tag" style={{ borderLeft: 'none' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div className="card">
              <h3 style={{ marginBottom: 'var(--space-4)' }}>Contact Info</h3>
              <div className="about-contact-card">
                <p><strong>Location:</strong> {t('about.location')}</p>
                <p><strong>Email:</strong> <a href={`mailto:${t('about.email')}`}>{t('about.email')}</a></p>
                <div className="about-cta-group">
                  <a href={t('about.github')} target="_blank" rel="noopener noreferrer" className="btn btn-secondary about-cta-btn">GitHub</a>
                  <a href={t('about.instagram')} target="_blank" rel="noopener noreferrer" className="btn btn-secondary about-cta-btn">Instagram</a>
                  <a href="/CV_Syah_Putra_Nugraha.pdf" download className="btn btn-primary about-cta-btn" style={{ flex: '1 0 auto' }}>Download CV</a>
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

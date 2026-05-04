import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../layouts/MainLayout';

const Home = () => {
  const { t } = useI18n();
  const highlightSkills = ['React.js', 'Node.js', 'Express.js', 'PHP', 'MySQL', 'MongoDB', 'PostgreSQL'];

  return (
    <section id="home" className="section-padding flex-center" style={{ minHeight: '85vh', textAlign: 'center' }}>
      <div className="container">
        <p style={{ color: 'var(--primary-color)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 'var(--space-2)', fontSize: '0.9rem' }}>{t('hero.role')}</p>
        <h1 style={{ marginBottom: 'var(--space-3)', fontSize: 'clamp(2.5rem, 8vw, 4.5rem)' }}>{t('hero.title')}</h1>
        <p style={{ maxWidth: '750px', margin: '0 auto var(--space-6)', fontSize: '1.25rem', lineHeight: '1.6', opacity: 0.9 }}>
          {t('hero.subtitle')}
        </p>
        
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--space-3)', maxWidth: '800px', margin: '0 auto' }}>
            {highlightSkills.map((skill, index) => (
              <span key={index} style={{ padding: '6px 16px', background: 'var(--surface-color)', borderRadius: 'var(--radius-full)', fontSize: '0.9rem', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontWeight: 500 }}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="cta-group" style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/projects" className="btn btn-primary">{t('hero.cta_primary')}</Link>
          <Link to="/contact" className="btn btn-secondary">{t('hero.cta_contact')}</Link>
        </div>
      </div>
    </section>
  );
};

export default Home;

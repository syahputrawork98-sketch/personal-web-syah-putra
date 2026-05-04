import React from 'react';
import { useI18n } from '../layouts/MainLayout';

const Projects = () => {
  const { t } = useI18n();
  return (
    <section id="projects" className="section-padding">
      <div className="container">
        <h2 style={{ marginBottom: 'var(--space-8)' }}>{t('projects.title')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
          {[1, 2, 3, 4].map(id => (
            <div className="card" key={id} style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginBottom: 'var(--space-1)' }}>{t(`projects.proj${id}.title`)}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)', opacity: 0.8 }}>{t(`projects.proj${id}.subtitle`)}</p>
              
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <span style={{ color: 'var(--primary-color)', fontSize: '0.8rem', fontWeight: 600 }}>
                  {t(`projects.proj${id}.tech`)}
                </span>
              </div>
              
              <p style={{ fontSize: '0.95rem', marginBottom: 'var(--space-4)', flex: 1 }}>{t(`projects.proj${id}.desc`)}</p>
              
              <div style={{ padding: 'var(--space-3)', background: 'rgba(56, 189, 248, 0.1)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--primary-color)' }}>
                <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-color)', marginBottom: '2px' }}>{t('projects.impact_label')}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{t(`projects.proj${id}.impact`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

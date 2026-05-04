import React, { useState } from 'react';
import { useI18n } from '../layouts/MainLayout';

const Projects = () => {
  const { t } = useI18n();
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="projects" className="section-padding">
      <div className="container">
        <h2 style={{ marginBottom: 'var(--space-8)' }}>{t('projects.title')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 'var(--space-6)' }}>
          {[1, 2, 3, 4].map(id => (
            <div className="card" key={id} style={{ display: 'flex', flexDirection: 'column', height: 'auto' }}>
              <h3 style={{ marginBottom: 'var(--space-1)' }}>{t(`projects.proj${id}.title`)}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)', opacity: 0.8 }}>{t(`projects.proj${id}.subtitle`)}</p>
              
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <span style={{ color: 'var(--primary-color)', fontSize: '0.8rem', fontWeight: 600 }}>
                  {t(`projects.proj${id}.tech`)}
                </span>
              </div>
              
              <p style={{ fontSize: '0.95rem', marginBottom: 'var(--space-4)' }}>{t(`projects.proj${id}.desc`)}</p>
              
              <div style={{ padding: 'var(--space-3)', background: 'rgba(56, 189, 248, 0.1)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--primary-color)', marginBottom: 'var(--space-4)' }}>
                <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-color)', marginBottom: '2px' }}>{t('projects.impact_label')}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{t(`projects.proj${id}.impact`)}</p>
              </div>

              {expandedId === id && (
                <div style={{ marginTop: 'var(--space-2)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', borderTop: '1px solid var(--border-color)', paddingTop: 'var(--space-4)' }}>
                  <div>
                    <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', marginBottom: '4px' }}>{t('projects.challenge_label')}</p>
                    <p style={{ fontSize: '0.9rem' }}>{t(`projects.proj${id}.challenge`)}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', marginBottom: '4px' }}>{t('projects.solution_label')}</p>
                    <p style={{ fontSize: '0.9rem' }}>{t(`projects.proj${id}.solution`)}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', marginBottom: '4px' }}>{t('projects.features_label')}</p>
                    <p style={{ fontSize: '0.9rem' }}>{t(`projects.proj${id}.features`)}</p>
                  </div>
                </div>
              )}

              <button 
                onClick={() => toggleExpand(id)} 
                className="btn-secondary" 
                style={{ marginTop: 'auto', padding: '8px', fontSize: '0.8rem', width: '100%', borderRadius: 'var(--radius-md)' }}
              >
                {expandedId === id ? 'Show Less' : 'View Case Study Details'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

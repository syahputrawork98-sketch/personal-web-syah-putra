import React from 'react';
import { useI18n } from '../layouts/MainLayout';

const Contact = () => {
  const { t } = useI18n();
  return (
    <section id="contact" className="section-padding flex-center" style={{ minHeight: '60vh' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 style={{ marginBottom: 'var(--space-6)' }}>{t('nav.contact')}</h2>
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h3 style={{ marginBottom: 'var(--space-4)' }}>Let's Build Something Together</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', fontSize: '1.1rem' }}>
            <p><strong>Email:</strong> <a href="mailto:syah.putrawork98@gmail.com">{t('about.email')}</a></p>
            <p><strong>Location:</strong> {t('about.location')}</p>
            <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
              <a href="https://github.com/syahputrawork98" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">GitHub</a>
              <a href="#" className="btn btn-secondary">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

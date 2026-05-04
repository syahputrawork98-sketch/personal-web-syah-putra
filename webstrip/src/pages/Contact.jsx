import React from 'react';
import { useI18n } from '../layouts/MainLayout';
import '../styles/contact.css';

const Contact = () => {
  const { t } = useI18n();

  const contactLinks = [
    {
      id: 'email',
      icon: '📧',
      label: 'Email Me',
      value: t('about.email'),
      url: `mailto:${t('about.email')}`,
      primary: true
    },
    {
      id: 'linkedin',
      icon: '🔗',
      label: 'LinkedIn',
      value: 'Syah Putra Nugraha',
      url: 'https://linkedin.com/in/syahputranugraha',
      primary: false
    },
    {
      id: 'github',
      icon: '🐙',
      label: 'GitHub',
      value: 'syahputranugraha',
      url: t('about.github'),
      primary: false
    },
    {
      id: 'instagram',
      icon: '📸',
      label: 'Instagram',
      value: '@syah_putra_n',
      url: t('about.instagram'),
      primary: false
    }
  ];

  return (
    <section id="contact" className="section-padding flex-center" style={{ minHeight: '80vh' }}>
      <div className="container contact-container">
        <div className="contact-header">
          <h2 className="text-center">{t('contact.title')}</h2>
          <p className="contact-subtitle">{t('contact.subtitle')}</p>
        </div>

        <div className="contact-grid">
          {/* Main Contact Card */}
          <div className="card contact-info-card">
            <h3 style={{ marginBottom: 'var(--space-5)', color: 'var(--primary-color)' }}>{t('contact.info_title')}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <p className="contact-item-label">Location</p>
                  <p className="contact-item-value">{t('about.location')}</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">⏰</div>
                <div>
                  <p className="contact-item-label">Availability</p>
                  <p className="contact-item-value" style={{ color: '#10B981' }}>Open to Work</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Actions */}
          <div className="contact-actions">
            {contactLinks.map((link) => (
              <a 
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn contact-btn ${link.primary ? 'btn-primary' : 'btn-secondary'}`}
              >
                <span className="contact-btn-icon">{link.icon}</span>
                <div style={{ textAlign: 'left' }}>
                  <p className="contact-item-label" style={{ opacity: 0.8 }}>{link.label}</p>
                  <p style={{ fontSize: '0.95rem' }}>{link.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

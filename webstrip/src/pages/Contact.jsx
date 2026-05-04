import React from 'react';
import { useI18n } from '../layouts/MainLayout';
import '../styles/contact.css';

const Contact = () => {
  const { t } = useI18n();

  const contactItems = [
    {
      id: 'email',
      icon: '📧',
      label: 'Email',
      value: t('about.email'),
      url: `mailto:${t('about.email')}`
    },
    {
      id: 'location',
      icon: '📍',
      label: 'Location',
      value: t('about.location'),
      url: null
    },
    {
      id: 'linkedin',
      icon: '🔗',
      label: 'LinkedIn',
      value: 'Syah Putra Nugraha',
      url: 'https://linkedin.com/in/syahputranugraha'
    },
    {
      id: 'github',
      icon: '🐙',
      label: 'GitHub',
      value: 'syahputranugraha',
      url: t('about.github')
    },
    {
      id: 'instagram',
      icon: '📸',
      label: 'Instagram',
      value: '@syah_putra_n',
      url: t('about.instagram')
    }
  ];

  return (
    <section id="contact" className="section-padding flex-center" style={{ minHeight: '70vh' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <h2 className="text-center">{t('contact.title')}</h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>{t('contact.subtitle')}</p>
        </div>

        <div className="card" style={{ padding: 'var(--space-6)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            {contactItems.map((item) => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: 'var(--radius-md)', 
                  background: 'rgba(56, 189, 248, 0.1)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '1.2rem' 
                }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.6, marginBottom: '2px' }}>
                    {item.label}
                  </p>
                  {item.url ? (
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none' }}
                      onMouseOver={(e) => e.target.style.color = 'var(--primary-color)'}
                      onMouseOut={(e) => e.target.style.color = 'var(--text-primary)'}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
          <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>
            {t('footer.copy')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import React from 'react';
import { useI18n } from '../layouts/MainLayout';

const Contact = () => {
  const { t } = useI18n();

  return (
    <section id="contact" className="section-padding flex-center" style={{ minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '700px' }}>
        <div style={{ marginBottom: 'var(--space-8)', textAlign: 'center' }}>
          <h2 className="text-center" style={{ marginBottom: 'var(--space-4)' }}>{t('contact.title')}</h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>{t('contact.subtitle')}</p>
        </div>

        <div className="card" style={{ height: 'auto', padding: 'var(--space-8)' }}>
          <h3 style={{ marginBottom: 'var(--space-6)', textAlign: 'center', color: 'var(--primary-color)' }}>{t('contact.info_title')}</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            {/* Email */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              <div style={{ width: '45px', height: '45px', borderRadius: 'var(--radius-md)', background: 'rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>📧</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.6, marginBottom: '2px' }}>Email</p>
                <a href={`mailto:${t('about.email')}`} style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1.05rem' }}>{t('about.email')}</a>
              </div>
            </div>

            {/* Location */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              <div style={{ width: '45px', height: '45px', borderRadius: 'var(--radius-md)', background: 'rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>📍</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.6, marginBottom: '2px' }}>Location</p>
                <p style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1.05rem' }}>{t('about.location')}</p>
              </div>
            </div>

            <div style={{ height: '1px', background: 'var(--border-color)', margin: 'var(--space-2) 0' }}></div>

            {/* LinkedIn */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              <div style={{ width: '45px', height: '45px', borderRadius: 'var(--radius-md)', background: 'rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>🔗</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.6, marginBottom: '2px' }}>LinkedIn</p>
                <a href="https://linkedin.com/in/syahputranugraha" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1.05rem' }}>linkedin.com/in/syahputranugraha</a>
              </div>
            </div>

            {/* GitHub */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              <div style={{ width: '45px', height: '45px', borderRadius: 'var(--radius-md)', background: 'rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>🐙</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.6, marginBottom: '2px' }}>GitHub</p>
                <a href={t('about.github')} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1.05rem' }}>{t('about.github').replace('https://', '')}</a>
              </div>
            </div>

            {/* Instagram */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              <div style={{ width: '45px', height: '45px', borderRadius: 'var(--radius-md)', background: 'rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>📸</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.6, marginBottom: '2px' }}>Instagram</p>
                <a href={t('about.instagram')} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1.05rem' }}>{t('about.instagram').replace('https://instagram.com/', '@')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

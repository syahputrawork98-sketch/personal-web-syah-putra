import React from 'react';
import { useI18n } from '../layouts/MainLayout';
import { motion } from 'framer-motion';
import '../styles/about.css';

const About = () => {
  const { t } = useI18n();
  const softSkills = t('about.soft_skills').split(', ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="about" className="section-padding">
      <motion.div 
        className="container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          style={{ marginBottom: 'var(--space-6)' }}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          {t('about.title')}
        </motion.h2>
        
        <div className="about-grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 style={{ color: 'var(--primary-color)', marginBottom: 'var(--space-3)' }}>{t('about.summary_title')}</h3>
            <p dangerouslySetInnerHTML={{ __html: t('about.summary') }} className="about-summary"></p>
            
            <h3 style={{ color: 'var(--primary-color)', marginBottom: 'var(--space-3)' }}>{t('about.soft_skills_title')}</h3>
            <motion.div 
              className="soft-skills-container"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {softSkills.map((skill, index) => (
                <motion.span 
                  key={index} 
                  className="cert-item soft-skill-tag" 
                  style={{ borderLeft: 'none' }}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, color: 'var(--primary-color)' }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.div className="card" whileHover={{ y: -5 }}>
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
            </motion.div>

            <motion.div className="card" whileHover={{ y: -5 }}>
              <h3 style={{ marginBottom: 'var(--space-3)' }}>{t('edu_cert.edu_title')}</h3>
              <p><strong>{t('edu_cert.edu1.school')}</strong></p>
              <p style={{ color: 'var(--primary-color)', fontSize: '0.9rem', fontWeight: 600 }}>{t('edu_cert.edu1.major')}</p>
              <p style={{ opacity: 0.8, fontSize: '0.85rem' }}>{t('edu_cert.edu1.date')}</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;

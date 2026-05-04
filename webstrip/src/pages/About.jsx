import React, { useState, useEffect } from 'react';
import { useI18n } from '../layouts/MainLayout';
import { motion } from 'framer-motion';
import { getPublicSkills } from '../lib/api';
import '../styles/about.css';

const About = () => {
  const { t } = useI18n();
  const [techSkills, setTechSkills] = useState({});
  const [contactData, setContactData] = useState(null);
  const softSkills = t('about.soft_skills').split(', ');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getPublicSkills();
        if (data.skills) {
          // Group by category
          const grouped = data.skills.reduce((acc, skill) => {
            const cat = skill.category || 'Other';
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(skill);
            return acc;
          }, {});
          setTechSkills(grouped);
        }
      } catch (err) {
        console.warn('About: Failed to fetch skills:', err.message);
      }
    };

    const fetchContact = async () => {
      try {
        const data = await getPublicContact();
        if (data.contact) {
          setContactData(data.contact);
        }
      } catch (err) {
        console.warn('About: Failed to fetch contact:', err.message);
      }
    };

    fetchSkills();
    fetchContact();
  }, []);

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
              style={{ marginBottom: 'var(--space-8)' }}
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

            {/* Technical Skills Section */}
            {Object.keys(techSkills).length > 0 && (
              <>
                <h3 style={{ color: 'var(--primary-color)', marginBottom: 'var(--space-4)' }}>{t('skills.title') || 'Technical Skills'}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-6)' }}>
                  {Object.entries(techSkills).map(([category, skills]) => (
                    <div key={category} className="skill-category-group">
                      <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.7, marginBottom: 'var(--space-3)', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                        {t(`skills.${category.toLowerCase()}`) || category}
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                        {skills.map(skill => (
                          <span key={skill.id} className="tech-badge" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
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
                <p><strong>Location:</strong> {contactData?.location || t('about.location')}</p>
                <p><strong>Email:</strong> <a href={`mailto:${contactData?.email || t('about.email')}`}>{contactData?.email || t('about.email')}</a></p>
                <div className="about-cta-group">
                  <a href={contactData?.github || t('about.github')} target="_blank" rel="noopener noreferrer" className="btn btn-secondary about-cta-btn">GitHub</a>
                  <a href={contactData?.instagram || t('about.instagram')} target="_blank" rel="noopener noreferrer" className="btn btn-secondary about-cta-btn">Instagram</a>
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

import React, { useState, useEffect } from 'react';
import { useI18n } from '../layouts/MainLayout';
import { motion } from 'framer-motion';
import { getPublicSkills, getPublicContact, getPublicProfile, getPublicEducation } from '../lib/api';
import { PROFILE_FALLBACK, EDUCATION_FALLBACK, CONTACT_FALLBACK } from '../data/fallbacks';
import '../styles/about.css';

const About = () => {
  const { t } = useI18n();
  const [techSkills, setTechSkills] = useState({});
  const [contactData, setContactData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [educationData, setEducationData] = useState([]);
  const softSkills = t('about.soft_skills').split(', ');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getPublicSkills();
        if (data.skills) {
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

    const fetchProfile = async () => {
      try {
        const data = await getPublicProfile();
        if (data.profile) {
          setProfileData(data.profile);
        }
      } catch (err) {
        console.warn('About: Failed to fetch profile settings:', err.message);
      }
    };

    const fetchEducation = async () => {
      try {
        const data = await getPublicEducation();
        if (data.education && data.education.length > 0) {
          setEducationData(data.education);
        }
      } catch (err) {
        console.warn('About: Failed to fetch education:', err.message);
      }
    };

    fetchSkills();
    fetchContact();
    fetchProfile();
    fetchEducation();
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

  const currentProfile = profileData || PROFILE_FALLBACK;
  const currentEducation = educationData.length > 0 ? educationData : EDUCATION_FALLBACK;
  const currentContact = contactData || CONTACT_FALLBACK;

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
          {currentProfile.aboutTitle}
        </motion.h2>
        
        <div className="about-grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 style={{ color: 'var(--primary-color)', marginBottom: 'var(--space-3)' }}>{currentProfile.summaryTitle}</h3>
            <p dangerouslySetInnerHTML={{ __html: currentProfile.summary }} className="about-summary"></p>
            
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
            {currentProfile.avatarUrl && (
              <motion.div className="card" whileHover={{ y: -5 }} style={{ padding: 0, overflow: 'hidden' }}>
                <img 
                  src={currentProfile.avatarUrl} 
                  alt="Profile Avatar" 
                  style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '300px', objectFit: 'cover' }} 
                />
              </motion.div>
            )}

            <motion.div className="card" whileHover={{ y: -5 }}>
              <h3 style={{ marginBottom: 'var(--space-4)' }}>Contact Info</h3>
              <div className="about-contact-card">
                <p><strong>Location:</strong> {currentContact.location}</p>
                <p><strong>Email:</strong> <a href={`mailto:${currentContact.email}`}>{currentContact.email}</a></p>
                <div className="about-cta-group">
                  <a href={currentContact.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary about-cta-btn">GitHub</a>
                  <a href={currentContact.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-secondary about-cta-btn">Instagram</a>
                  <a href={currentProfile.resumeUrl} download className="btn btn-primary about-cta-btn" style={{ flex: '1 0 auto' }}>Download CV</a>
                </div>
              </div>
            </motion.div>

            <motion.div className="card" whileHover={{ y: -5 }}>
              <h3 style={{ marginBottom: 'var(--space-3)' }}>{t('edu_cert.edu_title')}</h3>
              {currentEducation.map((edu) => (
                <div key={edu.id} style={{ marginBottom: 'var(--space-4)' }}>
                  <p><strong>{edu.school}</strong></p>
                  <p style={{ color: 'var(--primary-color)', fontSize: '0.9rem', fontWeight: 600 }}>{edu.degree}</p>
                  <p style={{ opacity: 0.8, fontSize: '0.85rem' }}>{edu.period}</p>
                  {edu.description && <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '4px' }}>{edu.description}</p>}
                </div>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;

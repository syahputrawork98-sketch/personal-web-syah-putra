import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getPublicSkills, getPublicContact, getPublicProfile, getPublicEducation } from '../lib/api';
import EmptyState from '../components/EmptyState';
import CredentialsSection from '../components/about/CredentialsSection';
import '../styles/about.css';

const About = () => {
  const [techSkills, setTechSkills] = useState({});
  const [contactData, setContactData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [educationData, setEducationData] = useState([]);
  const [softSkills, setSoftSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mapping for skill categories
  const categoryMap = {
    'frontend': 'Frontend',
    'backend': 'Backend',
    'database': 'Database',
    'tools': 'Tools & Deployment',
    'automation': 'Otomasi & Produktivitas',
    'others': 'Desain & Lainnya'
  };

  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const [skillsData, contactResp, profileResp, educationResp] = await Promise.all([
          getPublicSkills(),
          getPublicContact(),
          getPublicProfile(),
          getPublicEducation()
        ]);
        console.log('DEBUG: About Skills:', skillsData);
        console.log('DEBUG: About Contact:', contactResp);
        console.log('DEBUG: About Profile:', profileResp);
        console.log('DEBUG: About Education:', educationResp);

        if (skillsData) {
          const skillsArr = Array.isArray(skillsData) ? skillsData : (skillsData.skills || []);
          // Technical Skills (grouped by category)
          const grouped = skillsArr
            .filter(s => s.type === 'TECHNICAL' || !s.type)
            .reduce((acc, skill) => {
              const cat = skill.category || 'Other';
              if (!acc[cat]) acc[cat] = [];
              acc[cat].push(skill);
              return acc;
            }, {});
          setTechSkills(grouped);

          // Soft Skills
          const soft = skillsArr
            .filter(s => s.type === 'SOFT')
            .map(s => s.name);
          setSoftSkills(soft);
        }

        const extractData = (resp, key) => {
          if (!resp) return null;
          if (resp[key]) return resp[key];
          if (resp.data && resp.data[key]) return resp.data[key];
          if (resp && !resp.success && !resp.data) return resp; // Direct object
          return null;
        };

        setContactData(extractData(contactResp, 'contact'));
        setProfileData(extractData(profileResp, 'profile'));
        setEducationData(extractData(educationResp, 'education') || []);

      } catch (err) {
        console.warn('About: Failed to fetch data:', err.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  if (loading) {
    return (
      <section id="about" className="section-padding flex-center">
        <div className="container">
          <p style={{ opacity: 0.6, fontSize: '1rem', textAlign: 'center' }}>Memuat data profil...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="about" className="section-padding flex-center">
        <div className="container">
          <EmptyState message="Gagal memuat data profil." />
        </div>
      </section>
    );
  }

  if (!profileData) {
    return (
      <section id="about" className="section-padding flex-center">
        <div className="container">
          <EmptyState message="Data profil belum tersedia." />
        </div>
      </section>
    );
  }

  const currentProfile = profileData || {};
  const currentEducation = educationData;
  const currentContact = contactData || {};

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
          {currentProfile.aboutTitle || "Tentang Saya"}
        </motion.h2>
        
        <div className="about-grid-split" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 'var(--space-8)', marginBottom: 'var(--space-12)' }}>
          {/* Left Column: Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 style={{ color: 'var(--primary-color)', marginBottom: 'var(--space-4)', fontSize: '1.5rem' }}>
              {currentProfile.summaryTitle || "Professional Journey"}
            </h3>
            <div 
              dangerouslySetInnerHTML={{ __html: currentProfile.summary || "Data belum tersedia." }} 
              className="about-summary" 
              style={{ fontSize: '1.05rem', lineHeight: 1.8, opacity: 0.9 }}
            />
          </motion.div>

          {/* Right Column: Values & Soft Skills */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 style={{ color: 'var(--primary-color)', marginBottom: 'var(--space-4)', fontSize: '1.5rem' }}>
              {currentProfile.valuePropositionTitle || "Core Strengths"}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {currentProfile.valuePropositions ? currentProfile.valuePropositions.map((vp, idx) => (
                <div key={idx} className="card" style={{ padding: 'var(--space-4)', borderLeft: '3px solid var(--primary-color)' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: 'var(--space-1)', color: 'var(--text-primary)' }}>{vp.title}</h4>
                  <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>{vp.description}</p>
                </div>
              )) : (
                <div className="card" style={{ padding: 'var(--space-4)' }}>
                  <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Data keahlian pendukung belum tersedia.</p>
                </div>
              )}
              
              {softSkills.length > 0 && (
                <div style={{ marginTop: 'var(--space-4)' }}>
                  <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.6, marginBottom: 'var(--space-3)' }}>
                    Soft Skills
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                    {softSkills.map((skill, index) => (
                      <span key={index} className="tech-badge" style={{ fontSize: '0.7rem', padding: '4px 10px', background: 'var(--surface-color)', border: '1px solid var(--border-color)' }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Technical Skills & Sidebar */}
        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: 'var(--space-8)', alignItems: 'start' }}>
          {/* Left Column: Tech Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {Object.keys(techSkills).length > 0 && (
              <div>
                <h3 style={{ color: 'var(--primary-color)', marginBottom: 'var(--space-4)', fontSize: '1.5rem' }}>Keahlian Teknis</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-6)' }}>
                  {Object.entries(techSkills).map(([category, skills]) => (
                    <div key={category} className="skill-category-group">
                      <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.7, marginBottom: 'var(--space-3)', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                        {categoryMap[category.toLowerCase()] || category}
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
              </div>
            )}
          </motion.div>

          {/* Right Column: Sidebar */}
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
              <h3 style={{ marginBottom: 'var(--space-4)' }}>Informasi Kontak</h3>
              {Object.keys(currentContact).length > 0 ? (
                <div className="about-contact-card">
                  {currentContact.location && <p><strong>Lokasi:</strong> {currentContact.location}</p>}
                  {currentContact.email && <p><strong>Email:</strong> <a href={`mailto:${currentContact.email}`}>{currentContact.email}</a></p>}
                  <div className="about-cta-group">
                    {currentContact.github && <a href={currentContact.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary about-cta-btn">GitHub</a>}
                    {currentContact.instagram && <a href={currentContact.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-secondary about-cta-btn">Instagram</a>}
                    {currentProfile.resumeUrl && <a href={currentProfile.resumeUrl} download className="btn btn-primary about-cta-btn" style={{ flex: '1 0 auto' }}>Unduh CV</a>}
                  </div>
                </div>
              ) : (
                <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>Data belum tersedia.</p>
              )}
            </motion.div>

            <motion.div className="card" whileHover={{ y: -5 }}>
              <h3 style={{ marginBottom: 'var(--space-3)' }}>Pendidikan</h3>
              {currentEducation.length > 0 ? (
                currentEducation.map((edu) => (
                  <div key={edu.id} style={{ marginBottom: 'var(--space-4)' }}>
                    <p><strong>{edu.school}</strong></p>
                    <p style={{ color: 'var(--primary-color)', fontSize: '0.9rem', fontWeight: 600 }}>{edu.degree}</p>
                    <p style={{ opacity: 0.8, fontSize: '0.85rem' }}>{edu.period}</p>
                    {edu.description && <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '4px' }}>{edu.description}</p>}
                  </div>
                ))
              ) : (
                <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>Data belum tersedia.</p>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Credentials Section */}
        <div style={{ marginTop: 'var(--space-12)' }}>
          <CredentialsSection />
        </div>
      </motion.div>
    </section>
  );
};

export default About;

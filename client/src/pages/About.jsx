import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getPublicSkills, getPublicContact, getPublicProfile, getPublicEducation } from '../lib/api';
import EmptyState from '../components/EmptyState';
import CredentialsSection from '../components/about/CredentialsSection';
import TechSkillGroup from '../components/about/TechSkillGroup';
import ExperienceReframing from '../components/about/ExperienceReframing';
import EducationCard from '../components/about/EducationCard';
import '../styles/about.css';

const About = () => {
  const [techSkills, setTechSkills] = useState({});
  const [contactData, setContactData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [educationData, setEducationData] = useState([]);
  const [softSkills, setSoftSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mapping for skill categories

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
        
        {/* 1. Personal Summary Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 'var(--space-12)' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 'var(--space-8)', alignItems: 'center' }}>
            <div>
              <h3 style={{ color: 'var(--primary-color)', marginBottom: 'var(--space-4)', fontSize: '1.6rem' }}>
                {currentProfile.summaryTitle || "Perjalanan Profesional & Transisi"}
              </h3>
              <div 
                dangerouslySetInnerHTML={{ __html: currentProfile.summary || "Data belum tersedia." }} 
                className="about-summary" 
                style={{ fontSize: '1.1rem', lineHeight: 1.8, opacity: 0.9 }}
              />
            </div>
            {currentProfile.avatarUrl && (
              <div className="card" style={{ padding: 0, overflow: 'hidden', borderRadius: 'var(--radius-lg)' }}>
                <img 
                  src={currentProfile.avatarUrl} 
                  alt="Profile Avatar" 
                  style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '300px', objectFit: 'cover' }} 
                />
              </div>
            )}
          </div>
        </motion.div>

        {/* 2. Technical Focus Section (Penting: Penegas Identitas Developer) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ marginBottom: 'var(--space-12)', padding: 'var(--space-8)', background: 'rgba(var(--primary-color-rgb), 0.03)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}
        >
          <h3 style={{ color: 'var(--primary-color)', marginBottom: 'var(--space-6)', fontSize: '1.5rem', textAlign: 'center' }}>
            Technical Focus & Core Stack
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-8)' }}>
            {Object.entries(techSkills).map(([category, skills]) => (
              <TechSkillGroup key={category} category={category} skills={skills} />
            ))}
          </div>
        </motion.div>

        {/* 3. Education Section (Fondasi Akademis) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ marginBottom: 'var(--space-12)' }}
        >
          <h3 style={{ color: 'var(--primary-color)', marginBottom: 'var(--space-6)', fontSize: '1.5rem' }}>Pendidikan & Fondasi Dasar</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
            {currentEducation.length > 0 ? (
              currentEducation.map((edu) => (
                <EducationCard key={edu.id} {...edu} />
              ))
            ) : (
              <p style={{ opacity: 0.6 }}>Data pendidikan belum tersedia.</p>
            )}
          </div>
        </motion.div>

        {/* 4. Experience Reframing (The 8-Year IT Strength) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{ marginBottom: 'var(--space-12)' }}
        >
          <ExperienceReframing />
        </motion.div>

        {/* 5. Values & Strengths (Soft Skills) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ marginBottom: 'var(--space-12)' }}
        >
          <h3 style={{ color: 'var(--primary-color)', marginBottom: 'var(--space-6)', fontSize: '1.4rem' }}>Values & Strengths</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
            {softSkills.map((skill, index) => (
              <span key={index} className="tech-badge" style={{ padding: '8px 20px', borderRadius: 'var(--radius-full)', background: 'var(--surface-color)', border: '1px solid var(--border-color)', fontWeight: 600 }}>
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Credentials Section */}
        <div style={{ marginTop: 'var(--space-12)' }}>
          <CredentialsSection />
        </div>
      </motion.div>
    </section>
  );
};
export default About;

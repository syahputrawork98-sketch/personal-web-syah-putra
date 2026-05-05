import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getPublicExperiences } from '../lib/api';
import EmptyState from '../components/EmptyState';
import '../styles/experience.css';


const Experience = () => {
  const [experiences, setExperiences] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const expData = await getPublicExperiences();
        if (expData.experiences) setExperiences(expData.experiences);

      } catch (err) {
        console.warn('Experience: API Fetch failed:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      return date.toLocaleDateString('id-ID', {
        month: 'short',
        year: 'numeric'
      });
    } catch (e) {
      return '';
    }
  };

  const getDisplayDate = (exp) => {
    if (exp.isLocal) return exp.displayDate;
    const start = formatDate(exp.startDate);
    const end = exp.isCurrent ? 'Sekarang' : formatDate(exp.endDate);
    return `${start} ${start && end ? '–' : ''} ${end}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="experience" className="section-padding">
      <div className="container">
        <motion.div
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-8)' }}
        >
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            Pengalaman Kerja
          </motion.h2>
          {loading && <span style={{ opacity: 0.6, fontSize: '0.9rem' }}>Memuat data...</span>}
        </motion.div>
        
        {!loading && experiences.length === 0 ? (
          <EmptyState message="Data belum tersedia." />
        ) : (
          <motion.div 
            className="experience-list"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {experiences.map(exp => (
              <motion.div 
                key={exp.id} 
                className="card experience-card"
                variants={itemVariants}
                whileHover={{ x: 10, transition: { duration: 0.2 } }}
              >
                <div className="experience-header">
                  <h3 style={{ marginBottom: 0 }}>{exp.role}</h3>
                  <span className="experience-date">
                    {getDisplayDate(exp)}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-2)', fontSize: '0.9rem', opacity: 0.8, marginBottom: 'var(--space-2)' }}>
                  <p className="experience-company" style={{ margin: 0, fontWeight: 600 }}>{exp.company}</p>
                  {exp.location && <span>• {exp.location}</span>}
                  {exp.type && <span>• {exp.type}</span>}
                </div>
                <p className="experience-desc" style={{ marginBottom: exp.highlights?.length > 0 ? 'var(--space-3)' : 0 }}>{exp.description}</p>
                
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul style={{ fontSize: '0.9rem', opacity: 0.9, paddingLeft: '1.2rem', marginBottom: 'var(--space-4)' }}>
                    {exp.highlights.map((h, i) => <li key={i}>{h}</li>)}
                  </ul>
                )}

                {exp.techStack && exp.techStack.length > 0 && (
                  <div className="tech-badges" style={{ marginTop: 'auto' }}>
                    {exp.techStack.map((tech, idx) => (
                      <span key={idx} className="tech-badge" style={{ fontSize: '0.7rem' }}>{tech}</span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
        

      </div>
    </section>
  );
};

export default Experience;

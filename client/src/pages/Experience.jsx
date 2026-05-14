import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getPublicExperiences } from '../lib/api';
import EmptyState from '../components/EmptyState';
import ExperienceCard from '../components/experience/ExperienceCard';
import '../styles/experience.css';


const Experience = () => {
  const [experiences, setExperiences] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await getPublicExperiences();
        console.log('DEBUG: Experience Data received:', response);

        if (Array.isArray(response)) {
          setExperiences(response);
        } else if (response && response.experiences) {
          setExperiences(response.experiences);
        } else if (response && response.data && Array.isArray(response.data.experiences)) {
          setExperiences(response.data.experiences);
        }
      } catch (err) {
        console.error('Experience Fetch Error:', err);
        setError(true);
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
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  return (
    <section id="experience" className="section-padding">
      <div className="container">
        <motion.div
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-8)' }}
        >
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Pengalaman Kerja
          </motion.h2>
          {loading && <span style={{ opacity: 0.6, fontSize: '0.9rem' }}>Memuat data...</span>}
        </motion.div>
        
        {loading && <p style={{ opacity: 0.6, fontSize: '1rem', textAlign: 'center' }}>Memuat data pengalaman...</p>}
        {error && !loading && <EmptyState message="Gagal memuat data pengalaman." />}
        {!loading && !error && experiences.length === 0 ? (
          <EmptyState message="Data pengalaman belum tersedia." />
        ) : (
          <motion.div 
            className="experience-list"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {experiences.map(exp => (
              <ExperienceCard 
                key={exp.id} 
                exp={exp} 
                displayDate={getDisplayDate(exp)} 
                variants={itemVariants} 
              />
            ))}
          </motion.div>
        )}
        

      </div>
    </section>
  );
};

export default Experience;

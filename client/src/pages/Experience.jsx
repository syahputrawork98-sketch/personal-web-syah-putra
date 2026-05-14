import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getPublicExperiences } from '../lib/api';
import EmptyState from '../components/EmptyState';
import { useFetch } from '../hooks/useFetch';
import ExperienceCard from '../components/experience/ExperienceCard';
import { getExperienceDisplayDate } from '../lib/dateUtils';
import '../styles/experience.css';


const Experience = () => {
  const { data: response, loading, error } = useFetch(getPublicExperiences);
  const experiences = Array.isArray(response) 
    ? response 
    : (response?.experiences || response?.data?.experiences || []);



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
                displayDate={getExperienceDisplayDate(exp)} 
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

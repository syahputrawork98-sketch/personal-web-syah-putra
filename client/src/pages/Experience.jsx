import React from 'react';
import { motion } from 'framer-motion';
import { getPublicExperiences } from '../lib/api';
import EmptyState from '../components/EmptyState';
import { useFetch } from '../hooks/useFetch';
import ExperienceCard from '../components/experience/ExperienceCard';
import { getExperienceDisplayDate } from '../lib/dateUtils';

import '../styles/experience.css';

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

const SECTIONS = [
  {
    key: 'IT_FREELANCE',
    title: '💻 Freelance Full Stack / IT Work',
    subtitle: 'Proyek dan klien di bidang pengembangan web & teknologi',
  },
  {
    key: 'FORMAL_WORK',
    title: '🏢 Formal Work Experience',
    subtitle: 'Pengalaman kerja tetap dan kontrak resmi',
  },
  {
    key: 'GENERAL_FREELANCE',
    title: '🛠️ Other Freelance Experience',
    subtitle: 'Pengalaman freelance di luar bidang IT',
  },
];

const Experience = () => {
  const { data: response, loading, error } = useFetch(getPublicExperiences);
  const experiences = (Array.isArray(response)
    ? response
    : (response?.experiences || response?.data?.experiences)) || [];

  // Group by experienceKind, fallback to FORMAL_WORK
  const grouped = {};
  experiences.forEach(exp => {
    const kind = exp.experienceKind || 'FORMAL_WORK';
    if (!grouped[kind]) grouped[kind] = [];
    grouped[kind].push(exp);
  });

  // Only sections with at least one item
  const visibleSections = SECTIONS.filter(s => grouped[s.key] && grouped[s.key].length > 0);

  return (
    <section id="experience" className="section-padding">
      <div className="container">
        <motion.div className="experience-section-header">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Pengalaman Kerja
          </motion.h2>
          {loading && <span style={{ opacity: 0.6, fontSize: '0.9rem' }}>Memuat data...</span>}
        </motion.div>

        {loading && <p style={{ opacity: 0.6, fontSize: '1rem', textAlign: 'center' }}>Memuat data pengalaman...</p>}

        {!loading && !error && experiences.length === 0 && (
          <EmptyState message="Data pengalaman belum tersedia." />
        )}

        {!loading && !error && experiences.length > 0 && (
          <>
            {visibleSections.map((section, sIdx) => (
              <div key={section.key} style={{ marginBottom: sIdx < visibleSections.length - 1 ? 'var(--space-10, 2.5rem)' : 0 }}>
                {/* Section Header */}
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: sIdx * 0.1 }}
                  style={{ marginBottom: 'var(--space-4, 1rem)' }}
                >
                  <h3 style={{
                    fontSize: '1.15rem',
                    fontWeight: '700',
                    margin: 0,
                    marginBottom: '4px',
                    color: 'var(--text-color)',
                  }}>
                    {section.title}
                  </h3>
                  {section.subtitle && (
                    <p style={{
                      fontSize: '0.85rem',
                      opacity: 0.6,
                      margin: 0,
                    }}>
                      {section.subtitle}
                    </p>
                  )}
                  <div style={{
                    marginTop: '10px',
                    height: '2px',
                    width: '48px',
                    borderRadius: '2px',
                    backgroundColor: section.key === 'IT_FREELANCE'
                      ? '#6366f1'
                      : section.key === 'GENERAL_FREELANCE'
                        ? '#f59e0b'
                        : '#22c55e',
                  }} />
                </motion.div>

                {/* Experience Cards */}
                <motion.div
                  className="experience-list"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {grouped[section.key].map(exp => (
                    <ExperienceCard
                      key={exp.id}
                      exp={exp}
                      displayDate={getExperienceDisplayDate(exp)}
                      variants={itemVariants}
                    />
                  ))}
                </motion.div>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Experience;

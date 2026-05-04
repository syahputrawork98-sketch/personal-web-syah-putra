import React, { useState, useEffect } from 'react';
import { useI18n } from '../layouts/MainLayout';
import { motion } from 'framer-motion';
import { getPublicExperiences } from '../lib/api';
import '../styles/experience.css';

const Experience = () => {
  const { t, lang } = useI18n();
  const [experiences, setExperiences] = useState([]);
  const [dataSource, setDataSource] = useState('loading'); // 'loading', 'api', 'fallback'
  const [loading, setLoading] = useState(true);
  const certs = [1, 2, 3, 4, 5, 6, 7];

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const data = await getPublicExperiences();
        
        if (data.experiences) {
          setExperiences(data.experiences);
          setDataSource('api');
        } else {
          console.warn('API success but no experiences array, using fallback.');
          useFallback();
        }
      } catch (err) {
        console.warn('API Fetch failed, using local fallback:', err.message);
        useFallback();
      } finally {
        setLoading(false);
      }
    };

    const useFallback = () => {
      const fallbackData = [1, 2, 3, 4, 5].map(id => ({
        id: `local-exp-${id}`,
        role: t(`experience.exp${id}.role`),
        company: t(`experience.exp${id}.company`),
        description: t(`experience.exp${id}.desc`),
        displayDate: t(`experience.exp${id}.date`),
        isLocal: true
      }));
      setExperiences(fallbackData);
      setDataSource('fallback');
    };

    fetchExperiences();
  }, [t]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      return date.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
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
    const end = exp.isCurrent ? (lang === 'id' ? 'Sekarang' : 'Present') : formatDate(exp.endDate);
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
            {t('experience.title')}
          </motion.h2>
          {loading && <span style={{ opacity: 0.6, fontSize: '0.9rem' }}>Loading experiences...</span>}
          {dataSource === 'fallback' && !loading && <span style={{ opacity: 0.4, fontSize: '0.7rem' }}>Note: Showing local data</span>}
        </motion.div>
        
        {!loading && experiences.length === 0 && dataSource === 'api' ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-12)', opacity: 0.6 }}>
            <p>No experience published yet.</p>
          </div>
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
        
        <motion.h2 
          style={{ marginTop: 'var(--space-12)', marginBottom: 'var(--space-8)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {t('edu_cert.cert_title')}
        </motion.h2>
        
        <motion.div 
          className="certs-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {certs.map(id => (
            <motion.div 
              key={id} 
              className="cert-item"
              variants={itemVariants}
              whileHover={{ scale: 1.02, color: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}
            >
              {t(`edu_cert.cert${id}`)}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;

import React, { useState, useEffect } from 'react';
import { useI18n } from '../layouts/MainLayout';
import { motion } from 'framer-motion';
import { getPublicExperiences, getPublicCertifications } from '../lib/api';
import { EXPERIENCE_FALLBACK } from '../data/fallbacks';
import '../styles/experience.css';

const Experience = () => {
  const { t, lang } = useI18n();
  const [experiences, setExperiences] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [dataSource, setDataSource] = useState('loading'); // 'loading', 'api', 'fallback'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [expData, certData] = await Promise.all([
          getPublicExperiences(),
          getPublicCertifications()
        ]);
        
        let hasApiData = false;

        if (expData.experiences && expData.experiences.length > 0) {
          setExperiences(expData.experiences);
          hasApiData = true;
        }

        if (certData.certifications && certData.certifications.length > 0) {
          setCertifications(certData.certifications);
          hasApiData = true;
        }

        if (hasApiData) {
          setDataSource('api');
        } else {
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
      // Map local fallback to match API structure
      const fallbackExps = EXPERIENCE_FALLBACK.map(exp => ({
        ...exp,
        displayDate: exp.period,
        isLocal: true
      }));

      // Simplified certs fallback
      const fallbackCerts = [1, 2, 3, 4, 5].map(id => ({
        id: `local-cert-${id}`,
        title: `Certification ${id} (Setup in Admin CMS)`,
        isLocal: true
      }));

      setExperiences(fallbackExps);
      setCertifications(fallbackCerts);
      setDataSource('fallback');
    };

    fetchData();
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
          {certifications.map(cert => (
            <motion.div 
              key={cert.id} 
              className="cert-item"
              variants={itemVariants}
              whileHover={{ scale: 1.02, color: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: 'auto', textAlign: 'left' }}
            >
              <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '2px' }}>{cert.title}</div>
              {cert.issuer && (
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                  {cert.issuer} {cert.issuedAt && `• ${new Date(cert.issuedAt).getFullYear()}`}
                </div>
              )}
              {cert.credentialUrl && (
                <a 
                  href={cert.credentialUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ fontSize: '0.7rem', color: 'var(--primary-color)', marginTop: '8px', textDecoration: 'none', borderBottom: '1px solid transparent' }}
                  onMouseOver={e => e.target.style.borderBottom = '1px solid var(--primary-color)'}
                  onMouseOut={e => e.target.style.borderBottom = '1px solid transparent'}
                >
                  View Credential &rarr;
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;

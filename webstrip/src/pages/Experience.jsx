import React from 'react';
import { useI18n } from '../layouts/MainLayout';
import { motion } from 'framer-motion';
import '../styles/experience.css';

const Experience = () => {
  const { t } = useI18n();
  const experiences = [1, 2, 3, 4, 5];
  const certs = [1, 2, 3, 4, 5, 6, 7];

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
        <motion.h2 
          style={{ marginBottom: 'var(--space-8)' }}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          {t('experience.title')}
        </motion.h2>
        
        <motion.div 
          className="experience-list"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {experiences.map(id => (
            <motion.div 
              key={id} 
              className="card experience-card"
              variants={itemVariants}
              whileHover={{ x: 10, transition: { duration: 0.2 } }}
            >
              <div className="experience-header">
                <h3 style={{ marginBottom: 0 }}>{t(`experience.exp${id}.role`)}</h3>
                <span className="experience-date">
                  {t(`experience.exp${id}.date`)}
                </span>
              </div>
              <p className="experience-company">{t(`experience.exp${id}.company`)}</p>
              <p className="experience-desc">{t(`experience.exp${id}.desc`)}</p>
            </motion.div>
          ))}
        </motion.div>
        
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

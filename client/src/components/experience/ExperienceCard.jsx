import React from 'react';
import { motion } from 'framer-motion';

const ExperienceCard = ({ exp, displayDate, variants }) => {
  return (
    <motion.div 
      className="card experience-card"
      variants={variants}
      whileHover={{ x: 10, transition: { duration: 0.2 } }}
    >
      <div className="experience-header">
        <h3 style={{ marginBottom: 0 }}>{exp.role}</h3>
        <span className="experience-date">
          {displayDate}
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
  );
};

export default ExperienceCard;

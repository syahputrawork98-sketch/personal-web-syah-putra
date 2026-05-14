import React from 'react';
import { categoryMap } from '../../data/aboutData';

const TechSkillGroup = ({ category, skills }) => {
  return (
    <div key={category}>
      <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1.5px', opacity: 0.6, marginBottom: 'var(--space-4)', borderBottom: '2px solid var(--primary-color)', display: 'inline-block', paddingBottom: '4px' }}>
        {categoryMap[category.toLowerCase()] || category}
      </h4>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        {skills.map(skill => (
          <span key={skill.id} className="tech-badge" style={{ fontSize: '0.8rem', padding: '6px 12px', fontWeight: 600 }}>
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechSkillGroup;

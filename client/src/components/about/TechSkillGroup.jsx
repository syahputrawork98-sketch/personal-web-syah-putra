import React from 'react';
import { categoryMap } from '../../data/aboutData';
import { getSkillIcon } from '../../utils/skillIcons';

const TechSkillGroup = ({ category, skills }) => {
  return (
    <div key={category}>
      <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1.5px', opacity: 0.6, marginBottom: 'var(--space-4)', borderBottom: '2px solid var(--primary-color)', display: 'inline-block', paddingBottom: '4px' }}>
        {categoryMap[category.toLowerCase()] || category}
      </h4>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        {skills.map(skill => (
          <span 
            key={skill.id} 
            className="tech-badge" 
            style={{ 
              fontSize: '0.85rem', 
              padding: '6px 14px', 
              fontWeight: 600, 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              backgroundColor: 'var(--surface-color)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-full)'
            }}
          >
            {skill.icon && skill.icon.startsWith('http') ? (
              <img src={skill.icon} alt={skill.name} style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
            ) : (
              getSkillIcon(skill.name)
            )}
            <span>{skill.name}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechSkillGroup;

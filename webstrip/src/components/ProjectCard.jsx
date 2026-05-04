import React from 'react';
import { useI18n } from '../layouts/MainLayout';
import '../styles/projects.css';

const ProjectCard = ({ project, onToggleExpand, isExpanded }) => {
  const { t, lang } = useI18n();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Production': return '#10B981';
      case 'Prototype': return '#F59E0B';
      case 'In Progress': return '#3B82F6';
      case 'Internal': return '#6366F1';
      default: return 'var(--primary-color)';
    }
  };

  // Helper to get translated content from the project object
  const getContent = (field) => {
    if (!project[field]) return '';
    return project[field][lang] || project[field]['en'] || project[field]['id'] || '';
  };

  return (
    <div className="card project-card">
      {/* Project Image */}
      <div className="project-image-container">
        <img 
          src={project.imageUrl || 'https://via.placeholder.com/600x400?text=Project+Thumbnail'} 
          alt={getContent('title')}
          className="project-image"
        />
        <div 
          className="project-status-badge"
          style={{ color: getStatusColor(project.status), border: `1px solid ${getStatusColor(project.status)}` }}
        >
          {project.status}
        </div>
      </div>

      {/* Project Content */}
      <div className="project-content">
        <div style={{ marginBottom: 'var(--space-3)' }}>
          <p className="project-role">{project.role}</p>
          <h3 style={{ marginBottom: 'var(--space-2)' }}>{getContent('title')}</h3>
          <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: 'var(--space-4)' }}>{getContent('shortDescription')}</p>
        </div>

        {/* Tech Stack Badges */}
        <div className="tech-badges">
          {project.techStack.map((tech, idx) => (
            <span key={idx} className="tech-badge">
              {tech}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="project-actions" style={{ marginTop: 'auto' }}>
          <button 
            onClick={() => onToggleExpand(project.id)}
            className="btn btn-secondary" 
            style={{ padding: '8px 16px', fontSize: '0.85rem', flex: 1 }}
          >
            {isExpanded ? (lang === 'id' ? 'Tutup Detail' : 'Hide Details') : (lang === 'id' ? 'Lihat Detail' : 'Case Study')}
          </button>
          
          {project.demoUrl && (
            <a 
              href={project.demoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary" 
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              Demo
            </a>
          )}
          
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary" 
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              GitHub
            </a>
          )}
        </div>
      </div>

      {/* Expandable Details Section */}
      {isExpanded && (
        <div className="project-details">
          <div className="detail-item">
            <div>
              <p className="detail-label">{t('projects.challenge_label')}</p>
              <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>{getContent('challenge')}</p>
            </div>
            <div>
              <p className="detail-label">{t('projects.solution_label')}</p>
              <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>{getContent('solution')}</p>
            </div>
            <div>
              <p className="detail-label">{t('projects.impact_label')}</p>
              <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>{getContent('impact')}</p>
            </div>
            <div>
              <p className="detail-label">{t('projects.features_label')}</p>
              <ul style={{ fontSize: '0.9rem', opacity: 0.9, paddingLeft: '1.2rem', margin: '4px 0 0' }}>
                {(getContent('features') || []).map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;

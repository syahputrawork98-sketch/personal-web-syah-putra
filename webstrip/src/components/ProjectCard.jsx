import React from 'react';
import { useI18n } from '../layouts/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
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

  const getContent = (field) => {
    const data = project[field];
    if (!data) return '';
    // Handle string directly (common from API)
    if (typeof data === 'string') return data;
    // Handle object (common from localProjects/multilang)
    return data[lang] || data['en'] || data['id'] || '';
  };

  // Safe mapping for varied data sources (API vs Local)
  const title = getContent('title');
  const subtitle = getContent('subtitle') || getContent('shortDescription') || "";
  const description = getContent('description') || getContent('desc') || getContent('shortDescription') || "";
  const techStack = project.techStack || project.technologies || [];
  const githubUrl = project.githubUrl || project.github || "";
  const demoUrl = project.demoUrl || project.demo || project.liveUrl || "";


  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div 
      className="card project-card"
      variants={cardVariants}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      {/* Project Image */}
      <div className="project-image-container">
        <img 
          src={project.imageUrl || 'https://via.placeholder.com/600x400?text=Project+Thumbnail'} 
          alt={title}
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
          <h3 style={{ marginBottom: 'var(--space-2)' }}>{title}</h3>
          <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: 'var(--space-4)' }}>{subtitle}</p>
        </div>

        {/* Tech Stack Badges */}
        <div className="tech-badges">
          {techStack.map((tech, idx) => (
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
          
          {demoUrl && (
            <a 
              href={demoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary" 
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              Demo
            </a>
          )}
          
          {githubUrl && (
            <a 
              href={githubUrl} 
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
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            className="project-details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ overflow: 'hidden' }}
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectCard;

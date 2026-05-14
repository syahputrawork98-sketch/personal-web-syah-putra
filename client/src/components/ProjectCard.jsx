import React from 'react';
import { motion } from 'framer-motion';
import '../styles/projects.css';

const ProjectCard = ({ project, onClick }) => {

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
    if (typeof data === 'string') return data;
    if (Array.isArray(data)) return data;
    return data['id'] || data['en'] || '';
  };

  const title = getContent('title');
  const subtitle = getContent('subtitle') || getContent('shortDescription') || "";
  const techStack = project.techStack || project.technologies || [];
  
  const links = project.links || {};
  const githubUrl = links.github || project.githubUrl || project.github || "";
  const demoUrl = links.demo || project.demoUrl || project.demo || project.liveUrl || "";


  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div 
      className="card project-card"
      variants={cardVariants}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Project Image */}
      <div className="project-image-container">
        <img 
          src={project.imageUrl || 'https://via.placeholder.com/600x400?text=Project+Thumbnail'} 
          alt={title}
          className="project-image"
        />
        <div className="project-badges-top">
          <span className="category-badge">{project.category || "General"}</span>
          {project.status && (
            <span 
              className="project-status-badge"
              style={{ color: getStatusColor(project.status), border: `1px solid ${getStatusColor(project.status)}` }}
            >
              {project.status}
            </span>
          )}
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
          {techStack.slice(0, 4).map((tech, idx) => (
            <span key={idx} className="tech-badge">
              {tech}
            </span>
          ))}
          {techStack.length > 4 && (
            <span className="tech-badge">+{techStack.length - 4}</span>
          )}
        </div>

        {/* Buttons */}
        <div className="project-actions" style={{ marginTop: 'auto' }}>
          <button 
            className="btn btn-primary" 
            style={{ width: '100%', fontSize: '0.85rem' }}
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            Lihat Detail Proyek
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

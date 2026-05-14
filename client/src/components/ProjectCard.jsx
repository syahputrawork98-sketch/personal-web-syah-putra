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

  const title = project.title || "";
  const subtitle = project.subtitle || project.shortDescription || "";
  const techStack = project.techStack || project.technologies || [];
  
  const links = project.links || {};
  const quickLinks = [
    { key: 'demo', icon: '🌐', url: links.demo || project.demoUrl || project.demo || project.liveUrl },
    { key: 'github', icon: '💻', url: links.github || project.githubUrl || project.github },
    { key: 'figma', icon: '🎨', url: links.figma },
    { key: 'drive', icon: '📂', url: links.drive || links.googleDrive },
    { key: 'rab', icon: '📊', url: links.rab },
    { key: 'model', icon: '🏗️', url: links.model || links.modelPreview },
  ].filter(link => link.url);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div 
      className="project-card"
      variants={cardVariants}
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
        <div className="project-image-overlay" style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), transparent 50%, rgba(0,0,0,0.4))',
          zIndex: 1
        }} />
        <div className="project-badges-top">
          <span className="category-badge">{project.category || "General"}</span>
          {project.status && (
            <span 
              className="project-status-badge"
              style={{ 
                backgroundColor: getStatusColor(project.status)
              }}
            >
              {project.status}
            </span>
          )}
        </div>
      </div>

      {/* Project Content */}
      <div className="project-content">
        <div style={{ marginBottom: 'var(--space-3)' }}>
          <p className="project-role">{project.role || "Project"}</p>
          <h3>{title}</h3>
          <p style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: 1.4, marginBottom: 'var(--space-4)' }}>
            {subtitle.length > 80 ? subtitle.substring(0, 80) + "..." : subtitle}
          </p>
        </div>

        {/* Tech Stack Badges */}
        <div className="tech-badges">
          {techStack.slice(0, 3).map((tech, idx) => (
            <span key={idx} className="tech-badge">
              {tech}
            </span>
          ))}
          {techStack.length > 3 && (
            <span className="tech-badge">+{techStack.length - 3}</span>
          )}
        </div>

        {/* Actions Container */}
        <div className="project-actions">
          <button 
            className="btn btn-primary" 
            style={{ width: '100%', fontSize: '0.8rem', padding: '8px 0' }}
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            Detail Proyek
          </button>

          {/* Quick Links Row */}
          {quickLinks.length > 0 && (
            <div className="project-quick-links">
              {quickLinks.map(link => (
                <a 
                  key={link.key}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="quick-link-btn"
                  title={link.key.toUpperCase()}
                  onClick={(e) => e.stopPropagation()}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

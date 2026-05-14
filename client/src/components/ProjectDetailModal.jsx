import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectDetailModal = ({ isOpen, onClose, project }) => {
  if (!project) return null;

  const links = project.links || {};
  const techStack = project.techStack || project.technologies || [];

  const linkTiles = [
    { key: 'demo', label: 'Demo / Live', icon: '🌐', url: links.demo || project.demoUrl || project.demo || project.liveUrl },
    { key: 'github', label: 'GitHub', icon: '💻', url: links.github || project.githubUrl || project.github },
    { key: 'figma', label: 'Figma', icon: '🎨', url: links.figma },
    { key: 'drive', label: 'Google Drive', icon: '📂', url: links.drive || links.googleDrive },
    { key: 'rab', label: 'RAB / Estimasi', icon: '📊', url: links.rab },
    { key: 'model', label: 'Model Preview', icon: '🏗️', url: links.model || links.modelPreview },
  ].filter(tile => tile.url);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="modal-overlay" 
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000,
            padding: 'var(--space-4)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <motion.div 
            className="modal-content card"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '900px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: 0,
              position: 'relative',
              border: '1px solid rgba(var(--primary-color-rgb), 0.2)'
            }}
          >
            <button 
              className="modal-close"
              onClick={onClose}
              aria-label="Tutup detail proyek"
              style={{
                position: 'absolute',
                top: 'var(--space-4)',
                right: 'var(--space-4)',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid var(--border-color)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                cursor: 'pointer',
                color: 'white',
                zIndex: 10
              }}
            >
              &times;
            </button>

            {/* Header Image */}
            <div style={{ width: '100%', height: '300px', overflow: 'hidden' }}>
              <img 
                src={project.imageUrl || 'https://via.placeholder.com/1200x600?text=Project+Detail'} 
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ padding: 'var(--space-8)' }}>
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <span className="category-badge" style={{ marginBottom: 'var(--space-2)', display: 'inline-block' }}>
                  {project.category}
                </span>
                <h2 style={{ fontSize: '2rem', marginBottom: 'var(--space-2)' }}>{project.title}</h2>
                <p style={{ fontSize: '1.1rem', opacity: 0.8, color: 'var(--primary-color)', fontWeight: 600 }}>
                  {project.subtitle || project.shortDescription}
                </p>
              </div>

              <div className="modal-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-8)' }}>
                {/* Left Column: Info */}
                <div>
                  <div style={{ marginBottom: 'var(--space-6)' }}>
                    <h4 className="detail-label">Ringkasan Proyek</h4>
                    <p style={{ lineHeight: 1.7, opacity: 0.9 }}>{project.description}</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                    <div>
                      <h4 className="detail-label">Peran</h4>
                      <p style={{ fontSize: '0.95rem' }}>{project.role || 'Contributor'}</p>
                    </div>
                    <div>
                      <h4 className="detail-label">Status</h4>
                      <p style={{ fontSize: '0.95rem' }}>{project.status || 'Completed'}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="detail-label">Teknologi & Tools</h4>
                    <div className="tech-badges">
                      {techStack.map((tech, i) => (
                        <span key={i} className="tech-badge">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Challenges & Links */}
                <div>
                  {project.challenge && (
                    <div style={{ marginBottom: 'var(--space-6)' }}>
                      <h4 className="detail-label">Tantangan</h4>
                      <p style={{ fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.8 }}>{project.challenge}</p>
                    </div>
                  )}
                  {project.solution && (
                    <div style={{ marginBottom: 'var(--space-6)' }}>
                      <h4 className="detail-label">Solusi</h4>
                      <p style={{ fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.8 }}>{project.solution}</p>
                    </div>
                  )}

                  {linkTiles.length > 0 && (
                    <div>
                      <h4 className="detail-label" style={{ marginBottom: 'var(--space-3)' }}>Aset & Tautan</h4>
                      <div className="link-tiles-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {linkTiles.map(tile => (
                          <a 
                            key={tile.key}
                            href={tile.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-tile"
                          >
                            <span className="link-tile-icon">{tile.icon}</span>
                            <span className="link-tile-label">{tile.label}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {project.features && project.features.length > 0 && (
                <div style={{ marginTop: 'var(--space-8)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--border-color)' }}>
                  <h4 className="detail-label">Fitur Utama</h4>
                  <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-2)', paddingLeft: '1.2rem' }}>
                    {project.features.map((feature, i) => (
                      <li key={i} style={{ fontSize: '0.9rem', opacity: 0.8 }}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectDetailModal = ({ isOpen, onClose, project }) => {
  if (!project) return null;

  const links = project.links || {};
  const techStack = project.techStack || project.technologies || [];

  const isValidUrl = (url) => {
    if (!url || typeof url !== 'string') return false;
    const cleanUrl = url.trim().toLowerCase();
    if (cleanUrl === '' || 
        cleanUrl === '#' || 
        cleanUrl === '-' || 
        cleanUrl === 'coming soon' || 
        cleanUrl === 'todo' || 
        cleanUrl === 'placeholder' ||
        cleanUrl === 'null' ||
        cleanUrl === 'undefined') {
      return false;
    }
    return true;
  };

  const linkTiles = [
    { key: 'demo', label: 'Demo / Live', icon: '🌐', url: links.demo || project.demoUrl || project.demo || project.liveUrl },
    { key: 'github', label: 'GitHub', icon: '💻', url: links.github || project.githubUrl || project.github },
    { key: 'figma', label: 'Figma', icon: '🎨', url: links.figma },
    { key: 'drive', label: 'Google Drive', icon: '📂', url: links.drive || links.googleDrive },
    { key: 'rab', label: 'RAB / Estimasi', icon: '📊', url: links.rab },
    { key: 'model', label: 'Model Preview', icon: '🏗️', url: links.model || links.modelPreview },
  ].filter(tile => isValidUrl(tile.url));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="project-modal-overlay" onClick={onClose}>
          <motion.div 
            className="project-modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="project-modal-close"
              onClick={onClose}
              aria-label="Tutup detail proyek"
            >
              &times;
            </button>

            {/* Header Image */}
            <div style={{ width: '100%', height: '350px', overflow: 'hidden', position: 'relative' }}>
              <img 
                src={project.imageUrl || 'https://via.placeholder.com/1200x600?text=Project+Detail'} 
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ 
                position: 'absolute', 
                bottom: 0, left: 0, right: 0, 
                height: '50%', 
                background: 'linear-gradient(to top, var(--background-color), transparent)',
                zIndex: 1
              }} />
            </div>

            <div style={{ padding: 'var(--space-10)', marginTop: '-var(--space-12)', position: 'relative', zIndex: 2 }}>
              <div style={{ marginBottom: 'var(--space-8)' }}>
                <span className="category-badge" style={{ marginBottom: 'var(--space-3)', display: 'inline-block' }}>
                  {project.category}
                </span>
                <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-2)', fontWeight: 800 }}>{project.title}</h2>
                <p style={{ fontSize: '1.25rem', opacity: 0.9, color: 'var(--primary-color)', fontWeight: 700, letterSpacing: '0.5px' }}>
                  {project.subtitle || project.shortDescription}
                </p>
              </div>

              <div className="project-modal-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-10)' }}>
                {/* Left Column: Info */}
                <div>
                  <div style={{ marginBottom: 'var(--space-8)' }}>
                    <h4 className="detail-label">Ringkasan Proyek</h4>
                    <p style={{ lineHeight: 1.8, opacity: 0.9, fontSize: '1.05rem' }}>
                      {project.description || 'Detail deskripsi proyek belum tersedia.'}
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
                    <div>
                      <h4 className="detail-label">Peran</h4>
                      <p style={{ fontSize: '1rem', fontWeight: 600 }}>{project.role || 'Contributor'}</p>
                    </div>
                    <div>
                      <h4 className="detail-label">Status</h4>
                      <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary-color)' }}>{project.status || 'Completed'}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="detail-label">Teknologi & Tools</h4>
                    <div className="tech-badges">
                      {techStack.map((tech, i) => (
                        <span key={i} className="tech-badge" style={{ fontSize: '0.75rem', padding: '4px 12px' }}>{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Challenges & Links */}
                <div>
                  {(project.challenge || project.solution) && (
                    <div style={{ padding: 'var(--space-6)', background: 'rgba(var(--primary-color-rgb), 0.03)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', marginBottom: 'var(--space-8)' }}>
                      {project.challenge && (
                        <div style={{ marginBottom: 'var(--space-6)' }}>
                          <h4 className="detail-label">Tantangan</h4>
                          <p style={{ fontSize: '0.95rem', lineHeight: 1.7, opacity: 0.85 }}>{project.challenge}</p>
                        </div>
                      )}
                      {project.solution && (
                        <div>
                          <h4 className="detail-label">Solusi</h4>
                          <p style={{ fontSize: '0.95rem', lineHeight: 1.7, opacity: 0.85 }}>{project.solution}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {linkTiles.length > 0 ? (
                    <div>
                      <h4 className="detail-label" style={{ marginBottom: 'var(--space-4)' }}>Aset & Tautan Terkait</h4>
                      <div className="project-link-tiles-grid">
                        {linkTiles.map(tile => (
                          <a 
                            key={tile.key}
                            href={tile.url.trim()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link-tile"
                          >
                            <span className="project-link-tile-icon">{tile.icon}</span>
                            <span className="project-link-tile-label">{tile.label}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="detail-label" style={{ marginBottom: 'var(--space-4)' }}>Aset & Tautan Terkait</h4>
                      <div style={{ padding: 'var(--space-4)', background: 'rgba(var(--primary-color-rgb), 0.03)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-color)', textAlign: 'center' }}>
                        <p style={{ fontSize: '0.85rem', opacity: 0.6, margin: 0, fontStyle: 'italic' }}>Aset belum tersedia</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {project.features && project.features.length > 0 && (
                <div style={{ marginTop: 'var(--space-10)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--border-color)' }}>
                  <h4 className="detail-label" style={{ marginBottom: 'var(--space-6)' }}>Fitur Utama Proyek</h4>
                  <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-4)', paddingLeft: '1.2rem' }}>
                    {project.features.map((feature, i) => (
                      <li key={i} style={{ fontSize: '0.95rem', opacity: 0.85, lineHeight: 1.6 }}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project.impact && (
                <div style={{ marginTop: 'var(--space-8)', padding: 'var(--space-6)', background: 'rgba(var(--primary-color-rgb), 0.05)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                  <h4 className="detail-label" style={{ justifyContent: 'center' }}>Dampak & Hasil</h4>
                  <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{project.impact}</p>
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

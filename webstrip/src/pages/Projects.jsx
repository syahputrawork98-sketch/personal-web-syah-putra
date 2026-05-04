import React, { useState } from 'react';
import { useI18n } from '../layouts/MainLayout';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
  const { t } = useI18n();
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Sort projects by orderIndex
  const sortedProjects = [...projects].sort((a, b) => a.orderIndex - b.orderIndex);
  
  const featuredProjects = sortedProjects.filter(p => p.featured);
  const otherProjects = sortedProjects.filter(p => !p.featured);

  return (
    <section id="projects" className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <h2 className="text-center">{t('projects.title')}</h2>
        </div>

        {/* Featured Projects Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: 'var(--space-8)',
          marginBottom: featuredProjects.length > 0 ? 'var(--space-12)' : 0
        }}>
          {featuredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              isExpanded={expandedId === project.id}
              onToggleExpand={toggleExpand}
            />
          ))}
        </div>

        {/* Section Divider if there are other projects */}
        {otherProjects.length > 0 && (
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <h3 style={{ opacity: 0.6, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-4)' }}>
              {t('projects.title_other') || 'Other Projects'}
            </h3>
          </div>
        )}

        {/* Other Projects Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: 'var(--space-6)' 
        }}>
          {otherProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              isExpanded={expandedId === project.id}
              onToggleExpand={toggleExpand}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

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

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <h2 className="text-center">{t('projects.title')}</h2>
        </div>

        {/* Featured Projects Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: 'var(--space-6)',
          marginBottom: 'var(--space-8)' 
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

        {/* Other Projects Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: 'var(--space-4)' 
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

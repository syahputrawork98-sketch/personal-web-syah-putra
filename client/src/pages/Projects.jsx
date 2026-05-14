import React, { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';
import { getPublicProjects } from '../lib/api';
import EmptyState from '../components/EmptyState';
import { useFetch } from '../hooks/useFetch';
import { projectsFallback } from '../fallback/projectsFallback';


const Projects = () => {
  const { data, loading, error } = useFetch(getPublicProjects);
  const [expandedId, setExpandedId] = useState(null);
  const projects = (Array.isArray(data) 
    ? data 
    : (data?.projects || data?.data?.projects)) || (error ? projectsFallback : []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const sortedProjects = [...projects].sort((a, b) => (a.order || a.orderIndex) - (b.order || b.orderIndex));
  const featuredProjects = sortedProjects.filter(p => p.featured);
  const otherProjects = sortedProjects.filter(p => !p.featured);

  if (loading) {
    return (
      <section id="projects" className="section-padding flex-center">
        <div className="container">
          <p style={{ opacity: 0.6, fontSize: '1rem', textAlign: 'center' }}>Memuat data proyek...</p>
        </div>
      </section>
    );
  }

  if (projects.length === 0 && !error) {
    return (
      <section id="projects" className="section-padding flex-center">
        <div className="container">
          <EmptyState message="Data proyek belum tersedia." />
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section-padding">
      <div className="container">
        <motion.div 
          style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center">Proyek Unggulan</h2>
        </motion.div>
          <>
            {/* Featured Projects Grid */}
            {featuredProjects.length > 0 && (
              <motion.div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                  gap: 'var(--space-8)',
                  marginBottom: otherProjects.length > 0 ? 'var(--space-12)' : 0
                }}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {featuredProjects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    isExpanded={expandedId === project.id}
                    onToggleExpand={toggleExpand}
                  />
                ))}
              </motion.div>
            )}

            {/* Section Divider */}
            {otherProjects.length > 0 && (
              <motion.div 
                style={{ marginBottom: 'var(--space-8)' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <h3 style={{ opacity: 0.6, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-4)' }}>
                  Proyek Lainnya
                </h3>
              </motion.div>
            )}

            {/* Other Projects Grid */}
            {otherProjects.length > 0 && (
              <motion.div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                  gap: 'var(--space-6)' 
                }}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {otherProjects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    isExpanded={expandedId === project.id}
                    onToggleExpand={toggleExpand}
                  />
                ))}
              </motion.div>
            )}
          </>
      </div>
    </section>
  );
};

export default Projects;

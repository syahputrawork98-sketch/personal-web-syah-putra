import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';
import { getPublicProjects } from '../lib/api';
import EmptyState from '../components/EmptyState';


const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getPublicProjects();
        
        if (data.projects) {
          setProjects(data.projects);
        }
      } catch (err) {
        console.warn('Projects: API Fetch failed:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
          {loading && <p style={{ opacity: 0.6, marginTop: 'var(--space-4)' }}>Memuat data...</p>}
        </motion.div>

        {!loading && projects.length === 0 ? (
          <EmptyState message="Data belum tersedia." />
        ) : (
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
        )}
      </div>
    </section>
  );
};

export default Projects;

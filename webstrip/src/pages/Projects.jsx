import React, { useState, useEffect } from 'react';
import { useI18n } from '../layouts/MainLayout';
import { projects as localProjects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';
import { getPublicProjects } from '../lib/api';

const Projects = () => {
  const { t } = useI18n();
  const [projects, setProjects] = useState([]);
  const [dataSource, setDataSource] = useState('loading'); // 'loading', 'api', 'fallback'
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getPublicProjects();
        
        if (data.projects) {
          setProjects(data.projects);
          setDataSource('api');
        } else {
          // If response is successful but no projects array
          setProjects(localProjects);
          setDataSource('fallback');
          console.warn('API success but no projects array, using fallback.');
        }
      } catch (err) {
        console.warn('API Fetch failed, using local fallback:', err.message);
        setProjects(localProjects);
        setDataSource('fallback');
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
          <h2 className="text-center">{t('projects.title')}</h2>
          {loading && <p style={{ opacity: 0.6, marginTop: 'var(--space-4)' }}>Loading projects...</p>}
          {dataSource === 'fallback' && !loading && <p style={{ opacity: 0.4, fontSize: '0.8rem' }}>Note: Showing local fallback data</p>}
        </motion.div>

        {!loading && projects.length === 0 && dataSource === 'api' ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-12)', opacity: 0.6 }}>
            <p>No projects published yet.</p>
          </div>
        ) : (
          <>
            {/* Featured Projects Grid */}
            <motion.div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                gap: 'var(--space-8)',
                marginBottom: featuredProjects.length > 0 ? 'var(--space-12)' : 0
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

            {/* Section Divider */}
            {otherProjects.length > 0 && (
              <motion.div 
                style={{ marginBottom: 'var(--space-8)' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <h3 style={{ opacity: 0.6, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-4)' }}>
                  {t('projects.title_other') || 'Other Projects'}
                </h3>
              </motion.div>
            )}

            {/* Other Projects Grid */}
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
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;

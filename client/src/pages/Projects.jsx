import React, { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import ProjectDetailModal from '../components/ProjectDetailModal';
import { motion } from 'framer-motion';
import { getPublicProjects } from '../lib/api';
import EmptyState from '../components/EmptyState';
import { useFetch } from '../hooks/useFetch';
import { projectsFallback } from '../fallback/projectsFallback';


const projectCategories = [
  "Semua",
  "IT & Web",
  "Manufaktur & Teknik",
  "Model Mesin 3D",
  "Model Bangunan & RAB"
];

const Projects = () => {
  const { data, loading, error } = useFetch(getPublicProjects);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const rawProjects = (Array.isArray(data) 
    ? data 
    : (data?.projects || data?.data?.projects)) || (error ? projectsFallback : []);

  // Normalize and Sort
  const projects = rawProjects.map(p => ({
    ...p,
    category: p.category || "IT & Web" // Fallback for old data
  })).sort((a, b) => (a.order || a.orderIndex) - (b.order || b.orderIndex));

  // Filter by Category
  const filteredProjects = activeCategory === "Semua"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const otherProjects = filteredProjects.filter(p => !p.featured);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

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
          <h2 className="text-center" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
            Portfolio Proyek
          </h2>
          <div style={{ width: '60px', height: '4px', background: 'var(--primary-color)', margin: 'var(--space-4) auto', borderRadius: 'var(--radius-full)' }} />
          <p style={{ maxWidth: '650px', margin: '0 auto', opacity: 0.8, fontSize: '1.1rem', lineHeight: 1.6 }}>
            Eksplorasi karya saya di berbagai bidang, mulai dari pengembangan perangkat lunak hingga desain teknis manufaktur dan estimasi konstruksi.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="filter-container" style={{ marginBottom: 'var(--space-10)' }}>
          {projectCategories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
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
                    onClick={() => handleOpenModal(project)}
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
                    onClick={() => handleOpenModal(project)}
                  />
                ))}
              </motion.div>
            )}

            {filteredProjects.length === 0 && (
              <div style={{ padding: 'var(--space-12) 0' }}>
                <EmptyState message={`Belum ada proyek di kategori ${activeCategory}.`} />
              </div>
            )}
          </>

          <ProjectDetailModal 
            isOpen={isModalOpen} 
            onClose={handleCloseModal} 
            project={selectedProject} 
          />
      </div>
    </section>
  );
};

export default Projects;

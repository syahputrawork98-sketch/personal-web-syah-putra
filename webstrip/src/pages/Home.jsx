import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { getPublicSkills, getPublicHero } from '../lib/api';
import EmptyState from '../components/EmptyState';
import '../styles/home.css';

const Home = () => {
  const [highlightSkills, setHighlightSkills] = useState([]);
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [skillsData, heroResponse] = await Promise.all([
          getPublicSkills(),
          getPublicHero()
        ]);

        if (skillsData.skills && skillsData.skills.length > 0) {
          const topSkills = skillsData.skills.slice(0, 8).map(s => s.name);
          setHighlightSkills(topSkills);
        }

        if (heroResponse.hero) {
          setHeroData(heroResponse.hero);
        }
      } catch (err) {
        console.warn('Home: Failed to fetch data:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  if (!loading && !heroData) {
    return (
      <section id="home" className="section-padding flex-center hero-section">
        <div className="container">
          <EmptyState message="Data belum tersedia." />
        </div>
      </section>
    );
  }

  // Use heroData from API. If API is down and loading is finished, heroData is null (handled above)
  const currentHero = heroData || {};

  const typeSequence = currentHero.roles && currentHero.roles.length > 0 
    ? currentHero.roles.flatMap(role => [role, 2000]) 
    : [currentHero.name || '', 2000];

  return (
    <section id="home" className="section-padding flex-center hero-section">
      <motion.div 
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="hero-role" variants={itemVariants}>
          {typeSequence.length > 0 && (
            <TypeAnimation
              key={heroData ? 'api' : 'fallback'}
              sequence={typeSequence}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              style={{ display: 'inline-block', minHeight: '1.2em' }}
            />
          )}
        </motion.p>
        
        <motion.h1 className="hero-title" variants={itemVariants}>
          {currentHero.title}
        </motion.h1>
        
        <motion.p className="hero-subtitle" variants={itemVariants}>
          {currentHero.subtitle}
        </motion.p>
        
        {highlightSkills.length > 0 && (
          <motion.div className="skill-pills" variants={itemVariants}>
            {highlightSkills.map((skill, index) => (
              <span key={index} className="skill-pill">
                {skill}
              </span>
            ))}
          </motion.div>
        )}

        <motion.div className="cta-group" variants={itemVariants}>
          {currentHero.primaryCtaLabel && (
            <Link to="/projects" className="btn btn-primary">{currentHero.primaryCtaLabel}</Link>
          )}
          {currentHero.secondaryCtaLabel && (
            <a href={currentHero.resumeUrl || '#'} download className="btn btn-secondary">{currentHero.secondaryCtaLabel}</a>
          )}
          <Link to="/contact" className="btn btn-secondary">Hubungi Saya</Link>
        </motion.div>
      </motion.div>
    </section>
  );
};


export default Home;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../layouts/MainLayout';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { getPublicSkills, getPublicHero } from '../lib/api';
import { HERO_FALLBACK } from '../data/fallbacks';
import '../styles/home.css';

const Home = () => {
  const { t, lang } = useI18n();
  const [highlightSkills, setHighlightSkills] = useState(['React.js', 'Node.js', 'Express.js', 'PHP', 'MySQL', 'MongoDB', 'PostgreSQL']);
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getPublicSkills();
        if (data.skills && data.skills.length > 0) {
          const topSkills = data.skills.slice(0, 8).map(s => s.name);
          setHighlightSkills(topSkills);
        }
      } catch (err) {
        console.warn('Home: Failed to fetch skills, using fallback:', err.message);
      }
    };

    const fetchHero = async () => {
      try {
        const data = await getPublicHero();
        if (data.hero) {
          setHeroData(data.hero);
        }
      } catch (err) {
        console.warn('Home: Failed to fetch hero settings:', err.message);
      }
    };

    fetchSkills();
    fetchHero();
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

  const currentHero = heroData || HERO_FALLBACK;

  const typeSequence = currentHero.roles && currentHero.roles.length > 0 
    ? currentHero.roles.flatMap(role => [role, 2000]) 
    : [currentHero.name, 2000];

  return (
    <section id="home" className="section-padding flex-center hero-section">
      <motion.div 
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="hero-role" variants={itemVariants}>
          <TypeAnimation
            key={heroData ? 'api' : lang}
            sequence={typeSequence}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            style={{ display: 'inline-block', minHeight: '1.2em' }}
          />
        </motion.p>
        
        <motion.h1 className="hero-title" variants={itemVariants}>
          {currentHero.title}
        </motion.h1>
        
        <motion.p className="hero-subtitle" variants={itemVariants}>
          {currentHero.subtitle}
        </motion.p>
        
        <motion.div className="skill-pills" variants={itemVariants}>
          {highlightSkills.map((skill, index) => (
            <span key={index} className="skill-pill">
              {skill}
            </span>
          ))}
        </motion.div>

        <motion.div className="cta-group" variants={itemVariants}>
          <Link to="/projects" className="btn btn-primary">{currentHero.primaryCtaLabel}</Link>
          <a href={currentHero.resumeUrl} download className="btn btn-secondary">{currentHero.secondaryCtaLabel}</a>
        </motion.div>
      </motion.div>
    </section>
  );
};


export default Home;

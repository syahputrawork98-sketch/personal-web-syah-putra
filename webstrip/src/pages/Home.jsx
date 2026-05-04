import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../layouts/MainLayout';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import '../styles/home.css';

const Home = () => {
  const { t, lang } = useI18n();
  const highlightSkills = ['React.js', 'Node.js', 'Express.js', 'PHP', 'MySQL', 'MongoDB', 'PostgreSQL'];

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

  // Typing animation sequence based on language
  const getRoles = () => {
    if (lang === 'id') {
      return [
        'Full Stack Developer', 2000,
        'React Developer', 2000,
        'Backend Specialist', 2000,
        'Web App Builder', 2000
      ];
    } else if (lang === 'jp') {
      return [
        'フルスタック 開発者', 2000,
        'React 開発者', 2000,
        'バックエンド 開発者', 2000,
        'ウェブアプリ 構築者', 2000
      ];
    }
    return [
      'Full Stack Developer', 2000,
      'React Developer', 2000,
      'Backend Developer', 2000,
      'Web App Builder', 2000
    ];
  };

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
            sequence={getRoles()}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            style={{ display: 'inline-block', minHeight: '1.2em' }}
          />
        </motion.p>
        
        <motion.h1 className="hero-title" variants={itemVariants}>
          {t('hero.title')}
        </motion.h1>
        
        <motion.p className="hero-subtitle" variants={itemVariants}>
          {t('hero.subtitle')}
        </motion.p>
        
        <motion.div className="skill-pills" variants={itemVariants}>
          {highlightSkills.map((skill, index) => (
            <span key={index} className="skill-pill">
              {skill}
            </span>
          ))}
        </motion.div>

        <motion.div className="cta-group" variants={itemVariants}>
          <Link to="/projects" className="btn btn-primary">{t('hero.cta_primary')}</Link>
          <a href="/CV_Syah_Putra_Nugraha.pdf" download className="btn btn-secondary">{t('hero.cta_secondary')}</a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../layouts/MainLayout';
import '../styles/home.css';

const Home = () => {
  const { t } = useI18n();
  const highlightSkills = ['React.js', 'Node.js', 'Express.js', 'PHP', 'MySQL', 'MongoDB', 'PostgreSQL'];

  return (
    <section id="home" className="section-padding flex-center hero-section">
      <div className="container">
        <p className="hero-role">{t('hero.role')}</p>
        <h1 className="hero-title">{t('hero.title')}</h1>
        <p className="hero-subtitle">
          {t('hero.subtitle')}
        </p>
        
        <div className="skill-pills">
          {highlightSkills.map((skill, index) => (
            <span key={index} className="skill-pill">
              {skill}
            </span>
          ))}
        </div>

        <div className="cta-group">
          <Link to="/projects" className="btn btn-primary">{t('hero.cta_primary')}</Link>
          <a href="/CV_Syah_Putra_Nugraha.pdf" download className="btn btn-secondary">{t('hero.cta_secondary')}</a>
        </div>
      </div>
    </section>
  );
};

export default Home;

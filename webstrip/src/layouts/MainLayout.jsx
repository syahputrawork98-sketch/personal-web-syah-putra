import React, { useState, useEffect, createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import i18n from '../data/i18n';
import { motion, AnimatePresence } from 'framer-motion';

const I18nContext = createContext();
export const useI18n = () => useContext(I18nContext);

const MainLayout = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'id');
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const changeLang = (newLang) => {
    setLang(newLang);
  };

  const t = (key) => {
    const keys = key.split('.');
    let result = i18n[lang];
    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        // Fallback to English
        result = i18n['en'];
        for (const fallbackK of keys) {
          if (result && result[fallbackK]) {
            result = result[fallbackK];
          } else {
            return key; // Return key as last resort
          }
        }
      }
    }
    return result;
  };

  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <I18nContext.Provider value={{ t, lang, changeLang }}>
      <Navbar theme={theme} toggleTheme={toggleTheme} lang={lang} changeLang={changeLang} t={t} />
      <main style={{ paddingTop: '80px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </I18nContext.Provider>
  );
};

export default MainLayout;

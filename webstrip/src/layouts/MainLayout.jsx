import React, { createContext, useContext, useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const I18nContext = createContext();

export const useI18n = () => useContext(I18nContext);

const MainLayout = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'id');
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/i18n/${lang}.json`);
        const data = await response.json();
        setTranslations(data);
        document.documentElement.lang = lang;
        localStorage.setItem('lang', lang);
      } catch (error) {
        console.error('Error loading translations:', error);
      }
    };
    loadTranslations();
  }, [lang]);

  const t = (key) => {
    const keys = key.split('.');
    let result = translations;
    for (const k of keys) {
      result = result ? result[k] : null;
    }
    return result || key;
  };

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <I18nContext.Provider value={{ t, lang, changeLang: setLang }}>
      <div id="app">
        <Navbar 
          theme={theme} 
          toggleTheme={toggleTheme} 
          lang={lang} 
          changeLang={setLang} 
          t={t} 
        />
        <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 160px)' }}>
          {children}
        </main>
        <Footer t={t} />
      </div>
    </I18nContext.Provider>
  );
};

export default MainLayout;

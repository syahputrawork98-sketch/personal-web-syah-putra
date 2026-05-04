import './style.css'

// --- Theme Toggle Logic ---
const themeToggle = document.querySelector('#theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);
updateToggleIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateToggleIcon(newTheme);
});

function updateToggleIcon(theme) {
  themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
}

// --- i18n Logic ---
const langSelect = document.querySelector('#lang-select');
let currentLang = localStorage.getItem('lang') || 'id';

// Initial language set
langSelect.value = currentLang;
loadLanguage(currentLang);

langSelect.addEventListener('change', (e) => {
  const newLang = e.target.value;
  currentLang = newLang;
  localStorage.setItem('lang', newLang);
  loadLanguage(newLang);
});

async function loadLanguage(lang) {
  try {
    // Dynamic import for JSON in Vite
    // Note: In a production build, you might want to use static imports or a different loading strategy
    // but for now, we'll fetch from the public folder or use Vite's dynamic import capabilities.
    const response = await fetch(`./src/i18n/${lang}.json`);
    const translations = await response.json();
    
    applyTranslations(translations);
    document.documentElement.lang = lang;
  } catch (error) {
    console.error('Error loading language file:', error);
  }
}

function applyTranslations(translations) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    const keys = key.split('.');
    
    let text = translations;
    keys.forEach(k => {
      text = text ? text[k] : null;
    });
    
    if (text) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else {
        el.innerHTML = text;
      }
    }
  });
}

console.log('Syah Putra Nugraha Personal Web Initialized with i18n Support');

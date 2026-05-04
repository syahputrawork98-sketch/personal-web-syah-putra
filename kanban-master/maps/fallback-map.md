# Fallback System Mapping

| Fallback File | Used By | Replaces Old Source | Status | Notes |
| :--- | :--- | :--- | :---: | :--- |
| `heroFallback.js` | `Home.jsx` | `i18n (hero content)` | 📦 | Archive only |
| `profileFallback.js` | `About.jsx` | `i18n (profile content)`| 📦 | Archive only |
| `educationFallback.js`| `About.jsx` | `i18n (education)` | 📦 | Archive only |
| `projectsFallback.js` | `Projects.jsx` | `data/projects.js` | 📦 | Archive only |
| `experienceFallback.js`| `Experience.jsx` | `data/fallbacks.js` | 📦 | Archive only |
| `certificationsFallback.js`| `Experience.jsx` | `data/fallbacks.js` | 📦 | Archive only |
| `skillsFallback.js` | `Home.jsx`, `About.jsx`| `data/fallbacks.js` | 📦 | Archive only |
| `contactFallback.js` | `Contact.jsx`, `About.jsx`| `data/fallbacks.js` | 📦 | Archive only |

**Update (May 4, 2026):** Public pages now use `EmptyState` component instead of auto-rendering fallback JS data when API is empty or failing.

# Page Data Mapping

| Page/Component | Primary Data Source | Fallback Source | i18n Usage | Status |
| :--- | :--- | :--- | :--- | :---: |
| **Home.jsx** | `/api/settings/hero`, `/api/skills` | `heroFallback.js`, `skillsFallback.js` | UI Labels only | ✅ |
| **About.jsx** | `/api/settings/profile`, `/api/education`, `/api/skills` | `profileFallback.js`, `educationFallback.js`, `skillsFallback.js` | UI Labels only | ✅ |
| **Projects.jsx** | `/api/projects` | `projectsFallback.js` | UI Labels only | ✅ |
| **Experience.jsx** | `/api/experiences`, `/api/certifications` | `experienceFallback.js`, `certificationsFallback.js` | UI Labels only | ✅ |
| **Contact.jsx** | `/api/settings/contact` | `contactFallback.js` | UI Labels only | ✅ |
| **Navbar.jsx** | Local State (isOpen) | N/A | Nav Labels | ✅ |
| **Admin Pages** | API (Admin Routes) | N/A | N/A | ✅ |

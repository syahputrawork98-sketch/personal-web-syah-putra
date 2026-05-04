# Page - API Mapping

| Page | Current Data Source | Target Data Source | Status | Notes |
|---|---|---|---|---|
| Home.jsx | API + `fallbacks.js` | API (`/api/settings/hero`) | Done | Fallback via JS aman |
| About.jsx | API + `fallbacks.js` | API (`/api/settings/profile`, `/api/education`, dll) | Done | Fallback via JS aman |
| Projects.jsx | API + `projects.js` | API (`/api/projects`) | Done | Fallback via `data/projects.js` |
| Experience.jsx | API + `fallbacks.js` | API (`/api/experiences`, `/api/certifications`) | Done | Sertifikasi masih pakai fallback `t()` |
| Contact.jsx | API + `fallbacks.js` | API (`/api/contact`) | Done | Fallback via JS aman |
| AdminDashboard.jsx| API (Stats) | API endpoints | Planned | Butuh grafik atau rekap |
| AdminEducation.jsx| API | API (`/api/admin/education`) | Done | |
| AdminSettings.jsx | API | API (`/api/admin/settings/*`) | Done | |

# API Mapping

| Endpoint | Method | Public/Admin | Feature | Consumer | Status | Notes |
| :--- | :---: | :---: | :--- | :--- | :---: | :--- |
| `/api/auth/login` | POST | Public | Auth | `AdminLogin.jsx` | ✅ | |
| `/api/auth/me` | GET | Admin | Auth | `ProtectedRoute.jsx` | ✅ | |
| `/api/projects` | GET | Public | Projects | `Projects.jsx` | ✅ | |
| `/api/settings/hero` | GET | Public | Hero | `Home.jsx` | ✅ | |
| `/api/settings/profile` | GET | Public | Profile | `About.jsx` | ✅ | |
| `/api/settings/contact` | GET | Public | Contact | `Contact.jsx`, `About.jsx` | ✅ | |
| `/api/education` | GET | Public | Education | `About.jsx` | ✅ | |
| `/api/experiences` | GET | Public | Experience | `Experience.jsx` | ✅ | Pluralized |
| `/api/certifications`| GET | Public | Certs | `Experience.jsx` | ✅ | |
| `/api/skills` | GET | Public | Skills | `About.jsx`, `Home.jsx` | ✅ | |
| `/api/skills?type=SOFT`| GET | Public | Skills | `About.jsx` | ✅ | |
| `/api/admin/projects` | GET/POST | Admin | Projects | `AdminProjects.jsx` | ✅ | |
| `/api/admin/settings/hero`| GET/PUT | Admin | Hero | `AdminHeroSettings.jsx`| ✅ | |
| `/api/admin/settings/profile`| GET/PUT | Admin | Profile | `AdminProfileSettings.jsx`| ✅ | |
| `/api/admin/settings/contact`| GET/PUT | Admin | Contact | `AdminContact.jsx` | ✅ | |
| `/api/admin/skills` | GET/POST | Admin | Skills | `AdminSkills.jsx` | ✅ | |
| `/api/admin/experiences`| GET/POST | Admin | Experience | `AdminExperiences.jsx`| ✅ | |
| `/api/admin/certifications`| GET/POST | Admin | Certs | `AdminCertifications.jsx`| ✅ | |
| `/api/admin/education`| GET/POST | Admin | Education | `AdminEducation.jsx` | ✅ | |
| `/api/admin/account` | GET/PUT | Admin | Account | `AdminAccount.jsx` | ✅ | Email & Pass |

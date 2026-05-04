# Backend Routes Map

Berikut adalah pemetaan *routing* backend yang terdaftar di `src/app.js`:

| Route File | Base Path | Auth Level | Feature |
|---|---|---|---|
| `auth.routes.js` | `/api/auth` | Public | Login Administrator |
| `public/projects.routes.js` | `/api/projects` | Public | Ambil data proyek publik |
| `admin/projects.routes.js` | `/api/admin/projects` | Protected | CRUD Proyek (Admin) |
| `settings.routes.js` | `/api/settings` | Public | Ambil pengaturan Hero/Profile/Contact |
| `admin/settings.routes.js` | `/api/admin/settings` | Protected | Simpan pengaturan Hero/Profile/Contact |
| `education.routes.js` | `/api/education` | Public | Ambil riwayat pendidikan |
| `admin/education.routes.js` | `/api/admin/education`| Protected | CRUD Pendidikan (Admin) |
| `experience.routes.js` | `/api/experiences` | Public | Ambil riwayat pekerjaan |
| `admin/experience.routes.js`| `/api/admin/experiences`| Protected | CRUD Pekerjaan (Admin) |
| `skills.routes.js` | `/api/skills` | Public | Ambil daftar keahlian |
| `admin/skills.routes.js` | `/api/admin/skills` | Protected | CRUD Keahlian (Admin) |
| `certification.routes.js` | `/api/certifications` | Public | Ambil sertifikasi publik |
| `admin/certification.routes.js`|`/api/admin/certifications`| Protected | CRUD Sertifikasi (Admin) |
| `admin/account.routes.js` | `/api/admin/account` | Protected | Pengaturan akun Admin |

*Catatan: Semua route admin menggunakan middleware `requireAdmin`.*

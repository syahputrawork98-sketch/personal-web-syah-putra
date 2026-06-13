# Backend/API Audit

## Metadata
- Feature Batch: Batch F14 — Repository Normalization and Documentation Sync
- Execution Batch: Batch F14D — Backend/API Audit
- Status: Completed
- Scope: Backend/API audit only, no code changes, no cleanup
- Last updated: 2026-06-13

## Backend Runtime Map
Daftar file proses utama backend Express:

| File | Role | Status | Evidence | Notes |
|---|---|---|---|---|
| `server/src/app.js` | Express Application Setup | Active | Loaded by `server.js` | Menginisiasi CORS, middleware Express JSON, rute Express, dan global error handler |
| `server/src/server.js` | HTTP Server Entrypoint | Active | Package.json start/dev script | Mendengarkan port dan memulai proses HTTP server listener |
| `server/package.json` | Dependency Manifest & Scripts | Active | Terletak di root folder server | Mendefinisikan start/dev scripts, prisma client dependency, dan local dev libraries |

## Express Route Registration Map
Daftar registrasi prefix rute Express yang dipetakan pada [app.js](file:///i:/Workspace/Workspace-Syahputrawork/PWSP-Personal-Web-Syah-Putra/server/src/app.js):

| Base Path | Route File | Middleware/Auth | Status | Evidence | Notes |
|---|---|---|---|---|---|
| `/api/auth` | `server/src/routes/auth.routes.js` | None (Public Login) & JWT Guard for `/me` | Active | app.js line 43 | Endpoint otentikasi login admin |
| `/api/projects` | `server/src/routes/public/projects.routes.js` | None (Public Read-Only) | Active | app.js line 44 | Endpoint membaca data proyek portfolio publik |
| `/api/admin/projects` | `server/src/routes/admin/projects.routes.js` | `requireAdmin` (JWT Guard) | Active | app.js line 45 | Panel CMS admin CRUD proyek portfolio |
| `/api/admin/account` | `server/src/routes/admin/account.routes.js` | `requireAdmin` (JWT Guard) | Active | app.js line 46 | Panel CMS admin perubahan email & password |
| `/api/settings` | `server/src/routes/settings.routes.js` | None (Public Read-Only) | Active | app.js line 47 | Endpoint membaca data setting hero/profil/kontak |
| `/api/admin/settings` | `server/src/routes/admin/settings.routes.js` | `requireAdmin` (JWT Guard) | Active | app.js line 48 | Panel CMS admin modifikasi teks homepage |
| `/api/skills` | `server/src/routes/skills.routes.js` | None (Public Read-Only) | Active | app.js line 49 | Endpoint membaca daftar keahlian publik |
| `/api/admin/skills` | `server/src/routes/admin/skills.routes.js` | `requireAdmin` (JWT Guard) | Active | app.js line 50 | Panel CMS admin CRUD daftar keahlian |
| `/api/experiences` | `server/src/routes/experience.routes.js` | None (Public Read-Only) | Active | app.js line 51 | Endpoint membaca riwayat kerja publik |
| `/api/admin/experiences` | `server/src/routes/admin/experience.routes.js` | `requireAdmin` (JWT Guard) | Active | app.js line 52 | Panel CMS admin CRUD riwayat kerja |
| `/api/certifications` | `server/src/routes/certification.routes.js` | None (Public Read-Only) | Active | app.js line 53 | Endpoint membaca sertifikat publik |
| `/api/admin/certifications` | `server/src/routes/admin/certification.routes.js` | `requireAdmin` (JWT Guard) | Active | app.js line 54 | Panel CMS admin CRUD sertifikasi |
| `/api/education` | `server/src/routes/education.routes.js` | None (Public Read-Only) | Active | app.js line 55 | Endpoint membaca data pendidikan publik |
| `/api/admin/education` | `server/src/routes/admin/education.routes.js` | `requireAdmin` (JWT Guard) | Active | app.js line 56 | Panel CMS admin CRUD pendidikan akademik |
| `/api/admin/cv-builder` | `server/src/routes/admin/cv-builder.routes.js` | `requireAdmin` (JWT Guard) | Active | app.js line 57 | Panel CMS admin pembangun konfigurasi CV |
| `/api/learning` | `server/src/routes/learning.routes.js` | None (Public Read-Only) | Active | app.js line 58 | Endpoint membaca learning library publik |
| `/api/admin/learning` | `server/src/routes/admin/learning.routes.js` | `requireAdmin` (JWT Guard) | Active | app.js line 59 | Panel CMS admin CRUD data learning library |
| `/api/health` | Inline (app.js) | None (Public healthcheck) | Active | app.js line 38 | Status monitoring ping server |

## Public API Endpoint Map
Daftar rute publik backend Express dan kesesuaian mapping di frontend API helper:

| Endpoint | Method | Route File | Used By Frontend Function | Status | Evidence | Notes |
|---|---|---|---|---|---|---|
| `/api/health` | GET | Inline in app.js | None | Active | app.js line 38 | Healthcheck server status |
| `/api/projects` | GET | `public/projects.routes.js` | `getPublicProjects` | Active | api.js line 37 | Memuat seluruh list proyek publik |
| `/api/projects/:slug` | GET | `public/projects.routes.js` | `getPublicProjectBySlug` | Active | api.js line 38 | Memuat detail 1 proyek publik |
| `/api/settings/contact` | GET | `settings.routes.js` | `getPublicContact` | Active | api.js line 39 | Memuat data kontak sosial personal |
| `/api/settings/hero` | GET | `settings.routes.js` | `getPublicHero` | Active | api.js line 40 | Memuat teks slider homepage |
| `/api/settings/profile` | GET | `settings.routes.js` | `getPublicProfile` | Active | api.js line 41 | Memuat teks biodata diri About page |
| `/api/skills` | GET | `skills.routes.js` | `getPublicSkills` | Active | api.js line 43 | Memuat daftar keahlian terfilter/semua |
| `/api/experiences` | GET | `experience.routes.js` | `getPublicExperiences` | Active | api.js line 47 | Memuat riwayat timeline karier publik |
| `/api/certifications` | GET | `certification.routes.js` | `getPublicCertifications` | Active | api.js line 164 | Memuat daftar sertifikasi/Drive links |
| `/api/education` | GET | `education.routes.js` | `getPublicEducation` | Active | api.js line 42 | Memuat riwayat studi akademik |
| `/api/learning` | GET | `learning.routes.js` | `getPublicLearningItems` | Active | api.js line 48 | Memuat katalog item learning library |

## Admin API Endpoint Map
Daftar rute CMS admin Express dan kesesuaian mapping di frontend API helper:

| Endpoint | Method | Route File | Auth Required | Used By Frontend Function | Status | Notes |
|---|---|---|---|---|---|---|
| `/api/auth/login` | POST | `auth.routes.js` | No | `loginAdmin` | Active | Login entrypoint admin |
| `/api/auth/me` | GET | `auth.routes.js` | Yes | `getCurrentAdmin` | Active | Mengecek token session saat reload |
| `/api/admin/projects` | GET | `admin/projects.routes.js` | Yes | `getAdminProjects` | Active | Memuat list manajemen proyek |
| `/api/admin/projects/:id` | GET | `admin/projects.routes.js` | Yes | `getAdminProject` | Active | Memuat 1 proyek editor |
| `/api/admin/projects` | POST | `admin/projects.routes.js` | Yes | `createProject` | Active | Membuat proyek baru |
| `/api/admin/projects/:id` | PUT | `admin/projects.routes.js` | Yes | `updateProject` | Active | Menyimpan update proyek |
| `/api/admin/projects/:id` | DELETE | `admin/projects.routes.js` | Yes | `deleteProject` | Active | Menghapus proyek |
| `/api/admin/account` | GET | `admin/account.routes.js` | Yes | `getAdminAccount` | Active | Mengambil profile admin |
| `/api/admin/account/email` | PUT | `admin/account.routes.js` | Yes | `updateAdminEmail` | Active | Mereset email masuk admin |
| `/api/admin/account/password` | PUT | `admin/account.routes.js` | Yes | `updateAdminPassword` | Active | Mereset password masuk admin |
| `/api/admin/settings/contact` | GET | `admin/settings.routes.js` | Yes | `getAdminContact` | Active | Mengambil form kontak admin |
| `/api/admin/settings/contact` | PUT | `admin/settings.routes.js` | Yes | `updateAdminContact` | Active | Menyimpan form kontak admin |
| `/api/admin/settings/hero` | GET | `admin/settings.routes.js` | Yes | `getAdminHero` | Active | Mengambil form hero admin |
| `/api/admin/settings/hero` | PUT | `admin/settings.routes.js` | Yes | `updateAdminHero` | Active | Menyimpan form hero admin |
| `/api/admin/settings/profile` | GET | `admin/settings.routes.js` | Yes | `getAdminProfile` | Active | Mengambil form profile admin |
| `/api/admin/settings/profile` | PUT | `admin/settings.routes.js` | Yes | `updateAdminProfile` | Active | Menyimpan form profile admin |
| `/api/admin/skills` | GET | `admin/skills.routes.js` | Yes | `getAdminSkills` | Active | Memuat list manajemen skill |
| `/api/admin/skills/:id` | GET | `admin/skills.routes.js` | Yes | `getAdminSkill` | Active | Memuat 1 skill editor |
| `/api/admin/skills` | POST | `admin/skills.routes.js` | Yes | `createSkill` | Active | Membuat skill baru |
| `/api/admin/skills/:id` | PUT | `admin/skills.routes.js` | Yes | `updateSkill` | Active | Menyimpan update skill |
| `/api/admin/skills/:id` | DELETE | `admin/skills.routes.js` | Yes | `deleteSkill` | Active | Menghapus skill |
| `/api/admin/experiences` | GET | `admin/experience.routes.js` | Yes | `getAdminExperiences` | Active | Memuat list pengalaman kerja |
| `/api/admin/experiences/:id` | GET | `admin/experience.routes.js` | Yes | `getAdminExperience` | Active | Memuat 1 pengalaman editor |
| `/api/admin/experiences` | POST | `admin/experience.routes.js` | Yes | `createExperience` | Active | Membuat pengalaman baru |
| `/api/admin/experiences/:id` | PUT | `admin/experience.routes.js` | Yes | `updateExperience` | Active | Menyimpan update pengalaman |
| `/api/admin/experiences/:id` | DELETE | `admin/experience.routes.js` | Yes | `deleteExperience` | Active | Menghapus pengalaman |
| `/api/admin/certifications` | GET | `admin/certification.routes.js` | Yes | `getAdminCertifications` | Active | Memuat list sertifikasi |
| `/api/admin/certifications/:id` | GET | `admin/certification.routes.js` | Yes | `getAdminCertification` | Active | Memuat 1 sertifikasi editor |
| `/api/admin/certifications` | POST | `admin/certification.routes.js` | Yes | `createCertification` | Active | Membuat sertifikasi baru |
| `/api/admin/certifications/:id` | PUT | `admin/certification.routes.js` | Yes | `updateCertification` | Active | Menyimpan update sertifikasi |
| `/api/admin/certifications/:id` | DELETE | `admin/certification.routes.js` | Yes | `deleteCertification` | Active | Menghapus sertifikasi |
| `/api/admin/education` | GET | `admin/education.routes.js` | Yes | `getAdminEducation` | Active | Memuat list pendidikan admin |
| `/api/admin/education/:id` | GET | `admin/education.routes.js` | Yes | `getAdminEducationById` | Active | Memuat 1 pendidikan editor |
| `/api/admin/education` | POST | `admin/education.routes.js` | Yes | `createAdminEducation` | Active | Membuat pendidikan baru |
| `/api/admin/education/:id` | PUT | `admin/education.routes.js` | Yes | `updateAdminEducation` | Active | Menyimpan update pendidikan |
| `/api/admin/education/:id` | DELETE | `admin/education.routes.js` | Yes | `deleteAdminEducation` | Active | Menghapus pendidikan |
| `/api/admin/cv-builder/config` | GET | `admin/cv-builder.routes.js` | Yes | `getCvBuilderConfig` | Active | Memuat json config CV Builder |
| `/api/admin/cv-builder/config` | PUT | `admin/cv-builder.routes.js` | Yes | `updateCvBuilderConfig` | Active | Menyimpan json config CV Builder |
| `/api/admin/learning` | GET | `admin/learning.routes.js` | Yes | `getAdminLearningItems` | Active | Memuat list item learning library |
| `/api/admin/learning/:id` | GET | `admin/learning.routes.js` | Yes | `getAdminLearningItem` | Active | Memuat 1 item learning editor |
| `/api/admin/learning` | POST | `admin/learning.routes.js` | Yes | `createLearningItem` | Active | Membuat item learning baru |
| `/api/admin/learning/:id` | PUT | `admin/learning.routes.js` | Yes | `updateLearningItem` | Active | Menyimpan update item learning |
| `/api/admin/learning/:id` | DELETE | `admin/learning.routes.js` | Yes | `deleteLearningItem` | Active | Menghapus item learning |

## Auth and Security Audit
Hasil tinjauan otentikasi & proteksi endpoint backend:

| Area | File | Status | Evidence | Risk / Notes | Next Action |
|---|---|---|---|---|---|
| JWT Verification | `requireAdmin.js` | Secure | Verify token menggunakan `jwt.verify` dan `JWT_SECRET` | Kegagalan login jika `JWT_SECRET` tidak di-set di env produksi (Terproteksi oleh pengecekan error 500) | Pantau env config di platform Railway |
| Password Hashing | `auth.controller.js` & `seed.js` | Secure | Enkripsi hashing satu arah menggunakan library `bcryptjs` | Nilai password default ter-*hash* aman di database | Pertahankan |
| Auth Middleware | `requireAdmin.js` | Active | Membaca header `Authorization: Bearer <token>` dan melampirkan instansi admin ke objek Express request | Token malformed terdeteksi sebagai unauthorized (401) secara presisi | Pertahankan |
| Admin Session | `auth.controller.js` | Active | Generate JWT Token berdurasi 24 jam setelah login berhasil | - | Pertahankan |

## CORS and Environment Audit
Analisis konfigurasi cors & environment variables:

| Env / Config | File | Status | Evidence | Notes |
|---|---|---|---|---|
| `CLIENT_URL` | `env.js`, `app.js` | Active | CORS `allowedOrigins` memisah string dipisah koma | Mengatur limitasi domain client web yang boleh meminta respon API |
| `DATABASE_URL` | `env.js`, `schema.prisma` | Active | Connection string PostgreSQL Neon | Menunjuk database Neon PostgreSQL produksi / branch production |
| `JWT_SECRET` | `env.js`, `requireAdmin.js` | Active | Kunci pembuka enkripsi payload token | Wajib dibuat panjang dan unik di environment produksi |
| `PORT` | `env.js`, `server.js` | Active | Default fallback port `5000` | Port listen node server proses |
| `CORS Allowed Origins` | `app.js` | Secure | Rantai domain lokal (`http://localhost:5173`) & vercel (`https://syahputran.vercel.app`) | Menutup akses API dari situs eksternal tidak terdaftar demi keamanan CORS |

*Penting: Tidak ada kredensial sensitif atau string password/secret produksi yang di-hardcode di dalam repositori. Variabel ditarik dinamis via `process.env`.*

## Prisma / Database Access Audit
Hasil audit penulisan model ORM Prisma dan seed database:

| File | Role | Status | Evidence | Risk / Notes | Next Action |
|---|---|---|---|---|---|
| `schema.prisma` | DB Schema Definition | Active | generator client & database datasource | Menyusun relasi index models untuk optimalisasi query Postgres | Pertahankan |
| `seed.js` | DB Seeding | Active | `prisma.skill.deleteMany({})` & `prisma.experience.deleteMany({})` dsb | **Risiko Tinggi**: Eksekusi seed di production menghapus data CMS secara permanen karena adanya fungsi `deleteMany()` | **Peringatan Keras**: Tambahkan filter env atau instruksi tertulis agar user tidak pernah menjalankan `npm run seed` di production |
| Migrations | DB Migration History | Active | folder `server/prisma/migrations/` | Menyimpan log modifikasi struktur tabel database lokal | Jangan ubah migrations history |

## Backend Cleanup Candidates Verification
*(Penting: Tidak ada file yang dihapus pada batch audit ini).*

| Path | Previous Status in Inventory | F14D Verification Status | Evidence | Required Manual Check Before Cleanup |
|---|---|---|---|---|
| `server/scratch/check_db.js` | Delete candidate after validation | Confirmed unused candidate | Script uji coba koneksi DB lokal manual. Tidak di-import/dipanggil oleh Express runtime maupun package scripts. | Dapat dihapus dengan aman setelah siklus QA lokal selesai. |
| `server/scratch/parse_logs.js` | Delete candidate after validation | Confirmed unused candidate | Script utilitas parser logs. Tidak dipanggil di mana pun. | Dapat dihapus dengan aman. |
| `server/scratch/patch_seed.js` | Delete candidate after validation | Confirmed unused candidate | Helper patch data seed lokal. Tidak dipanggil oleh Express/Prisma. | Dapat dihapus dengan aman. |

## API Coverage vs Frontend Usage
Pencocokan fungsi API helper frontend `client/src/lib/api.js` terhadap ketersediaan endpoint backend:

| Frontend API Function | Backend Endpoint | Frontend Page/Admin Page | Coverage Status | Evidence | Notes |
|---|---|---|---|---|---|
| `getPublicProjects` | `GET /api/projects` | `Projects.jsx` | Covered | api.js line 37 | Sinkron |
| `getPublicProjectBySlug` | `GET /api/projects/:slug` | `ProjectDetailModal.jsx` | Covered | api.js line 38 | Sinkron |
| `getPublicContact` | `GET /api/settings/contact` | `Contact.jsx`, `About.jsx` | Covered | api.js line 39 | Sinkron |
| `getPublicHero` | `GET /api/settings/hero` | `Home.jsx` | Covered | api.js line 40 | Sinkron |
| `getPublicProfile` | `GET /api/settings/profile` | `About.jsx` | Covered | api.js line 41 | Sinkron |
| `getPublicSkills` | `GET /api/skills` | `About.jsx`, `Home.jsx` | Covered | api.js line 43 | Sinkron |
| `getPublicExperiences` | `GET /api/experiences` | `Experience.jsx` | Covered | api.js line 47 | Sinkron |
| `getPublicCertifications` | `GET /api/certifications` | `Credentials.jsx` | Covered | api.js line 164 | Sinkron |
| `getPublicEducation` | `GET /api/education` | `About.jsx` | Covered | api.js line 42 | Sinkron |
| `getPublicLearningItems` | `GET /api/learning` | `Learn.jsx` | Covered | api.js line 48 | Sinkron |
| `loginAdmin` | `POST /api/auth/login` | `AdminLogin.jsx` | Covered | api.js line 51 | Sinkron |
| `getCurrentAdmin` | `GET /api/auth/me` | `ProtectedRoute.jsx` | Covered | api.js line 57 | Sinkron |
| CMS CRUD functions | `/api/admin/*` | Seluruh admin CMS pages | Covered | api.js line 60-188 | Seluruh modul CMS admin ter-cover penuh oleh controller backend |

*Semua endpoint yang digunakan oleh halaman publik dan panel admin admin CMS telah terintegrasi 100% secara sinkron antara frontend helper dan routing controller backend.*

## Runtime Validation Checklist
Instruksi pengujian manual bagi pengguna di Anti-Gravity IDE untuk memverifikasi fungsionalitas API:
1. **Jalankan Backend Dev Server**:
   Masuk ke folder `server/` dan pastikan nodemon dev server hidup (`npm run dev`).
2. **Cek Health Endpoint**:
   Buka browser pada `http://localhost:5000/api/health` dan pastikan merespon `{ "status": "ok", "message": "Backend is running" }`.
3. **Cek Public API Endpoint**:
   Buka `http://localhost:5000/api/projects` untuk memastikan data proyek ter-render dalam bentuk format json (Status 200).
4. **Cek Admin Protected Endpoint (Tanpa Token)**:
   Buka `http://localhost:5000/api/admin/projects` secara manual. Pastikan backend menolak akses dengan error `{ "status": "error", "message": "Authorization token missing or malformed" }` (Status 401).
5. **Cek Validasi CORS**:
   Pastikan port client (`http://localhost:5173`) dapat melakukan request API tanpa di-block oleh browser CORS Policy.
6. **Jangan Jalankan Migration/Seed di Lingkungan Produksi**:
   Abaikan / hindari perintah `npm run seed` pada server produksi (Railway) setelah setup database Neon aktif dan terisi data nyata CMS.

## Recommended Next Batch
- **Batch F14E — Database/Prisma Audit**: Audit detail Prisma database model indexes, status prisma Client generation, validasi metadata structure JSON, dan database seed payload safety.
- **Batch F14F — Cleanup Candidates Validation**: Eksekusi pembersihan file-file terkonfirmasi tak terpakai (build logs, offline fallbacks, dan scratch scripts) setelah QA audit selesai.
- **Batch F14G — Safe Cleanup Patch 1**: Pembuatan batch patch final untuk mengonsolidasikan perubahan dokumentasi dan cleanup awal di Anti-Gravity IDE.

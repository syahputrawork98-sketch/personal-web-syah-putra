# Backend Documentation

## Fungsi Folder
Folder ini berisi dokumentasi teknis khusus untuk backend, termasuk API, server logic, struktur server, dan koneksi frontend-backend.

## Status Backend Saat Ini
Partial / Structure Audited (Sesuai dengan **F07 Backend API System**). Saat ini web berjalan aman menggunakan fallback data. Endpoint admin/auth tidak boleh digunakan untuk production sebelum F08 dibuka.

## Kapan Update Dokumen Ini
Dokumen di dalam folder ini harus diupdate ketika backend mulai aktif, API endpoint baru dibuat, atau saat mengatur variabel lingkungan.

## Hubungan dengan Feature Batch
Sangat berkaitan dengan **F07 Backend API System** dan **F08 Admin Login and Auth System**. Dokumentasi teknis backend ditulis di sini saat fitur tersebut dihidupkan.
- Lihat [Admin Auth Requirements](ADMIN_AUTH_REQUIREMENT.md) - Definisi spesifikasi dan batasan kebutuhan login (F08).
- Lihat [Auth Flow Design](AUTH_FLOW_DESIGN.md) - Desain alur autentikasi dan arsitektur otorisasi admin (F08).
- Lihat [Auth Security QA](AUTH_SECURITY_QA.md) - Laporan jaminan kualitas dan audit keamanan akses *backend/frontend* (F08).
- [Admin CMS Scope](ADMIN_CMS_SCOPE.md) - Perumusan ruang lingkup pembangunan modul CMS (F09).
- [Project Management CMS QA](PROJECT_MANAGEMENT_CMS_QA.md) - Laporan audit validasi *Project Management Module* (F09B.1).
- [Credential Management CMS QA](CREDENTIAL_MANAGEMENT_CMS_QA.md) - Laporan audit validasi *Credential Management Module* (F09C.1).
- [CV and Asset Link Management CMS QA](CV_ASSET_LINK_CMS_QA.md) - Laporan audit tautan aset dan konfigurasi CV (F09D.1).
- [Profile and Settings Management CMS QA](PROFILE_SETTINGS_CMS_QA.md) - Laporan audit validasi konfigurasi hero, profile, dan contact (F09E.1).

## Area Backend yang Dicatat
- server structure
- API routes
- environment variables example
- auth/session/token (jika nanti aktif)
- security notes

## Validasi Backend Minimal
- Pastikan database lokal PostgreSQL sudah hidup (lihat panduan di `docs/database/README.md`).
- `cd server`
- `npm install`
- `npm run dev`
- Buka `http://localhost:5000/api/health`
- Cek server start jika file backend disentuh.
- Cek API endpoint bila dibuat atau diubah.
- Pastikan tidak ada `secret` atau `.env` yang ter-commit.

## Catatan Penting
- Auth tidak boleh dibuka sebelum F07 memiliki arah teknis yang jelas.
- **[F07-CP]** Audit checkpoint awal backend telah selesai. Tahap berikutnya hanya boleh dilanjutkan jika pengguna secara eksplisit meminta implementasi backend public API.

## Frontend Backend Connection Notes
- Frontend membaca API base URL dari `VITE_API_URL`.
- Default local API adalah `http://localhost:5000`.
- Server local default berjalan di `PORT=5000`.
- Client Vite local umumnya berjalan di `http://localhost:5173`.
- CORS server sudah disiapkan untuk local client.
- Jika backend mati, frontend tetap aman menggunakan fallback data untuk area yang sudah punya fallback.
- Backend belum menjadi sumber data utama production.
- Auth/Admin tetap HOLD.

## Production Deployment Strategy
1. **Hosting:** Gunakan PaaS seperti Render, Railway, Fly.io, atau VPS karena Express.js bersifat stateful dan tidak cocok dideploy murni sebagai serverless function di Vercel tanpa konfigurasi khusus.
2. **Environment Variables:** Wajib mengkonfigurasi `DATABASE_URL`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, dan `CLIENT_URL` di server production.
3. **CORS:** Variabel `CLIENT_URL` wajib berisi domain spesifik frontend production (misal `https://syahputrawork.com`) agar endpoint terlindungi dengan aman.
4. **Auth Warning:** Password default admin dari seed wajib segera diganti setelah server production aktif.

## API Scope Map

| Area | Endpoint Pattern | Status | Source File | Catatan |
|---|---|---|---|---|
| Public | `GET /api/health` | Boleh Audit F07 | `server/src/app.js` | Endpoint sederhana untuk health check. |
| Public | `GET /api/projects` | Boleh Audit F07 | `server/src/routes/public/projects.routes.js` | Daftar semua proyek portfolio. |
| Public | `GET /api/projects/:slug` | Boleh Audit F07 | `server/src/routes/public/projects.routes.js` | Detail proyek spesifik. |
| Public | `GET /api/settings/contact` | Boleh Audit F07 | `server/src/routes/settings.routes.js` | Info kontak publik. |
| Public | `GET /api/settings/hero` | Boleh Audit F07 | `server/src/routes/settings.routes.js` | Info hero section. |
| Public | `GET /api/settings/profile` | Boleh Audit F07 | `server/src/routes/settings.routes.js` | Info profil utama. |
| Public | `GET /api/education` | Boleh Audit F07 | `server/src/routes/education.routes.js` | Data edukasi. |
| Public | `GET /api/skills` | Boleh Audit F07 | `server/src/routes/skills.routes.js` | Data keahlian. |
| Public | `GET /api/experiences` | Boleh Audit F07 | `server/src/routes/experience.routes.js` | Pengalaman kerja. |
| Public | `GET /api/certifications` | Boleh Audit F07 | `server/src/routes/certification.routes.js` | Data sertifikasi/credentials. |
| Auth | `/api/auth/*` | HOLD (sampai F08) | `server/src/routes/auth.routes.js` | Endpoint autentikasi admin. |
| Admin | `/api/admin/*` | HOLD (sampai F08/F09) | `server/src/routes/admin/*.routes.js` | Endpoint proteksi admin (CMS). |

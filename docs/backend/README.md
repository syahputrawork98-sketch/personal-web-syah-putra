# Backend Documentation

## Fungsi Folder
Folder ini berisi dokumentasi teknis khusus untuk backend, termasuk API, server logic, struktur server, dan koneksi frontend-backend.

## Status Backend Saat Ini
Partial / Structure Audited (Sesuai dengan **F07 Backend API System**). Saat ini web berjalan aman menggunakan fallback data. Endpoint admin/auth tidak boleh digunakan untuk production sebelum F08 dibuka.

## Kapan Update Dokumen Ini
Dokumen di dalam folder ini harus diupdate ketika backend mulai aktif, API endpoint baru dibuat, atau saat mengatur variabel lingkungan.

## Hubungan dengan Feature Batch
Sangat berkaitan dengan **F07 Backend API System** dan **F08 Admin Login and Auth System**. Dokumentasi teknis backend ditulis di sini saat fitur tersebut dihidupkan.

## Area Backend yang Dicatat
- server structure
- API routes
- environment variables example
- auth/session/token (jika nanti aktif)
- security notes

## Validasi Backend Minimal
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

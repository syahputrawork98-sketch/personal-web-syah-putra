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

## API Scope Map

| Area | Endpoint Pattern | Status | Source File | Catatan |
|---|---|---|---|---|
| Public | `GET /api/health` | Boleh Audit F07 | `server/src/routes/api.js` | Endpoint sederhana untuk health check. |
| Public | `GET /api/projects` | Boleh Audit F07 | `server/src/routes/api.js` | Daftar semua proyek portfolio. |
| Public | `GET /api/projects/:slug` | Boleh Audit F07 | `server/src/routes/api.js` | Detail proyek spesifik. |
| Public | `GET /api/settings/contact` | Boleh Audit F07 | `server/src/routes/api.js` | Info kontak publik. |
| Public | `GET /api/settings/hero` | Boleh Audit F07 | `server/src/routes/api.js` | Info hero section. |
| Public | `GET /api/settings/profile` | Boleh Audit F07 | `server/src/routes/api.js` | Info profil utama. |
| Public | `GET /api/education` | Boleh Audit F07 | `server/src/routes/api.js` | Data edukasi. |
| Public | `GET /api/skills` | Boleh Audit F07 | `server/src/routes/api.js` | Data keahlian. |
| Public | `GET /api/experiences` | Boleh Audit F07 | `server/src/routes/api.js` | Pengalaman kerja. |
| Public | `GET /api/certifications` | Boleh Audit F07 | `server/src/routes/api.js` | Data sertifikasi/credentials. |
| Auth | `/api/auth/*` | HOLD (sampai F08) | `server/src/routes/auth.js` | Endpoint autentikasi admin. |
| Admin | `/api/admin/*` | HOLD (sampai F08/F09) | `server/src/routes/admin.js` | Endpoint proteksi admin (CMS). |

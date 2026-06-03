# Batch F10 — Deployment and Domain System

## Feature Summary
Deployment Vercel, domain final, production environment, route refresh, dan public release checklist.

## Status
HOLD / Partial

## Story
Mencakup penyelesaian pipeline live deployment agar web bisa dikunjungi publik dengan stabil dan menggunakan domain name aslinya.

## Current State
- Rewrite `vercel.json` sudah diuji.
- Web sudah Local-Ready / Siap pre-deploy.
- Domain belum diputuskan.

## Sub-Batch Roadmap
| Sub-Batch | Name | Status | Purpose | Dependency |
|---|---|---|---|---|
| F10A | Production Deployment Check | Completed | Uji deployment staging. | - |
| F10B | Production Environment Review | Completed | Review kesiapan production: Hosting, DB, CORS, ENV. | F10A |
| F10C | Project Status Terminology Alignment | Completed | Menyelaraskan status terminology project docs (HOLD vs Completed/Runtime Verified). | F10B |
| F10D | Environment Production Review | Not Started | Verifikasi ENV variables aman. | F10C |
| F10E | Public Release QA | Not Started | Pengujian langsung terhadap domain publik. | F10D |
| F10-CP | Deployment System Checkpoint | Completed | Merangkum kesiapan deployment frontend-only dan menegaskan status domain. | - |

## HOLD / Blocked Notes
- Vercel SPA rewrite sudah tersedia.
- Domain final belum ditentukan.

## Next Step
- HOLD / Domain final decision required before F10D (Custom Domain) and F10E (Public Release).
- Siapkan managed database (Supabase/Neon/Render).
- Siapkan Backend VPS/PaaS (Render/Railway).
- Siapkan Frontend Vercel (Production URL).

## Validation Checklist
- Buka dan refresh custom URL domain pada semua variasi routing, pastikan tak terjadi 404 server error.

## Notes
- [F10A] Deployment checklist sudah dibuat. Backend production dan custom domain tetap HOLD menunggu keputusan lebih lanjut.
- [F10B] Production Environment Review selesai. Hasil review:
  1. **Frontend:** Aman di Vercel (client root dir). `VITE_API_URL` harus di-set ke domain backend production.
  2. **Backend:** Membutuhkan instance terpisah seperti Render, Railway, Fly.io, atau VPS karena berbasis Express.js (stateful).
  3. **Database:** Membutuhkan Managed PostgreSQL (misal Supabase, Neon, atau Railway).
  4. **CORS:** Backend `CLIENT_URL` harus diisi dengan domain production Vercel.
  5. **Prisma & Seed:** Migrasi di production gunakan `npx prisma migrate deploy`. **PERINGATAN:** `npm run seed` menggunakan `deleteMany` sehingga sangat berbahaya jika dijalankan ulang di production yang sudah terisi data CMS. Harus dihindari, atau jalankan hanya 1 kali saat initial deployment.
  6. **Auth/CMS:** Admin/Auth logic sudah aman, namun password seed default (`password123` atau `qwerty123`) wajib diganti segera setelah deploy.
- [F10C] Project Status Terminology Alignment selesai. Mengganti semua kata 'HOLD' untuk backend, database, admin, dan auth menjadi 'Completed / Runtime Verified' dan memastikan 'HOLD' murni hanya ditujukan untuk urusan production deployment dan domain.

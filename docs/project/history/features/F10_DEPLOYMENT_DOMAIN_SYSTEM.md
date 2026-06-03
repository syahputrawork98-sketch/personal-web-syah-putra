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
| F10D | Production Environment Variables Checklist | Completed | Verifikasi dan checklist ENV variables aman untuk production. | F10C |
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

## Production Environment Variables Checklist

Berikut adalah daftar variabel lingkungan (ENV) yang dibutuhkan untuk melakukan *live deployment* beserta perbedaannya dengan konfigurasi lokal. **Peringatan:** Jangan pernah menyimpan kredensial production di dalam repository!

### 1. Frontend (Vercel / Netlify)
| Variable | Keterangan Production | Contoh Nilai Production |
|---|---|---|
| `VITE_API_URL` | Harus mengarah ke URL publik backend production Anda. | `https://api.domain-anda.com` |

### 2. Backend (Render / Railway / VPS)
| Variable | Keterangan Production | Contoh Nilai Production |
|---|---|---|
| `DATABASE_URL` | Harus berisi connection string dari Managed PostgreSQL (seperti Supabase atau Neon). | `postgresql://user:pass@host/db` |
| `JWT_SECRET` | Kunci enkripsi sesi admin. Wajib dibuat panjang, acak, dan dirahasiakan sepenuhnya. | *(String acak unik)* |
| `ADMIN_EMAIL` | Email untuk otentikasi login CMS. | `admin@domain-anda.com` |
| `ADMIN_PASSWORD` | Password untuk login CMS. Wajib diganti dari default seed secepat mungkin. | *(Password kuat)* |
| `CLIENT_URL` | Domain frontend publik Anda. Digunakan oleh middleware CORS agar API hanya merespon ke web Anda. | `https://www.domain-anda.com` |
| `PORT` | Tergantung platform hosting (biasanya diisi otomatis oleh Render/Railway). | `5000` |

### 3. Database Deployment Strategy
- **Managed PostgreSQL:** Production harus memakai database serverless/managed (bukan container docker lokal) demi stabilitas dan backup otomatis.
- **Prisma Migrate:** Gunakan perintah `npx prisma migrate deploy` di server backend saat build/start. Jangan menggunakan `migrate dev` di production.
- **Seed Production:** Script `npm run seed` menggunakan fungsi `deleteMany()` untuk me-reset tabel. Jalankan ini **HANYA SATU KALI** saat inisialisasi server baru. Jangan pernah menjalankannya ulang jika website sudah hidup dan Anda sudah menambah konten nyata via CMS, karena akan menghapus seluruh data production Anda!

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
- [F10D] Production Environment Variables Checklist selesai. Panduan env backend dan frontend sudah didokumentasikan, dan peringatan mitigasi seed production ditekankan untuk mencegah hilangnya data di masa depan.

# Current Status

## Project Snapshot
- Nama project: PW Personal Web
- Status website publik: stabil
- Source of Truth: GitHub
- Workspace utama: Anti-Gravity IDE
- Commit/push: dilakukan oleh user
- Default model eksekutor: Gemini 3.1 Pro Low / High
- Alternative acceleration model: hanya jika user meminta percepatan

## Latest Completed Batch
- Batch 27B — Vercel SPA Rewrite Config
- Status: Completed
- Hasil utama:
  - Batch 27A: Audit kesiapan hosting menunjukkan `npm run build` berhasil. Halaman publik utama aman untuk dicek sebelum hosting.
  - Batch 27B: Menambahkan konfigurasi rewrite SPA untuk Vercel di `client/vercel.json`.

## Current Documentation Structure
- docs/project/ untuk manajemen project, workflow, onboarding, dan history
- docs/frontend/ untuk dokumentasi frontend
- docs/backend/ untuk dokumentasi backend
- docs/database/ untuk dokumentasi database

## Active HOLD Items
- **CV Final**: HOLD. (Batch 28A menyiapkan readiness komponen frontend untuk mengunduh PDF, tetapi file PDF asli belum dimasukkan dan masih menunggu user memberikan file final).
- **Admin / Login / Auth**: HOLD. Backend belum utuh, UI publik dibuat bersih dari link login demi keamanan.
- **Domain & Deployment**: HOLD. Lingkungan produksi dan URL kanonikal belum ditetapkan secara final.
- **Credential / Secret Safety**: HOLD / Perhatian Khusus. Tidak boleh ada API key atau rahasia yang di-commit.
- **External Project Asset Links**: HOLD. Link Figma, Drive, RAB, 3D model masih menunggu URL aslinya dimasukkan ke data.

## Deployment Status
- Target awal: Vercel frontend-only deployment
- Status Kesiapan: Frontend sudah siap untuk pre-deploy check, tetapi domain final masih HOLD.
- Root Directory: client
- Build Command: npm run build
- Output Directory: dist
- Backend/Admin/Auth/Database: HOLD
- Checklist singkat sebelum deploy: `npm install`, `npm run build`, `git status` bersih.
- Checklist singkat setelah deploy: Buka semua halaman, refresh pada *direct route*, pastikan tidak ada data sensitif / login publik.

## Next Recommended Step
- Gunakan CURRENT_STATUS.md sebagai satu-satunya patokan status aktif.
- Jika ada perubahan tujuan project, update CURRENT_STATUS.md terlebih dahulu.
- Setelah batch selesai, catat ringkasannya di BATCH_21_TO_30.md atau file batch range berikutnya.

## Safety Rules
- Jangan menyimpan credential, token, API key, password, atau .env di repository.
- Jangan mengubah client/server tanpa scope batch yang jelas.
- Jangan commit/push oleh eksekutor.
- Commit/push dilakukan oleh user setelah hasil dicek di Anti-Gravity IDE.

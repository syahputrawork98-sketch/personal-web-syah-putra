# Deployment Documentation

## Deployment Current State
- Deployment saat ini bersifat frontend-only.
- Backend tidak menjadi production API saat ini (menggunakan data fallback lokal).
- Domain final belum diputuskan.

## Vercel Build Settings
- **Root Directory:** `client`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

## F10A Production Deployment Check
Berikut checklist yang harus diselesaikan untuk pre-check deployment di Vercel:
- [x] Konfigurasi Root Directory ke `client`
- [x] Pastikan command `npm run build` berhasil
- [x] Pastikan folder output adalah `dist`
- [x] Cek Vercel deployment preview berjalan lancar

## SPA Routing Refresh Checklist
- [x] Pastikan `vercel.json` memiliki *SPA rewrite check* (sudah ada di `client/vercel.json`).
- [x] Coba refresh halaman pada nested route dan pastikan tidak mendapatkan error 404.

## Environment Safety Notes
- Pastikan hanya variabel aman yang dimasukkan ke Vercel Environment (seperti `VITE_API_URL`).
- **Penting:** Tidak boleh membuat production env asli berisi secret di dalam repository.
- Backend production tetap tidak aktif.

## HOLD Notes
- Domain custom ditunda (*HOLD*) hingga keputusan domain final tersedia (F10B).

# Personal Web Syah Putra N (SPN)

Selamat datang di repository **Personal Web Syah Putra N**. Website ini dirancang sebagai platform portofolio profesional lintas bidang, mulai dari pengembangan perangkat lunak (IT & Web) hingga desain teknik manufaktur dan estimasi biaya konstruksi (RAB).

## 📂 Struktur Project

Repository ini telah melalui iterasi pengembangan (*Batch*) untuk memastikan standar kualitas tinggi, estetika premium, dan fungsionalitas yang solid:

- **`README.md`**: Dokumentasi utama repository (file ini).
- **`FITUR.md`**: Ringkasan fitur utama website dan referensi status HOLD.
- **`docs/`**: Pusat dokumentasi internal. Baca `docs/project/onboarding/CHATGPT_PROJECT_INSTRUCTIONS.md` untuk memahami konteks project secara instan (terutama untuk AI).
- **`client/`**: Source code Frontend (React + Vite) dengan sistem kategori proyek dinamis dan CV Variant Selector.
- **`server/`**: Backend API (Completed / Runtime Verified - saat ini website bisa berjalan dengan backend atau data fallback lokal).

## ✨ Fitur Utama

- **Branding Monogram SPN**: Identitas visual yang konsisten dengan nama publik "Syah Putra N".
- **Multi-Category Portfolio**: Sistem filter proyek untuk IT & Web, Manufaktur & Teknik, Model 3D, serta Bangunan & RAB.
- **Project Detail Modal**: Overlay interaktif dengan Link Tiles dinamis (GitHub, Drive, Figma, Model Preview).
- **CV Variant Selector**: Memungkinkan pengunjung memilih versi CV yang relevan (Web Dev, Manufaktur, atau Sipil/RAB).
- **Newspaper CV Wireframe**: Pratinjau konsep CV bergaya editorial koran yang unik.
- **Credentials Manager**: Integrasi pratinjau sertifikat profesional melalui Google Drive.
- **High Performance & A11y**: Dioptimasi untuk kecepatan akses dan aksesibilitas dasar (aria-labels).

## 🚀 Cara Menjalankan Lokal

1. Clone repository ini.
2. Masuk ke direktori `client/`.
3. Jalankan perintah:
   ```bash
   npm install
   npm run dev
   ```
4. Untuk verifikasi kesiapan produksi, jalankan:
   ```bash
   npm run build
   ```

## 🌐 Deployment Preview ke Vercel

Deployment awal menggunakan Vercel untuk frontend-only:
- **Root Directory**: `client`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- Catatan detail ada di Feature Tracker F10 pada `docs/project/history/CURRENT_STATUS.md`

## 🛠️ Status Pengembangan & Batasan Khusus

- **PDF CV Final**: File PDF CV asli masih dalam tahap finalisasi tata letak (Status: *Coming Soon* di UI).
- **Login & Auth**: Completed logic; production exposure pending F10 security/deployment readiness.
- **Project Assets**: Link eksternal (Figma/Drive/RAB) hanya muncul jika URL asli telah tersedia di data model.
- **Deployment**: HOLD / Partial until domain, hosting, production env, and public release are finalized.

---
&copy; 2026 Syah Putra N. Dibangun dengan Presisi.
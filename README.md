# Personal Web Syah Putra Nugraha

Selamat datang di repository **Personal Web Syah Putra Nugraha**. Ini adalah pusat pengembangan website pribadi yang dibangun dengan pendekatan modern, terstruktur, dan profesional.

## 📂 Struktur Project (Post-Refactor Batch 10)

Repository ini telah melalui siklus refactor besar untuk meningkatkan maintainability, performa, dan kesiapan produksi:

- **`README.md`**: Dokumentasi utama repository (file ini).
- **`FITUR.md`**: Catatan riwayat Batch 1-10 dan status fitur.
- **`docs/`**: Dokumentasi internal, roadmap, production checklist, dan catatan teknis.
- **`client/`**: Source code Frontend (React + Vite) yang telah dioptimasi.
- **`server/`**: Skeleton/Legacy Backend API (HOLD - bukan fokus produksi saat ini).

## 🚀 Cara Menjalankan Frontend

Untuk menjalankan frontend di lokal, masuk ke folder `client/` dan gunakan npm:

```bash
cd client
npm install
npm run dev
```

Untuk melakukan build produksi:

```bash
npm run build
```

## 🛠️ Status Pengembangan & Production Readiness

- **Frontend**: Telah dioptimasi dengan pembersihan styling, ekstraksi komponen, metadata SEO, aksesibilitas dasar, dan mekanisme fallback data statis.
- **Backend (`server/`)**: Saat ini masih berupa skeleton/placeholder. Fokus utama adalah kemandirian frontend (self-sufficient with fallbacks).
- **Login & Auth**: Saat ini **HOLD** hingga fase akhir. Sistem admin/login tidak ditampilkan di UI publik dan hanya dapat diakses melalui URL manual nantinya.
- **CV Asset**: File `CV_Syah_Putra_Nugraha.pdf` di folder `public/` saat ini masih berupa **placeholder**. Perlu diganti dengan file final sebelum go-live.
- **Deployment**: Belum dikonfigurasi (HOLD).

---
&copy; 2026 Syah Putra Nugraha.
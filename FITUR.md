# FITUR - Personal Web Syah Putra

Dokumen ini merangkum area fitur utama, status project, dan status integrasi fungsional dari repository personal web.

## Status Umum
Project saat ini berada pada tahap kestabilan website publik (frontend). Riwayat pengembangan iteratif (Batch) telah dipindahkan secara independen agar dokumen ini fokus pada ringkasan fitur berjalan.

## Target Struktur Repository
```txt
client/       # Source code frontend utama (React + Vite)
server/       # Source code backend (Completed / Runtime Verified)
docs/         # Pusat dokumentasi resmi project, panduan, dan technical notes
README.md     # Ringkasan utama project
FITUR.md      # Rangkuman fitur berjalan dan status fungsionalitas
```

## Fitur Utama Website (Aktif)
- **Multi-Category Portfolio**: Sistem filter dinamis proyek lintas bidang (IT & Web, Manufaktur & Teknik, Model 3D, Bangunan & RAB).
- **Project Detail Modal**: Overlay interaktif untuk detail komprehensif proyek dengan sistem Link Tiles cerdas.
- **CV Variant Selector**: Fasilitas unduh/pratinjau CV yang ditargetkan untuk bidang keahlian spesifik beserta Newspaper Wireframe preview.
- **CV Builder (CMS)**: Alat pembuat CV A4 dinamis terintegrasi di dalam panel admin (Completed untuk admin dengan PDF export browser-print, public download tersinkron ke PDF statis final).
- **Credentials Manager**: Integrasi sertifikat dan dokumen lisensi dengan fitur Google Drive Preview langsung di dalam halaman.
- **Branding Monogram SPN**: Identitas visual seragam pada komponen navigasi publik.
- **Data Fallback System**: Ketahanan layanan dengan data statis lokal jika akses server backend tidak tersedia.
- **Learning Library**: Arsip pembelajaran terstruktur untuk mencatat progres studi dan repositori latihan teknis. Didukung oleh integrasi API dinamis dan pengelola konten via Admin CMS.

## 🚩 Status Deployment & Batasan Produksi
Daftar status integrasi lingkungan produksi dan batasan rilis publik saat ini.
Selengkapnya dapat dilihat pada: **[docs/project/history/CURRENT_STATUS.md](docs/project/history/CURRENT_STATUS.md)**

1. **CV Final (PDF)**: Sudah tersedia (public download sudah mengarah ke PDF ATS statis final).
2. **Sistem Admin & Auth (CMS)**: Logic completed dan production readiness mengikuti status deployment aktif (akses dibatasi hanya untuk admin via konfigurasi environment secure).
3. **Database**: Neon PostgreSQL managed production aktif pada branch production.
4. **Konfigurasi Domain & Deployment**: Production live di Vercel/Railway/Neon; custom domain opsional / belum final.
5. **URL Final untuk Data Aset Proyek Eksternal**: Menunggu input dari user (jika relevan).

## Riwayat Pengembangan (Feature Tracking)
Sistem pencatatan riwayat lama berbasis *batch-by-batch* numerik (Batch 01 - 30) telah digantikan oleh sistem *Feature Batch Tracking*. 
Silakan merujuk ke dokumen berikut untuk melihat status dan riwayat aktif fitur:
- **[CURRENT_STATUS.md](docs/project/history/CURRENT_STATUS.md)**: Pusat Feature Tracker aktif.
- **[FEATURE_HISTORY.md](docs/project/history/FEATURE_HISTORY.md)**: Rangkuman riwayat fitur.

---
**Catatan**: Fokus utama dokumentasi di sini adalah kejelasan fitur yang berjalan. Untuk mengetahui detail instruksi AI atau SOP manajemen, rujuk ke folder `docs/project/workflow/`.

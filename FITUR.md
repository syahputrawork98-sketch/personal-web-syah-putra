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
- **Learning Library**: Arsip pembelajaran terstruktur untuk mencatat progres studi dan repositori latihan teknis (Fase awal: Public Static Page; Admin CMS pada tahap berikutnya).

## 🚩 Status Deployment & Batasan Produksi
Daftar fitur, aset, dan lingkungan yang masih belum diekspos ke publik atau menunggu penyelesaian akhir.
Selengkapnya dapat dilihat pada: **[docs/project/history/CURRENT_STATUS.md](docs/project/history/CURRENT_STATUS.md)**

1. **CV Final (PDF)**: Belum tersedia.
2. **Sistem Admin & Auth (CMS)**: Completed logic; production exposure pending F10 deployment readiness.
3. **Database**: Development database runtime verified; production managed database pending.
4. **Konfigurasi Domain & Deployment**: HOLD / Partial until domain, hosting, production env, and public release are finalized.
5. **URL Final untuk Data Aset Proyek Eksternal**: Menunggu input.

## Riwayat Pengembangan (Feature Tracking)
Sistem pencatatan riwayat lama berbasis *batch-by-batch* numerik (Batch 01 - 30) telah digantikan oleh sistem *Feature Batch Tracking*. 
Silakan merujuk ke dokumen berikut untuk melihat status dan riwayat aktif fitur:
- **[CURRENT_STATUS.md](docs/project/history/CURRENT_STATUS.md)**: Pusat Feature Tracker aktif.
- **[FEATURE_HISTORY.md](docs/project/history/FEATURE_HISTORY.md)**: Rangkuman riwayat fitur.

---
**Catatan**: Fokus utama dokumentasi di sini adalah kejelasan fitur yang berjalan. Untuk mengetahui detail instruksi AI atau SOP manajemen, rujuk ke folder `docs/project/workflow/`.

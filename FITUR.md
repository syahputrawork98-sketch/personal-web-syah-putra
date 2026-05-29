# FITUR - Personal Web Syah Putra

Dokumen ini merangkum area fitur utama, status project, dan status integrasi fungsional dari repository personal web.

## Status Umum
Project saat ini berada pada tahap kestabilan website publik (frontend). Riwayat pengembangan iteratif (Batch) telah dipindahkan secara independen agar dokumen ini fokus pada ringkasan fitur berjalan.

## Target Struktur Repository
```txt
client/       # Source code frontend utama (React + Vite)
server/       # Source code backend (Saat ini HOLD/Skeleton)
docs/         # Pusat dokumentasi resmi project, panduan, dan technical notes
README.md     # Ringkasan utama project
FITUR.md      # Rangkuman fitur berjalan dan status fungsionalitas
```

## Fitur Utama Website (Aktif)
- **Multi-Category Portfolio**: Sistem filter dinamis proyek lintas bidang (IT & Web, Manufaktur & Teknik, Model 3D, Bangunan & RAB).
- **Project Detail Modal**: Overlay interaktif untuk detail komprehensif proyek dengan sistem Link Tiles cerdas.
- **CV Variant Selector**: Fasilitas unduh/pratinjau CV yang ditargetkan untuk bidang keahlian spesifik beserta Newspaper Wireframe preview.
- **Credentials Manager**: Integrasi sertifikat dan dokumen lisensi dengan fitur Google Drive Preview langsung di dalam halaman.
- **Branding Monogram SPN**: Identitas visual seragam pada komponen navigasi publik.
- **Data Fallback System**: Ketahanan layanan dengan data statis lokal jika akses server backend tidak tersedia.

## 🚩 Status HOLD (Tertahan)
Daftar fitur, aset, dan lingkungan yang belum aktif atau masih menunggu penyelesaian akhir.
Selengkapnya dapat dilihat pada: **[docs/project/history/HOLD_ITEMS.md](docs/project/history/HOLD_ITEMS.md)**

1. **CV Final (PDF)**
2. **Sistem Admin & Auth (Login)**
3. **Konfigurasi Domain & Deployment**
4. **URL Final untuk Data Aset Proyek Eksternal**

## Riwayat Pengembangan (Batch History)
Pencatatan riwayat *batch-by-batch* telah diarsipkan untuk menjaga kebersihan root dokumentasi. Silakan merujuk ke folder sejarah batch berikut:
- **[Batch 01 - 10](docs/project/history/BATCH_01_TO_10.md)**: Tahap root struktur, ekstraksi data, dan cleanup awal.
- **[Batch 11 - 20](docs/project/history/BATCH_11_TO_20.md)**: Tahap fitur kompleks (Modal, CV Selector, Credentials), desain responsif, dan Production QA.
- **[Batch 21 - 30](docs/project/history/BATCH_21_TO_30.md)**: Tahap penyusunan SOP tata kelola, dokumentasi, dan integrasi berkelanjutan.

---
**Catatan**: Fokus utama dokumentasi di sini adalah kejelasan fitur yang berjalan. Untuk mengetahui detail instruksi AI atau SOP manajemen, rujuk ke folder `docs/project/workflow/`.

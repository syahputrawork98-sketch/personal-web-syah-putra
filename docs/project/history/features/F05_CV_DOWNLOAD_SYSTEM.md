# Batch F05 — CV Download System

## Feature Summary
CV Variant Selector, preview CV, dan download PDF final.

## Status
Partial

## Story
Mencakup CV Variant Selector, preview CV berbasis Newspaper Wireframe, dan fungsionalitas download PDF final yang disesuaikan dengan role spesifik pengunjung (Web Dev, Manufaktur, dll).

## Current State
- UI Selector sudah ada.
- Newspaper wireframe preview berfungsi.
- File PDF asli belum tersedia.

## Sub-Batch Roadmap
| Sub-Batch | Name | Status | Purpose | Dependency |
|---|---|---|---|---|
| F05A | Final CV PDF Asset Preparation | HOLD | Persiapan file PDF oleh user. | - |
| F05B | CV Download Integration / Hardening | Completed | Pemasangan link/file unduhan dan hardening flow. | F05A |
| F05C | CV Download QA | Completed | Testing akses unduhan CV. | F05B |

## HOLD / Blocked Notes
- PDF CV final belum tersedia.

## Next Step
- F05A setelah user menyediakan file PDF CV final.

## Validation Checklist
- Pastikan semua tombol download mengunduh file yang tepat.

## Notes
- [F05B] CV Download Flow Hardening selesai. UI download sudah dicegah agar tidak menghasilkan href kosong jika pdfUrl tidak tersedia. File PDF 'CV_Syah_Putra_Nugraha.pdf' berhasil diintegrasikan pada varian Web Developer. Varian lain tetap menggunakan tombol disabled "PDF Belum Tersedia".
- [F05C] QA selesai. File placeholder dipindah ke `public/cv/cv-syah-putra-nugraha-web-developer.pdf` untuk kerapian. Sistem *disable button* untuk file yang tidak ada sudah terverifikasi aman. Build frontend berhasil dijalankan.

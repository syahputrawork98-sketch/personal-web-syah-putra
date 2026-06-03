# Batch F05 — CV Download System

## Feature Summary
CV Variant Selector, preview CV, dan download PDF final.

## Status
Completed

## Story
Mencakup CV Variant Selector, preview CV berbasis Newspaper Wireframe, dan fungsionalitas download PDF final yang disesuaikan dengan role spesifik pengunjung (Web Dev, Manufaktur, dll). Flow public kini disederhanakan menjadi satu tombol download langsung ke PDF utama.

## Current State
- UI Selector sudah ditiadakan di halaman public.
- Halaman public menggunakan single download flow untuk PDF utama.
- Data varian tetap disimpan untuk kebutuhan admin/CV Builder.

## Sub-Batch Roadmap
| Sub-Batch | Name | Status | Purpose | Dependency |
|---|---|---|---|---|
| F05A | Final CV PDF Asset Preparation | Completed | Persiapan file PDF oleh user. | - |
| F05B | CV Download Integration / Hardening | Completed | Pemasangan link/file unduhan dan hardening flow. | F05A |
| F05C | CV Download QA | Completed | Testing akses unduhan CV. | F05B |
| F05D | Public Single Download Flow Simplification | Completed | Penyederhanaan flow public menjadi single download dan penghapusan modal pilihan varian. | F05C |

## HOLD / Blocked Notes
- (Tidak ada hambatan. F05 dinyatakan selesai).

## Next Step
- Mengelola data CV Variant Selector di area Admin/CV Builder di batch selanjutnya.

## Validation Checklist
- Pastikan semua tombol download mengunduh file yang tepat.
- Pastikan tidak ada href kosong pada link download.

## Notes
- [F05B] CV Download Flow Hardening selesai. UI download sudah dicegah agar tidak menghasilkan href kosong jika pdfUrl tidak tersedia. File PDF 'CV_Syah_Putra_Nugraha.pdf' berhasil diintegrasikan pada varian Web Developer. Varian lain tetap menggunakan tombol disabled "PDF Belum Tersedia".
- [F05C] QA selesai. File placeholder dipindah ke `public/cv/cv-syah-putra-nugraha-web-developer.pdf` untuk kerapian. Sistem *disable button* untuk file yang tidak ada sudah terverifikasi aman. Build frontend berhasil dijalankan.
- [F05D] Flow public disederhanakan. Modal CV Variant Selector tidak lagi digunakan di halaman Home public. Tombol "Download CV" sekarang langsung mengarah (href) ke PDF utama (`/cv/cv-syah-putra-nugraha-web-developer.pdf`). Data `cvVariants` dibiarkan utuh jika masih berguna untuk internal/admin.

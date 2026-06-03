# Batch F11 — CV Builder and PDF Export System

## Feature Summary
Sistem pembuat CV (Curriculum Vitae) dinamis berbasis data dari database. Admin dapat memilih, mengurutkan, dan menampilkan profil, pengalaman, pendidikan, proyek, skill, dan kredensial menjadi format halaman A4, lalu mengekspornya menjadi dokumen PDF.

## Status
Partial (F11A Completed)

## Story
User ingin data portofolio yang sudah terstruktur rapi di database (projects, skills, experience, dll) dapat dimanfaatkan ulang menjadi CV terstandarisasi tanpa harus mengetik ulang di software desain (Word/Canva). CV harus bisa dikonfigurasi urutannya dan diekspor ke PDF dengan tampilan profesional.

## Kelayakan (Feasibility Analysis)
**Status Kelayakan: LAYAK (FEASIBLE)**
Fitur ini sangat layak dibangun pada arsitektur monorepo saat ini. Mengingat *Single Source of Truth* sudah tersentralisasi di PostgreSQL melalui Prisma, kita hanya perlu membangun antarmuka penyusun (builder) di React dan memanfaatkan CSS `@media print` untuk ekspor PDF tanpa menambah beban dependensi berat di backend.

### Data Source Map
Data yang **SUDAH SIAP** dipakai dari API:
- **Profile & Contact**: (Dari Site Settings)
- **Experience**: `/api/admin/experience`
- **Education**: `/api/admin/education`
- **Skills**: `/api/admin/skills`
- **Projects**: `/api/admin/projects`
- **Credentials/Certifications**: `/api/admin/certifications`

Data yang **BELUM SIAP/KURANG**:
- *Professional Summary* spesifik CV (saat ini hanya ada Hero Subtitle). Solusi MVP: Gunakan input text *free-form* di CV Builder atau simpan sebagai setting terpisah.
- *Section Visibility & Ordering*: Konfigurasi mana yang tampil dan urutannya belum ada di database. Solusi MVP: Disimpan sebagai satu objek JSON di tabel Settings (contoh key: `CV_BUILDER_CONFIG`) agar tidak perlu merubah schema Prisma.

## Rencana UI & Arsitektur `/admin/cv-builder`
### 1. Rekomendasi MVP (Tanpa Drag-and-Drop)
Agar implementasi aman dan tidak berat, MVP akan menggunakan pendekatan form kontrol klasik:
- **Checkbox (Show/Hide)**: Untuk memilih item apa saja yang dimasukkan ke CV.
- **Tombol Up/Down**: Untuk mengatur urutan (*sorting*) item dalam satu section, dan mengurutkan posisi antar section.
- **A4 Preview Panel**: Sebelah kanan layar menampilkan *live preview* A4 (proporsi 210 x 297 mm) yang otomatis ter-update saat konfigurasi diubah.

### 2. Rencana Export PDF
- **Pendekatan Terbaik MVP**: **Client-side Browser Print (`window.print()`) dengan CSS `@media print`**.
- **Alasan**: *Zero-dependency*. Tidak perlu menginstal pustaka backend raksasa seperti Puppeteer, dan tidak membebani server Node.js. Browser modern sudah memiliki mesin render PDF (*Save as PDF*) yang sangat akurat jika kita membekalinya dengan aturan CSS `page-break-inside: avoid` dan `@page { size: A4; margin: 0; }`.

### 3. Rencana Penyimpanan (Database/Config)
- **Tanpa Mengubah Schema**: Mengingat pantangan mengubah `schema.prisma`, preferensi terbaik adalah memanfaatkan sistem `SiteSetting` yang sudah ada (tabel `Setting` dengan `key` - `value`).
- Kita bisa membuat satu record ber-key `CV_CONFIG` yang berisi JSON string. JSON ini merepresentasikan ID data terpilih dan urutannya.

### 4. Hubungan dengan F05 (CV Download System)
- **F05** adalah sistem unduhan *file statis* untuk konsumsi publik.
- **F11** adalah *internal tool* (CMS Admin) untuk men-generate file PDF tersebut.
- **Alur Kerja**: Admin mengatur susunan CV di F11 (CV Builder), mencetaknya menjadi file PDF (*Save as PDF*), lalu mengunggah/meletakkan file PDF tersebut ke direktori statis untuk disajikan oleh F05. Tidak ada konflik, justru saling melengkapi.

## Risiko Teknis
1. **CSS Pagination (Page Breaks)**: Teks yang terpotong di antara dua halaman A4 saat di-print. Mitigasi: Penggunaan CSS `break-inside: avoid` pada setiap kontainer item (experience/project).
2. **Keterbatasan Ruang A4**: Jika admin memilih terlalu banyak project, CV akan melebar hingga 3-4 halaman.
3. **Inkonsistensi Render Browser**: Chrome, Firefox, dan Safari memiliki *print engine* berbeda. Mitigasi: Standarisasi menggunakan layout flex/grid modern dengan unit absolut (mm/cm/pt, bukan persentase).

## Sub-Batch Roadmap
| Sub-Batch | Name | Status | Purpose | Dependency |
|---|---|---|---|---|
| F11A | CV Builder Feasibility and Scope Design | Completed | Analisis awal, desain UI, dan penentuan limitasi MVP. | - |
| F11B | CV Builder UI Skeleton & Data Fetching | HOLD | Membuat *layout* dasar kiri-kanan (Config vs Preview) dan menyedot semua data dari API. | F11A |
| F11C | CV Config State & Ordering Control | HOLD | Membangun *logic* Checkbox (Show/Hide) dan tombol Up/Down (tanpa drag-and-drop). | F11B |
| F11D | A4 Print CSS & Client-side Export | HOLD | Memoles tampilan *preview* dan menyuntikkan aturan `@media print` & *Page Break*. | F11C |
| F11E | Save Config to DB (JSON Site Settings) | HOLD | Menyimpan *state* susunan CV ke database melalui *endpoint settings* yang sudah ada. | F11D |

## HOLD / Blocked Notes
- Melangkah ke F11B di batch eksekusi berikutnya.

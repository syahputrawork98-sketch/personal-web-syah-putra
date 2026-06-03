# Batch F11 — CV Builder and PDF Export System

## Feature Summary
Sistem pembuat CV (Curriculum Vitae) dinamis berbasis data dari database. Admin dapat memilih, mengurutkan, dan menampilkan profil, pengalaman, pendidikan, proyek, skill, dan kredensial menjadi format halaman A4, lalu mengekspornya menjadi dokumen PDF.

## Status
Partial (F11B Completed)

## Story
User ingin data portofolio yang sudah terstruktur rapi di database (projects, skills, experience, dll) dapat dimanfaatkan ulang menjadi CV terstandarisasi tanpa harus mengetik ulang di software desain (Word/Canva). CV harus bisa dikonfigurasi urutannya dan diekspor ke PDF dengan tampilan profesional.

## Kelayakan (Feasibility Analysis)
**Status Kelayakan: LAYAK (FEASIBLE)**
Fitur ini sangat layak dibangun pada arsitektur monorepo saat ini. Pembangun (Builder) CV murni menjadi domain fungsionalitas Admin CMS.

### Arsitektur Peran Terpisah (Separation of Concerns)
1. **Admin UI (`/admin/cv-builder`)**: Tempat admin mengatur tata letak, data yang disertakan (checkbox), dan urutan komponen (up/down). Tidak ada CV yang di-*generate* di Public Client.
2. **Backend/Server (`server/src`)**: Berfungsi penuh sebagai penyimpan tata ruang (JSON Config) di tabel Settings dan bertugas menyimpan/mengonfirmasi berkas final PDF yang diserahkan Admin.
3. **Public Client (`/`)**: Hanya dan semata-mata menampilkan tombol "Download CV" yang mengarah kepada URL dari PDF final yang telah di-*generate* (F05). Tidak ada logika perangkaian CV di sisi awam.

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
- **Konfigurasi (JSON Contract)**: Mengingat pantangan mengubah `schema.prisma`, preferensi terbaik adalah memanfaatkan tabel `Setting` (key-value) yang sudah ada. Kita akan menyuntikkan entri ber-key `CV_BUILDER_CONFIG` berisi *stringified* JSON yang memetakan preferensi seksi mana saja yang dihidupkan, prioritas urutan, dan pengait spesifik *item*.
- **Penyimpanan Berkas Fisik (PDF)**: Dokumen final akan direkam di direktori statis (misal `public/uploads/cv`) atau fasilitas penyimpanan eksternal (Cloudinary/S3). Alamat URL-nya akan dibenamkan di setelan khusus (misal `activeCvUrl`) agar F05 langsung memanen URL ini.

#### Contoh JSON Contract (`CV_BUILDER_CONFIG`)
```json
{
  "template": "classic-a4",
  "sections": [
    { "id": "profile", "enabled": true, "order": 1 },
    { "id": "experience", "enabled": true, "order": 2, "selectedIds": [] },
    { "id": "education", "enabled": true, "order": 3, "selectedIds": [] },
    { "id": "skills", "enabled": true, "order": 4, "selectedIds": [] },
    { "id": "projects", "enabled": true, "order": 5, "selectedIds": [] },
    { "id": "credentials", "enabled": false, "order": 6, "selectedIds": [] }
  ],
  "summary": "",
  "activeCvUrl": "/uploads/cv/final-cv.pdf",
  "updatedAt": "2026-06-03T00:00:00.000Z"
}
```

### 4. Rencana Endpoint Backend (Contract)
Untuk menopang transaksi arsitektural ini (tanpa perlu dieksekusi sekarang), rancangan *endpoint* yang kelak dilibatkan adalah:
- **`GET /api/admin/cv-builder/config`** : Menggali formasi `CV_BUILDER_CONFIG` milik Admin.
- **`PUT /api/admin/cv-builder/config`** : Menyimpan susunan formasi `CV_BUILDER_CONFIG`.
- **`POST /api/admin/cv-builder/generate`** : Mengelola unggahan PDF murni hasil perakitan `window.print()` Admin (atau delegasi pembuatan via *server* jika diperlukan).
- **`GET /api/cv/active`** : *Endpoint* publik mutlak yang dituju Client F05 untuk mengunduh berkas fisik yang URL-nya tersemat pada config.

### 5. Hubungan dengan F05 (CV Download System)
- **F11 (CV Builder CMS)** menyiapkan dan menunjuk letak URL PDF terakhir yang direstui oleh Admin.
- **F05 (Public Client Download)** sekadar "mengetuk" `/api/cv/active` lalu memicu antarmuka `download` browser bagi si Pengunjung Web tanpa memikirkan kerumitan perangkaian data.

## Risiko Teknis
1. **CSS Pagination (Page Breaks)**: Teks yang terpotong di antara dua halaman A4 saat di-print. Mitigasi: Penggunaan CSS `break-inside: avoid` pada setiap kontainer item (experience/project).
2. **Keterbatasan Ruang A4**: Jika admin memilih terlalu banyak project, CV akan melebar hingga 3-4 halaman.
3. **Inkonsistensi Render Browser**: Chrome, Firefox, dan Safari memiliki *print engine* berbeda. Mitigasi: Standarisasi menggunakan layout flex/grid modern dengan unit absolut (mm/cm/pt, bukan persentase).

## Sub-Batch Roadmap (Revised)
| Sub-Batch | Name | Status | Purpose | Dependency |
|---|---|---|---|---|
| F11A | CV Builder Feasibility and Scope Design | Completed | Analisis awal, desain UI, dan penentuan limitasi MVP. | - |
| F11B | CV Builder UI Skeleton & Data Fetching | Completed | Membuat *layout* dasar kiri-kanan (Config vs Preview) dan menyedot data dari API. | F11A |
| F11C | CV Builder Server Contract & Architecture | Completed | Revisi arsitektur peran client-server, merancang skema penyimpanan JSON, dan memetakan *endpoints*. | F11B |
| F11D | CV Config State & Database Saving | Completed | Membangun *logic* Checkbox/Sorting di Admin UI dan menyambungkannya ke `/api/admin/cv-builder/config` (JSON db save). | F11C |
| F11E.1 | CV Builder Input UX and ATS Layout Cleanup | Completed | Merapikan UI/UX form input (Manual Identity, Skill Chip Selector) dan membersihkan layout ATS preview agar lebih rapi. | F11D |
| F11E.2 | Unified Database Item Selector UX | Completed | Menerapkan pola search + chip selector untuk semua seksi (Experience, Education, Projects, Credentials) menggantikan checklist panjang. | F11E.1 |
| F11E | PDF Generation & Export Workflow | HOLD | Menyuntikkan CSS `@media print` dan mengirim hasil cetakan final ke backend `/api/admin/cv-builder/generate`. | F11E.2 |
| F11F | Public Download Integration (F05 Sync) | HOLD | Menambatkan tombol "Download CV" publik ke *endpoint* `/api/cv/active` untuk meraih *file* terakhir. | F11E |

## HOLD / Blocked Notes
- Melangkah ke F11E di batch eksekusi berikutnya.

## Eksekusi Log
- [F11B] Berhasil membuat skeleton `/admin/cv-builder` dengan grid layout kiri-kanan. Data config Profile, Contact, Experience, Education, Skills, Projects, dan Credentials tersambung mulus dari Prisma DB via *existing endpoints* di `lib/api.js`. Live preview kanan mensimulasikan kertas A4 murni dengan CSS Proporsional yang siap untuk pencetakan (tanpa PDF Export backend). Belum ada mekanisme simpan urutan (masih statis).
- [F11C] Meluruskan arsitektur aplikasi agar pembangunan dan susunan CV strictly dilakukan di wilayah Admin/Backend, dan domain Publik hanya bertugas menerima *file* statis yang sudah dipoles. Menyepakati bentuk *JSON Contract*, tata cara penyimpanan (`Setting` model), serta menyelaraskan F11 dengan modul CV unduhan di F05.
- [F11D] Mengimplementasikan _state management_ untuk CV Builder. Admin kini bisa melakukan centang _show/hide_, menata urutan dengan tombol *Up/Down*, memfilter item tertentu (contoh: hanya memunculkan 2 proyek unggulan), dan menyimpan `CV_BUILDER_CONFIG` dalam wujud JSON ke tabel `Setting` via rute `/api/admin/cv-builder/config`. Pratinjau A4 sudah bereaksi secara *real-time* terhadap modifikasi State UI.
- [F11E.1] Merapikan UX CV Builder. Form dibagi menjadi Manual CV Identity (displayName, professionalTitle, targetRole, links) dan Database Sections. Skill selector diubah menjadi pencarian dengan chip selection agar tidak memakan ruang dengan list panjang. Experience dan Education diatur default aktif (mandatory). Layout A4 Preview dibersihkan menjadi lebih formal dan ATS-friendly (penggunaan sans-serif bersih, heading standar, dan struktur yang mudah dibaca).
- [F11E.2] Menerapkan *Unified Database Item Selector*. Sistem seleksi item *search + chip* (yang sebelumnya hanya ada di Skills) kini diterapkan ke semua *Database Sections* (Projects, Experience, Education, dan Credentials). Checklist panjang sudah tidak digunakan, menghemat banyak ruang visual dan mempermudah kurasi CV yang presisi.

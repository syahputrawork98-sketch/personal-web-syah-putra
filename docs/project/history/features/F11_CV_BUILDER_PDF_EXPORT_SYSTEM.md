# Batch F11 — CV Builder and PDF Export System

## Feature Summary
Sistem pembuat CV (Curriculum Vitae) dinamis berbasis data dari database. Admin dapat memilih, mengurutkan, dan menampilkan profil, pengalaman, pendidikan, proyek, skill, dan kredensial menjadi format halaman A4, lalu mengekspornya menjadi dokumen PDF.

## Status
Completed

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
| F11E.3 | ATS Print Layout and Browser PDF Export | Completed | Mengaktifkan tombol Print PDF berbasis browser (`window.print()`) dan menambahkan CSS `@media print` murni. | F11E.2 |
| F11E.4 | ATS Print QA Polish and Final Layout Guard | Completed | Melakukan QA spacing layout, menambah helper note UX di admin, dan mengamankan print CSS `page-break-inside`. | F11E.3 |
| F11F | Public Download Integration (F05 Sync) | Completed | Menambatkan tombol "Download CV" publik ke URL statis file PDF final. Menunggu user meletakkan file ATS final di direktori `public/cv`. | F11E.4 |
| F11F.1 | Final ATS PDF Handoff Activation | Completed | Mengaktifkan tombol Download CV publik menggunakan file final `cv-syah-putra-nugraha-ats.pdf`. | F11F |
| F11G | ATS Preview Typography and Compact Layout Polish | Completed | Merapikan tipografi dan kepadatan layout (compact ATS spacing) di area `cv-print-area`. | F11F.1 |
| F11G.1 | Contact-Sourced CV Links and Compact Experience Date Polish | Completed | Mengambil link (Website, LinkedIn, GitHub, Instagram) otomatis dari setelan Contact, menambahkan field Website di AdminContact, dan merapikan layout penanggalan Experience/Education. | F11G |
| F11G.2 | True-Scale Preview Margin and Final PDF Naming Polish | Completed | Menskalakan area preview CV di layar menjadi ukuran proporsional (0.85) agar terlihat seperti A4 sebenarnya tanpa memengaruhi hasil print (1.0). Mengubah margin aman (20mm) dan padding (14mm). Standardisasi nama URL PDF akhir ke `syahputra-n-ats-cv.pdf`. | F11G.1 |
| F11H | CV Builder UX Workflow Polish | Completed | Mengubah panel kontrol CV Builder menjadi tab/step workflow, menambahkan dirty state Saved/Unsaved, summary status widget, helper preview/export, dan warning perubahan belum disimpan. | F11G.2 |
| F11I | CV Builder Rendering Logic Fix | Completed | Menghapus pembagian experience berbasis keyword web/developer, menyatukan experience ke Work Experience, dan membuat helper rendering section yang lebih reusable. | F11H |
| F11J | CV Builder Item Selection UX Polish | Completed | Menambahkan Select All, Clear Selection, item stats, selected item metadata, empty state, dan copywriting selector yang lebih jelas. | F11I |
| F11K | CV Builder Manual Curated Preview Mode | Completed | Mengubah selectedIds kosong menjadi section tidak tampil, menambahkan contact override CV, serta menjadikan preview awal hanya berisi identity/contact/summary sampai admin memilih item manual. | F11J |
| F11L | CV Builder Variant Preset Foundation | Completed | Menambahkan fondasi variant/preset CV: Web Developer, Konstruksi/Civil Engineering, Manufaktur, dan ATS Umum dengan identity, summary, contact, sections, dan selectedIds per variant. | F11K |
| F11M | CV Builder Component Split, Contact Link Correction, and Flow Preview Layout | Completed | Memecah AdminCvBuilder menjadi komponen/utility, memperbaiki Bitly LinkedIn agar tidak masuk GitHub, dan mengubah preview menjadi flow-based sesuai urutan section. | F11L |
| F11N | CV Builder Regression QA and UI Polish | Completed | Melakukan QA regresi setelah component split, merapikan variable/copywriting manual curated mode, dan memastikan tidak ada konsep Using All tersisa. | F11M |
| F11-CP | CV Builder Checkpoint Documentation | Completed | Mencatat checkpoint dokumentasi F11H–F11N agar history F11 sinkron dengan source code terbaru. | F11N |

## HOLD / Blocked Notes
- (Tidak ada hambatan. Modul ini dinyatakan *Completed*.)

## Eksekusi Log
- [F11B] Berhasil membuat skeleton `/admin/cv-builder` dengan grid layout kiri-kanan. Data config Profile, Contact, Experience, Education, Skills, Projects, dan Credentials tersambung mulus dari Prisma DB via *existing endpoints* di `lib/api.js`. Live preview kanan mensimulasikan kertas A4 murni dengan CSS Proporsional yang siap untuk pencetakan (tanpa PDF Export backend). Belum ada mekanisme simpan urutan (masih statis).
- [F11C] Meluruskan arsitektur aplikasi agar pembangunan dan susunan CV strictly dilakukan di wilayah Admin/Backend, dan domain Publik hanya bertugas menerima *file* statis yang sudah dipoles. Menyepakati bentuk *JSON Contract*, tata cara penyimpanan (`Setting` model), serta menyelaraskan F11 dengan modul CV unduhan di F05.
- [F11D] Mengimplementasikan _state management_ untuk CV Builder. Admin kini bisa melakukan centang _show/hide_, menata urutan dengan tombol *Up/Down*, memfilter item tertentu (contoh: hanya memunculkan 2 proyek unggulan), dan menyimpan `CV_BUILDER_CONFIG` dalam wujud JSON ke tabel `Setting` via rute `/api/admin/cv-builder/config`. Pratinjau A4 sudah bereaksi secara *real-time* terhadap modifikasi State UI.
- [F11E.1] Merapikan UX CV Builder. Form dibagi menjadi Manual CV Identity (displayName, professionalTitle, targetRole, links) dan Database Sections. Skill selector diubah menjadi pencarian dengan chip selection agar tidak memakan ruang dengan list panjang. Experience dan Education diatur default aktif (mandatory). Layout A4 Preview dibersihkan menjadi lebih formal dan ATS-friendly (penggunaan sans-serif bersih, heading standar, dan struktur yang mudah dibaca).
- [F11E.2] Menerapkan *Unified Database Item Selector*. Sistem seleksi item *search + chip* (yang sebelumnya hanya ada di Skills) kini diterapkan ke semua *Database Sections* (Projects, Experience, Education, dan Credentials). Checklist panjang sudah tidak digunakan, menghemat banyak ruang visual dan mempermudah kurasi CV yang presisi.
- [F11E.3] Ekspor PDF berbasis browser. Tombol "Print / Save as PDF" telah ditambah yang memanggil `window.print()`. File styling khusus `cv-print.css` disuntikkan. Layout diset ke A4 Portrait murni, elemen-elemen admin disembunyikan total, dan menggunakan proteksi `page-break-inside: avoid` pada seluruh item untuk memastikan tidak ada pemisahan aneh saat render cetak. Backend upload masih disisihkan.
- [F11E.4] Finalisasi QA Layout Print ATS. Helper UX ditambahkan di admin UI ("ATS Tip: pilih item relevan..."). Mengecek kepadatan spacing, konsistensi font A4, serta ketahanan `break-inside: avoid`. Blok statis F11E (Backend PDF upload) resmi diterminasi dan diarahkan ke workflow browser-print murni. Next: F11F.
- [F11F] Integrasi statis Public Download. Modul CV Builder (F11) telah selaras desain arsitekturnya dengan modul Download (F05) tanpa campur tangan sinkronisasi database/API. Tombol di-setting untuk sementara menggunakan PDF fallback. File final PDF `cv-syah-putra-nugraha-ats.pdf` belum ada, proses integrasi penuh Blocked.
- [F11F.1] Pengaktifan final PDF Handoff. Tombol Download CV di public Home diubah agar mengarah langsung ke `cv-syah-putra-nugraha-ats.pdf` yang sudah dipastikan diletakkan oleh user di `/client/public/cv/`. Batch F11 ini secara resmi mencapai status *Completed* penuh.
- [F11G] *Patch Polish*: Menyesuaikan ukuran font (18pt untuk Header, 10pt-9pt untuk konten) dan margin di container `cv-print-area` agar layout menjadi padat (*compact*), tidak tampak seperti UI web besar, namun menyerupai dokumen CV ATS sungguhan. Line height juga diperketat ke 1.35.
- [F11G.1] Menambahkan field *Website* ke *Contact Settings*. Header CV Builder sekarang cerdas mengambil deretan link sosial dan portofolio (Email, Phone, LinkedIn, GitHub, Website, Instagram) langsung dari setelan kontak (`data.contact`) lalu menatanya ke dalam teks murni berpemisah (separator) secara ATS-friendly. Form link manual CV diubah posisinya sekadar menjadi *fallback*. Format tanggal *Experience/Education* juga dipertajam agar tidak merusak baris atau meninggalkan ruang kosong.
- [F11G.2] Merestrukturisasi kontainer `#cv-print-area` dengan teknik wrapper skalasi (`transform: scale(0.85)`) agar pratinjau di dalam admin panel benar-benar mencerminkan proporsi A4 sesungguhnya (true scale) dan tidak membengkak layaknya elemen blok HTML reguler. Padding cetak dipertajam menjadi 14mm top/bottom dan 20mm left/right. Penamaan berkas fisik PDF juga dibakukan selamanya menjadi `/cv/syahputra-n-ats-cv.pdf` pada titik singgung pengunduhan (`Home.jsx`).
- [F11H] Merapikan UX CV Builder menjadi tab workflow: Identity, Summary, Sections & Items, Preview & Export. Menambahkan dirty state Saved/Unsaved, summary status, dan warning perubahan belum disimpan.
- [F11I] Memperbaiki rendering experience agar tidak lagi dibagi berdasarkan keyword web/developer. Semua experience yang dipilih tampil sebagai Work Experience dan rendering section dibuat lebih reusable.
- [F11J] Memoles selector item database dengan Select All, Clear Selection, selected count, metadata item, search empty state, dan copywriting pemilihan manual.
- [F11K] Mengubah CV Builder menjadi Manual Curated Mode. selectedIds kosong tidak lagi menampilkan semua data; section hanya tampil jika admin memilih item. Contact override CV ditambahkan untuk phone, website, LinkedIn/GitHub/email/location sesuai kebutuhan CV.
- [F11L] Menambahkan fondasi CV Variant/Preset untuk Web Developer, Konstruksi/Civil Engineering, Manufaktur, dan ATS Umum. Setiap variant menyimpan identity, summary, contact override, selectedIds, enabled section, dan order section masing-masing.
- [F11M] Memecah AdminCvBuilder.jsx menjadi komponen dan utility modular. Koreksi link Bitly sebagai LinkedIn, bukan GitHub. Preview CV diubah menjadi flow-based sehingga seksi yang dipilih mengalir sesuai urutan admin, tidak dipaksa masuk halaman tertentu.
- [F11N] Melakukan QA regresi setelah refactor: membersihkan penamaan isUsingAll menjadi hasNoSelectedItems, memastikan copywriting manual curated mode tidak lagi menyebut Using All, dan build frontend berhasil.
- [F11-CP] Checkpoint dokumentasi untuk menyinkronkan feature history F11 dengan rangkaian perubahan F11H–F11N. Tidak ada perubahan kode.

## Checkpoint Notes — F11H to F11N

- **Manual Curated Mode**: `selectedIds` kosong berarti seksi tidak tampil di pratinjau. Pembangun CV dirancang agar admin memilih secara eksplisit bagian/item yang ingin dimunculkan.
- **Variant/Preset CV**: Mendukung penuh 4 preset default (Web Developer, Konstruksi, Manufaktur, dan ATS Umum).
- **Contact Overrides**: Informasi kontak overrides dapat disesuaikan per varian. Tautan `https://bit.ly/4xrqAWN` diklasifikasikan dengan benar sebagai LinkedIn shortlink, bukan GitHub.
- **Flow-based Layout Preview**: Preview CV didesain mengalir bebas sesuai urutan prioritas yang dikonfigurasi admin, tidak lagi dibagi secara kaku per jenis seksi pada halaman tertentu.
- **Pencetakan**: Ekspor PDF tetap mengandalkan dialog browser print (`window.print()`). Otomatisasi generate PDF per varian dari sisi backend tidak termasuk dalam scope ini.


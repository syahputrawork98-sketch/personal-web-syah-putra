# FITUR - Personal Web Syah Putra

Dokumen ini mencatat area fitur dan rencana refactor repository personal web.

## Status Umum

Project berada pada tahap persiapan refactor struktur folder dan modularisasi frontend ringan.

## Target Struktur Repository

```txt
client/
server/
docs/
README.md
FITUR.md
```

## Area Project

| Area | Status | Catatan |
| --- | --- | --- |
| Frontend personal web | Existing | Source awal berada di `webstrip/`. |
| Dokumentasi | Existing | Dokumentasi awal berada di README dan `cutback-master/`. |
| Struktur root baru | Planned | Target folder utama: `client/`, `server/`, `docs/`. |
| Modularisasi frontend | Planned | Rencana pemisahan halaman, komponen, data, hook, service, layout, dan style. |
| Server skeleton | Planned | Disiapkan sebagai folder backend ringan untuk pengembangan berikutnya. |

## Catatan Batch 2

Status: Executed - Struktur `client/src/` telah distabilkan.

Perubahan Batch 2:
- Menghapus file duplikat `client/src/pages/admin/ProjectForm.jsx` (menggunakan versi di `components/admin/`).
- Memindahkan `AdminLayout.jsx` dari `components/admin/` ke `layouts/` agar sesuai standar arsitektur.
- Memperbaiki import path `AdminLayout` di `App.jsx` dan import `auth lib` di dalam `AdminLayout.jsx`.
- Verifikasi Navbar publik tetap bersih dari tombol login.

## Catatan Batch 3

Status: Executed - Data statis telah diekstrak dari halaman publik.

Perubahan Batch 3:
- Membuat folder `client/src/data/` untuk penyimpanan data statis.
- Ekstraksi data layanan "What I Can Do" dari `Home.jsx` ke `data/homeData.js`.
- Ekstraksi `categoryMap` dan data "Experience Reframing" dari `About.jsx` ke `data/aboutData.js`.
- Halaman publik (`Home.jsx` & `About.jsx`) menjadi lebih bersih dan modular.
- Verifikasi visual dan behavior tetap konsisten.

## Catatan Batch 4

Status: Executed - Ekstraksi komponen publik ringan selesai.

Perubahan Batch 4:
- Membuat folder komponen untuk tiap area halaman publik (`home/`, `about/`, `experience/`, dsb).
- Ekstraksi `ServiceCard` di halaman Home.
- Ekstraksi `TechSkillGroup`, `EducationCard`, dan `ExperienceReframing` di halaman About.
- Ekstraksi `ExperienceCard` di halaman Experience.
- Kode pada `pages/` menjadi lebih modular dan fokus pada manajemen state/data.
- Verifikasi visual dan behavior tetap konsisten.

## Catatan Batch 5

Status: Executed - Cleanup ringan dan stabilisasi hook/service selesai.

Perubahan Batch 5:
- Membersihkan import tidak terpakai di `About.jsx`.
- Membuat helper `client/src/lib/dateUtils.js` untuk manajemen format tanggal yang konsisten.
- Membuat custom hook `client/src/hooks/useFetch.js` untuk standarisasi logic fetching data (loading, error, data management).
- Refactor halaman `Experience.jsx`, `Projects.jsx`, dan `Contact.jsx` menggunakan hook `useFetch` dan helper `dateUtils`.
- Kode menjadi jauh lebih bersih, kering (DRY), dan mudah dipelihara.
- Verifikasi visual dan behavior tetap konsisten.

## Catatan Batch 6

Status: Executed - Styling cleanup dan responsive polish ringan selesai.

Perubahan Batch 6:
- Memindahkan inline style yang repetitif dan kompleks ke file CSS (`home.css`, `about.css`, `experience.css`).
- Membuat class CSS baru: `.services-grid`, `.profile-summary-container`, `.tech-focus-section`, `.education-grid`, `.values-container`, dan `.experience-section-header`.
- Melakukan responsive polish pada layout profil (About) dan header pengalaman (Experience) agar lebih aman di tampilan mobile/tablet.
- Mengurangi penggunaan style inline pada level halaman (`pages/`).
- Verifikasi visual tetap konsisten dengan desain awal.

## Catatan Batch 7

Status: Executed - SEO metadata dasar dan kesiapan aset produksi selesai.

Perubahan Batch 7:
- Mengupdate `index.html` untuk menggunakan `favicon.svg` milik project sebagai icon situs.
- Menambahkan metadata SEO dasar: `author`, `theme-color`, dan instruksi `robots`.
- Melengkapi metadata Social Sharing (Open Graph & Twitter Card) untuk meningkatkan kualitas preview saat link dibagikan.
- Memverifikasi keberadaan aset publik (`favicon.svg`, `CV_Syah_Putra_Nugraha.pdf`).
- Status CV: File tersedia di `public/` namun masih berupa placeholder (80 bytes). HOLD hingga user memberikan file CV final.
- Verifikasi build produksi tetap stabil.

## Catatan Batch 8

Status: Executed - i18n & Public Content Readiness selesai.

Perubahan Batch 8:
- Audit teks publik untuk konsistensi bahasa (Bahasa Indonesia).
- Integrasi fallback data ke seluruh halaman publik (`Home`, `About`, `Projects`, `Experience`, `Contact`).
- Website kini tetap menampilkan konten statis berkualitas (dari `fallback/`) jika API backend gagal atau kosong, menjamin "Production Readiness" dari sisi konten.
- Verifikasi link aset publik (CV/Favicon) tetap stabil.
- Perbaikan typo kecil dan penyelarasan label tombol/link eksternal.

## Catatan Batch 9

Status: Executed - Accessibility, Link Sanity, dan Public QA Light selesai.

Perubahan Batch 9:
- Melakukan audit aksesibilitas ringan dengan menambahkan `aria-label` pada tombol interaktif (close modal, theme toggle mobile).
- Membersihkan log debug (`console.log`) pada halaman utama (`Home`, `About`) untuk menjaga kebersihan konsol produksi.
- Verifikasi link eksternal telah menggunakan `rel="noopener noreferrer"` untuk keamanan dan performa.
- Melakukan sanity check pada teks publik dan memastikan fallback tetap bekerja dengan baik.
- Memastikan tidak ada rute admin atau tombol login yang bocor ke area publik.

## Catatan Batch 10

Status: Executed - Documentation Final & Production Checklist selesai.

Perubahan Batch 10:
- Sinkronisasi `README.md` dengan struktur dan status project terbaru.
- Pembuatan `docs/production-checklist.md` sebagai panduan persiapan publikasi.
- Verifikasi akhir kestabilan build produksi.
- Penutupan siklus refactor Batch 1-10 secara formal.

## Catatan Batch 11

Status: Executed - Branding Header SPN + Public Name selesai.

Perubahan Batch 11:
- Membuat komponen `BrandLogo.jsx` dan `BrandLogo.css` untuk manajemen branding terpusat.
- Mengubah logo Navbar dari teks "SYAHPUTRA NUGRAHA" menjadi monogram **"SPN"** bergaya gradient dan nama publik **"Syah Putra N"**.
- Menyelaraskan branding di Footer agar menggunakan nama publik **"Syah Putra N"**.
- Memastikan tampilan responsif Navbar tetap aman dengan branding baru.
- Nama panjang penuh "Syah Putra Nugraha" tetap digunakan di metadata SEO dan dokumen resmi, namun tidak lagi digunakan di branding utama UI.

## Catatan Batch 12

Status: Executed - Credentials Page Structure + Drive Preview Support selesai.

Perubahan Batch 12:
- Membuat halaman publik baru **"Sertifikat & Kredensial"** di route `/credentials`.
- Menambahkan menu **"Sertifikat"** pada Navbar publik.
- Membuat komponen `CredentialCard.jsx` dan `CredentialModal.jsx` dengan dukungan **Google Drive Preview** (iframe).
- Menyiapkan struktur data terpusat di `client/src/data/credentialsData.js`.
- Mendukung filter kategori (BNSP, Web Development, Konstruksi, Manufaktur, Pelatihan).
- Halaman ini dirancang untuk kemandirian konten; data final link Google Drive akan diisi pada Batch 13.

## Catatan Batch 13 Fix

Status: Executed - Complete Drive Certificate Inventory selesai.

Perubahan Batch 13 Fix:
- Melakukan audit mendalam terhadap folder Google Drive **02–07** (folder 08 tidak ditemukan).
- Mengintegrasikan **20 item** sertifikat/kredensial asli ke dalam `credentialsData.js`.
- Menerapkan sistem klasifikasi item:
  - `featured: true`: Untuk sertifikat utama (BNSP, BBPVP, RevoU, OJT).
  - `status: "active"`: Item valid dan utama.
  - `status: "supporting"`: Dokumen pendukung atau verifikasi tambahan.
  - `status: "duplicate-review"`: Item yang muncul di lebih dari satu folder Drive untuk ditinjau lebih lanjut.
- Memperbarui komponen `CredentialCard` untuk menampilkan lencana status (**STAR / SUPPORTING / REVIEW**) secara visual.
- Memperbarui halaman `/credentials` agar mengurutkan item **Featured** di posisi teratas.
- Menambahkan kategori filter yang lebih komprehensif: BNSP, IT & Digital, Teknik & Manufaktur, Konstruksi, Pengembangan Diri, Magang & Partisipasi, Dokumen Pendukung.
- Seluruh 20 item telah terhubung dengan `viewUrl` dan `previewUrl` Google Drive yang valid.

## Catatan Batch 14

Status: Executed - Project Category Tabs + Project Data Model selesai.

Perubahan Batch 14:
- Menambahkan sistem **Tab Kategori** pada halaman Proyek untuk mendukung klasifikasi lintas bidang:
  - IT & Web
  - Manufaktur & Teknik
  - Model Mesin 3D
  - Model Bangunan & RAB
- Menormalisasi **Data Model Proyek** di frontend dengan field baru: `category`, `links` object (github, demo, drive, model, rab), dan `featured`.
- Memperbarui `projectsFallback.js` dengan contoh proyek di setiap kategori baru untuk validasi UI.
- Mengimplementasikan logika filter kategori di `Projects.jsx` dengan dukungan *fallback* otomatis ke "IT & Web" untuk data lama.
- Memperbarui komponen `ProjectCard` agar dapat merender lencana kategori dan menangani struktur link yang baru.
- Menambahkan styling responsif untuk tab filter kategori di `projects.css`.

## Catatan Batch 15

Status: Executed - Project Detail Modal + Link Tiles selesai.

Perubahan Batch 15:
- Mengimplementasikan **Project Detail Modal** sebagai overlay interaktif untuk menampilkan rincian proyek secara komprehensif.
- Menghubungkan tombol "Lihat Detail Proyek" di `ProjectCard` untuk membuka modal dengan animasi *smooth* menggunakan Framer Motion.
- Menambahkan sistem **Link Tiles** (Ubin Tautan) yang dinamis:
  - Muncul secara otomatis berdasarkan ketersediaan aset di data proyek (`links`).
  - Mendukung ikon dan label khusus untuk: **GitHub, Demo, Figma, Google Drive, RAB, dan Model Preview**.
  - Menggunakan `target="_blank"` dan `rel="noopener noreferrer"` untuk keamanan tautan eksternal.
- Menyempurnakan tata letak modal dengan desain dua kolom pada desktop dan tumpukan responsif pada mobile.
- Menyederhanakan `ProjectCard` dengan menghapus ekspansi baris (*inline expansion*) demi pengalaman pengguna yang lebih bersih dan terpusat.

## Catatan Batch 16

Status: Executed - Project Data Population dari Google Drive Links selesai.

Perubahan Batch 16:
- Mengisi data proyek pada `projectsFallback.js` dengan konten yang realistis dan komprehensif untuk 8 proyek di 4 kategori utama.
- Melengkapi setiap item proyek dengan detail mendalam:
  - **Status**: Production, Prototype, Completed.
  - **Peran**: Lead Developer, Mechanical Designer, Estimator, dll.
  - **Naratif**: Penjelasan tantangan teknis, solusi yang diimplementasikan, dan dampak proyek.
  - **Teknologi**: Pemetaan alat spesifik (React, SolidWorks, AutoCAD, SAP2000, dll).
- Menyiapkan struktur **Link Aset Eksternal** (GitHub, Figma, Google Drive, RAB, Model Preview) pada setiap proyek.
- Memastikan konsistensi data model antara frontend dan modal detail untuk mencegah error tampilan.
- Sebagian besar link Google Drive/RAB/Model masih menggunakan *placeholder* atau link komunitas sebagai demonstrasi fungsionalitas Link Tiles (Batch 17 akan mematangkan URL asli).

## Catatan Batch 16 Fix

Status: Executed - Remove Placeholder Project Asset Links selesai.

Perubahan Batch 16 Fix:
- Menghapus seluruh URL **dummy, placeholder, dan demonstratif** (seperti *example.com*, *figma prototype id*, dll) dari data proyek di `projectsFallback.js`.
- Memastikan sistem **Link Tiles** pada modal detail proyek hanya merender tombol untuk link yang benar-benar tersedia dan asli.
- Mempertahankan link GitHub profil Syah Putra N sebagai satu-satunya link aktif yang valid untuk saat ini.
- Menyiapkan *clean state* data aset proyek untuk pengisian URL asli di masa mendatang (HOLD).

## Catatan Batch 17

Status: Executed - Project Visual Polish & UI/UX Refinement selesai.

Perubahan Batch 17:
- Melakukan **Visual Polish** mendalam pada seluruh komponen halaman Projects:
  - **Category Tabs**: Menambahkan efek transisi halus, bayangan dinamis pada *active state*, dan dukungan scroll horizontal pada tampilan mobile.
  - **Project Cards**: Memperbaiki hierarki tipografi, menambahkan gradien overlay pada gambar untuk keterbacaan badge, dan memperhalus animasi hover.
  - **Project Detail Modal**: Memperluas area informasi, menambahkan efek *glassmorphism* yang lebih kuat pada *backdrop*, dan memperbaiki tata letak dua kolom agar lebih seimbang.
  - **Link Tiles**: Memperbaiki *spacing*, menambahkan animasi mikro saat hover, dan memastikan responsivitas grid (1 kolom di mobile sangat kecil).
- Melakukan **CSS Namespace Refactoring**:
  - Mengganti class generik menjadi lebih spesifik untuk menghindari konflik gaya (misal: `.project-modal-overlay`, `.project-link-tile`).
- Meningkatkan **Responsivitas**: Menyesuaikan padding, ukuran font, dan penataan elemen agar terlihat premium di semua ukuran layar (Mobile, Tablet, Desktop).

## Roadmap Refactor Awal (COMPLETED)

1. Root structure refactor (Selesai).
2. Client folder layering (Selesai).
3. Static data extraction (Selesai).
4. Component extraction (Selesai).
5. Hooks, services, dan cleanup (Selesai).
6. Styling cleanup (Selesai).
7. SEO & Production Assets (Selesai).
8. i18n & Public Content Readiness (Selesai).
9. Accessibility & Link Sanity (Selesai).
10. Documentation final & production checklist (Selesai).

## 🚩 Status HOLD (PENTING)

Daftar item yang masih tertahan (HOLD) dan memerlukan keputusan/file dari user sebelum publikasi final:
1. **CV Final**: File `public/CV_Syah_Putra_Nugraha.pdf` masih berupa placeholder.
2. **Login/Admin**: Sistem admin dikerjakan di fase akhir; tidak ada akses publik saat ini.
3. **Domain & Deployment**: Hosting dan konfigurasi URL kanonikal belum ditetapkan.
4. **Credential**: Tidak ada rahasia/password yang disimpan di repository ini.

## Catatan Batch 1

Status: Executed - menunggu push final setelah rebase conflict selesai.

Perubahan Batch 1:
- `webstrip/` dipindahkan menjadi `client/`.
- `kanban-master/` dipindahkan menjadi `docs/`.
- `backend/` dipindahkan menjadi `server/`.
- `README.md` disesuaikan dengan struktur baru.
- Tidak ada perubahan UI/behavior frontend.

## Hold / Fase Akhir

- Login/auth/admin access dikerjakan di fase akhir.
- Website publik tidak menampilkan tombol/link login.
- Akses admin/login nantinya cukup lewat URL langsung/manual.
- Credential tidak boleh disimpan di repository.

## Catatan

Fokus refactor adalah kerapian struktur, modularitas, maintainability, dan menjaga project tetap ringan.

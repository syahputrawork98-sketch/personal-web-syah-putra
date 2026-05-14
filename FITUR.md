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

## Roadmap Refactor Awal

1. Root structure refactor (Selesai).
2. Client folder layering (Selesai).
3. Static data extraction (Selesai).
4. Component extraction (Selesai).
5. Hooks, services, dan cleanup (Selesai).
6. Styling cleanup (Selesai).
7. SEO & Production Assets (Selesai).
8. Final integrity check & documentation.

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

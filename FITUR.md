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

## Roadmap Refactor Awal

1. Root structure refactor (Selesai).
2. Client folder layering (Selesai).
3. Static data extraction (Selesai).
4. Component extraction (Selesai).
5. Hooks, services, dan dokumentasi sinkron.

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

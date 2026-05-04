# Phase 1 Refactor & Improvement Plan

Dokumen ini merinci langkah-langkah untuk melakukan refaktor dan peningkatan pada portfolio personal Syah Putra Nugraha, fokus pada stabilitas, kebersihan kode, dan kesiapan untuk integrasi database di fase berikutnya.

---

## 🎯 Sasaran Utama

1. **Restrukturisasi Halaman Proyek**: Mengubah tampilan menjadi kartu visual profesional dengan struktur data yang siap untuk database (calon schema).
2. **Mobile-First Navigation**: Implementasi hamburger menu yang aksesibel dan responsif.
3. **Optimasi CTA Kontak**: Menghilangkan elemen yang menyesatkan (form palsu) dan fokus pada jalur komunikasi langsung yang aman.
4. **Codebase Cleanup**: Menata ulang folder dan menghapus kode/file yang tidak terpakai.

---

## 🏗️ Rencana Kerja (Step-by-Step)

### Langkah 1: Penataan Folder & Cleanup
- [x] Buat struktur folder baru:
  - `src/components/` (UI atom/molekul)
  - `src/pages/` (Page components)
  - `src/layouts/` (Main layout)
  - `src/data/` (Pusat data statis/dummy)
  - `src/styles/` (Pusat CSS)
  - `src/context/` (i18n & Theme)
  - `src/assets/` (Gambar/PDF)
- [x] Pindahkan file sesuai kategori.
- [x] Hapus file `counter.js` atau boilerplate Vite lainnya yang masih tersisa.
- [x] Hapus `console.log` dan inline style yang besar.

### Langkah 2: Refaktor Halaman Proyek (`Projects.jsx`)
- [x] **Data Architecture**: Buat `src/data/projects.js` dengan skema lengkap:
  - `title`, `slug`, `role`, `techStack` (array), `impact`, `challenge`, `solution`, `features`, `imageUrl`, `demoUrl`, `githubUrl`, `status`, `featured`.
- [x] **Card Component**: Buat kartu proyek yang memiliki:
  - Header gambar (atau placeholder).
  - Badge teknologi dan status (Production/Prototype/In Progress).
  - Deskripsi singkat.
  - Tombol aksi (Live Demo, GitHub, Details).
- [x] **Responsive Grid**: Pastikan layout 1 kolom (mobile), 2 kolom (tablet), dan 3 kolom (desktop).

### Langkah 3: Perbaikan Mobile Navbar (`Navbar.jsx`)
- [x] **State Management**: Gunakan `useState` untuk toggle menu.
- [x] **Aksesibilitas**: Tambahkan `aria-label`, `aria-expanded`, dan kontrol keyboard.
- [x] **UI/UX**: 
  - Logo tetap di kiri.
  - Hamburger di kanan (mobile).
  - Navigasi horizontal (desktop).
  - Active link state (highlight halaman saat ini).
- [x] **CSS Refactor**: Pindahkan styling navbar dari inline ke `src/styles/navbar.css`.

### Langkah 4: Optimasi Halaman Kontak (`Contact.jsx`)
- [x] **Pembersihan**: Hapus elemen `form` yang belum berfungsi.
- [x] **CTA Focus**: Buat kartu informasi yang menonjolkan:
  - Email (dengan link `mailto:`).
  - WhatsApp (link langsung aman).
  - LinkedIn & GitHub.
  - Instagram.
- [x] **External Links**: Pastikan semua link menggunakan `target="_blank"` dan `rel="noopener noreferrer"`.

### Langkah 5: Sinkronisasi i18n
- [x] Pastikan seluruh teks baru di `projects.js` dan komponen lainnya masuk ke file `id.json`, `en.json`, dan `jp.json`.
- [x] Pastikan tidak ada "hardcoded text" di dalam JSX.

---

## 🛠️ Standar Teknis & Validasi

- **Build**: Harus lolos `npm run build` tanpa error.
- **Lint**: Tidak ada variabel yang tidak terpakai atau import yang menggantung.
- **Responsivitas**: Diuji pada resolusi 320px (mobile) hingga 1440px (desktop).
- **i18n**: Fallback yang aman jika data bahasa tertentu belum lengkap.

---

## 📅 Roadmap Tahap Berikutnya (Phase 2)
Setelah Phase 1 ini selesai dan di-review, kita akan masuk ke:
1. **Setup Backend/Database**: Integrasi database (Supabase/Firebase/Custom).
2. **Admin Dashboard**: Halaman khusus `/admin` untuk manajemen proyek (CRUD).
3. **Asset Management**: Upload gambar proyek ke storage.

---
*Rencana ini akan dijalankan secara bertahap untuk memastikan stabilitas setiap langkah.*

# Frontend Documentation

## Fungsi Folder
Folder ini berisi dokumentasi teknis khusus untuk frontend, termasuk arsitektur React/Vite, komponen UI, dan interaksi client-side.

## Kapan Update Dokumen Ini
Dokumen di dalam folder ini harus diupdate setiap kali ada perubahan arsitektural atau teknis yang signifikan pada struktur frontend.

## Hubungan dengan Feature Batch
Dokumentasi teknis di sini berfungsi sebagai panduan teknis yang mendukung eksekusi Feature Batch. Jika sebuah Feature Batch mengubah sistem komponen atau routing, catat teknisnya di sini.

## Area Frontend yang Dicatat
- routing
- components
- pages
- fallback data
- styling
- build
- public QA

## Admin CRUD Audit Summary (Batch F09M)
Admin Panel CMS telah berstatus *fully-mapped* dan mematuhi pilar CRUD:
- **Projects**: Read, Create, Update, Delete tersedia. Save ke database sukses. Public sync sukses. Safe delete (`window.confirm`) dengan feedback peringatan yang menyebutkan nama judul berhasil.
- **Credentials/Certifications**: Read, Create, Update, Delete tersedia. UI edit sudah merangkum tautan eksternal Drive. Safe delete dan public sync berhasil terpasang.
- **Skills**: Read, Create, Update, Delete tersedia. UI list merangkum filter tabs (Keahlian, dsb.). Safe delete sukses mencatat nama *skill*.
- **Experience**: Read, Create, Update, Delete tersedia. Public sync berhasil. Safe delete sudah menampilkan posisi pekerjaan dan institusi/perusahaan secara jelas.
- **Education**: Read, Create, Update, Delete berjalan. Form di-reuse untuk edit. Safe delete sudah dilengkapi dengan nama gelar & sekolah.
- **Settings (Hero, Profile, Contact, Account)**: Read (GET param global) & Update bekerja baik, tak ada Delete. Form UI validasinya sudah tertangani dengan aman dan menyokong *public interface*.

**Safe Delete UX & Feedback Plan**:
1. Seluruh _delete action_ kini menggunakan komponen `ConfirmModal.jsx` berbasis React, meninggalkan fungsionalitas kaku dari bawaan browser (`window.confirm`).
2. Setiap konfirmasi menyertakan properti nama spesifik dari baris data yang hendak dihapus untuk menghindari salah klik.
3. Fitur pelaporan sukses (warna hijau) maupun gagal (warna merah) terintegrasi pada layar tabel tanpa mengganggu posisi _scroll_. 
4. Semua operasi _delete_ dikendalikan oleh *state* `isDeleting` guna menonaktifkan tombol selama _loading_ komunikasi ke server.

## CV Builder & Public Download (Batch F11)
- **Admin CMS UI (`/admin/cv-builder`)**: Satu-satunya tempat penyusunan konfigurasi CV, pemilihan seksi (*checkbox*), serta pengurutan data. Juga bertindak sebagai pratinjau (*preview*) kanvas A4 sebelum dicetak ke PDF oleh Admin. Tidak terekspos ke publik.
  - **F11E.1 UX Updates**: Struktur input dibagi menjadi Manual CV Identity (nama, posisi, kontak) dan Database Sections. Pengaturan skill tidak lagi menggunakan list checkbox panjang, melainkan sistem *search & chip selector* untuk menghemat ruang. Experience dan Education diatur wajib (mandatory/default aktif).
- **Public UI (CV Download - F05)**: Domain publik murni dan pasif. Publik **tidak** memiliki antarmuka pembuatan/konfigurasi CV apa pun. Pengunjung sekadar disuguhi satu tombol "Download CV" yang memicu pengunduhan berkas PDF final yang alamat URL-nya sudah disediakan oleh server.

## Validasi Frontend Minimal
- `npm run dev` bila perlu mengecek hasil di browser.
- `npm run build` bila menyentuh build atau client logic.
- Cek browser console bila ada perubahan UI.
- Cek responsive bila ada perubahan layout.

## Catatan Penting
- Jangan mencampur frontend dengan backend/auth/deployment dalam batch yang sama tanpa alasan jelas.

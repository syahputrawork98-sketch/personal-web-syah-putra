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
1. Seluruh _delete action_ sekarang memakai `window.confirm` dengan konfirmasi spesifik berbasis nama item (cth. nama proyek atau sekolah).
2. Sukses maupun gagal diisyaratkan oleh peringatan (misal, _alert_ atau baris notifikasi lokal) dan *table auto-refresh*.
3. Rencana ke depan: Migrasi seluruh _alert/confirm_ asli _browser_ ke dalam `ConfirmModal` UI *Component* (*F09N*).

## Validasi Frontend Minimal
- `npm run dev` bila perlu mengecek hasil di browser.
- `npm run build` bila menyentuh build atau client logic.
- Cek browser console bila ada perubahan UI.
- Cek responsive bila ada perubahan layout.

## Catatan Penting
- Jangan mencampur frontend dengan backend/auth/deployment dalam batch yang sama tanpa alasan jelas.

# Admin CMS Scope Definition (F09)

## 1. Tujuan Dokumen
Dokumen ini mendefinisikan ruang lingkup, urutan implementasi, batasan teknis, dan sasaran untuk pembangunan *Admin Content Management System* (CMS) pada proyek PW Personal Web. Pendefinisian ini meminimalisasi risiko kompleksitas dengan memecah pengembangan CMS menjadi modul-modul independen.

## 2. Status Awal F09
F09 sebelumnya berstatus **HOLD**, menunggu penyelesaian kerangka kerja dari F07 (Backend API System) dan F08 (Admin Login and Auth System). Kini F08 telah diverifikasi stabil secara arsitektur, dan status F09 beranjak menjadi `Partial / Scope Defined`.

## 3. Hubungan F09 dengan F07, F08, F06, dan F10
- **F07 (Backend API System):** F09 mutlak bergantung pada operasional database dan endpoint REST API backend (`/api/admin/*`) untuk semua transaksinya. F07 adalah tulang punggung pasokan data CMS.
- **F08 (Admin Login & Auth):** F09 harus bersandar penuh pada F08. Rute frontend dan backend CMS harus diproteksi dengan otorisasi F08. Admin CMS tidak akan bisa beroperasi tanpa session valid dari F08.
- **F06 (Asset Link & Preview):** F09 akan menjadi portal di mana pengguna mengelola URL aset eksternal dan referensi PDF yang definisinya dibuat pada F06.
- **F10 (Deployment & Domain):** Lingkungan CMS dan skema API-nya harus selaras dengan topologi jaringan yang kelak diputuskan di F10, memastikan CORS *policy* antara CMS dan *Public Site* harmonis (atau *monolithic*).

## 4. Modul CMS yang Direncanakan
- **Project Management Module:** Modul untuk pembuatan, pengeditan, dan penghapusan entri portofolio proyek.
- **Credential / Certification Management Module:** Modul pengelolaan detail sertifikat kompetensi profesional.
- **CV and Asset Link Management Module:** Modul pemutakhiran referensi tautan dokumen CV publik dan media hosting eksternal. (Catatan: Ini adalah sistem referensi tautan, bukan upload/storage system).
- **Profile / Settings Management Module:** Modul untuk mengatur konten utama (Hero Section, Biografi, Education, Skills).

## 5. Prioritas Modul Pertama
Prioritas yang direkomendasikan adalah **Project Management Module**. Modul ini paling luas mewakili fungsi *Create, Read, Update, Delete* (CRUD) yang sempurna untuk menguji ketahanan pondasi API/Auth sebelum berlanjut pada setelan sistem lainnya yang lebih esensial.

## 6. Data yang Boleh Dikelola
CMS ini dirancang untuk dapat merubah/mengelola:
- Data entitas proyek (Judul, Deskripsi, Tautan, dsb).
- Konten riwayat pendidikan, pelatihan, pengalaman profesional.
- Penyesuaian preferensi URL profil (misal GitHub, LinkedIn) dan status tautan CV PDF eksternal.
- Konten ringkas halaman beranda (Hero).

## 7. Data yang Belum Boleh Dikelola
CMS ini **tidak diizinkan** (atau ditangguhkan pelaksanaannya) untuk:
- Mengubah *password* autentikasi secara langsung via GUI (bila sistem sandi terenkripsi statik pada konfigurasi *environment* di-preferensikan sementara).
- Mengunggah file biner murni secara massal secara lokal (untuk menghindari kelebihan beban *disk space*, preferensi pada tautan eksternal *cloud*).

## 8. Endpoint/Backend Dependency
F09 sepenuhnya memanfaatkan dan membutuhkan integrasi ke skema `server/src/routes/admin/*`. Validasi Bearer Token `requireAdmin` dari F08 bersifat absolut.

## 9. Frontend/Admin UI Dependency
Komponen antar-muka perlu beradaptasi dari rekayasa yang sudah dibangun dalam rute internal `/admin`. Konsep minimalisme (layout admin, sidebar navigasi, proteksi komponen) harus sejalan dengan perancangan yang ada di F08.

## 10. Security Boundaries
- Kredensial tidak disimpan dalam baris kode.
- Permintaan data (payload PUT/POST) dari CMS wajib disanitasi di sisi backend.
- Token otentikasi wajib dikirim melalui `Authorization` header.

## 11. Non-goals F09A
- F09A tidak menulis/mengeksekusi sebaris pun kode aktual untuk antarmuka (*client*) maupun pemrosesan data (*server*).
- F09A bukan tahap final penerapan fitur.

## 12. Rekomendasi Pemecahan Batch F09
Pengembangan CMS ini diinstruksikan untuk direalisasikan dalam cetak biru iterasi sub-batch berikut:
- **F09B** - Project Management Module
- **F09C** - Credential Management Module
- **F09D** - CV and Asset Link Management Module
- **F09E** - Profile/Settings Management Module

## 13. Checklist Validasi untuk Batch Implementasi
- [ ] Otorisasi ditangani dengan tertib oleh `ProtectedRoute`.
- [ ] Skema database Prisma termutakhirkan jika terdapat struktur kolom baru.
- [ ] Pengiriman request ditangani oleh fungsi klien perantara yang memasukkan Authorization Headers secara otomatis.
- [ ] Aksi CRUD dari CMS memantulkan perubahan secara *real-time* (ketika halaman diperbarui) pada UI publik.

## 14. Kesimpulan Status F09
Batch pendefinisian lingkup kerja (F09A) **SELESAI** dirumuskan. Modul-modul sistem tata kelola konten kini sudah dipetakan dan memiliki peta jalan implementasi parsial. Status induk F09 beralih menjadi `Partial / Scope Defined`.

# Admin Login and Auth Requirement

## 1. Tujuan Auth Admin
Tujuan dari autentikasi admin adalah untuk melindungi halaman kontrol (Admin Panel / CMS) dari akses publik yang tidak sah. Mengingat ini adalah website profil personal portofolio, tujuannya sangat spesifik: hanya mengizinkan pemilik tunggal (admin) untuk melakukan operasi *Create, Read, Update, Delete* (CRUD) pada data web (profil, portofolio, dsb.) melalui rute yang terlindungi.

## 2. Status Awal Saat Ini
Berdasarkan status project (F07 Checkpoint), *backend* saat ini belum menjadi sumber data utama dan fitur *auth* sepenuhnya berstatus HOLD. Antarmuka UI publik tidak menampilkan tombol atau *link* menuju rute `/login` maupun rute admin.

## 3. Admin Route yang Nantinya Perlu Dilindungi
Rute yang memerlukan *route guard* dan *auth middleware*:
- **Frontend**: Semua *path* UI di bawah `/admin` (misalnya `/admin/dashboard`, `/admin/projects`, `/admin/skills`).
- **Backend**: Semua *endpoint* API di bawah `/api/admin/*` (misalnya pembuatan portofolio baru, pengubahan profil) dan juga rute spesifik `/api/auth/profile` atau endpoint pengelolaan *session*.

## 4. Strategi Auth yang Direkomendasikan
Pada tahap awal, sangat disarankan menggunakan sistem **Single Admin Account** dengan pendekatan **Local/Dev-Only**. **Dilarang keras menyematkan (hardcode) credential di dalam file source code frontend maupun backend.** Semua kredensial administratif wajib dibaca dari *environment variable* atau *secret manager* yang aman. Sistem tidak memerlukan *multi-user* atau fitur registrasi. Jika diarahkan ke *production*, mekanisme hashing (misalnya menggunakan `bcrypt`) harus digunakan untuk mengenkripsi password dalam database.

## 5. Strategi Session/Token Secara Konseptual
- Menggunakan standar **JSON Web Token (JWT)** untuk autentikasi *stateless* antara aplikasi React (Frontend) dan Express/Node (Backend).
- **Backend** memverifikasi *credentials*, dan menerbitkan JWT (*Access Token*).
- **Frontend** menerima token dan menyimpannya. Secara konseptual disarankan menggunakan *HTTP-only cookie* untuk menghindari eksploitasi XSS, namun untuk *development* dapat dipertimbangkan penyimpanannya di memory atau *Local Storage* asalkan menyadari batas risikonya.
- *Middleware* di *backend* membaca token dari header `Authorization: Bearer <token>` atau `cookie` sebelum melayani *request* `/api/admin/*`.

## 6. Batasan Keamanan
1. **Frontend tidak boleh menyimpan kredensial *hardcoded*:** Kode frontend (*React*) tidak boleh memiliki *password* sama sekali.
2. **Tidak ada halaman pendaftaran publik:** Tidak boleh ada rute `/register` publik, karena sifat sistem ini adalah admin eksklusif.
3. **Data sensitif hanya di `.env` atau *Database*:** Kredensial statis, *secret key* JWT, dan *salt* enkripsi tidak boleh di-commit ke Git.
4. **Validasi Server-Side Mutlak:** Sekalipun halaman frontend dilindungi dengan *React Router Guard*, backend tetap harus memvalidasi setiap token. *Request* ke `/api/admin` tanpa JWT yang sah harus mutlak mengembalikan kode `401 Unauthorized`.

## 7. Non-Goals Batch F08A
- Tidak menulis logika program untuk fungsi *login*.
- Tidak membuat atau mengkonfigurasi file `.env` baru terkait autentikasi.
- Tidak merubah *database schema* / prisma model.
- Tidak menambahkan *route* UI untuk admin.

## 8. Dependency ke F07
Sistem Auth (F08) bergantung langsung pada kesiapan Backend (F07). Saat F07 (Backend API System) belum aktif menjadi sumber data untuk ranah produksi, mengaktifkan login admin juga tidak menjadi prioritas mendesak. Definisi dan *requirement* F08 ini akan bertindak sebagai *blueprint* saat admin *panel* diimplementasikan kelak.

## 9. Roadmap Setelah F08A
* **F08B Auth Flow Design**: Merancang *flow* otorisasi detail (pertukaran token JWT, durasi kedaluwarsa), model basis data *User* (jika ada), dan struktur *route* untuk otorisasi login.
* **F08C Protected Route Implementation**: Mengimplementasikan *Guard Component* untuk navigasi terproteksi di frontend, pembuatan `auth middleware` di sisi backend, dan UI sederhana halaman login.
* **F08D Auth Security QA**: Pengujian manual, seperti mencoba *bypass* proteksi frontend, mengakses endpoint API dengan kredensial kosong atau token kadaluwarsa.

## 10. Checklist Validasi untuk Batch Berikutnya
- [ ] Rute login publik tidak membocorkan keberadaan admin data.
- [ ] Memastikan tidak ada antarmuka pendaftaran.
- [ ] Akses *direct URL* ke halaman /admin untuk tamu diarahkan kembali ke panel masuk atau halaman publik.
- [ ] Kredensial *login* tersimpan pada *environment* yang aman dan tidak terlacak repositori kode.

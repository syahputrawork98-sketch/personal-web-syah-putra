# Admin Auth Flow Design

## 1. Tujuan Dokumen
Dokumen ini mendefinisikan desain alur (*flow*) autentikasi secara teknis dari hulu ke hilir untuk admin di PW Personal Web. Dokumen ini menjadi acuan arsitektur keamanan untuk diimplementasikan pada F08C (Protected Route Implementation).

## 2. Status Awal Auth
Saat ini (Batch F08B), belum ada implementasi kode autentikasi apapun di dalam sistem. Endpoint backend `/api/auth/*` dan `/api/admin/*` masih berstatus HOLD dan tidak difungsikan.

## 3. Prinsip Desain Auth
- **Single Admin:** Sistem hanya melayani satu entitas administratif. Tidak ada fitur registrasi publik atau *multi-user*.
- **Stateless:** Autentikasi berjalan *stateless* menggunakan token (JWT) agar lebih ringan dan mudah diskalakan.
- **Secure Credentials:** Tidak ada *hardcoded credentials* (password atau rahasia API) di dalam keseluruhan source code.

## 4. Login Flow
1. **Client (Frontend):** Admin mengakses URL rahasia panel login (misalnya `/login`) dan mengisi *form login* (username/email dan password).
2. **Client -> Server:** Frontend mengirimkan HTTP POST request ke `/api/auth/login` berisi objek kredensial dalam format JSON.
3. **Server (Backend):** Backend memvalidasi kredensial tersebut dengan mencocokkan *password* (menggunakan perbandingan *hash* `bcrypt` terhadap entitas *database* atau membandingkannya dengan *environment variable* lokal yang sangat aman).
4. **Server -> Client:**
   - **Jika valid:** Server merespons sukses (`200 OK`) beserta token JWT (Access Token).
   - **Jika tidak valid:** Server menolak request dan mengembalikan error `401 Unauthorized`.

## 5. Token/Session Validation Flow
1. **Client (Frontend):** Saat admin menavigasi ke halaman *dashboard* yang terproteksi, komponen *React Router Guard* akan memverifikasi keberadaan token lokal terlebih dahulu sebelum me-*render* halaman.
2. **Client -> Server:** Jika frontend memerlukan data privat/pengaturan sistem, request akan dikirim ke `/api/admin/*` dengan wajib menyertakan token di *header* (misal: `Authorization: Bearer <token>`).
3. **Server (Backend):** Sebuah *Auth Middleware* akan mencegat setiap *request* yang mengarah ke `/api/admin/*`. Middleware mendekode token dan memverifikasi validitas, asal-usul, serta waktu kedaluwarsanya menggunakan *JWT Secret Key*.
4. **Server -> Client:**
   - **Jika token sah:** Request diizinkan diteruskan ke *controller* dan data dikembalikan secara aman.
   - **Jika token tidak sah/kadaluwarsa:** Server langsung memutus rantai dan merespons `401 Unauthorized`. Frontend (idealnya via Axios Interceptor) akan menangkap *error* 401 dan memaksa *redirect* pengguna kembali ke halaman login.

## 6. Logout Flow
1. **Client (Frontend):** Admin mengklik tombol "Logout" dari dalam panel CMS.
2. **Client:** Aplikasi Frontend secara mandiri menghapus/menghancurkan JWT dari tempat penyimpanannya (Memory / Local Storage / Cookie).
3. **Client -> Server (Opsional):** Frontend dapat mengirim *request* ke `/api/auth/logout` untuk memerintahkan server membersihkan *cookie* (hanya jika strategi penyimpanan menggunakan HTTP-only cookie).
4. **Client:** Frontend mengalihkan (*redirect*) admin kembali ke halaman login atau beranda utama publik.

## 7. Guest Access Behavior untuk /admin
Jika seorang tamu (Guest) tanpa otorisasi mencoba memaksa masuk ke rute `/admin` (misalnya dengan mengetik langsung di bilah URL peramban):
- **Di Frontend:** *React Router Guard* mendeteksi bahwa *state* otentikasi kosong / tidak ada token sah.
- **Tindakan:** Guest akan seketika di-*redirect* ke halaman login publik (atau halaman `404 Not Found` untuk menyamarkan ketersediaan CMS dari *bot*).

## 8. Backend API Behavior
- **`/api/auth/*`**: Ini adalah antarmuka hibrida. Menerima *request login* tanpa token, namun implementasinya disarankan memiliki sistem *rate-limiting* untuk memitigasi serangan sandi paksa (*brute-force*).
- **`/api/admin/*`**: Ini adalah area terproteksi absolut. Akses langsung, tanpa token, dengan token kedaluwarsa, atau dengan token yang dimanipulasi **wajib** otomatis ditolak dengan `401 Unauthorized`.

## 9. Recommended Response Status
- `200 OK`: Login sukses, autentikasi berhasil, data terotorisasi berhasil diambil.
- `400 Bad Request`: Payload request tidak sesuai skema (misal, struktur JSON kredensial tidak lengkap).
- `401 Unauthorized`: Gagal masuk, token absen, token manipulatif, atau masa aktif token habis.
- `403 Forbidden`: Token valid secara struktur, namun peran tidak sesuai (untuk sistem Single Admin, 403 mungkin jarang terpakai kecuali untuk pembekuan akun darurat).
- `500 Internal Server Error`: Terjadi kepanikan / *exception* internal di server.

## 10. Token Storage Recommendation
- **Rekomendasi Utama (Production):** *HTTP-only, Secure SameSite Cookie*. Cara ini paling superior untuk mencegah token dicuri oleh skrip peretas (XSS) dari sisi *frontend*.
- **Rekomendasi Alternatif (Development/Sederhana):** *Memory State* dengan fallback ke *Local Storage* atau *Session Storage*. Lebih sederhana dikonfigurasi, namun mutlak mewajibkan sistem sanitasi *input/output* React yang sangat ketat untuk mencegah injeksi XSS.

## 11. Security Boundaries
- Kredensial tidak boleh (*haram*) *hardcoded* di satupun file berekstensi `.js`, `.jsx`, atau `.json` yang terlacak Git.
- Semua kunci gembok utama (Password admin cadangan, *JWT secret key*, *database URI*) **wajib** diletakkan pada `Environment Variables` (seperti `.env` lokal atau *Secret Manager* di *cloud production*).
- Jangan menyimpan file `.env` ke dalam repositori.

## 12. Non-Goals F08B
- Tidak menulis *coding logic* apapun baik di folder `/client` maupun `/server`.
- Tidak mengatur konfigurasi server Express, Prisma, atau Vite.
- F08B murni merupakan *System Design Document* sebagai jembatan dari F08A ke F08C.

## 13. Dependency ke F07 dan F09
- **F07 (Backend API System):** Desain alur ini membutuhkan struktur *Backend* yang matang. Jika server belum aktif (hanya *mocking*), maka otentikasi tak bisa berjalan secara penuh.
- **F09 (Admin CMS):** Keberhasilan realisasi desain ini merupakan izin prinsip (gerbang pembuka) untuk mulai membangun sistem tata kelola konten pada tahap F09 kelak.

## 14. Checklist untuk F08C (Tahap Selanjutnya)
- [ ] Buat file `auth.controller.js` dan mendefinisikan `auth.routes.js` di direktori `server`.
- [ ] Buat lapisan pencegat `authMiddleware.js` di server.
- [ ] Buat halaman UI `Login.jsx` sederhana di direktori `client`.
- [ ] Integrasikan komponen `ProtectedRoute` di dalam rantai `client/src/routes`.
- [ ] Atur penanganan respons status `401` secara global di *frontend* (misalnya menggunakan *Axios Interceptor*).

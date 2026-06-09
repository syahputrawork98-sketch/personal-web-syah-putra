# Panduan Deployment & Audit Kesiapan Produksi (Production Readiness Audit)

Dokumen ini memuat hasil audit kesiapan deployment untuk project **PW Personal Web** beserta langkah-langkah konfigurasi dan checklist rilis.

Arsitektur target deployment:
- **Frontend**: React + Vite (di-host di **Vercel**)
- **Backend**: Express.js (di-host di **Railway**)
- **Database**: PostgreSQL (menggunakan **Neon PostgreSQL**)

---

## 1. Production Environment Variables

Berikut adalah variabel lingkungan (Environment Variables) yang wajib dikonfigurasi pada platform masing-masing sebelum aplikasi dirilis.

### Frontend (Vercel)
Variabel ini digunakan oleh Vite untuk berkomunikasi dengan backend API.

| Nama Variabel | Deskripsi | Contoh Nilai |
| :--- | :--- | :--- |
| `VITE_API_URL` | URL publik server backend production. | `https://backend-pw-production.up.railway.app` |

---

### Backend (Railway)
Variabel-variabel ini dibutuhkan oleh runtime Node.js/Express dan Prisma ORM untuk mengamankan sesi serta mengakses database.

| Nama Variabel | Deskripsi | Contoh Nilai |
| :--- | :--- | :--- |
| `DATABASE_URL` | Connection string PostgreSQL dari Neon. | `postgresql://neondb_owner:password@ep-cool-snowflake-a1xyz.ap-southeast-1.aws.neon.tech/neondb?sslmode=require` |
| `JWT_SECRET` | Kunci enkripsi token sesi login admin CMS. Wajib berupa string panjang, acak, dan aman. | `7c9a8b1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6g7h8i9j0` |
| `CLIENT_URL` | URL frontend production di Vercel untuk kontrol CORS. | `https://personal-web-syah-putra.vercel.app` |
| `PORT` | Port tempat server berjalan. Railway akan mengisi ini secara otomatis. | `5000` |
| `NODE_ENV` | Mode lingkungan aplikasi (set ke `production`). | `production` |
| `ADMIN_EMAIL` | Email default untuk login pertama kali ke CMS Admin. | `admin@domain.com` |
| `ADMIN_PASSWORD` | Password default untuk login pertama kali ke CMS Admin. | *(password_sangat_kuat)* |

---

## 2. Known Deployment Blockers

Berdasarkan hasil audit kesiapan kode, ditemukan satu blocker kritis yang harus diperbaiki pada Batch berikutnya sebelum deployment riil dilakukan:

> [!CAUTION]
> **Blocker Utama: Hardcoded Localhost URL di AdminAuthContext**
> - **Lokasi File**: [AdminAuthContext.jsx](file:///i:/Workspace/Workspace-Syahputrawork/PWSP-Personal-Web-Syah-Putra/client/src/context/admin/AdminAuthContext.jsx#L24-L34)
> - **Detail Masalah**: Metode `fetchProfile` (Line 24) dan `login` (Line 34) memanggil langsung API dengan URL `http://localhost:5000/api/auth/profile` dan `http://localhost:5000/api/auth/login`.
> - **Dampak**: Halaman admin di domain production (Vercel) akan selalu mencoba menghubungi server lokal (`localhost:5000`) komputer pengunjung saat login, sehingga login CMS tidak akan berfungsi sama sekali di internet.
> - **Rencana Perbaikan (Batch Berikutnya)**: Mengubah pemanggilan direct Axios di file tersebut agar menggunakan `import.meta.env.VITE_API_URL` dengan fallback ke localhost:
>   ```javascript
>   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
>   // Kemudian panggil:
>   const res = await axios.get(`${API_URL}/api/auth/profile`);
>   ```

---

## 3. Database Seeding & Migration Safety Notes

> [!WARNING]
> **Peringatan Penting Keamanan Data (Database Seed)**:
> - Script `server/prisma/seed.js` menggunakan method `.deleteMany({})` pada model-model utama seperti `Project`, `Skill`, `Experience`, `Credential`, dan `FeaturedCredential`.
> - Jika perintah `seed` atau `npx prisma db seed` dijalankan ulang di production setelah website aktif, **seluruh konten CMS yang telah diubah atau ditambahkan secara manual oleh admin di database production akan terhapus bersih dan digantikan kembali dengan data dummy awal**.
> - **Rekomendasi**: Jalankan `seed` **HANYA SATU KALI** saat database masih kosong pada inisialisasi awal. Jangan pernah memasukkan perintah seed ke dalam deployment pipeline otomatis.

---

## 4. Deployment Checklist

Berikut adalah checklist langkah-langkah deployment terurut yang dapat digunakan user saat setup backend, frontend, dan database:

```mermaid
graph TD
    A[1. Buat Neon DB] --> B[2. Setup DATABASE_URL]
    B --> C[3. Deploy Railway]
    C --> D[4. Set Env Railway]
    D --> E[5. Run Prisma Migration]
    E --> F[6. Deploy Vercel]
    F --> G[7. Set VITE_API_URL]
    G --> H[8. Verify Login Admin]
    H --> I[9. Verify CMS CRUD]
    I --> J[10. Verify Public Website]
```

### Langkah 1: Buat Neon Database
1. Daftar atau masuk ke [Neon.tech](https://neon.tech/).
2. Buat project baru bernama `personal-web-db`.
3. Pilih wilayah database terdekat dengan target server Railway (misal: Singapore `ap-southeast-1`).
4. Dapatkan connection string PostgreSQL yang disediakan oleh Neon Dashboard.

### Langkah 2: Setup DATABASE_URL
1. Ambil connection string dari dashboard Neon. Formatnya akan seperti:
   `postgresql://neondb_owner:[PASSWORD]@[HOST]/neondb?sslmode=require`
2. Siapkan string ini untuk dimasukkan ke variabel environment Railway di Langkah 4.

### Langkah 3: Deploy Railway
1. Buat project baru di [Railway.app](https://railway.app/).
2. Hubungkan repository GitHub `syahputrawork98-sketch/personal-web-syah-putra`.
3. Pilih opsi deploy sub-folder, lalu tentukan **Root Directory** ke `server`.
4. Railway akan mendeteksi aplikasi berbasis Node.js dari `server/package.json`.

### Langkah 4: Set Environment Railway
1. Buka tab **Variables** pada service server di Railway.
2. Tambahkan variabel-variabel berikut secara manual:
   - `DATABASE_URL` (dari Langkah 2)
   - `JWT_SECRET` (string acak panjang dan unik)
   - `ADMIN_EMAIL` (email login admin)
   - `ADMIN_PASSWORD` (password login admin)
   - `CLIENT_URL` (URL frontend Vercel Anda, jika belum tahu bisa diisi sementara dengan `http://localhost:5173` lalu diupdate setelah Langkah 6)
   - `NODE_ENV` = `production`

### Langkah 5: Run Prisma Migration
1. Untuk membuat tabel-tabel di Neon Database berdasarkan schema Prisma, jalankan migrasi database.
2. Pada setting Service Railway, Anda dapat menambahkan build/start hook atau menjalankan perintah ini secara manual sekali lewat terminal/CLI Railway:
   `npx prisma migrate deploy`
3. Alternatifnya, Anda dapat mengatur **Start Command** di Railway Dashboard menjadi:
   `npx prisma migrate deploy && npm start`
   *(Catatan: Pastikan `npx prisma generate` juga berjalan saat build)*.

### Langkah 6: Deploy Vercel
1. Masuk ke [Vercel](https://vercel.com/) dan hubungkan dengan akun GitHub Anda.
2. Import repository `syahputrawork98-sketch/personal-web-syah-putra`.
3. Pada halaman konfigurasi project:
   - Atur **Root Directory** ke `client`.
   - Pastikan **Framework Preset** terdeteksi sebagai `Vite` (atau pilih Vite).
   - Pastikan build command terisi `npm run build` dan output directory terisi `dist`.

### Langkah 7: Set VITE_API_URL
1. Pada bagian **Environment Variables** di Vercel Dashboard sebelum melakukan deploy pertama kali, tambahkan:
   - `VITE_API_URL` = (Isi dengan URL backend publik Railway Anda, misalnya: `https://backend-pw-production.up.railway.app` tanpa tanda slash `/` di akhir).
2. Klik **Deploy** dan tunggu sampai proses build frontend selesai.
3. Ambil URL Vercel yang didapatkan, lalu **kembali ke Railway** untuk mengupdate variabel `CLIENT_URL` dengan URL Vercel tersebut agar CORS berfungsi.

### Langkah 8: Verify Login Admin
1. Buka halaman admin CMS (misalnya `/admin` atau `/login` di web Vercel Anda).
2. Setelah blocker `AdminAuthContext.jsx` diperbaiki, coba login menggunakan `ADMIN_EMAIL` dan `ADMIN_PASSWORD` yang telah didefinisikan di environment backend Railway.
3. Pastikan token berhasil disimpan dan masuk ke dashboard admin tanpa error.

### Langkah 9: Verify CMS CRUD
1. Pada Dashboard Admin, coba lakukan operasi CRUD dasar (misal: tambah skill, tambah project baru, edit deskripsi kontak).
2. Pastikan data tersimpan dengan benar di Neon PostgreSQL melalui API Railway.
3. Pastikan tidak ada CORS error atau request fail di devtools console browser.

### Langkah 10: Verify Public Website
1. Buka domain publik utama Anda.
2. Pastikan seluruh data dinamis (proyek, pengalaman, keahlian, sertifikat) ter-render dengan benar.
3. Lakukan pengujian refresh halaman pada nested URL (seperti `/projects` atau `/learning`) untuk memastikan SPA routing rewrite di `vercel.json` berjalan dan tidak memicu error 404.

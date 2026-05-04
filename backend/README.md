# Portfolio Backend CMS

Sistem backend modular untuk manajemen konten portfolio menggunakan Node.js, Express, dan PostgreSQL.

## 🛠️ Persiapan Awal

1. **Buat Database**:
   Pastikan Anda memiliki PostgreSQL yang berjalan dan buat database bernama `portfolio_db`.

2. **Konfigurasi Environment**:
   Salin file `.env.example` menjadi `.env` dan sesuaikan nilainya:
   ```bash
   cp .env.example .env
   ```
   Pastikan `DATABASE_URL`, `ADMIN_EMAIL`, dan `ADMIN_PASSWORD` sudah benar.

3. **Inisialisasi Database**:
   Jalankan perintah berikut secara berurutan:
   ```bash
   # Generate Prisma Client
   npm run prisma:generate

   # Jalankan Migrasi Database
   npm run prisma:migrate

   # Isi Data Awal (Admin & Sample Projects)
   npm run seed
   ```

## 🚀 Menjalankan Server

Untuk pengembangan:
```bash
npm run dev
```

Untuk produksi:
```bash
npm run start
```

## 📡 Health Check
Akses `http://localhost:5000/api/health` untuk memastikan server berjalan dengan baik.

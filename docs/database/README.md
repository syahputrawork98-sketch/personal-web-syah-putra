# Database Documentation

## Fungsi Folder
Folder ini berisi dokumentasi teknis untuk model data, skema database, dan rencana penyimpanan jangka panjang.

## Status Database Saat Ini
Partial / Activated (Batch F07E/F07G). Database sudah menjadi sumber utama website publik, namun perlu dijalankan di lokal untuk lingkungan development.

## Kapan Update Dokumen Ini
Dokumen ini harus diupdate jika terjadi perubahan pada data model, skema database, atau migrasi data saat backend mulai hidup.

## Hubungan dengan Feature Batch
Berkaitan erat dengan **F07** (Backend API), **F08** (Auth), dan **F09** (Admin CMS). Rencana skema data untuk sistem tersebut akan dicatat di sini.

## Area Database yang Dicatat
- data model
- schema
- migration plan
- storage strategy
- seed/mock data (jika ada)

## Panduan Menjalankan PostgreSQL Lokal (Development)
Untuk menjalankan backend secara lokal, Anda membutuhkan database PostgreSQL yang aktif. 
Kami telah menyediakan opsi menggunakan Docker Compose agar lebih mudah.

1. **Jalankan PostgreSQL via Docker**:
   Masuk ke folder `server/` dan jalankan:
   ```bash
   docker-compose up -d
   ```
   *Ini akan menjalankan container `pw_postgres` di port `5433` pada host, sesuai dengan konfigurasi `.env` default.*

2. **Validasi dan Persiapan Prisma**:
   Setelah database hidup, inisialisasi skema dan isi data awal:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   npm run seed
   ```

## Validasi Database Minimal
- Perubahan schema harus selalu dicatat.
- Migration tidak boleh dibuat tanpa instruksi eksplisit.
- Tidak boleh menyimpan data sensitif.
- Selalu pastikan database lokal hidup (`docker-compose ps`) sebelum menjalankan `npm run dev`.

## Production Deployment Strategy
1. **Managed Database:** Sangat direkomendasikan untuk menggunakan managed PostgreSQL service (misal Supabase, Neon, Railway) di production untuk memastikan keamanan, backup otomatis, dan stabilitas server. Docker lokal hanya untuk environment development.
2. **Migrasi:** Di production, gunakan `npx prisma migrate deploy` alih-alih `dev` untuk menerapkan skema tanpa menghapus data interaktif.
3. **Peringatan Seed Production:** Script `npm run seed` menggunakan operasi `deleteMany` pada banyak tabel. **JANGAN** jalankan script seed ini di production setelah web hidup dan berisi data baru dari CMS, karena hal tersebut akan menghapus data production. Jika diperlukan, jalankan hanya sekali di awal deployment.

## Catatan Penting
- Database tidak boleh dikerjakan bersamaan dengan frontend UI besar tanpa scope yang jelas.

# Backend Documentation

## Fungsi Folder
Folder ini berisi dokumentasi teknis khusus untuk backend, termasuk API, server logic, struktur server, dan koneksi frontend-backend.

## Status Backend Saat Ini
HOLD (Sesuai dengan **F07 Backend API System**). Saat ini web berjalan menggunakan fallback data.

## Kapan Update Dokumen Ini
Dokumen di dalam folder ini harus diupdate ketika backend mulai aktif, API endpoint baru dibuat, atau saat mengatur variabel lingkungan.

## Hubungan dengan Feature Batch
Sangat berkaitan dengan **F07 Backend API System** dan **F08 Admin Login and Auth System**. Dokumentasi teknis backend ditulis di sini saat fitur tersebut dihidupkan.

## Area Backend yang Dicatat
- server structure
- API routes
- environment variables example
- auth/session/token (jika nanti aktif)
- security notes

## Validasi Backend Minimal
- Cek server start jika file backend disentuh.
- Cek API endpoint bila dibuat atau diubah.
- Pastikan tidak ada `secret` atau `.env` yang ter-commit.

## Catatan Penting
- Auth tidak boleh dibuka sebelum F07 memiliki arah teknis yang jelas.

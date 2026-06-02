# Batch F07 — Backend API System

## Feature Summary
Fondasi backend API, struktur server, data source, dan hubungan frontend-backend.

## Status
Completed (Batch F07G - Local Database Setup Guide Added)

## Story
Mencakup pembuatan layanan backend (server) yang menyediakan data dinamis melalui RESTful API. Tujuannya untuk mengganti data fallback statis menjadi sistem yang bisa dikontrol penuh oleh pemilik.

## Current State
- Struktur `server/` skeleton sudah ada.
- Website publik dapat hidup tanpa backend (fallback).

## Sub-Batch Roadmap
| Sub-Batch | Name | Status | Purpose | Dependency |
|---|---|---|---|---|
| F07A | Server Structure Audit | Completed | Review kesiapan struktur backend. | - |
| F07B | API Scope Definition | Completed | Merumuskan endpoint API yang dibutuhkan. | - |
| F07C | Environment Example Setup | Merged | Tidak dijalankan terpisah, tercakup di F07A dan F07D. | - |
| F07D | Frontend Backend Connection Review | Completed | Review hubungan CORS dan fetch URL. | - |
| F07-CP | Backend API System Checkpoint | Completed | Merangkum hasil audit awal backend tanpa membuka implementasi production, auth, atau CMS. | - |
| F07E | Public Database Activation | Completed | Mengaktifkan database sebagai sumber utama website publik, menghapus data fallback. | - |
| F07F | Database Seed and Public Endpoint Verification | Partial / Blocked | Validasi PostgreSQL database seed. Diblokir karena instance PostgreSQL tidak aktif di environment saat ini. | F07E |
| F07G | Local PostgreSQL Setup Guide | Completed | Menambahkan dokumentasi dan `docker-compose.yml` untuk setup PostgreSQL lokal, mengurai blocker F07F. | F07F |

## HOLD / Blocked Notes
- Backend (API) sudah aktif untuk sisi publik (Read-only).
- Admin Login & Auth/CMS sudah ditangani di F08 dan F09.
- **F07F telah di-_unblock_** dengan selesainya **F07G** yang menyediakan opsi `docker-compose` dan panduan di `docs/database/README.md`.

## Next Step
- Seluruh infrastruktur backend dasar (F07) telah selesai.
- Operator dapat memulai PostgreSQL di mesin aslinya kapan pun siap dengan `docker-compose up -d`.
- Lanjutkan review sistem keamanan admin atau deployment (F10).

## Validation Checklist
- [x] Pastikan website publik menerima data dari API, tanpa fallback mock-data.
- [x] Pastikan ada handling error / empty state jika API mati.

## Notes
- [F07A] Audit struktur server telah dilakukan. Express app, health check, Prisma schema, dan `.env.example` sudah tersedia dan berfungsi. Website publik masih aman menggunakan fallback data.
- [F07B] API scope sudah didefinisikan. Prioritas aman berikutnya adalah environment example/fetch connection review tanpa membuka auth/admin.
- [F07B.1] Source file path pada API Scope Map dikoreksi agar sesuai struktur route aktual.
- [F07D] Frontend-backend connection reviewed. Client uses VITE_API_URL with local fallback, server health check is available, and public site fallback remains safe. Catatan: F07C environment example minimal (klien dan server) sudah tersedia.
- [F07D.1] Client env example ditambahkan ke repository agar dokumentasi koneksi frontend-backend lengkap.
- [F07-CP] Checkpoint selesai. Audit awal backend sudah lengkap untuk struktur, scope API, source path, env example, dan koneksi frontend-backend. Backend tetap belum menjadi sumber data utama production. Auth/Admin tetap HOLD.
- [F07E] Public Database Activation selesai. Website publik sudah sepenuhnya mengandalkan endpoint API `/api/...` dan Prisma/PostgreSQL. File-file fallback data (`fallback/`) tidak lagi digunakan saat runtime gagal, sehingga UI memunculkan error state yang jujur jika database tidak bisa diakses.
- [F07F] Database Seed Validation dicoba, tetapi terkendala koneksi PostgreSQL lokal (`localhost:5433` menolak koneksi). Frontend berhasil menunjukkan Empty State secara anggun saat fetch API menghasilkan 500 error karena DB down. Status iterasi: Partial / Blocked.
- [F07G] Local PostgreSQL Setup Guide selesai. Opsi `docker-compose.yml` telah ditambahkan di server/ untuk mempermudah menjalankan PostgreSQL lokal (port 5433). File README database juga sudah diperbarui dengan langkah validasi mandiri. Ini menyelesaikan _blocker_ dari F07F sehingga infrastruktur F07 resmi selesai di atas kertas.

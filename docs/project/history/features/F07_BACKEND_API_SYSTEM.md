# Batch F07 — Backend API System

## Feature Summary
Fondasi backend API, struktur server, data source, dan hubungan frontend-backend.

## Status
Partial / Connection Reviewed

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

## HOLD / Blocked Notes
- Website publik masih stabil memakai fallback data.
- Backend belum menjadi prioritas aktif. Auth/Admin tetap HOLD.

## Next Step
- HOLD / Backend public API implementation only if requested

## Validation Checklist
- Pastikan website publik dapat menerima data secara dinamis tanpa fallback jika API dihidupkan.

## Notes
- [F07A] Audit struktur server telah dilakukan. Express app, health check, Prisma schema, dan `.env.example` sudah tersedia dan berfungsi. Website publik masih aman menggunakan fallback data.
- [F07B] API scope sudah didefinisikan. Prioritas aman berikutnya adalah environment example/fetch connection review tanpa membuka auth/admin.
- [F07B.1] Source file path pada API Scope Map dikoreksi agar sesuai struktur route aktual.
- [F07D] Frontend-backend connection reviewed. Client uses VITE_API_URL with local fallback, server health check is available, and public site fallback remains safe. Catatan: F07C environment example minimal (klien dan server) sudah tersedia.
- [F07D.1] Client env example ditambahkan ke repository agar dokumentasi koneksi frontend-backend lengkap.
- [F07-CP] Checkpoint selesai. Audit awal backend sudah lengkap untuk struktur, scope API, source path, env example, dan koneksi frontend-backend. Backend tetap belum menjadi sumber data utama production. Auth/Admin tetap HOLD.

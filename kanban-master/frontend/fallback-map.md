# Fallback Map

Dokumen ini mencatat sistem *fallback* yang digunakan frontend untuk menjaga agar situs tetap berjalan saat API backend tidak tersedia.

## i18n Fallback
- **Lokasi**: `public/i18n/*.json`
- **Kegunaan**: Menyediakan label UI dasar.
- **Status**: Konten portofolio besar sudah dibersihkan dari sini.

## Static Fallback File
- **Lokasi**: `webstrip/src/data/fallbacks.js` dan `webstrip/src/data/projects.js`.
- **Kegunaan**: Sumber data utama saat API gagal. Aman dipertahankan sementara sebagai lapisan *resiliency*.

## Hardcoded Fallback
- Beberapa nilai default masih ada di dalam komponen UI (contoh: email/phone jika API kosong).
- **Rencana**: Nanti harus dibersihkan setelah CMS Contact/Profile stabil.

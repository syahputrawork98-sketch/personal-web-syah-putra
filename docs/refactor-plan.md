# Refactor Plan

Rencana refactor untuk persiapan production-readiness.

## Batch 1 - Root Structure Refactor (Selesai)
- Rename `webstrip/` menjadi `client/`.
- Pindahkan dokumentasi dari `kanban-master/` ke `docs/`.
- Tambahkan `server/` sebagai skeleton backend ringan.
- Update `README.md` dan buat `FITUR.md`.

## Catatan Penting
- Tidak mengubah tampilan, behavior, routing, atau fitur frontend.
- Tidak membuat auth/login/register.
- Tidak menambahkan tombol/link login di UI publik.

# Database Documentation

## Fungsi Folder
Folder ini berisi dokumentasi teknis untuk model data, skema database, dan rencana penyimpanan jangka panjang.

## Status Database Saat Ini
HOLD / Belum aktif penuh.

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

## Validasi Database Minimal
- Perubahan schema harus selalu dicatat.
- Migration tidak boleh dibuat tanpa instruksi eksplisit.
- Tidak boleh menyimpan data sensitif.

## Catatan Penting
- Database tidak boleh dikerjakan bersamaan dengan frontend UI besar tanpa scope yang jelas.

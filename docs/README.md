# Pusat Dokumentasi - PW Personal Web

Selamat datang di pusat dokumentasi resmi untuk project PW Personal Web. Direktori ini berfungsi sebagai sumber kebenaran (single source of truth) untuk tata kelola, riwayat teknis, status project, dan panduan pengembangan bagi seluruh pengelola (termasuk asisten AI dan sistem otomatis).

## Struktur Folder Dokumentasi

Untuk menjaga kerapian dan fokus, dokumentasi dibagi ke dalam direktori terstruktur:

- **`00-project-control/`**
  Berisi `PROJECT_BOOTSTRAP.md` sebagai pintu masuk konteks bagi AI baru. Folder ini juga berisi panduan manajerial, SOP komunikasi antar AI (Roomchat 00/01, Gemini), dan template instruksi pengerjaan task.

- **`01-batch-history/`**
  Arsip catatan pengembangan iteratif. Setiap tahapan *batch* didokumentasikan di sini untuk memudahkan pelacakan perubahan historis secara detail tanpa mengotori `FITUR.md`.

- **`02-project-status/`**
  Catatan status krusial, termasuk `HOLD_ITEMS.md` yang memuat fitur, credential, atau integrasi yang belum dirilis/tersedia.

- **`03-technical-notes/`**
  Catatan spesifik mengenai arsitektur. Membahas keputusan dan batasan pada sisi `FRONTEND`, status skeleton `BACKEND`, serta aturan penulisan `DATABASE`.

## Aturan Utama
1. **Pembaruan Konsisten**: Setiap ada penyelesaian *batch* baru, riwayat wajib dicatat pada folder `01-batch-history/`.
2. **GitHub sebagai Memori Utama**: Direktori `docs/` ini adalah memori portable yang akan menjadi rujukan AI pada diskusi roomchat selanjutnya.

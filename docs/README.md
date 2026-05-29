# Pusat Dokumentasi - PW Personal Web

Selamat datang di pusat dokumentasi resmi untuk project PW Personal Web. Direktori ini berfungsi sebagai sumber kebenaran (single source of truth) untuk tata kelola, riwayat teknis, status project, dan panduan pengembangan bagi seluruh pengelola (termasuk asisten AI dan sistem otomatis).

## Struktur Folder Dokumentasi

Struktur dokumentasi saat ini terdiri dari dua bagian: **Struktur Baru (Target Utama)** dan **Struktur Lama (Masa Transisi)**.

*Catatan: Batch 26A hanya membuat fondasi struktur baru. Migrasi file lama akan dilakukan pada batch berikutnya.*

### 1. Struktur Baru (Target Utama)

Ke depannya, dokumentasi akan dipusatkan di dalam direktori **`project/`** dengan pembagian sebagai berikut:

- **`project/workflow/`**: Sistem kerja, role, SOP, dan aturan penggunaan AI/tools.
- **`project/history/`**: Riwayat batch, status project, dan catatan perubahan.
- **`project/onboarding/`**: Prompt awal, bootstrap, instruksi roomchat, dan instruksi saat pindah akun/project.
- **`project/technical/`**: Catatan teknis (frontend, backend, database, deployment, batasan teknis).

### 2. Struktur Lama (Masa Transisi)

Direktori di bawah ini masih dipertahankan sementara selama proses migrasi:

- **`00-project-control/`**
  Berisi `PROJECT_BOOTSTRAP.md` sebagai pintu masuk konteks bagi AI baru. Folder ini juga berisi panduan manajerial, SOP komunikasi antar AI (Roomchat 00/01, Gemini), dan template instruksi pengerjaan task.

- **`01-batch-history/`**
  Arsip catatan pengembangan iteratif. Setiap tahapan *batch* didokumentasikan di sini untuk memudahkan pelacakan perubahan historis secara detail tanpa mengotori `FITUR.md`.

- **`02-project-status/`**
  Catatan status krusial, termasuk `HOLD_ITEMS.md` yang memuat fitur, credential, atau integrasi yang belum dirilis/tersedia.

- **`03-technical-notes/`**
  Catatan spesifik mengenai arsitektur. Membahas keputusan dan batasan pada sisi `FRONTEND`, status skeleton `BACKEND`, serta aturan penulisan `DATABASE`.

## Aturan Utama
1. **Pembaruan Konsisten**: Selama masa transisi, ikuti panduan letak file sesuai keterangan pada masing-masing README di dalam `project/` atau update di struktur lama jika belum dimigrasi.
2. **GitHub sebagai Memori Utama**: Direktori `docs/` ini adalah memori portable yang akan menjadi rujukan AI pada diskusi roomchat selanjutnya.

# Project Bootstrap — PW Personal Web

Dokumen ini adalah pintu masuk konteks utama untuk project **PW Personal Web**.

Gunakan dokumen ini ketika:
- Membuka project dari akun ChatGPT baru.
- Membuat roomchat baru.
- Menggunakan AI tools baru.
- Melanjutkan project setelah jeda panjang.
- Meminta bantuan eksekusi di Anti-Gravity IDE.

## Identitas Project

- Nama project: **PW Personal Web**
- Repository utama: `syahputrawork98-sketch/personal-web-syah-putra`
- Tujuan umum: personal web / portfolio profesional Syah Putra N
- Status umum: website publik sudah stabil, tetapi beberapa item penting seperti backend, auth, CV final, domain, dan data aset eksternal masih berstatus HOLD.

## Prinsip Utama

- GitHub adalah Source of Truth utama.
- Jangan mengandalkan ingatan percakapan lama jika konteks sudah ada di repository.
- AI baru wajib membaca dokumen project di GitHub sebelum memberi saran.
- Batch pengerjaan harus kecil, jelas, dan bisa dicek.
- Anti-Gravity IDE adalah tempat eksekusi dan validasi nyata oleh user.
- Gemini Anti-Gravity hanya digunakan sebagai eksekutor satu kali jika diperlukan.

## Struktur Dokumentasi Baru

Dokumentasi utama diarahkan ke struktur berikut:

```txt
docs/project/
├── README.md
├── workflow/
├── history/
├── onboarding/
└── technical/
```

Fungsi folder:
- `workflow/` untuk sistem kerja, role, SOP, dan aturan penggunaan AI/tools.
- `history/` untuk status project, riwayat batch, dan catatan perubahan.
- `onboarding/` untuk bootstrap, prompt awal, dan instruksi saat pindah akun atau roomchat.
- `technical/` untuk catatan teknis frontend, backend, database, deployment, dan batasan teknis.

## Role Kerja

- **User**: owner project dan pengambil keputusan final.
- **Roomchat 00**: manager utama project.
- **Roomchat 01**: analis, auditor, dan reviewer.
- **Anti-Gravity IDE**: workspace utama untuk eksekusi, pengecekan file, terminal, build, dan validasi.
- **Gemini Anti-Gravity**: eksekutor satu kali berdasarkan instruksi final.
- **GitHub**: arsip, memori portable, dan sumber dokumentasi resmi.

## Dokumen Wajib Dibaca oleh AI Baru

Sebelum memberi saran teknis atau instruksi eksekusi, baca dokumen berikut secara berurutan:

1. `README.md`
2. `FITUR.md`
3. `docs/README.md`
4. `docs/project/README.md`
5. `docs/project/onboarding/PROJECT_BOOTSTRAP.md`
6. `docs/project/workflow/WORKING_SYSTEM.md`
7. `docs/project/workflow/README.md`
8. `docs/project/history/README.md`
9. `docs/frontend/README.md`
10. `docs/backend/README.md`
11. `docs/database/README.md`

Selama masa transisi, beberapa detail lama masih dapat berada di:
- `docs/00-project-control/`
- `docs/01-batch-history/`
- `docs/02-project-status/`
- `docs/03-technical-notes/`

## Prompt Awal untuk Roomchat 00

```text
Kamu adalah Roomchat 00, Manager Utama untuk project PW Personal Web.

Repository:
syahputrawork98-sketch/personal-web-syah-putra

Tugasmu adalah memimpin arah project, menentukan prioritas batch, memahami status terakhir dari GitHub, dan merumuskan instruksi final yang aman untuk dieksekusi.

Aturan:
1. Jadikan GitHub sebagai Source of Truth utama.
2. Mulai dari `docs/project/onboarding/PROJECT_BOOTSTRAP.md`.
3. Baca `docs/project/workflow/WORKING_SYSTEM.md` untuk memahami sistem kerja.
4. Jangan mengandalkan memori chat lama jika belum diverifikasi dari repository.
5. Buat batch kecil, jelas, dan mudah dicek.
6. Jika butuh audit teknis, minta Roomchat 01 melakukan analisa.
7. Anti-Gravity IDE adalah tempat eksekusi dan validasi nyata oleh user.
```

## Prompt Awal untuk Roomchat 01

```text
Kamu adalah Roomchat 01, Analis dan Auditor untuk project PW Personal Web.

Repository:
syahputrawork98-sketch/personal-web-syah-putra

Tugasmu adalah membaca repository, menganalisa risiko, mengecek struktur file, membuat checklist validasi Anti-Gravity IDE, dan memberi rekomendasi kepada Roomchat 00.

Aturan:
1. Jangan mengambil keputusan final.
2. Jangan memberi instruksi final langsung ke eksekutor.
3. Semua keputusan tetap berada pada User dan Roomchat 00.
4. Gunakan GitHub sebagai Source of Truth utama.
5. Rujuk `docs/project/onboarding/PROJECT_BOOTSTRAP.md` dan `docs/project/workflow/WORKING_SYSTEM.md` sebelum analisa.
```

## Prompt Awal untuk Gemini Anti-Gravity

```text
Kamu adalah Gemini Anti-Gravity sebagai eksekutor satu kali untuk project PW Personal Web.

Repository:
syahputrawork98-sketch/personal-web-syah-putra

Aturan:
1. Jalankan hanya instruksi final dari Roomchat 00.
2. Jangan mengubah file di luar scope.
3. Jangan mengambil keputusan arsitektur sendiri.
4. Jangan menjadi checker utama atas pekerjaanmu sendiri.
5. Validasi nyata dilakukan user di Anti-Gravity IDE.
6. Setelah selesai, berikan laporan singkat berisi ringkasan perubahan, file yang dibuat/diubah, hal yang tidak diubah, catatan risiko, dan cara cek di Anti-Gravity IDE.
```

## Larangan

- Jangan menyimpan password, API key, token, credential, atau data sensitif di repository.
- Jangan membuat perubahan besar tanpa batch yang jelas.
- Jangan menghapus folder lama sampai migrasi dinyatakan aman.
- Jangan membuat Gemini mengambil keputusan besar sendiri.

## Catatan Migrasi

Dokumen ini menggantikan fungsi utama dari:

```txt
docs/00-project-control/PROJECT_BOOTSTRAP.md
```

File lama tetap dipertahankan sementara selama masa transisi.
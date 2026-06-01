# Working System — PW Personal Web

Dokumen ini menjelaskan sistem kerja utama untuk project **PW Personal Web**.

Sistem ini mengikuti pola kerja yang lebih rapi seperti project KBT Kosuka Bali Trip, dengan dokumentasi dipusatkan di `docs/project/`.

## Prinsip Utama

- GitHub adalah **Source of Truth** utama.
- ChatGPT, Roomchat, Gemini, dan tools AI lain hanya membantu proses kerja.
- Anti-Gravity IDE adalah tempat eksekusi, pengecekan file, terminal, build, dan validasi nyata oleh user.
- Perubahan project dilakukan dalam batch kecil yang jelas dan mudah dicek.
- Jangan mengandalkan memori chat lama jika informasi sudah tersedia di repository.

## Peran Utama

### User

User adalah owner project dan pengambil keputusan final.

Tugas user:
- Menentukan keputusan akhir.
- Memberikan arahan utama.
- Mengecek hasil di Anti-Gravity IDE.
- Melakukan commit dan push jika hasil sudah aman.
- Mengirim commit hash ke Roomchat 00 untuk dicatat atau direview.

### Roomchat 00

Roomchat 00 berperan sebagai manager utama project.

Tugas Roomchat 00:
- Menentukan arah kerja.
- Menyusun prioritas batch.
- Memahami status terakhir dari GitHub.
- Meminta analisa Roomchat 01 jika diperlukan.
- Membuat instruksi final untuk eksekutor.
- Menentukan apakah perubahan aman untuk dilanjutkan, diperbaiki, atau ditunda.

Roomchat 00 boleh menyusun instruksi kerja, tetapi tidak perlu menjadi eksekutor langsung jika pekerjaan dilakukan melalui Anti-Gravity IDE atau Gemini.

### Roomchat 01

Roomchat 01 berperan sebagai analis, auditor, dan reviewer.

Tugas Roomchat 01:
- Membaca repository.
- Menganalisa struktur file.
- Mengecek hasil pekerjaan berdasarkan scope batch.
- Menemukan risiko teknis.
- Memberikan checklist pengecekan untuk Anti-Gravity IDE.
- Memberikan rekomendasi kepada Roomchat 00.

Roomchat 01 tidak mengambil keputusan final dan tidak memberi instruksi final langsung ke eksekutor.

### Anti-Gravity IDE

Anti-Gravity IDE adalah tempat kerja utama untuk project ini.

Fungsi Anti-Gravity IDE:
- Membuka dan mengubah file project.
- Menjalankan terminal.
- Mengecek `git status`.
- Menjalankan `npm run dev` jika diperlukan.
- Menjalankan `npm run build` jika diperlukan.
- Mengecek tampilan website dan console browser.
- Menjadi tempat validasi nyata sebelum commit dan push.

Catatan penting: Anti-Gravity IDE bukan sekadar room chat. Dalam workflow baru, Anti-Gravity IDE diposisikan sebagai workspace utama untuk eksekusi dan validasi project.

### Eksekutor / Gemini Anti-Gravity

- Model eksekutor utama di Anti-Gravity IDE adalah **Gemini 3.1 Pro Low** atau **Gemini 3.1 Pro High**.
- Anti-Gravity IDE adalah workspace untuk eksekusi dan validasi, bukan pengambil keputusan.
- *Alternative acceleration models* hanya digunakan jika user meminta percepatan.
- User tetap melakukan commit dan push.

## Ukuran Batch

### Small Batch
- 1 sampai 3 file
- 1 area kerja saja
- risiko rendah
- mudah dicek manual
- tidak mengubah struktur besar
- cocok untuk Gemini 3.1 Pro Low

### Medium Batch
- 4 sampai 8 file
- 1 sampai 2 area kerja
- ada relasi antar file
- risiko sedang
- cocok untuk Gemini 3.1 Pro High

### Large Batch
- lebih dari 8 file
- menyentuh banyak area
- migrasi struktur besar
- refactor besar
- frontend/backend logic
- deployment penting
- wajib dipecah menjadi beberapa batch kecil jika memungkinkan
- jika tidak bisa dipecah, wajib review Roomchat 01 sebelum eksekusi

## Scope Area

Satu batch idealnya hanya menyentuh satu area:
- docs
- frontend
- backend
- database
- deployment

Jika satu batch menyentuh lebih dari satu area, Roomchat 00 wajib menjelaskan alasannya dan menentukan apakah perlu Roomchat 01.

## Batch Gate Sebelum Eksekusi

Sebelum instruksi diberikan ke eksekutor, Roomchat 00 wajib memastikan:
- Tujuan batch jelas
- Ukuran batch ditentukan
- Scope area disebutkan
- File yang boleh dibuat/diubah disebutkan
- File/folder yang tidak boleh disentuh disebutkan
- Model rekomendasi ditentukan
- Perlu Roomchat 01 atau tidak ditentukan
- Commit message disiapkan
- Eksekutor dilarang commit dan push

## Feature Batch Tracking Policy

Sistem history lama (Batch 01 sampai Batch 30) tidak lagi digunakan. Gunakan aturan Feature Batch berikut:
- **Batch FXX** = Kode batch baru menggunakan format `F` diikuti dua angka (misal F01, F02).
- **Batch F00** = Merupakan batch transisi (workflow reset) yang memulai sistem ini.
- **Batch F01 dan seterusnya** = Merupakan feature batch, di mana setiap batch mewakili satu fitur atau satu sistem besar.
- **Checkpoint Dokumentasi** = Boleh tetap menggunakan suffix `-CP` jika dibutuhkan untuk dokumentasi status (contoh: `Batch F05-CP`).

Setiap feature batch **wajib** memiliki:
- **Story**: Latar belakang fitur dan perannya.
- **Status**: Status pengerjaan fitur.
- **Reason / HOLD Notes**: Alasan penundaan (jika ada).
- **Next Step**: Tahapan selanjutnya yang harus dilakukan.

**Aturan Eksekusi Tetap Berlaku:**
- Roomchat 00 tetap menyusun instruksi final.
- Eksekutor tetap dilarang melakukan commit dan push.
- User tetap melakukan commit dan push setelah validasi.

## Aturan Status Batch

Setiap batch wajib memiliki status untuk melacak perkembangannya:

- **Completed**: Semua tujuan batch/tahap sudah selesai, file sesuai scope, validasi minimal sudah dilakukan, dan laporan eksekutor lengkap.
- **In Progress**: Batch induk atau tahapan masih berjalan dan belum mencapai ending.
- **Partial**: Sebagian pekerjaan selesai, tetapi belum memenuhi definition of done.
- **Blocked**: Pekerjaan tidak bisa dilanjutkan karena menunggu input, file, akses, keputusan user, atau kendala teknis.
- **HOLD**: Pekerjaan sengaja ditunda karena belum prioritas, belum waktunya, atau menunggu kondisi tertentu.
- **Not Started**: Tahapan sudah direncanakan tetapi belum dieksekusi.

## Aturan Parent-Child Status

Status batch induk **tidak otomatis completed** hanya karena salah satu tahap selesai.

Contoh:
Batch F05 — CV Download System
Status: In Progress
- F05A: Completed
- F05B: Completed
- F05C: Blocked
- F05D: Not Started

Maka Batch F05 belum completed. Status parent tetap In Progress atau Blocked sampai semua tahapan wajib selesai atau ada keputusan eksplisit untuk menutup/membatalkan tahap tertentu.

## Definition of Done (DoD)

Batch atau tahapan hanya boleh disebut **Completed** jika:
- Semua tujuan yang tertulis terpenuhi.
- Semua file yang berubah sesuai daftar file yang diizinkan.
- Tidak ada perubahan di luar scope.
- Validasi yang diminta sudah dilakukan.
- Tidak ada error besar yang disembunyikan.
- Jika ada bagian yang belum selesai, status harus Partial atau Blocked, bukan Completed.
- Laporan eksekutor lengkap.
- Commit/push tetap hanya dilakukan oleh user.

## History Checkpoint Policy

Isi aturan:
- History detail tidak wajib diisi setiap batch kerja.
- Batch kerja boleh fokus ke eksekusi.
- CURRENT_STATUS.md wajib diupdate jika ada perubahan besar.
- Checkpoint dokumentasi dilakukan saat user meminta `Batch [nomor]-CP`.
- Checkpoint dapat dilakukan kapan saja sesuai kondisi fokus user.
- Checkpoint tidak wajib setiap 5 batch atau 10 batch, tetapi bisa dipakai sebagai kebiasaan kerja jika user ingin.
- Saat checkpoint, rangkum hasil kerja sebelumnya ke dokumentasi yang sesuai.

Aturan saat `-CP`:
- Jika perubahan terjadi di client/frontend, update docs/frontend/.
- Jika perubahan terjadi di server/backend, update docs/backend/.
- Jika perubahan terjadi di database/data model, update docs/database/.
- Jika status project berubah, update docs/project/history/CURRENT_STATUS.md.
- Jika batch sudah selesai, update file batch history yang sesuai.
- Jangan menambahkan fitur baru saat checkpoint.

## Discussion / Pre-Batch Mode

- Digunakan saat user masih bertanya, bingung, brainstorming, atau meminta pendapat.
- Tidak memakai nomor batch.
- Tidak membuat/mengubah/menghapus file.
- Tidak membutuhkan Gemini eksekutor.
- Roomchat 00 boleh memberi rekomendasi arah, tetapi belum membuat instruksi final eksekusi.
- Jika butuh analisa Roomchat 01, hasilnya tetap berupa analisa chat, bukan dokumen repo.

## Roomchat 01 Analysis Mode

- Roomchat 01 adalah analis/auditor, bukan eksekutor.
- Analisa Roomchat 01 tidak dihitung sebagai batch.
- Analisa Roomchat 01 tidak membuat file baru.
- Analisa Roomchat 01 tidak perlu commit/push.
- Hasil analisa hanya menjadi bahan keputusan Roomchat 00 dan user.
- Analisa hanya boleh dijadikan dokumen repository jika user eksplisit meminta.

## Alur Kerja Batch

1. User menyampaikan kebutuhan ke Roomchat 00.
2. Roomchat 00 harus memastikan apakah permintaan user masih diskusi/pra-batch atau sudah siap menjadi batch eksekusi.
3. Jika masih diskusi, hentikan di Pre-Batch Mode.
4. Jika butuh Roomchat 01, jalankan Roomchat 01 Analysis Mode.
5. Batch eksekusi hanya dibuat setelah user menyetujui adanya perubahan repository.
6. Roomchat 00 membaca status project dari GitHub.
7. Roomchat 00 menentukan batch kecil yang aman.
8. Roomchat 00 membuat instruksi final.
9. Eksekusi dilakukan di Anti-Gravity IDE atau oleh Gemini Anti-Gravity.
10. User mengecek hasil di Anti-Gravity IDE.
11. Jika aman, user melakukan commit dan push.
12. Commit hash dikirim kembali ke Roomchat 00.
13. Jika perlu, Roomchat 01 melakukan audit hasil commit.

## Aturan Eksekusi

- Jangan mengerjakan hal di luar instruksi batch.
- Jangan membuat framework, package, dependency, atau konfigurasi baru tanpa instruksi eksplisit.
- Jangan mencampur pekerjaan dokumentasi, frontend, backend, dan deployment dalam satu batch besar kecuali memang diminta.
- Jangan menghapus file atau folder apa pun tanpa instruksi eksplisit dari user atau Roomchat 00.
- Jangan mengganti nama file atau folder tanpa instruksi eksplisit.
- Jangan menyimpan password, API key, token, credential, atau data sensitif di repository.

## Aturan Review

Review harus memeriksa:
- Apakah file yang dibuat atau diubah sesuai instruksi.
- Apakah ada perubahan di luar scope.
- Apakah struktur folder masih konsisten.
- Apakah referensi path masih benar.
- Apakah hasil aman untuk dilanjutkan ke batch berikutnya.

## Aturan Pemilihan Model AI

Aturan lengkap terkait pemilihan model dijelaskan dalam dokumen `MODEL_USAGE_GUIDE.md`. Poin penting:
- Roomchat 00 **wajib** merekomendasikan **Gemini 3.1 Pro Low** atau **Gemini 3.1 Pro High** sebagai eksekutor default.
- *Alternative acceleration models* (seperti Gemini 3.5 Flash, Claude, atau GPT OSS) hanya boleh digunakan jika User secara eksplisit meminta percepatan.
- Keputusan akhir pemilihan model sepenuhnya tetap berada di tangan User.

## Catatan Historis

Dokumen ini menggantikan fungsi utama dari file lama `docs/00-project-control/SOP_CHATGPT_PROJECT.md` yang telah dihapus sepenuhnya pada proses migrasi Batch 26C.
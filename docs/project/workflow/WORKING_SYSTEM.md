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

### Gemini Anti-Gravity

Gemini Anti-Gravity dapat digunakan sebagai eksekutor satu kali jika user ingin mempercepat pengerjaan.

Aturan Gemini:
- Hanya menjalankan instruksi final dari Roomchat 00.
- Tidak mengambil keputusan besar sendiri.
- Tidak mengubah file di luar scope.
- Tidak menjadi checker utama.
- Setelah selesai, cukup memberi laporan hasil eksekusi.

## Alur Kerja Batch

1. User menyampaikan kebutuhan ke Roomchat 00.
2. Roomchat 00 membaca status project dari GitHub.
3. Roomchat 00 menentukan batch kecil yang aman.
4. Jika perlu, Roomchat 00 meminta Roomchat 01 menganalisa risiko.
5. Roomchat 00 membuat instruksi final.
6. Eksekusi dilakukan di Anti-Gravity IDE atau oleh Gemini Anti-Gravity.
7. User mengecek hasil di Anti-Gravity IDE.
8. Jika aman, user melakukan commit dan push.
9. Commit hash dikirim kembali ke Roomchat 00.
10. Jika perlu, Roomchat 01 melakukan audit hasil commit.

## Aturan Eksekusi

- Jangan mengerjakan hal di luar instruksi batch.
- Jangan membuat framework, package, dependency, atau konfigurasi baru tanpa instruksi eksplisit.
- Jangan mencampur pekerjaan dokumentasi, frontend, backend, dan deployment dalam satu batch besar kecuali memang diminta.
- Jangan menghapus file lama sebelum fase migrasi menyatakan aman.
- Jangan mengganti nama file atau folder tanpa instruksi eksplisit.
- Jangan menyimpan password, API key, token, credential, atau data sensitif di repository.

## Aturan Review

Review harus memeriksa:
- Apakah file yang dibuat atau diubah sesuai instruksi.
- Apakah ada perubahan di luar scope.
- Apakah struktur folder masih konsisten.
- Apakah referensi path masih benar.
- Apakah hasil aman untuk dilanjutkan ke batch berikutnya.

## Catatan Historis

Dokumen ini menggantikan fungsi utama dari file lama `docs/00-project-control/SOP_CHATGPT_PROJECT.md` yang telah dihapus sepenuhnya pada proses migrasi Batch 26C.
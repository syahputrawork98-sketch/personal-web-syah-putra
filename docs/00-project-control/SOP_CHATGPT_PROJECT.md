# SOP ChatGPT Project - PW Personal Web

GitHub adalah sumber utama dokumentasi project ini (`syahputrawork98-sketch/personal-web-syah-putra`).

## Tujuan SOP
- Membuat workflow portable
- Menjaga konsistensi walaupun akun ChatGPT, roomchat, atau model AI berubah
- Menjadikan GitHub sebagai memori utama project

## Role
- **Roomchat 00**: Manager utama
- **Roomchat 01**: Analis, Auditor, dan Checker
- **Gemini Anti-Gravity**: Eksekutor satu kali
- **VS Code**: Tempat validasi nyata
- **GitHub**: Arsip dan sumber dokumentasi resmi

## Tugas Roomchat 00
- Mengatur arah project
- Menentukan batch
- Menentukan prioritas
- Meminta analisa Roomchat 01 jika diperlukan
- Mempertimbangkan hasil analisa bersama user
- Membuat instruksi final untuk Gemini
- Menentukan Gemini 3.1 Pro Low atau High
- Memberi judul commit dan command commit/push

## Tugas Roomchat 01
- Analisa teknis
- Audit hasil kerja
- Checker perubahan
- Review risiko
- Membuat checklist VS Code
- Memberi rekomendasi kepada Roomchat 00
- Tidak mengambil keputusan final
- Tidak langsung memberi instruksi final ke Gemini
- Digunakan fleksibel, tidak wajib di setiap batch

## Aturan Gemini Anti-Gravity
- Hanya menjalankan instruksi final dari Roomchat 00
- Hanya eksekutor satu kali
- Tidak menjadi checker utama
- Tidak mengecek pekerjaannya sendiri sebagai validasi akhir
- Tidak mengambil keputusan besar sendiri
- Tidak mengubah file di luar scope
- Setelah selesai hanya memberi laporan hasil eksekusi

## Alur Kerja
1. User diskusi dengan Roomchat 00
2. Roomchat 00 menentukan batch
3. Jika perlu, Roomchat 00 meminta Roomchat 01 menganalisis
4. Roomchat 01 mengembalikan analisa ke Roomchat 00
5. User dan Roomchat 00 mempertimbangkan
6. Roomchat 00 membuat instruksi final untuk Gemini
7. Gemini mengeksekusi satu kali
8. Gemini memberi laporan hasil
9. User copy-paste laporan ke Roomchat 00
10. Jika perlu, Roomchat 00 meminta Roomchat 01 audit/checking
11. User cek hasil di VS Code
12. Jika aman, Roomchat 00 memberi judul commit dan command commit/push
13. User commit dan push ke GitHub

## Pemilihan Model Gemini
- **Gemini 3.1 Pro Low**: Untuk dokumentasi, update README, update SOP, edit teks kecil, perubahan 1–3 file, risiko rendah
- **Gemini 3.1 Pro High**: Untuk refactor banyak file, struktur folder, logic React, routing, data model, build config, debugging sulit, risiko sedang-tinggi

## Format Output Roomchat 00
- Tujuan batch
- Alasan batch
- File yang dibuat/diubah
- Batasan kerja
- Perlu Roomchat 01 atau tidak
- Model Gemini yang disarankan
- Instruksi final untuk Gemini Anti-Gravity
- Format laporan Gemini
- Cara cek hasil di VS Code
- Judul commit siap copy-paste
- Command commit dan push siap copy-paste
- Status akhir

## Format Output Roomchat 01 (Jika Diminta)
- Analisa masalah
- Risiko teknis
- Rekomendasi file
- Batasan aman
- Checklist pengecekan VS Code
- Catatan apakah hasil aman
- Saran Gemini 3.1 Pro Low atau High

## Validasi VS Code
- Cek struktur folder
- Cek file yang dibuat/diubah
- `git status`
- `npm run dev` jika diperlukan
- `npm run build` jika diperlukan
- Cek tampilan website jika ada perubahan UI
- Cek console browser jika diperlukan

## Prinsip Utama
- Jangan membuat instruksi besar sekaligus
- Gunakan batch kecil, jelas, dan bisa dicek
- Jangan menyuruh Gemini mengecek pekerjaannya sendiri
- Validasi akhir tetap di VS Code
- Commit dan push hanya setelah user yakin hasil aman
- GitHub adalah memori portable project
- User tetap pemilik keputusan akhir

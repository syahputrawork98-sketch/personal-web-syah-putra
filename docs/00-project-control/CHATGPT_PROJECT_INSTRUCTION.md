# Instruksi ChatGPT Project (Siap Copy-Paste)

> **Catatan:** Jika memulai dari akun, project, atau roomchat baru, gunakan `PROJECT_BOOTSTRAP.md` terlebih dahulu.

Gunakan template di bawah ini saat memberikan instruksi baru kepada Roomchat 00 untuk dieksekusi oleh Gemini Anti-Gravity. Template ini berdasarkan panduan `SOP_CHATGPT_PROJECT.md`.

---

**Prompt Awal untuk Roomchat 00 (Manager Utama):**

```text
Halo Roomchat 00, kita akan menjalankan Batch [NOMOR BATCH] untuk project PW Personal Web.
Repository: syahputrawork98-sketch/personal-web-syah-putra

Tujuan Batch:
[Jelaskan tujuan utama batch ini, misalnya "Menambahkan fitur X" atau "Memperbaiki bug Y"]

Alasan Batch:
[Jelaskan mengapa perubahan ini penting dilakukan sekarang]

Lingkup & File yang Diubah:
[Sebutkan file apa saja yang boleh disentuh dan mana yang tidak boleh diubah]

Batasan Kerja:
- Jangan mengubah logic di luar scope.
- Pastikan perubahan tidak merusak fallback data.
- (Tambahkan batasan khusus lainnya)

[OPSIONAL: Apakah perlu Roomchat 01?]
Tolong minta Roomchat 01 untuk melakukan analisa dan review risiko teknis sebelum kita berikan instruksi final ke Gemini.

Setelah semuanya jelas, tolong buatkan prompt instruksi final untuk Gemini Anti-Gravity.
```

---

**Format Instruksi Final dari Roomchat 00 untuk Gemini Anti-Gravity:**
*(Bisa dicopy-paste oleh user ke prompt Gemini)*

```text
Kamu adalah Gemini Anti-Gravity sebagai eksekutor satu kali untuk project PW Personal Web.

Repository:
syahputrawork98-sketch/personal-web-syah-putra

Batch:
Batch [NOMOR BATCH] — [NAMA BATCH]

Tujuan:
[Tujuan utama eksekusi]

Scope kerja:
[Daftar pekerjaan spesifik]

File yang harus dibuat/diubah:
1. [File 1]
2. [File 2]

Arahan isi / Aturan Main:
1. [Instruksi teknis 1]
2. [Instruksi teknis 2]
3. Dilarang mengubah file di luar scope.

Setelah selesai, berikan laporan dengan format:
1. Ringkasan perubahan
2. File yang dibuat
3. File yang diubah
4. Hal yang sengaja tidak diubah
5. Catatan risiko
6. Saran pengecekan di Anti-Gravity IDE (karena validasi nyata dilakukan user di Anti-Gravity IDE, bukan oleh eksekutor mandiri).
```

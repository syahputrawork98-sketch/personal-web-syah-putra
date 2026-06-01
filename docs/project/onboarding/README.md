# Onboarding

Folder ini adalah pintu masuk utama untuk menyiapkan akun, roomchat, AI tools, atau workspace baru untuk project **PW Personal Web**.
Struktur onboarding ini dirancang sederhana dan mandiri, cukup menggunakan dokumen di dalam folder ini untuk memulai.

## Dokumen Utama

- `CHATGPT_PROJECT_INSTRUCTIONS.md` — instruksi siap copy-paste untuk setup ChatGPT Project dan prompt eksekutor.
- `ROOM_00_MANAGER_PROMPT.md` — prompt khusus Roomchat 00 sebagai manager utama.
- `ROOM_01_REVIEWER_PROMPT.md` — prompt khusus Roomchat 01 sebagai analis dan auditor.

## Alur Setup

1. Buka `CHATGPT_PROJECT_INSTRUCTIONS.md`.
2. Copy isi prompt Roomchat 00 ke Add Instructions ChatGPT Project jika project ini digunakan sebagai manager utama.
3. Gunakan `ROOM_00_MANAGER_PROMPT.md` untuk room manager.
4. Gunakan `ROOM_01_REVIEWER_PROMPT.md` untuk room reviewer.
5. Onboarding sekarang memakai **Feature Batch Tracking**:
   - `../history/CURRENT_STATUS.md` = dashboard aktif.
   - `../history/FEATURE_HISTORY.md` = index fitur.
   - `../history/features/FXX_*.md` = detail per fitur.
6. Roomchat baru harus membaca file fitur terkait sebelum memberi saran teknis.

## Fungsi Folder

Folder ini digunakan saat:
- Membuat ChatGPT Project baru.
- Membuat roomchat baru.
- Pindah akun atau tools AI.
- Memulai ulang project setelah jeda panjang.
- Memberi konteks awal kepada AI sebelum membahas teknis.

## Catatan Historis

Dokumen lama telah dikonsolidasikan ke struktur onboarding saat ini.
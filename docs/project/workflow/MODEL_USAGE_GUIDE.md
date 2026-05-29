# Model Usage Guide — PW Personal Web

## Fungsi Dokumen
Dokumen ini mengatur standar dan panduan pemilihan model AI yang digunakan dalam pengembangan project **PW Personal Web**. Tujuannya adalah untuk memastikan konsistensi, keandalan, dan efisiensi dalam setiap siklus *batch* pengerjaan, dengan tetap memberikan ruang bagi akselerasi saat dibutuhkan.

## Prinsip Utama
1. **Prioritas pada Model Default**: Project ini dikerjakan secara default menggunakan model yang telah ditetapkan dan terbukti handal.
2. **Keamanan & Presisi**: Perubahan pada file inti, refactor, atau perencanaan arsitektur wajib menggunakan model dengan *reasoning* yang tinggi.
3. **Kemandirian Keputusan Final**: Keputusan penggunaan model alternatif ada sepenuhnya di tangan User, AI sekadar memberikan rekomendasi.

## Primary Models
Model default utama yang wajib direkomendasikan oleh Roomchat 00 dan digunakan secara standar dalam project ini adalah:

- **Gemini 3.1 Pro Low**
- **Gemini 3.1 Pro High**

## Model by Batch Size

- Small Batch → Gemini 3.1 Pro Low
- Medium Batch → Gemini 3.1 Pro High
- Large Batch → pecah menjadi beberapa batch kecil jika memungkinkan. Jika tidak bisa, gunakan Gemini 3.1 Pro High dan wajib review Roomchat 01.
- Acceleration Mode → hanya jika user meminta. Tetap perlu review jika scope sedang/besar.

### Aturan Penggunaan Gemini 3.1 Pro Low
Gunakan model ini untuk tugas dengan risiko rendah dan *scope* kecil, seperti:
- Edit dokumentasi ringan
- Update `README.md` skala kecil
- Update riwayat batch (history)
- Update status project (current status)
- Perbaikan *typo* atau *wording*
- Perubahan pada 1 sampai 3 file saja

### Aturan Penggunaan Gemini 3.1 Pro High
Gunakan model ini untuk tugas dengan kompleksitas dan risiko menengah hingga tinggi, seperti:
- Perubahan pada banyak file sekaligus
- Restrukturisasi dokumentasi skala besar
- Migrasi file antar-folder
- Refactor kode
- Perencanaan arsitektur teknis
- Pekerjaan yang membutuhkan pemahaman konteks lintas-komponen yang dalam

## Alternative Acceleration Models
Model di luar *Primary Models* dianggap sebagai model akselerasi alternatif. Model alternatif yang diperbolehkan di Anti-Gravity IDE meliputi:
- **Gemini 3.5 Flash Medium**
- **Gemini 3.5 Flash High**
- **Gemini 3.5 Low**
- **Claude Sonnet 4.6 Thinking**
- **Claude Opus 4.6 Thinking**
- **GPT OSS 120B Medium**

## Acceleration Mode
Model alternatif beroperasi di bawah skema *Acceleration Mode*. Karakteristik mode ini:
- Digunakan murni sebagai *Acceleration model*, *Drafting helper*, *Exploration helper*, atau *Non-default executor*.
- **Tidak boleh menggantikan model default utama**, kecuali User secara eksplisit meminta percepatan atau memberikan persetujuan untuk menggunakan token/model tertentu.

## Model Selection Rule
1. **Default Request**: Saat User mengajukan tugas tanpa menyebutkan preferensi model, sistem dan Roomchat 00 akan menggunakan dan merekomendasikan salah satu dari *Primary Models*.
2. **Explicit Request**: Jika User eksplisit meminta percepatan atau menyebutkan model tertentu (misal: "Gunakan Claude Sonnet 4.6 Thinking untuk eksplorasi ini"), barulah model alternatif digunakan.

## Role of Roomchat 00
Roomchat 00 bertindak sebagai manajer yang mengatur alur. Tugas utamanya terkait model adalah:
- **Selalu merekomendasikan** penggunaan Gemini 3.1 Pro Low atau Gemini 3.1 Pro High sebagai eksekutor.
- Menyertakan rekomendasi model dengan tegas di dalam setiap *prompt* instruksi final untuk eksekutor.

## Role of Roomchat 01
Roomchat 01 bertindak sebagai auditor. Jika Roomchat 01 menyadari bahwa tugas yang dikerjakan memiliki kompleksitas tinggi namun diinstruksikan untuk dieksekusi dengan model rendah (*Low*), Roomchat 01 wajib memberikan peringatan (flag) dan merekomendasikan penggunaan model yang lebih kuat (seperti Gemini 3.1 Pro High).

## Recording Model Usage
Pencatatan riwayat penggunaan model dilakukan pada file *history batch*.
- Untuk penggunaan **Gemini 3.1 Pro Low** dan **Gemini 3.1 Pro High**, pencatatan tidak diwajibkan (bersifat opsional, boleh dicatat untuk batch yang krusial).
- Jika **Alternative Acceleration Models** digunakan, penggunaan tersebut **wajib dicatat** dalam riwayat batch dengan format berikut:

```text
Model used: <model name>
Mode: Normal / Acceleration
Reason: <alasan singkat>
```

## Safety Rule
- Keputusan akhir pemilihan model selalu berada di tangan User.
- Jangan pernah memaksa penggunaan *Acceleration Model* jika User tidak memintanya.
- Jangan menjalankan perintah eksekusi kode atau migrasi file sistem kritis menggunakan model alternatif tanpa validasi ketat dari User.

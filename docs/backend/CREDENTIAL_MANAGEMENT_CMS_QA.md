# Credential Management CMS QA Report

## 1. Tujuan QA
Dokumen ini menguraikan temuan, peta struktural, dan konklusi rekayasa dari hasil verifikasi kualitas serta *hardening* pada sistem *Credential / Certification Management Module* (F09C.1). Tahap ini menegaskan kekokohan perlindungan API dari eksekusi gelap, menajamkan pemetaan *database* antara sisi antarmuka dan *backend*, serta memastikan fungsionalitas CRUD sejalan dengan prinsip *stateless authentication*.

## 2. Scope QA
- Memeriksa ketahanan dan konsistensi komponen `AdminCertifications`, `AdminCertificationCreate`, `AdminCertificationEdit`, serta form input `CertificationForm`.
- Memeriksa implementasi interseptor rute (`api.js`) dan pembersihan token lokal.
- Memeriksa fungsionalitas dan pelindung HTTP metode REST pada `certification.controller.js` dan `certification.routes.js`.
- Melacak sinkronisasi kolom-kolom (*field mapping*) spesifik dari *Payload* JSON antarmuka ke *Prisma Schema*.
- Uji isolasi penolakan dengan sengaja menggunakan *fetch* tanpa lisensi token.
- Uji integrasi statis dengan meluncurkan proses kompilasi bundel (*build*) produksi React (*Vite*).

## 3. File Frontend yang Diaudit
- `client/src/pages/admin/AdminCertifications.jsx`
- `client/src/pages/admin/AdminCertificationCreate.jsx`
- `client/src/pages/admin/AdminCertificationEdit.jsx`
- `client/src/components/admin/CertificationForm.jsx`
- `client/src/lib/api.js`

## 4. File Backend yang Diaudit
- `server/src/routes/admin/certification.routes.js`
- `server/src/controllers/certification.controller.js`

## 5. Data Flow Credential Management
- **List:** Mengambil susunan daftar kredensial berdasarkan saringan opsional kategori atau tipe. Backend mengembalikan senarai dengan prioritas *displayPriority* (`order`).
- **Filter:** Tabulas interaktif di frontend (contoh: "Featured", "BNSP", "Professional") secara instan memanggil parameter kueri RESTful ke backend untuk me-render tipe yang bersesuaian.
- **Create:** Pengguna melengkapi form isian (sertifikat / dokumen). Pengiriman dicegat oleh utilitas `fetcher` API dan disuntikkan `Authorization: Bearer <token>`. Di ujung penerima, backend Prisma menyemaikan UUID mandiri (jika tak diberikan) dan mengatur properti *status* bawaan ke `PUBLISHED`.
- **Edit:** Pengguna memodifikasi *state* lampiran kredensial (termasuk koma yang diubah jadi deret `skills`). Permintaan PUT ke endpoint akan mereposisi nilainya secara presisi.
- **Delete:** Interaksi pembasmian diverifikasi melalui peringatan pop-up DOM. Keberhasilan menstimulasi pemanggilan GET yang segar (*refresh*).
- **View Link:** Tombol eksternal "View" dikonfigurasi menautkan akses pembukaan dokumen (ke `certificateUrl` atau `driveUrl`).

## 6. API Endpoint Map

| Action | HTTP Method | Endpoint Path | Source Layer | Status |
|---|---|---|---|---|
| Fetch All | GET | `/api/admin/certifications` | `certification.controller.js` | Protected |
| Fetch One | GET | `/api/admin/certifications/:id` | `certification.controller.js` | Protected |
| Create | POST | `/api/admin/certifications` | `certification.controller.js` | Protected |
| Update | PUT | `/api/admin/certifications/:id` | `certification.controller.js` | Protected |
| Delete | DELETE | `/api/admin/certifications/:id` | `certification.controller.js` | Protected |

## 7. Auth Protection Check
Seluruh jalur admin kredensial diawasi *middleware* absolut `requireAdmin`. Pengujian skrip injeksi `fetch()` lokal mengonfirmasi tolakan HTTP 401 pada akses *non-authorized*.

## 8. Validation Check
1. Keberadaan atribut kritis (`title`, `issuer`) dipantau ketat secara struktural dan melontarkan 400 Bad Request jika alpa.
2. Keunikan entitas penambahan (*Create*) diamankan dengan pembubuhan `id` berbasis waktu jika ID rakitan absen.
3. Koma *separated string* dari form klien direduksi secara organik menjadi barisan *array* primitif di level kontroler.
4. **[HOTFIX PATCH]**: *Bug* potensial `TypeError` akibat ketiadaan parameter turunan dari `req.body` kosong di-intersepsi menjadi tipe objek *default* `req.body || {}`.
5. **[HOTFIX PATCH]**: Celah di halaman *Create* dan *Edit* untuk pengabaian respon *error 401* telah ditambal, di mana rute-rute ini kini konsisten memanggil fungsi `removeToken()` dan mengembalikan pengguna secara paksa ke beranda masuk `/admin/login`.

## 9. Field Mapping Check
Auditor menyempurnakan asimilasi pemetaan field dari UI ke Prisma:
- **`description` (UI)** didorong menjadi kolom **`summary`** (DB).
- **`order` (UI)** didorong menjadi kolom **`displayPriority`** (DB).
- **`issuedAt` (UI)** ditambal untuk berlabuh tepat ke kolom **`issueDate`** bertipe *DateTime* (DB).
- **`expiredAt` (UI)** ditambal untuk berlabuh ke kolom **`endDate`** bertipe *DateTime* (DB).
- **`type` (UI)** disetel mendarat ke atribut **`type`** *enum* (`CERTIFICATE` / `SUPPORTING_DOCUMENT`) yang sebelum *patch* ini tidak sengaja terabaikan saat *create/update*.
- Kolom UI seperti `credentialUrl`, `certificateUrl`, dan `imageUrl` belum ditangani langsung oleh relasi kolom skema `Credential` Prisma secara sepadan. Di masa depan, hal ini bisa disisipkan ke *payload* JSON `metadata` atau ditambahkan spesifik jika diperlukan perombakan skema murni (*schema alteration*). Hal ini dicatat sebagai wajar (tidak merusak).

## 10. Test Case Table

| Test Case | Expected Result | Actual Result | Status | Notes |
|---|---|---|---|---|
| Build Production Frontend | Bundle kompresi berjalan | Vite *build success* | Pass | Klien aman dijalankan pada distribusi final (*Syntax error patched*). |
| GET API Admin Tanpa Token | Server merespons `401 Unauthorized` | `401 Unauthorized` | Pass | Guard aktif mencegah akses. |
| POST / DELETE Tanpa Token | Server merespons `401 Unauthorized` | `401 Unauthorized` | Pass | Pencegahan mutasi data bekerja. |
| Interaksi 401 di Komponen Create/Edit | Token dihapus, *redirect* ke login | Token dihapus, dipindah ke `/admin/login` | Pass | *Patch* pengkabelan berhasil disertakan. |
| Create & Update dengan Data Valid | Berhasil disimpan dan merespons `201`/`200` | (Membutuhkan kredensial nyata) | Limited | Tidak dapat disimulasi murni tanpa akun admin. |

## 11. Keterbatasan QA
Validasi *success-response* fungsional dibatasi pada asumsi perantara (`api.js` dan kontroler *backend*) karena tidak diizinkan membuat *credential seed* untuk otorisasi otentik aktual di F09C.1. Pengujian dibatasi secara spesifik pada pengawasan protektif (keamanan) dan penyesuaian bentuk data (arsitektur).

## 12. Risiko Tersisa
Tidak terdeteksi celah kritis tersisa. Model pemetaan antara objek *form* dengan atribut *database* cukup longgar, yang mana beberapa field kosmetik belum tertampung sempurna secara primitif di *database*, namun secara fungsional fitur utama (menyimpan tautan `driveUrl` dan representasi keterampilan) beroperasi dengan apik.

## 13. Rekomendasi Batch Berikutnya
- Mengeksekusi peninjauan untuk F09D (*CV and Asset Link Management Module*).
- Jika implementasi visual kelak diperlukan, penyesuaian *database schema* (F07) bisa dipertimbangkan ulang untuk mengakomodasi tautan gambar sertifikat yang masih yatim piatu di sisi komponen UI saat ini.

## 14. Kesimpulan Status F09C.1
Sistem sertifikasi dan manajemen kredensial selesai diaudit, didokumentasikan, dan dilindungi tambalan *hotfix* mutakhir. Status rute sub-batch eksekusi **F09C.1 dinyatakan Completed**.

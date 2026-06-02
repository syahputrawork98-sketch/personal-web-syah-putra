# CV and Asset Link Management CMS QA Report

## 1. Tujuan QA
Dokumen ini menguraikan langkah-langkah audit, sinkronisasi, dan validasi pada modul *CV and Asset Link Management* (F09D.1). Tujuannya adalah memastikan alur tautan manajemen CV (*Resume URL*) yang diatur dari Admin CMS beresonansi akurat dengan konfigurasi berkas statis PDF aktual (F05) dan pedoman inventaris tautan (F06), tanpa memicu pembentukan sistem unggah fail (*upload system*) yang menyimpang dari rancangan arsitektur.

## 2. Scope QA
- Audit *placeholder input* pengaturan `resumeUrl` pada antarmuka manajemen profil admin.
- Memastikan pemetaan data lokal struktur CV di *frontend* sejalan dengan realitas ketersediaan fail PDF, termasuk penjagaan ketat agar varian yang belum lengkap fail PDF-nya tidak terekspos.
- Mengunci kepastian tak ada pembengkakan modifikasi di lingkup *database backend*.
- Sinkronisasi leksikal pada dokumentasi agar tidak mendisrupsi penafsiran fungsional (memastikan modul F09D dikenali murni sebagai *Link Management*, bukan unggahan biner).

## 3. Hubungan F09D dengan F05 dan F06
- **F05 (CV Download System):** F05 bertanggung jawab pada fail PDF statis (`/cv/cv-syah-putra-nugraha-web-developer.pdf`) dan tata letak *button* eksternal. F09D menjadi pintu pengelola tempat administrator web menautkan fail statis tersebut ke variabel profil dinamis (`resumeUrl`).
- **F06 (Asset Link and Preview System):** F06 mengatur arsitektur relasi tautan publik dan purwarupa pratinjau. F09D mendampingi sebagai penyedia layanan entri *dashboard* (CMS) untuk tautan-tautan tersebut.

## 4. File Frontend yang Diaudit
- `client/src/pages/admin/AdminProfileSettings.jsx`

## 5. File Data yang Diaudit
- `client/src/data/cvVariants.js`

## 6. CV Path Check
Pengecekan mengonfirmasi fail ekspektasi CV untuk skena *Web Developer* bersemayam di struktur absolut direktori statik (sebagaimana dijanjikan di F05). Tautan di `cvVariants.js` sudah sinkron menunjuk `/cv/cv-syah-putra-nugraha-web-developer.pdf`. 
Telah ditambahkan pula anotasi (*comment code*) secara definitif pada varian Manufaktur dan Sipil agar nilai tautan absolut (`pdfUrl: ""`) dipastikan lumpuh (*disabled*) meredam bahaya tautan mati ("404 Not Found"). Placeholder `resumeUrl` di laman Profile Settings telah diperbarui untuk merujuk pada format jalur CV terbaru.

## 7. Asset Link Management Boundary
Garis batas telah digores tegas di dalam laporan `ADMIN_CMS_SCOPE.md` bahwa interaksi *Admin Profile Settings* dengan variabel `resumeUrl` (F09D) mutlak dibatasi pada sebatas simpan-salin *string URL* belaka. Pembangunan *form multipart-data* untuk unggahan fisik (unggah lokal file PDF via antarmuka administrator) dicegah, memitigasi anomali ledakan repositori (*server bloat*) dan kompleksitas mutasi berkas I/O sekunder di sisi backend.

## 8. Test Case Table

| Test Case | Expected Result | Actual Result | Status | Notes |
|---|---|---|---|---|
| Periksa Placeholder `resumeUrl` CMS | Muncul struktur path terbaru: `/cv/cv-syah-putra-nugraha-web-developer.pdf` | Tampil path yang dikoreksi | Pass | Placeholder diganti sukses dari yang semula memakai nama path lama. |
| Pemeriksaan state Varian Sipil & Mesin | `pdfUrl` dikunci kosong `""` | `pdfUrl: ""` | Pass | Komentar penjelasan telah dibubuhkan. |
| Kompilasi Produksi Vite (*Build*) | Vite bundler merakit kode secara murni tanpa *error syntax* akibat *update string* | Berhasil dibuat | Pass | Integritas *frontend* utuh. |
| Pengujian Endpoint Modifikasi Ekstra | Tidak ada mutasi di luar lingkup CMS tautan statis | Prisma & server *untouched* | Pass | Valid. |

## 9. Keterbatasan QA
Fase validasi fungsional menyeluruh dari `AdminProfileSettings` menuju perombakan visual di *Public Hero Section* direduksi hingga sebatas analisis pasif karena larangan intervensi operasional data persisten (*No Credential Allowed*). Tinjauan sebatas observasi konfigurasi *default* dan audit statis struktur fail.

## 10. Risiko Tersisa
Kesalahan konfigurasi manual saat Admin menempelkan tautan URI dari sumber eksternal tanpa diawali sintaks root komprehensif (`http` atau `/`) bisa memecah interkoneksi navigasi internal DOM router *frontend*. Namun, risiko ini dipandang rendah berbekal pengawasan visual mandiri pengguna.

## 11. Rekomendasi Batch Berikutnya
Mengawal realisasi dari **F09E** (*Profile/Settings Management Module*), modul yang akan melanjutkan penataan dinamis bagian depan platform dengan memperkuat sinkronisasi kolom-kolom lain (seperti *Summary HTML* dan *Avatar URL*).

## 12. Kesimpulan Status F09D.1
Audit sinkronisasi tata ruang *string URL* selesai. Batas yurisdiksi manajemen tautan diamankan, pedoman direvitalisasi, dan perlindungan *falsy data* pada unduhan CV sukses dikonfirmasi. Status modul inspeksi ini dinyatakan **Completed**.

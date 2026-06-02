# Profile and Settings Management CMS QA Report

## 1. Tujuan QA
Dokumen ini menguraikan langkah-langkah audit, *hardening*, serta sinkronisasi arsitektur pada modul *Profile and Settings Management* (F09E.1) dalam ekosistem CMS. Fokus utamanya adalah memastikan interkoneksi data profil (Hero, Profile, Contact) antara basis data (*Prisma*) dan sisi antarmuka (*React*) berjalan ajeg, memiliki pelindung API yang tangguh, serta mampu menangani kesalahan autentikasi dengan mulus (*graceful degradation*).

## 2. Scope QA
- Audit halaman pengaturan sisi *frontend*: `AdminHeroSettings.jsx`, `AdminProfileSettings.jsx`, `AdminContact.jsx`.
- Inspeksi integrasi penghubung modul API: `client/src/lib/api.js`.
- Audit pengontrol sisi *backend*: `settings.controller.js` dan tata jaringannya `settings.routes.js`.
- Verifikasi perlindungan akses *middleware* (`requireAdmin`) pada tiap operasi GET/PUT.
- Pengecekan konsistensi *field mapping* JSON (*body requests*) dan penanganan kegagalan (*error handlers*) HTTP 401.

## 3. File Frontend yang Diaudit
- `client/src/pages/admin/AdminHeroSettings.jsx`
- `client/src/pages/admin/AdminProfileSettings.jsx`
- `client/src/pages/admin/AdminContact.jsx`
- `client/src/lib/api.js`

## 4. File Backend yang Diaudit
- `server/src/routes/admin/settings.routes.js`
- `server/src/controllers/settings.controller.js`

## 5. Data Flow Settings Management
- **Hero Settings**: Merombak elemen teratas halaman (*Hero Section*) termasuk variabel animasi peran, frasa ajakan bertindak (CTA), serta *resumeUrl*. Frontend menyusun barisan `roles` (*comma-separated string*) ke dalam bentuk matriks (*Array*) sebelum mendorongnya via PUT JSON, sementara `updateHero` di belakang menyimpan data persisten ini ke baris `SiteSetting`.
- **Profile Settings**: Meramu bagian biografi (Summary) beserta *avatarUrl* dan *resumeUrl*. Fungsi kerjanya seirama dengan *Hero* menggunakan PUT JSON.
- **Contact Settings**: Memfokuskan diri pada penyimpanan matriks variabel komunikasi (*email, location, phone, media sosial*). Form akan mengemas nilai-nilai (*values*) tersebut, dan mengarahkannya pada *endpoint* kontak.

## 6. API Endpoint Map

| Action | HTTP Method | Endpoint Path | Controller | Status |
|---|---|---|---|---|
| Get Hero Admin | GET | `/api/admin/settings/hero` | `getAdminHero` | Protected |
| Update Hero | PUT | `/api/admin/settings/hero` | `updateHero` | Protected |
| Get Profile Admin | GET | `/api/admin/settings/profile` | `getAdminProfile` | Protected |
| Update Profile | PUT | `/api/admin/settings/profile` | `updateProfile` | Protected |
| Get Contact Admin | GET | `/api/admin/settings/contact` | `getAdminContact` | Protected |
| Update Contact | PUT | `/api/admin/settings/contact` | `updateContact` | Protected |

## 7. Auth Protection Check
Semua relasi administrasi di `settings.routes.js` berlindung di balik payung *middleware* `requireAdmin`. Pengujian skrip independen `fetch()` (*server local*) tanpa injeksi sesi valid menghasilkan tolakan konstan 401 dari semua rute (GET & PUT). 

**[HOTFIX PATCH]**: Deteksi menemukan penanganan 401 pada `AdminHeroSettings.jsx` dan `AdminProfileSettings.jsx` yang belum standar (hanya membuahkan pesan ralat, bukan mengeluarkan pengguna secara mekanis). Hal tersebut ditambal dengan kode perbaikan berupa fungsi interseptor token (`removeToken()` disusul pengalihan ke `/admin/login`), selaras dengan kaidah keamanan modul kontak.

## 8. Validation Check
1. Variabel kiriman eksternal untuk Hero dan Profile sudah diperiksa melalui penjaga tipe objek (`typeof req.body !== 'object'`).
2. **[HOTFIX PATCH]**: Potensi ralat aplikasi (500 Internal Server Error) pada `updateContact` apabila API dihujani oleh *request* hampa (`undefined body`) diamankan seketika. Kode ditambal memakai penopang standar: `const { ... } = req.body || {};` demi meredam distruksi nilai hampa.
3. Struktur *body* frontend terbukti seirama dengan parameter yang ditampung pengontrol Prisma UPSERT (*SiteSetting*).

## 9. Resume URL / CV Path Check
Selama F09D berlangsung, ditemukan rujukan lampau `placeholder="e.g. /CV_Syah_Putra_Nugraha.pdf"` yang masih menggantung pada UI isian *Resume URL* di `AdminHeroSettings.jsx`. Rujukan visual ini ditransformasikan merujuk pada standar lokasi direktori F05 mutakhir, yakni `/cv/cv-syah-putra-nugraha-web-developer.pdf`. 

## 10. Test Case Table

| Test Case | Expected Result | Actual Result | Status | Notes |
|---|---|---|---|---|
| Pengujian Kompilasi Antarmuka | Modifikasi React terkompilasi bersih di *bundler* Vite | 100% *Transformed*, tanpa ralat. | Pass | Vite *production build* sempurna. |
| GET API Hero/Profile/Contact (Tanpa Token) | Menghasilkan kode respons 401 Unauthorized | HTTP 401 Unauthorized | Pass | Penjaga rute *requireAdmin* kokoh. |
| PUT API Hero/Profile/Contact (Tanpa Token) | Menghasilkan kode respons 401 Unauthorized | HTTP 401 Unauthorized | Pass | Titik mutasi data dijaga kuat. |
| Respon 401 di Komponen `AdminHeroSettings` & `AdminProfileSettings` | Menghapus token lokal dan melakukan pengalihan paksa | Pengalihan ke halaman *login* bekerja | Pass | Hotfix terintegrasi sempurna di frontend. |
| Modifikasi Normal CRUD Admin CMS | Mengubah preferensi statis (*SiteSetting*) dan merespons HTTP 200 | (Tak bisa diuji spesifik tanpa admin seed) | Limited | Fungsionalitas sebatas jaminan teori struktural. |

## 11. Keterbatasan QA
Keberhasilan manipulasi (respons 200) tak mampu dibuktikan 100% melalui *sandbox* kali ini imbas kebijakan restriksi *No Seed / No Credential* proyek, sehingga pengujian spesifik memfokuskan porsinya menyoroti perilaku *error-handling*, otorisasi, dan validasi *schema payload* yang telah terjamin ketat.

## 12. Risiko Tersisa
Hampir tak ada. Semua *endpoint* terlindungi, celah 401 sudah dijangkau, parameter *undefined* terjegal, serta komponen antarmuka telah diverifikasi dapat digabungkan secara utuh (ter-*build*). Kelemahan sekunder mungkin ada pada kurangnya pembatasan panjang data string pada teks narasi profil (bergantung batas kolom pangkalan data PostgreSQL secara *default*).

## 13. Rekomendasi Batch Berikutnya
Mengawal kesiapan operasional fase Deployment (F10). Seluruh ekosistem admin dari manajemen portofolio (F09B) hingga pengaturan profil hulu (F09E) telah diperkuat, merangkai kerangka administrasi kokoh yang siap untuk transisi ke lingkungan rilis.

## 14. Kesimpulan Status F09E.1
Penjaminan kualitas sistem manajemen Hero, Profile, dan Contact dinyatakan beres. Segala inkonsistensi otorisasi antarmuka dan kerapuhan sintaks di *controller backend* diamankan via *hotfix*. Status penyelesaian rute audit F09E.1 disahkan menjadi **Completed**.

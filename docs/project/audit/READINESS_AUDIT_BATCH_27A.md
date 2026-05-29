# Readiness Audit - Batch 27A

## 1. Ringkasan Status Project
- **Website Publik (Frontend):** Stabil dan fungsional. Fitur utama seperti kategori portfolio, detail modal proyek, dan selector varian CV aktif menggunakan *data statis* (fallback system).
- **Backend & Auth:** Status **HOLD** (hanya berupa kerangka/skeleton).
- **Deployment:** Target lingkungan produksi *frontend-only* di Vercel, namun masih tertahan menunggu konfirmasi domain dan aset.

## 2. Temuan CV Final
- **Status:** **HOLD (Belum Siap)**
- **Bukti Kode:** 
  - Pada `client/src/data/cvVariants.js`, variabel `pdfUrl` untuk semua varian masih diisi string kosong `""` dan diberi keterangan `// Coming Soon`.
  - Pada UI `client/src/components/CVVariantSelector.jsx`, tombol unduhan di-*disable* dengan kondisi `disabled={!variant.pdfUrl}` dan menampilkan teks "PDF Belum Tersedia" / "Coming Soon".
- **Analisis:** User belum mengunggah atau memberikan file PDF CV yang asli/final ke dalam repository.

## 3. Temuan Admin/Login & Private Hardening
- **Status:** **HOLD (Hidden)**
- **Bukti Kode:** 
  - File `client/src/App.jsx` memiliki rute eksplisit `/admin/login` dan `/admin/*` (dilindungi oleh komponen `ProtectedRoute`). 
  - `client/src/lib/api.js` sudah memiliki rute panggilan ke API (login, manajemen proyek).
  - Sesuai dengan `CURRENT_STATUS.md`, tidak ada tautan (UI link) ke rute `/admin` dari halaman depan atau publik.
- **Rekomendasi Hardening:** Selama backend belum aktif dan deployment masih tahap *frontend-only*, rute `/admin` ini cukup dibiarkan tersembunyi (hidden). Namun perlu dipastikan bahwa pengunjung awam yang "menebak" URL `/admin` tidak disajikan error tak tertangani.

## 4. Temuan Deployment / Domain Blocker
- **Status:** **HOLD (Local-Ready, Siap Build)**
- **Bukti:** Panduan `README.md` dan `CURRENT_STATUS.md` menegaskan proyek ini siap dideploy ke Vercel (frontend-only) dengan menggunakan perintah `npm run build` pada folder `client/`. 
- **Blocker Aktual:** Menunggu instruksi akhir mengenai nama domain kanonikal, penyelesaian aset, dan URL produksi final sebelum tombol *deploy* ditekan.

## 5. Temuan Credential / Secret Safety
- **Makna:** "Credential Safety" merujuk pada standar ketat proyek ini untuk tidak menyimpan atau me-*commit* teks sensitif (API key, token, string koneksi DB, password) ke repository (karena berpotensi bocor).
- **Temuan:** Inspeksi pada `app.js` (backend) dan `api.js` (frontend) menunjukkan penggunaan `import.meta.env` dan `process.env` untuk variabel lingkungan, bukan menyimpan data asli di dalam kode.
- **Status:** **Aman.** Tidak ditemukan pembocoran *credential* pada file kode yang diulas.

## 6. Temuan External Project Asset Links
- **Status:** **HOLD (Data Kosong / Placeholder)**
- **Bukti:** Merujuk pada `CURRENT_STATUS.md` dan `FITUR.md`, berbagai link eksternal spesifik proyek (link file Figma, Google Drive untuk RAB, tautan pratinjau Model 3D) masih belum memiliki URL asli.

## 7. Risiko Jika Langsung Deployment Saat Ini
- **Pengalaman Pengguna (UX):** Jika segera di-deploy, pengunjung dapat mengklik tombol "Unduh CV" yang tidak berfungsi, atau mendapati bahwa tidak ada tautan menuju repositori aset desain (Figma/Drive). Hal ini bisa memberikan kesan bahwa website belum selesai (*unfinished*).
- **Backend Error Logs:** Apabila ada sisa-sisa API fetch yang langsung dieksekusi tanpa backend, *console browser* pengunjung mungkin dipenuhi dengan *error* "Failed to fetch" yang mengurangi kesan profesional.

## 8. Rekomendasi Urutan Batch Berikutnya
Berdasarkan temuan audit di atas, disarankan pengerjaan dilakukan sesuai urutan prioritas berikut:
1. **Batch 27B: CV Utama Final** — Menerima file PDF dari user, meletakkan pada folder publik, dan memodifikasi `cvVariants.js` agar link unduhan berfungsi (menghilangkan status *Coming Soon*).
2. **Batch 27C: Admin Hidden/Private Hardening** — Memastikan frontend tidak rusak saat orang luar mencoba masuk ke `/admin`, dan memastikan endpoint statis aman.
3. **Batch 27D: Asset Links Cleanup** — Melengkapi seluruh URL asli proyek eksternal (GitHub, Drive, Figma, Model Preview) ke dalam model data statis.
4. **Batch 27E: Deployment Readiness** — Pengecekan build (*npm run build*), pengaturan variabel lingkungan di Vercel, dan perilisan ke domain asli.

## 9. Checklist Validasi di Anti-Gravity IDE
- [x] Laporan audit dibuat secara analitis.
- [ ] Pastikan tidak ada modifikasi pada logika frontend (`client/src/*`) di Batch ini.
- [ ] Pastikan tidak ada modifikasi pada logika backend (`server/src/*`) di Batch ini.
- [ ] User melakukan tinjauan pada file `READINESS_AUDIT_BATCH_27A.md` melalui Anti-Gravity IDE sebelum memutuskannya sebagai *done* (di-*commit* & *push* secara manual).

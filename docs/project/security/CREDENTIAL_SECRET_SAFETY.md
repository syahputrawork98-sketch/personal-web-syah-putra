# Credential & Secret Safety Guidelines

## 1. Tujuan Dokumen
Dokumen ini dibuat untuk memperkuat keamanan repository dari potensi kebocoran data sensitif (credential leak). Tujuannya adalah memastikan bahwa seluruh pengembang dan agen (AI) yang berkontribusi dalam project PW Personal Web memiliki standar yang sama dalam menangani file environment, API key, token, dan data rahasia lainnya agar tidak tersimpan atau ter-commit ke GitHub.

## 2. File yang Tidak Boleh Di-commit
File-file berikut **dilarang keras** untuk di-commit dan wajib dimasukkan ke dalam `.gitignore`:
- `.env`, `.env.local`, `.env.production`, `.env.development`
- File sertifikat dan private key (`*.pem`, `*.key`, `*.p12`, `*.pfx`, `id_rsa`, `id_rsa.pub`)
- File kredensial cloud atau service (`*service-account*.json`, `*credentials*.json`, `*secret*.json`)

*Catatan: Pastikan file `server/data/credentials.json` (jika itu adalah data mock publik) telah dipilah dan tidak berisi secret asli sebelum di-commit.*

## 3. Aturan Penggunaan .env
- Selalu gunakan file `.env.example` atau `.env.sample` untuk mendemonstrasikan variabel lingkungan apa saja yang dibutuhkan.
- Isi value di `.env.example` dengan placeholder kosong atau nilai palsu (misal: `YOUR_API_KEY_HERE`, `change_this_secret`).
- Semua nilai kredensial yang asli (database URL, API Key, JWT Secret) hanya boleh ditulis di file `.env` lokal masing-masing atau dikonfigurasikan langsung di dashboard hosting (misal: Vercel / Netlify / VPS).

## 4. Aturan External Links
- Semua URL eksternal (Google Drive, Figma, dsb.) harus dipastikan di-set ke mode *Public* (Anyone with the link can view) **sebelum** dimasukkan ke dalam aplikasi.
- Dilarang memasukkan URL yang secara tidak langsung membocorkan session token pribadi atau akses admin ke dalam kode sumber (source code) publik.

## 5. Cara Melaporkan Temuan Secret (Insiden Kebocoran)
Jika Anda (atau agen otomatis) menemukan file atau kode yang berisi secret:
- **JANGAN** pernah menyalin (copy-paste) atau menuliskan *value* secret tersebut di dalam chat log, issue GitHub, atau laporan dokumen.
- Laporkan dengan format umum, contoh: *"Ditemukan indikasi JWT Secret pada file `server/.env` di baris ke-2."*
- Segera tandai masalah ini untuk ditangani secepatnya.

## 6. Checklist Sebelum Commit
1. [ ] Jalankan `git status` dan pastikan tidak ada file `.env`, `*.key`, atau `*.pem` yang masuk ke *staging area*.
2. [ ] Periksa kembali `.gitignore` apakah mencakup file konfigurasi baru.
3. [ ] Cek file kode sumber (*source code*) terbaru (misalnya config database atau setup API) untuk memastikan tidak ada *hardcoded* password atau secret key.
4. [ ] Cek file data JSON untuk memastikan tidak ada data pribadi sensitif yang tidak seharusnya dipublikasikan (seperti detail KTP, NIK, alamat lengkap berlebihan).

## 7. Penanganan jika Secret Pernah Ter-commit
Jika sebuah kredensial atau secret **terlanjur ter-commit** dan ter-push ke GitHub:
1. **JANGAN hanya menghapus file tersebut di commit berikutnya**, karena riwayat (history) Git masih menyimpan nilai aslinya dan bot *scraper* mungkin sudah menyimpannya.
2. **Segera Rotate/Revoke rahasia tersebut.** (Ganti password database, buat ulang API Key baru, atau regenerate token di provider layanan terkait).
3. Hapus kredensial yang lama dari sistem.
4. Bersihkan riwayat Git (misal dengan BFG Repo-Cleaner) jika memungkinkan, namun langkah utama tetaplah me-revoke kredensial yang bocor.

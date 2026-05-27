# Daftar Status HOLD (Tertahan)

Dokumen ini memuat item-item penting dari project PW Personal Web yang statusnya masih tertahan (HOLD) dan memerlukan keputusan atau file/data tambahan sebelum berstatus aktif atau dirilis ke produksi.

## 1. CV Final
- **Status**: HOLD
- **Detail**: File PDF CV asli masih dalam tahap finalisasi tata letak. Saat ini file di `public/CV_Syah_Putra_Nugraha.pdf` masih berupa placeholder.
- **Tindakan Lanjutan**: Menunggu user memberikan file CV PDF final (mungkin dalam beberapa varian). Sistem *CV Variant Selector* dan *Newspaper Wireframe* di frontend sudah siap mendukung varian tersebut.

## 2. Admin / Login / Auth
- **Status**: HOLD
- **Detail**: Sistem admin dan login (backend dan UI) dikerjakan di fase akhir. Saat ini tidak ada akses publik untuk login atau halaman dashboard admin.
- **Tindakan Lanjutan**: Menunggu fase pengembangan infrastruktur backend yang utuh. Website publik dirancang untuk bersih dari tombol atau link login demi keamanan.

## 3. Domain & Deployment
- **Status**: HOLD
- **Detail**: Hosting, environment produksi, dan konfigurasi URL kanonikal belum ditetapkan secara final.
- **Tindakan Lanjutan**: Menunggu keputusan lingkungan deployment (misalnya Vercel, Netlify, atau lainnya) dan domain utama.

## 4. Keamanan Credential / Secret
- **Status**: HOLD / Perhatian Khusus
- **Detail**: Credential, API keys, password, dan file konfigurasi environment (.env) **tidak boleh** masuk atau di-commit ke repository.
- **Tindakan Lanjutan**: Memastikan .gitignore memblokir file rahasia jika nanti backend atau service eksternal mulai digunakan.

## 5. Data Aset Proyek (Eksternal Links)
- **Status**: HOLD
- **Detail**: Beberapa link untuk portfolio seperti Figma, Google Drive tambahan, RAB, dan Model 3D pada halaman Proyek masih belum diisi URL aslinya. Placeholder sudah dihapus agar tidak mengecoh.
- **Tindakan Lanjutan**: Menunggu URL publik/akses baca asli untuk setiap aset dimasukkan ke dalam data proyek (`projectsFallback.js` atau backend kelak). Link Tiles akan otomatis muncul saat URL tersedia.

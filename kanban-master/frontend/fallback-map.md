# Fallback Map

Dokumentasi ini mencatat sistem *fallback* yang masih aktif digunakan oleh frontend apabila API dari backend gagal memberikan data.

## Fallback File
`webstrip/src/data/fallbacks.js`
- **Isi**: HERO, PROFILE, EDUCATION, EXPERIENCE, CONTACT.
- **Rekomendasi**: Pertahankan sebagai lapisan keamanan (*resiliency*).

`webstrip/src/data/projects.js`
- **Isi**: Data proyek statis.
- **Rekomendasi**: Pertahankan, namun pastikan datanya ringkas.

## i18n Fallback (Legacy)
`webstrip/public/i18n/*.json`
- **Isi Sebelumnya**: Seluruh *business content* panjang.
- **Status Saat Ini**: Data panjang sudah dibersihkan (Tahap 3 Selesai).
- **Rekomendasi**: Pertahankan HANYA untuk UI labels (nav, tombol, peringatan). Jangan menyimpan data portofolio di sini lagi.

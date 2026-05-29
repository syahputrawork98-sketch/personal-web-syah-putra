# Frontend Technical Notes

Dokumen ini merangkum catatan penting mengenai arsitektur dan fungsionalitas sisi Frontend di PW Personal Web.

## Stack Teknologi
- **Framework Utama**: React
- **Build Tool**: Vite
- **Styling**: CSS Vanilla (modular class based)

## Struktur Folder (`client/src/`)
- `components/`: Komponen UI yang reusable (Button, Card, Modal).
- `data/`: File penyimpanan data statis (contoh: `homeData.js`, `credentialsData.js`) yang digunakan sebelum ada backend.
- `hooks/`: Custom React hooks (seperti `useFetch.js`) untuk logic management yang DRY.
- `layouts/`: Komponen pembungkus utama halaman.
- `lib/`: Fungsi utilitas dan helper (seperti `dateUtils.js`).
- `pages/`: Komponen spesifik halaman (Home, About, Projects, dll).
- `assets/`: Berkas statis pendukung, seperti icon.

## Fallback Data & Kesediaan Konten
Website dirancang agar tetap bisa berfungsi optimal walaupun backend belum siap. Data statis bertindak sebagai "fallback data". Ini menjamin "Production Readiness" dari sisi ketersediaan konten tanpa harus terblokir oleh pengembangan API.

## Komponen Penting
- **CV Variant Selector**: Fitur unggulan di mana pengunjung dapat memilih versi spesifik dari CV (Web Developer, Manufaktur, atau Sipil). Frontend sudah dilengkapi dengan pratinjau layout wireframe editorial (Newspaper style).
- **Credentials Page**: Halaman sertifikat dan kredensial yang mendukung integrasi dengan **Google Drive Preview** (menggunakan iframe). Memisahkan sertifikat utama (Featured) dari yang sekunder.
- **Project Detail Modal**: Overlay interaktif untuk menampilkan detail mendalam proyek. Menggunakan sistem dinamis **Link Tiles**, di mana link aset eksternal (GitHub, Demo, Figma, RAB, Model) otomatis dimunculkan hanya jika URL di dalam data model tersedia.

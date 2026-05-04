# Development Notes

Catatan teknis dan referensi untuk pengembangan **Personal Web Syah Putra Nugraha**.

## Setup Environment
- **Node.js**: Versi LTS direkomendasikan.
- **Build Tool**: Vite.
- **Package Manager**: NPM.

## Deployment Guide

### Vercel
1. Hubungkan repository GitHub ke Vercel.
2. Set "Root Directory" ke `webstrip`.
3. Gunakan setting default untuk Vite.

### Netlify
1. Pilih folder `webstrip` sebagai base directory.
2. Build command: `npm run build`.
3. Publish directory: `dist`.

### GitHub Pages
1. Gunakan GitHub Actions untuk membangun project di `webstrip` dan deploy ke branch `gh-pages`.
2. Pastikan `base` config di `vite.config.js` sudah sesuai jika tidak menggunakan custom domain.

## Referensi Design
- [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
- [Lucide Icons](https://lucide.dev/)

# Development Notes

Catatan teknis dan referensi untuk pengembangan **Personal Web Syah Putra Nugraha**.

## 🚀 Tech Stack
- **Framework**: React.js 18+
- **Routing**: React Router v6+
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (Design Tokens / CSS Variables)
- **i18n**: Custom Context API (Local JSON Files)

## 📁 Project Structure
- `webstrip/src/components/`: Reusable UI components (Navbar, Footer).
- `webstrip/src/layouts/`: Layout wrappers (MainLayout).
- `webstrip/src/pages/`: Page-level components.
- `webstrip/public/i18n/`: Translation data (ID, EN, JP).
- `webstrip/src/style.css`: Global styles and design system tokens.

## 🌐 i18n Usage
Aplikasi menggunakan `I18nContext` untuk membagikan fungsi terjemahan.
Contoh penggunaan di komponen:
```javascript
import { useI18n } from '../layouts/MainLayout';
const { t } = useI18n();
return <h1>{t('hero.title')}</h1>;
```

## 🌙 Theme Management
Tema (Dark/Light) dikelola melalui atribut `data-theme` pada tag `body`.
CSS menggunakan variabel untuk adaptasi otomatis:
```css
body { background-color: var(--bg-color); }
```

## 📦 Deployment Guide

### Vercel / Netlify
1. Hubungkan repository GitHub.
2. Set **Root Directory** ke `webstrip`.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.

### GitHub Pages
1. Gunakan GitHub Actions (atau plugin `gh-pages`).
2. Pastikan `base` di `vite.config.js` diset ke nama repository jika tidak menggunakan custom domain.

## 🛠️ Perawatan Konten
Untuk mengubah teks atau menambahkan bahasa baru:
1. Edit file JSON di `webstrip/public/i18n/`.
2. Jika menambahkan key baru, pastikan ada di semua file JSON (id, en, jp).

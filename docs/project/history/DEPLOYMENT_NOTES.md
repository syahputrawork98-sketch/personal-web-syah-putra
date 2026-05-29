# Deployment Notes

## 1. Status Deployment
- **Target awal**: Vercel frontend-only deployment
- **Backend/Admin/Auth/Database**: HOLD

## 2. Setting Vercel yang Disarankan
- **Framework Preset**: Vite
- **Root Directory**: `client`
- **Install Command**: `npm install`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

## 3. Catatan Penting
- Jangan memasukkan credential, token, API key, atau `.env` ke repo.
- Website publik harus tetap berjalan dengan fallback/static data.
- Jika direct URL `/projects` atau `/credentials` error 404, cek `client/vercel.json`.

## 4. Checklist Sebelum Deploy
- `npm install` di `client` berhasil.
- `npm run build` di `client` berhasil.
- `git status` bersih setelah commit.
- Repo sudah di-push ke GitHub.

## 5. Checklist Setelah Deploy
- Buka homepage.
- Buka `/about`.
- Buka `/projects`.
- Buka `/credentials`.
- Buka `/contact`.
- Refresh halaman langsung di route selain homepage.
- Cek tidak ada tombol login publik.
- Cek tidak ada data sensitif tampil.

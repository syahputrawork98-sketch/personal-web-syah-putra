# Personal Web Syah Putra Nugraha

Selamat datang di repository **Personal Web Syah Putra Nugraha**. Ini adalah pusat pengembangan website pribadi yang dibangun dengan pendekatan modern, terstruktur, dan profesional.

## 📂 Struktur Project

Repository ini menggunakan struktur modular untuk memisahkan antara manajemen project dan implementasi teknis:

- **`README.md`**: Dokumentasi utama repository (file ini).
- **`kanban-master/`**: Dokumentasi internal, perencanaan, roadmap, task list, dan catatan pengembangan.
- **`webstrip/`**: Source code Frontend (React + Vite).
- **`backend/`**: Source code Backend API (Express.js + Prisma + PostgreSQL).

## 🚀 Status Pengembangan

Saat ini website fokus pada implementasi **Database-First Content Management**. 

- **Fitur Kredensial**: Telah ditambahkan halaman `/credentials` yang menampilkan sertifikasi, kredensial unggulan, dan dokumen pendukung.
- **Data Kredensial**: Saat ini data dikelola melalui file draft `credentialDraft.js` sebelum migrasi penuh ke database. Data dibedakan menjadi status `verified` dan `needs_manual_verification`.
- **i18n Status**: Fitur multi-bahasa tetap dinonaktifkan sementara untuk stabilitas konten.

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL dengan Prisma ORM
- **Deployment**: Vercel/Netlify (Frontend) & VPS/Managed Service (Backend)

---
&copy; 2026 Syah Putra Nugraha.
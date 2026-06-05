# Batch F12 — Learning Library System

## Feature Summary
Sistem modular untuk menampilkan arsip, catatan, dan repository praktik pembelajaran secara publik dengan dukungan manajemen dari Admin CMS nantinya.

## Status
**In Progress**

## Story
Sebagai seorang developer yang terus berkembang, saya membutuhkan satu wadah untuk mendokumentasikan progres pembelajaran saya, modul-modul yang sedang dipelajari, dan repository praktik (seperti React, Node.js, dsb.) secara terstruktur di dalam website personal.

## Sub-Batch Roadmap
- **F12A — Learning Library Static Public Page** — Completed
- **F12B — Learning Library Admin CMS Planning** — Completed
- **F12C.1 — Database and Backend API Foundation** — Completed
- **F12C.2 — Learning Library Admin UI** — Completed
- **F12C.3 — Admin CRUD QA and Polish** — Completed
- **F12D — Public Dynamic Integration** — Not Started

## 1. Admin CMS Goal
Admin CMS nantinya digunakan untuk mengelola item Learning Library secara dinamis tanpa perlu melakukan edit kode manual atau hardcode di komponen React.

## 2. Proposed Data Model
Rancangan field minimal untuk entitas `LearningItem`:
- `id`: String (UUID/CUID)
- `title`: String
- `slug`: String (Unique)
- `category`: String
- `status`: String
- `level`: String
- `description`: Text
- `topics`: String[] (Array of strings / JSON)
- `repoUrl`: String (Optional)
- `notesUrl`: String (Optional)
- `orderIndex`: Int
- `featured`: Boolean
- `isPublished`: Boolean
- `createdAt`: DateTime
- `updatedAt`: DateTime

## 3. Category Strategy
Kategori awal (disimpan sebagai enum/string sederhana pada MVP, tidak perlu tabel `Category` terpisah):
- Programming Languages
- Frontend
- Backend
- Database & Data
- DevOps & Deployment
- Tools & Workflow

## 4. Status Strategy
Status awal:
- Planned
- Learning
- In Progress
- Completed
- Archived

## 5. Admin Page Plan
Rancangan rute halaman admin:
- `/admin/learning`: Menampilkan daftar (list) item pembelajaran.
- `/admin/learning/new`: Form untuk membuat item baru.
- `/admin/learning/:id/edit`: Form untuk mengedit item yang ada.

Fitur utama admin:
- List learning item (tabel/grid dengan filter/search sederhana)
- Create item
- Edit item
- Delete item
- Toggle publish/unpublish
- Toggle featured
- Sorting sederhana menggunakan `orderIndex`
- Input manual untuk `repoUrl` dan `notesUrl`

## 6. Backend API Contract
Rancangan endpoint API:

**Public API:**
- `GET /api/learning`: Mengambil daftar item yang `isPublished = true` (diurutkan berdasarkan `orderIndex`).

**Admin API (Protected):**
- `GET /api/admin/learning`: Mengambil semua item tanpa filter `isPublished`.
- `POST /api/admin/learning`: Membuat item baru.
- `PUT /api/admin/learning/:id`: Mengupdate item.
- `DELETE /api/admin/learning/:id`: Menghapus item.

## 7. Public Dynamic Integration Plan
Pada F12D, data statis di dalam file `client/src/pages/Learn.jsx` akan diganti dengan pemanggilan `fetch` atau *hook* khusus ke `GET /api/learning`. Perlu disiapkan mekanisme *fallback* atau *empty state* yang aman jika backend tidak merespons (atau jika akses database offline).

## 8. Risk Notes
- **GitHub API Rate Limit:** Jangan mengimplementasikan *auto-fetch* otomatis ke API GitHub pada tahap awal ini karena berpotensi terkena *rate limit* atau memerlukan manajemen token kompleks.
- **Security:** Jangan menyimpan credential atau token GitHub di database maupun environment.
- **Manual Input:** `repoUrl` diinput manual oleh admin sebagai tautan eksternal biasa.
- **Simplicity:** Kategori cukup menggunakan struktur *String/Enum* pada rilis MVP.
- **Visibility:** Pastikan halaman publik mematuhi kondisi hanya menampilkan item dengan status `isPublished === true`.

## HOLD / Blocked Notes
- Admin CMS, backend API, dan database belum dibuat pada F12A. Data yang ditampilkan pada halaman publik saat ini masih bersifat statis (hardcoded).

## Execution Log
- **Batch F12A**: Pembuatan route `/learn`, public page `Learning Library` dengan data statis, filter kategori, tab navbar publik, dan inisialisasi dokumen tracking fitur.
- **Batch F12B**: Penyelesaian planning data model, admin routes, API contract, dan public dynamic integration plan tanpa mengubah source code.
- **Batch F12C.1**: Penambahan model Prisma LearningItem, enum LearningStatus, pembuatan CRUD backend controller (public/admin), pendaftaran router, dan migrasi database awal.
- **Batch F12C.1.1**: memperbaiki import middleware admin route Learning Library agar memakai requireAdmin existing.
- **Batch F12C.2**: Pembuatan Admin UI (List, Create, Edit) untuk entitas Learning Library beserta helper API dan integrasi routing frontend.
- **Batch F12C.3**: Pelaksanaan QA pada operasi Create, Read, Update, Delete UI Admin Learning Library. Seluruh fungsionalitas dan integrasi tipe data divalidasi dengan lancar.

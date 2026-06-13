# Current Status

## Project Snapshot
- Nama project: PW Personal Web
- Status website publik: stabil
- Source of Truth: GitHub
- Workspace utama: Anti-Gravity IDE
- Commit/push: dilakukan oleh user
- Default model eksekutor: Gemini 3.1 Pro Low / High
- Alternative acceleration model: hanya jika user meminta percepatan

## Active Feature Tracker

| Feature Batch | Feature Name | Area | Status | Reason / HOLD Notes | Next Step | Detail File |
|---|---|---|---|---|---|---|
| F00 | Project Workflow Reset | docs/project | Completed | Reset sistem history lama ke feature-based tracking | F01 bila reset selesai | [F00_PROJECT_WORKFLOW_RESET.md](features/F00_PROJECT_WORKFLOW_RESET.md) |
| F01 | Public Website Core System | frontend | Stable | Fondasi website publik sudah berjalan | Review hanya jika ada redesign besar | [F01_PUBLIC_WEBSITE_CORE_SYSTEM.md](features/F01_PUBLIC_WEBSITE_CORE_SYSTEM.md) |
| F02 | Profile and Experience Content System | frontend/content | Stable / Content Reviewed | Profile, experience, skill, dan education sudah direview secara komprehensif. | F04A — Credential Data Verification | [F02_PROFILE_EXPERIENCE_CONTENT_SYSTEM.md](features/F02_PROFILE_EXPERIENCE_CONTENT_SYSTEM.md) |
| F03 | Project Portfolio System | frontend | Stable / Content Reviewed | Konten teks project sudah dipoles dan direview. Asset final dikelola di F06. | F06A — External Asset URL Inventory | [F03_PROJECT_PORTFOLIO_SYSTEM.md](features/F03_PROJECT_PORTFOLIO_SYSTEM.md) |
| F04 | Credential and Certificate System | frontend/data | Stable / Reviewed | Data credential, preview, dan public metadata sudah direview. | F03C — Project Data Polish | [F04_CREDENTIAL_CERTIFICATE_SYSTEM.md](features/F04_CREDENTIAL_CERTIFICATE_SYSTEM.md) |
| F05 | CV Download System | frontend/assets | Completed | UI/QA siap, public UI sudah mengarah ke file PDF final (ATS) statis. | Lanjutkan ke fitur selanjutnya / deploy | [F05_CV_DOWNLOAD_SYSTEM.md](features/F05_CV_DOWNLOAD_SYSTEM.md) |
| F06 | Asset Link and Preview System | frontend/data | Partial / Inventory Ready | Inventory sudah dibuat, tetapi URL final masih menunggu input user. | F06B — Public Access Verification after final URL input | [F06_ASSET_LINK_PREVIEW_SYSTEM.md](features/F06_ASSET_LINK_PREVIEW_SYSTEM.md) |
| F07 | Backend API System | server | Completed | Seluruh siklus F07 telah divalidasi (F07A-F07H). Docker, Prisma, Backend, dan koneksi Frontend terverifikasi secara runtime. | Lanjutkan ke fitur selanjutnya / deploy | [F07_BACKEND_API_SYSTEM.md](features/F07_BACKEND_API_SYSTEM.md) |
| F08 | Admin Login and Auth System | backend/auth | Completed | Rangkaian skeleton *backend/frontend* auth sudah diverifikasi penuh melalui Basic Security QA dan dinyatakan aman (*logic siap*). | (Selesai, lanjutkan ke F09) | [F08_ADMIN_LOGIN_AUTH_SYSTEM.md](features/F08_ADMIN_LOGIN_AUTH_SYSTEM.md) |
| F09 | Admin Content Management System | frontend/backend | Completed | Modul CMS telah diselesaikan audit fungsionalitas dan perlindungan autentikasinya untuk Project, Credential, Asset Link, dan Settings Module. | (Selesai, lanjutkan ke F10) | [F09_ADMIN_CONTENT_MANAGEMENT_SYSTEM.md](features/F09_ADMIN_CONTENT_MANAGEMENT_SYSTEM.md) |
| F10 | Deployment and Domain System | deployment | Completed / Production Live | Production deployment aktif di Vercel, Railway, dan Neon PostgreSQL. | Monitoring dan setup custom domain opsional | [F10_DEPLOYMENT_DOMAIN_SYSTEM.md](features/F10_DEPLOYMENT_DOMAIN_SYSTEM.md) |
| F11 | CV Builder and PDF Export System | frontend/admin | Completed | Logika *State Management* dan Cetak PDF mandiri (Browser) selesai. PDF statis telah disinkronisasikan ke Public Download. | Lanjutkan ke fitur selanjutnya / deploy | [F11_CV_BUILDER_PDF_EXPORT_SYSTEM.md](features/F11_CV_BUILDER_PDF_EXPORT_SYSTEM.md) |
| F12 | Learning Library System | frontend | Completed | Learning Library public page, admin CMS, backend API, and dynamic public integration completed. | Lanjutkan ke fitur berikutnya / deploy | [F12_LEARNING_LIBRARY_SYSTEM.md](features/F12_LEARNING_LIBRARY_SYSTEM.md) |

## Deployment Status
- **Status Deployment**: Aktif / Live
- **Frontend (Vercel)**: Live pada URL [https://syahputran.vercel.app/](https://syahputran.vercel.app/) (Root: `client`)
- **Backend (Railway)**: Live pada URL `selfless-victory-production-350f.up.railway.app` (Root: `server`)
- **Database (Neon PostgreSQL)**: Managed PostgreSQL aktif pada branch `production` (ORM: Prisma)
- **API Endpoint Integration**: Menggunakan environment variable `VITE_API_URL` pada Vercel yang mengarah ke backend Railway.
- **Custom Domain**: Opsional / belum final.



## Safety Rules
- Jangan menyimpan credential, token, API key, password, atau .env di repository.
- Jangan mengubah client/server tanpa scope batch yang jelas.
- Jangan commit/push oleh eksekutor.
- Commit/push dilakukan oleh user setelah hasil dicek di Anti-Gravity IDE.


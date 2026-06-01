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
| F02 | Profile and Experience Content System | frontend/content | Stable / Needs Content Review | Konten dasar profil, experience, education, dan skill sudah tersedia | Content polish bila diperlukan | [F02_PROFILE_EXPERIENCE_CONTENT_SYSTEM.md](features/F02_PROFILE_EXPERIENCE_CONTENT_SYSTEM.md) |
| F03 | Project Portfolio System | frontend | Stable / Partial | Sistem portfolio, kategori, card, modal, dan link tile sudah berjalan | Asset finalization dikelola di F06 | [F03_PROJECT_PORTFOLIO_SYSTEM.md](features/F03_PROJECT_PORTFOLIO_SYSTEM.md) |
| F04 | Credential and Certificate System | frontend/data | Partial | Sistem sertifikat sudah ada, tetapi sebagian item masih perlu verifikasi manual | F04A — Credential Data Verification | [F04_CREDENTIAL_CERTIFICATE_SYSTEM.md](features/F04_CREDENTIAL_CERTIFICATE_SYSTEM.md) |
| F05 | CV Download System | frontend/assets | HOLD | File PDF CV final belum tersedia | F05A — Final CV PDF Asset Preparation | [F05_CV_DOWNLOAD_SYSTEM.md](features/F05_CV_DOWNLOAD_SYSTEM.md) |
| F06 | Asset Link and Preview System | frontend/data | HOLD / Partial | URL asli untuk Drive, Figma, RAB, demo, dan 3D preview belum lengkap atau belum diverifikasi public access | F06A — External Asset URL Inventory | [F06_ASSET_LINK_PREVIEW_SYSTEM.md](features/F06_ASSET_LINK_PREVIEW_SYSTEM.md) |
| F07 | Backend API System | server | HOLD | Website publik masih stabil memakai fallback data, backend belum menjadi prioritas aktif | F07A — Server Structure Audit | [F07_BACKEND_API_SYSTEM.md](features/F07_BACKEND_API_SYSTEM.md) |
| F08 | Admin Login and Auth System | backend/auth | HOLD | Backend belum aktif penuh dan auth belum aman untuk dibuka | F08A — Auth Requirement Definition | [F08_ADMIN_LOGIN_AUTH_SYSTEM.md](features/F08_ADMIN_LOGIN_AUTH_SYSTEM.md) |
| F09 | Admin Content Management System | frontend/backend | HOLD | Menunggu Backend API System dan Admin Login/Auth System | F09A — Admin CMS Scope Definition | [F09_ADMIN_CONTENT_MANAGEMENT_SYSTEM.md](features/F09_ADMIN_CONTENT_MANAGEMENT_SYSTEM.md) |
| F10 | Deployment and Domain System | deployment | HOLD / Partial | Vercel SPA rewrite sudah tersedia, tetapi domain final dan production release belum selesai | F10A — Production Deployment Check | [F10_DEPLOYMENT_DOMAIN_SYSTEM.md](features/F10_DEPLOYMENT_DOMAIN_SYSTEM.md) |

## Deployment Status
- Target awal: Vercel frontend-only deployment
- Status Kesiapan: Frontend sudah siap untuk pre-deploy check, tetapi domain final masih HOLD (F10).
- Root Directory: client
- Build Command: npm run build
- Output Directory: dist
- Backend/Admin/Auth/Database: HOLD

## Safety Rules
- Jangan menyimpan credential, token, API key, password, atau .env di repository.
- Jangan mengubah client/server tanpa scope batch yang jelas.
- Jangan commit/push oleh eksekutor.
- Commit/push dilakukan oleh user setelah hasil dicek di Anti-Gravity IDE.


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

| Feature Batch | Feature Name | Area | Status | Reason / HOLD Notes | Next Step |
|---|---|---|---|---|---|
| F00 | Project Workflow Reset | docs/project | In Progress | Reset sistem history lama ke feature-based tracking | F01 bila reset selesai |
| F01 | Public Website Core System | frontend | Stable | Fondasi website publik sudah berjalan | Review hanya jika ada redesign besar |
| F02 | Profile and Experience Content System | frontend/content | Stable / Needs Content Review | Konten dasar profil, experience, education, dan skill sudah tersedia | Content polish bila diperlukan |
| F03 | Project Portfolio System | frontend | Stable / Partial | Sistem portfolio, kategori, card, modal, dan link tile sudah berjalan | Asset finalization dikelola di F06 |
| F04 | Credential and Certificate System | frontend/data | Partial | Sistem sertifikat sudah ada, tetapi sebagian item masih perlu verifikasi manual | F04A — Credential Data Verification |
| F05 | CV Download System | frontend/assets | HOLD | File PDF CV final belum tersedia | F05A — Add Final CV PDF Assets |
| F06 | Asset Link and Preview System | frontend/data | HOLD / Partial | URL asli untuk Drive, Figma, RAB, demo, dan 3D preview belum lengkap atau belum diverifikasi public access | F06A — Final External Asset URL Input |
| F07 | Backend API System | server | HOLD | Website publik masih stabil memakai fallback data, backend belum menjadi prioritas aktif | F07A — Server Structure Audit |
| F08 | Admin Login and Auth System | backend/auth | HOLD | Backend belum aktif penuh dan auth belum aman untuk dibuka | F08A — Auth Requirement Definition |
| F09 | Admin Content Management System | frontend/backend | HOLD | Menunggu Backend API System dan Admin Login/Auth System | F09A — Admin CMS Scope Definition |
| F10 | Deployment and Domain System | deployment | HOLD / Partial | Vercel SPA rewrite sudah tersedia, tetapi domain final dan production release belum selesai | F10A — Production Deployment Check |

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


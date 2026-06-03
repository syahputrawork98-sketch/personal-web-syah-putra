# Batch F09 — Admin Content Management System

## Feature Summary
Dashboard admin untuk mengelola project, credential, CV, dan link aset.

## Status
Completed

## Story
Mencakup dashboard antarmuka admin untuk menambahkan, mengubah, atau menghapus konten (CMS lokal). Hal ini memastikan user mudah memelihara websitenya.

## Current State
- UI panel CMS sudah dibangun dan berstatus logic Completed.
- Akses ke backend production menunggu kesiapan environment (F10).

## Sub-Batch Roadmap
| Sub-Batch | Name | Status | Purpose | Dependency |
|---|---|---|---|---|
| F09A | Admin CMS Scope Definition | Completed | Merumuskan batasan entri CMS. | F07, F08 |
| F09B | Project Management Module | Completed | Membangun dan mengaudit UI edit list project (F09B.1). | F09A |
| F09C | Credential Management Module | Completed | Membangun dan mengaudit UI edit credentials (F09C.1). | F09A |
| F09D | CV and Asset Link Management Module | Completed | Mengaudit dan menyinkronkan jalur CV dan tautan aset (F09D.1). | F09A |
| F09E | Profile/Settings Management Module | Completed | Mengaudit dan menyinkronkan UI profile dan settings (F09E.1). | F09A |
| F09F | Project CRUD Runtime Verification and Public Sync | Completed | Verifikasi runtime end-to-end CRUD Project admin terhadap API dan sync halaman publik. | F09B |
| F09G | Credential CRUD Readiness and User Validation Checklist | Completed | Audit struktur CRUD Credential/Certification dan penyiapan checklist validasi manual. | F09C |

## HOLD / Blocked Notes
- Seluruh prioritas modul parsial F09 telah terpenuhi.

## Next Step
- Melanjutkan fase Deployment (F10) karena F09 telah terpenuhi.

## Validation Checklist
- Menambah atau mengedit salah satu field dummy dari panel admin CMS akan mengubah UI publik.

## Notes
- [F09A] Scope dokumen perumusan CMS telah dirangkum dalam `docs/backend/ADMIN_CMS_SCOPE.md`. Pengembangan antarmuka pengguna administratif dipecah menjadi bagian-bagian iteratif kecil mulai dari manajemen project hingga konfigurasi halaman profil publik.
- [F09B.1] QA Audit telah diselesaikan untuk *Project Management Module* dan dikomentasikan ke `docs/backend/PROJECT_MANAGEMENT_CMS_QA.md`. Skenario CRUD di backend aman dari serangan intervensi payload tak berizin.
- [F09C.1] QA Audit diselesaikan untuk *Credential Management Module* dan dimuat dalam `docs/backend/CREDENTIAL_MANAGEMENT_CMS_QA.md`. Relasi data frontend-backend serta perlindungan *unauthorized catch block* sudah ditambal.
- [F09D.1] QA Audit dan sinkronisasi tautan aset diselesaikan untuk *CV and Asset Link Management Module* dan dimuat di `docs/backend/CV_ASSET_LINK_CMS_QA.md`. Memastikan integritas path CV statis dengan field form Admin, tanpa perombakan sistem upload.
- [F09E.1] QA Audit telah diselesaikan untuk *Profile and Settings Management Module* dan terdokumentasi dalam `docs/backend/PROFILE_SETTINGS_CMS_QA.md`. Penanganan autentikasi 401 dan proteksi payload di lapisan *controller* telah diselaraskan.
- [F09F] Verifikasi runtime untuk operasi CRUD Project telah dilakukan (Create, Read, Update DRAFT/PUBLISHED, Delete). Data tersimpan dengan benar di PostgreSQL dan tersinkronisasi instan dengan endpoint publik `/api/projects`. Tidak ditemukan bug pada logic flow ini.
- [F09G] Audit struktur CRUD Credential/Certification telah diselesaikan. Route, controller, dan antarmuka client sudah dipetakan dan dikonfirmasi ketersediaannya (Create, Read, Update, Delete). Endpoint admin terproteksi, public endpoint read-only. Checklist validasi manual telah disiapkan untuk user.

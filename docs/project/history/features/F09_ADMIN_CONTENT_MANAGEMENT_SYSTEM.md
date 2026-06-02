# Batch F09 — Admin Content Management System

## Feature Summary
Dashboard admin untuk mengelola project, credential, CV, dan link aset.

## Status
Partial / Scope Defined

## Story
Mencakup dashboard antarmuka admin untuk menambahkan, mengubah, atau menghapus konten (CMS lokal). Hal ini memastikan user mudah memelihara websitenya.

## Current State
- UI panel CMS belum dibangun.
- Akses ke backend masih ditahan.

## Sub-Batch Roadmap
| Sub-Batch | Name | Status | Purpose | Dependency |
|---|---|---|---|---|
| F09A | Admin CMS Scope Definition | Completed | Merumuskan batasan entri CMS. | F07, F08 |
| F09B | Project Management Module | Completed | Membangun dan mengaudit UI edit list project (F09B.1). | F09A |
| F09C | Credential Management Module | Not Started | Membangun UI edit credentials. | F09A |
| F09D | CV and Asset Link Management Module | Not Started | Membangun UI upload / embed file. | F09A |
| F09E | Profile/Settings Management Module | Not Started | Mengelola profil dan halaman hero. | F09A |

## HOLD / Blocked Notes
- Pengembangan difokuskan pada modul parsial berurutan (F09C berikutnya).

## Next Step
- Mengerjakan F09C (Credential Management Module).

## Validation Checklist
- Menambah atau mengedit salah satu field dummy dari panel admin CMS akan mengubah UI publik.

## Notes
- [F09A] Scope dokumen perumusan CMS telah dirangkum dalam `docs/backend/ADMIN_CMS_SCOPE.md`. Pengembangan antarmuka pengguna administratif dipecah menjadi bagian-bagian iteratif kecil mulai dari manajemen project hingga konfigurasi halaman profil publik.
- [F09B.1] QA Audit telah diselesaikan untuk *Project Management Module* dan dikomentasikan ke `docs/backend/PROJECT_MANAGEMENT_CMS_QA.md`. Skenario CRUD di backend aman dari serangan intervensi payload tak berizin.

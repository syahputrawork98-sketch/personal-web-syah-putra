# Batch F08 — Admin Login and Auth System

## Feature Summary
Sistem login admin, protected route, session/token strategy, dan keamanan akses admin.

## Status
HOLD

## Story
Mencakup portal masuk administratif, melindungi halaman panel kontrol menggunakan autentikasi yang aman. Fitur ini menjaga integritas data web pribadi agar hanya pemilik yang bisa mengubah data.

## Current State
- Auth flow di backend masih skeleton.
- UI Publik bebas dari rute /login (disembunyikan dari publik).

## Sub-Batch Roadmap
| Sub-Batch | Name | Status | Purpose | Dependency |
|---|---|---|---|---|
| F08A | Auth Requirement Definition | HOLD | Mendefinisikan mekanisme login. | F07 |
| F08B | Auth Flow Design | Not Started | Perencanaan autentikasi JWT/Session. | F08A |
| F08C | Protected Route Implementation | Not Started | Menerapkan route guard di client. | F08B |
| F08D | Auth Security QA | Not Started | Testing penetrasi keamanan sederhana. | F08C |

## HOLD / Blocked Notes
- Backend belum aktif penuh.
- Auth belum aman untuk dibuka.

## Next Step
- F08A setelah F07 punya arah teknis jelas.

## Validation Checklist
- Mencoba akses route protected tanpa login harus redirect ke panel login / halaman 404.

## Notes
- (Kosong)

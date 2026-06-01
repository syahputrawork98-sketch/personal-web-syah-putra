# Batch F07 — Backend API System

## Feature Summary
Fondasi backend API, struktur server, data source, dan hubungan frontend-backend.

## Status
Partial / Structure Audited

## Story
Mencakup pembuatan layanan backend (server) yang menyediakan data dinamis melalui RESTful API. Tujuannya untuk mengganti data fallback statis menjadi sistem yang bisa dikontrol penuh oleh pemilik.

## Current State
- Struktur `server/` skeleton sudah ada.
- Website publik dapat hidup tanpa backend (fallback).

## Sub-Batch Roadmap
| Sub-Batch | Name | Status | Purpose | Dependency |
|---|---|---|---|---|
| F07A | Server Structure Audit | Completed | Review kesiapan struktur backend. | - |
| F07B | API Scope Definition | Not Started | Merumuskan endpoint API yang dibutuhkan. | - |
| F07C | Environment Example Setup | Not Started | Setelan environment `.env.example`. | - |
| F07D | Frontend Backend Connection Review | Not Started | Review hubungan CORS dan fetch URL. | - |

## HOLD / Blocked Notes
- Website publik masih stabil memakai fallback data.
- Backend belum menjadi prioritas aktif. Auth/Admin tetap HOLD.

## Next Step
- F07B — API Scope Definition

## Validation Checklist
- Pastikan website publik dapat menerima data secara dinamis tanpa fallback jika API dihidupkan.

## Notes
- [F07A] Audit struktur server telah dilakukan. Express app, health check, Prisma schema, dan `.env.example` sudah tersedia dan berfungsi. Website publik masih aman menggunakan fallback data.

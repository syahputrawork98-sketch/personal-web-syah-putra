# Batch F06 — Asset Link and Preview System

## Feature Summary
Pengelolaan link external seperti Google Drive, Figma, GitHub, demo, RAB, dan 3D model preview.

## Status
Partial / Inventory Ready

## Story
Mencakup pengelolaan dan integrasi seluruh link referensi yang dibutuhkan proyek portfolio. Fitur ini memastikan user bisa mengeksplorasi output asli karya (seperti tabel RAB, desain 3D, source code).

## Current State
- Link Tile UI di project modal sudah diimplementasikan.
- URL asli yang terhubung masih belum final atau data uji coba.

## Sub-Batch Roadmap
| Sub-Batch | Name | Status | Purpose | Dependency |
|---|---|---|---|---|
| F06A | External Asset URL Inventory | Completed | Pendataan semua link eksternal proyek. | - |
| F06B | Public Access Verification | Not Started | Memastikan akses publik aset aman. | F06A |
| F06C | Link Tile Data Integration | Not Started | Memasukkan URL ke sumber data. | F06B |
| F06D | Asset Preview QA | Not Started | Uji coba pengalihan tautan. | F06C |

## HOLD / Blocked Notes
- URL asli belum lengkap atau belum diverifikasi public access. Inventory sudah dibuat, namun final external URLs masih menunggu input user.

## Next Step
- F06B — Public Access Verification (catatan: F06B baru bisa dijalankan setelah user menyediakan URL final di inventory).

## Validation Checklist
- Klik link dari project modal dan pastikan mendarat pada aset yang benar.

## Notes
- [F06A] Inventory URL telah dibuat berdasarkan data projectsFallback.js tanpa mengubah kode.

## External Asset URL Inventory
| Project ID | Title | Category | Existing Link Keys | Missing/Needed Final URL | Recommended Source | Status |
|---|---|---|---|---|---|---|
| `construction-monitoring-system` | Sistem Monitoring Proyek Konstruksi | IT & Web | `github` | `demo`, `figma` | Vercel (demo), Figma (figma) | Needs Verification |
| `event-organizer-showcase` | Website Portfolio Event Organizer | IT & Web | `github` | `demo` | Vercel (demo) | Needs Verification |
| `mechanical-fixture-design` | Desain Fixture Produksi Komponen Mesin | Manufaktur & Teknik | - | `drive`, `model` | Google Drive (drive), 3D Viewer (model) | Missing |
| `mold-design-injection` | Desain Mold Plastic Injection | Manufaktur & Teknik | - | `drive` | Google Drive (drive) | Missing |
| `engine-component-3d` | Pemodelan 3D Komponen V6 Engine | Model Mesin 3D | - | `model`, `preview` | 3D Viewer (model), Google Drive (preview) | Missing |
| `robotic-arm-assembly` | Assembly 3D Lengan Robot Industri | Model Mesin 3D | - | `model` | 3D Viewer (model) | Missing |
| `residential-building-estimate` | RAB & Pemodelan Hunian Residensial | Model Bangunan & RAB | - | `rab`, `drive` | Google Drive / Sheets | Missing |
| `warehouse-structure-rab` | Estimasi Biaya Struktur Gudang Baja | Model Bangunan & RAB | - | `rab` | Google Drive / Sheets | Missing |

*Catatan: Kolom "Missing/Needed Final URL" mendata key object `links` yang saat ini valuenya string kosong (`""`) pada `projectsFallback.js`.*

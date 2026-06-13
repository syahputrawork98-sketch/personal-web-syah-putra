# Batch F13 — Mobile Responsive UI Improvement

## Feature Summary
Peningkatan tampilan responsif mobile untuk area publik (navbar, hero, project card, global spacing).

## Status
Completed

## Story
Memperbaiki masalah pada tampilan mobile, seperti navbar yang kurang rapi, hero yang terlalu mepet/terlalu tinggi, grid proyek yang memaksakan min-width, dan spacing global yang belum proporsional pada mobile screen (360px-430px). Tampilan desktop dipertahankan.

## Current State
- Navbar publik mobile memiliki tinggi 64px dan menu lebar proporsional (`min(85vw, 320px)`).
- Hero section menggunakan `min-height: calc(100svh - 64px)` dengan font dan CTA yang diadaptasi untuk mobile.
- Grid proyek public dikonfigurasi menjadi 1 kolom murni di layar mobile tanpa memaksakan grid sizing statis.
- Global spacing `.main-content` disesuaikan untuk transisi navbar baru.
- Tidak ada modifikasi kode backend, api route, maupun prisma schema.

## Sub-Batch Roadmap
| Sub-Batch | Name | Status | Purpose | Dependency |
|---|---|---|---|---|
| F13A | Public Mobile Layout First Pass | Completed | Penyesuaian layout CSS murni untuk navbar, hero, projects, dan spacing global. | F10 (Deployment Live) |

## HOLD / Blocked Notes
- None.

## Next Step
- Uji QA final di real device.
- Lanjutkan fitur atau batch optimasi lainnya jika diperlukan.

## Notes
- Desktop layout tetap dipertahankan seperti desain asli.
- Update CSS disematkan pada `style.css`, `navbar.css`, `home.css`, `projects.css`.
- MainLayout direfaktor menggunakan className `.main-content` alih-alih inline style `paddingTop: '80px'`.

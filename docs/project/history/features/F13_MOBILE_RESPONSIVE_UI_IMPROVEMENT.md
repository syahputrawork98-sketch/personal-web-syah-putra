# Batch F13 — Mobile Responsive UI Improvement

## Feature Summary
Peningkatan tampilan responsif mobile untuk area publik (navbar, hero, project card, global spacing).

## Status
Completed

## Story
Memperbaiki masalah pada tampilan mobile, seperti navbar yang kurang rapi, hero yang terlalu mepet/terlalu tinggi, grid proyek yang memaksakan min-width, dan spacing global yang belum proporsional pada mobile screen (360px-430px). Tampilan desktop dipertahankan.

## Current State
- Navbar publik mobile memiliki tinggi 64px dan menu lebar proporsional (`min(85vw, 320px)`).
- Hero section menggunakan `min-height: auto` dengan padding terkontrol, serta font dan CTA yang diadaptasi untuk mobile.
- Grid proyek public dikonfigurasi menjadi 1 kolom murni di layar mobile tanpa memaksakan grid sizing statis.
- Global spacing `.main-content` disesuaikan untuk transisi navbar baru.
- Tidak ada modifikasi kode backend, api route, maupun prisma schema.

## Sub-Batch Roadmap
| Sub-Batch | Name | Status | Purpose | Dependency |
|---|---|---|---|---|
| F13A | Public Mobile Layout First Pass | Completed | Penyesuaian layout CSS murni untuk navbar, hero, projects, dan spacing global. | F10 (Deployment Live) |
| F13A.1 | Homepage Hero Spacing Fine Tuning | Completed | Penyesuaian jarak hero title, penempatan CTA sebelum service cards, dan perbaikan margin/padding. Backend/database tidak disentuh. | F13A |
| F13A.2 | Mobile Menu Overlay and CTA Spacing Fix | Completed | Memperbaiki overlay drawer mobile agar tampil solid, menambahkan header drawer dengan close button, dan melegakan jarak CTA button ke service cards di homepage. Backend/database tidak disentuh. | F13A.1 |

## HOLD / Blocked Notes
- None.

## Next Step
- Uji QA final di real device.
- Lanjutkan fitur atau batch optimasi lainnya jika diperlukan.

## Notes
- Desktop layout tetap dipertahankan seperti desain asli.
- Update CSS disematkan pada `style.css`, `navbar.css`, `home.css`, `projects.css`.
- MainLayout direfaktor menggunakan className `.main-content` alih-alih inline style `paddingTop: '80px'`.

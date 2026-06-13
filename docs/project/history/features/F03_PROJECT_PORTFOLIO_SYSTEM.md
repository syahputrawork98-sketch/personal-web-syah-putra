# Batch F03 — Project Portfolio System

## Feature Summary
Sistem portfolio, kategori, card, modal, dan link tile.

## Status
Completed

## Story
Mencakup sistem portfolio, kategori proyek, project card, modal detail, dan link tile. Merupakan ruang pamernya karya user.

## Current State
- UI berjalan dengan baik.
- Modal memunculkan detail yang relevan.
- Link tile diperbarui dengan link aman.
- Curation data proyek dilakukan dengan berorientasi pada kebutuhan rekrutmen HRD Full Stack Developer (Batch F03D).

## Sub-Batch Roadmap
| Sub-Batch | Name | Status | Purpose | Dependency |
|---|---|---|---|---|
| F03A | Portfolio Structure Review | Stable | Struktur UI portofolio. | - |
| F03B | Project Detail Modal Review | Stable | Review desain modal detail. | - |
| F03C | Project Data Polish | Completed | Memperbarui teks dan informasi project. | - |
| F03D | HRD Project Portfolio Curation | Completed | Melakukan kurasi data proyek portofolio berorientasi HRD Full Stack berdasarkan audit kesiapan repository publik. | F03C |
| F03E | Public README Normalization Starter | Completed | Normalisasi README untuk 3 repositori publik kandidat agar tidak duplicate/template dari personal web. | F03D |

## HOLD / Blocked Notes
- Asset finalization masuk ke lingkup F06. Sebagian project data belum komplit sepenuhnya.
- Repository Web-API-Learning-Hub tidak ditemukan di workspace lokal saat ini (diberi status Partial untuk repo tersebut).

## Next Step
- F06A — External Asset URL Inventory.

## Validation Checklist
- Cek interaksi modal dan filter kategori.

## Notes
- [F03C] Project fallback content (narasi, impact, challenge, solution) telah dipoles untuk menonjolkan identitas Web Developer sambil tetap menghargai nilai lintas disiplin. Aset dan link eksternal final tetap ditangani di F06.
- [F03D] Menyusun ulang prioritas proyek agar menampilkan 4 proyek utama (Personal Portfolio CMS, RumahKu Konstruksi, Tien's Catering, Web API Learning Hub) di prioritas teratas dengan format narasi terstruktur (role, tech stack, fitur, kontribusi, status). Menghindari publikasi link GitHub untuk repositori yang README-nya masih template/duplicate. Normalisasi README repositori tersebut akan ditangani pada batch terpisah. Proyek lainnya diturunkan prioritasnya (featured set ke false).
- [F03E] Normalisasi README.md untuk `RumahKuKontruksi-Dev` dan `TC-Tien-s-Catering` agar menyajikan informasi yang jujur sebagai case study/candidate project, serta merapikan minor formatting loop indentation pada `server/prisma/seed.js`. Repositori `Web-API-Learning-Hub` belum disentuh karena tidak ditemukan di local workspace (Partial).

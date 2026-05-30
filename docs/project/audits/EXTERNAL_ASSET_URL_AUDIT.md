# External Asset URL and Credential Safety Audit

## 1. Ringkasan Status Project
Berdasarkan `CURRENT_STATUS.md`:
- **Status Website Publik:** Stabil, lulus audit build (Batch 27A).
- **Deployment Status:** Frontend sudah siap untuk pre-deploy check (Vercel SPA rewrite dikonfigurasi di Batch 27B), tetapi domain final masih **HOLD**.
- **External Project Asset Links:** Masih berstatus **HOLD**. Link Figma, Drive, RAB, 3D model masih menunggu URL aslinya dimasukkan ke data.
- **Credential / Secret Safety:** Status **HOLD / Perhatian Khusus**. Ditegaskan untuk tidak ada API key atau rahasia yang di-commit.
- **CV Final:** Masih berstatus **HOLD** (menggunakan wireframe).

## 2. Audit Project Asset Links (client/src/fallback/projectsFallback.js)

| Project ID | Project Title | Category | Link Fields Found | Current Status | Needed Final URL | Notes |
|---|---|---|---|---|---|---|
| `construction-monitoring-system` | Sistem Monitoring Proyek Konstruksi | IT & Web | `github`, `demo`, `figma` | `github` terisi, lainnya kosong | `demo`, `figma` | URL github ada: `https://github.com/syahputranugraha` |
| `event-organizer-showcase` | Website Portfolio Event Organizer | IT & Web | `github`, `demo` | `github` terisi, `demo` kosong | `demo` | URL github ada: `https://github.com/syahputranugraha` |
| `mechanical-fixture-design` | Desain Fixture Produksi Komponen Mesin | Manufaktur & Teknik | `drive`, `model` | Kosong semua | `drive`, `model` | - |
| `mold-design-injection` | Desain Mold Plastic Injection | Manufaktur & Teknik | `drive` | Kosong | `drive` | - |
| `engine-component-3d` | Pemodelan 3D Komponen V6 Engine | Model Mesin 3D | `model`, `preview` | Kosong semua | `model`, `preview` | - |
| `robotic-arm-assembly` | Assembly 3D Lengan Robot Industri | Model Mesin 3D | `model` | Kosong | `model` | - |
| `residential-building-estimate` | RAB & Pemodelan Hunian Residensial | Model Bangunan & RAB | `rab`, `drive` | Kosong semua | `rab`, `drive` | - |
| `warehouse-structure-rab` | Estimasi Biaya Struktur Gudang Baja | Model Bangunan & RAB | `rab` | Kosong | `rab` | - |

## 3. Audit Credentials (server/data/credentials.json)

| Credential ID | Title | Type | Current Drive URL Status | Verification Status | Notes |
|---|---|---|---|---|---|
| `bbpvp-web-node-react-2025` | Program Pengembangan Web dengan Node.js dan React | Certificate | Ada | verified | - |
| `blue-data-intelligence-2026` | Certified Blue Economist in Blue Data Intelligence | Certificate | Ada | verified | - |
| `certified-blue-economist-foundation-2026` | Certified Blue Economist | Certificate | Ada | verified | - |
| `revou-coding-camp-software-engineering-2025` | Coding Camp Intro to Software Engineering | Certificate | Ada | verified | - |
| `bnsp-web-node-react-2025` | Pengembangan Web dengan Node.js dan React | Certificate | Ada | needs_manual_verification | Detail kompetensi belum terbaca otomatis |
| `global-azure-bootcamp-2017` | Global Azure Bootcamp 2017 | Certificate | Ada | needs_manual_verification | Detail sertifikat belum terbaca otomatis |
| `bnsp-manufacturing-mechanical-cad-2025` | Sertifikat Kompetensi Manufaktur Mekanik CAD | Certificate | Ada | needs_manual_verification | Nomor sertifikat belum terbaca |
| `bbpvp-mechanical-cad-2025` | Mekanik dengan CAD | Certificate | Ada | needs_manual_verification | Isi sertifikat belum terbaca penuh |
| `bnsp-construction-2024` | Sertifikat Kompetensi Jasa Konstruksi | Certificate | Ada | needs_manual_verification | Nomor sertifikat belum terbaca |
| `construction-level-2-2024` | Sertifikat Jasa Konstruksi Level 2 | Certificate | Ada | needs_manual_verification | Detail belum terbaca penuh |
| `spa-traditional-massage-english` | Sertifikat Spa, Pijat Tradisional & Bahasa Inggris | Certificate | Kosong | needs_manual_verification | URL hilang |
| `itenas-self-development-2017` | Program Pelatihan Dasar Pengembangan Diri | Certificate | Kosong | needs_manual_verification | URL hilang |
| `itenas-leadership-relationship-2018` | Program Pelatihan Dasar Pengembangan Relasi dan Sikap Kepemimpinan | Certificate | Kosong | needs_manual_verification | URL hilang |
| `itenas-industrial-technology-participation-2017` | Sertifikat Partisipasi FTI | Certificate | Kosong | needs_manual_verification | URL hilang |
| `blue-data-intelligence-paper-2026` | Strengthening Blue Data Intelligence... | Paper / Supporting Document | Ada | verified | - |
| `portfolio-syah-putra-2025` | Portofolio - Syah Putra Nugraha | Portfolio | Ada | verified | - |
| `portfolio-programming-score-syah-putra` | Portofolio dan Nilai Pemrograman - Syah Putra | Portfolio / Assessment | Ada | needs_manual_verification | Isi belum terbaca penuh |
| `cv-fullstack-syah-putra` | CV Full Stack Web Developer - Syah Putra Nugraha | CV | Ada | verified | Perlu hati-hati menyebarkan data pribadi sensitif |

## 4. Credential Safety Check
Berdasarkan hasil inspeksi pada `server/data/credentials.json` dan `client/src/fallback/projectsFallback.js`, **tidak ditemukan** hal mencurigakan berupa:
- ❌ API key
- ❌ Token akses
- ❌ Password database atau layanan lainnya
- ❌ Secret key / Private key
- ❌ `.env` content

Data yang terekspos murni hanya berupa URL publik (Google Drive / GitHub) yang wajar dalam konteks web portfolio. Sistem aman dari segi kebocoran kunci akses.

## 5. Findings
- **Sudah punya URL:** Seluruh link `github` pada project IT & Web telah diisi. Sebagian besar sertifikat juga telah memiliki URL Google Drive.
- **Masih Kosong:** Semua URL untuk tipe aset `demo`, `figma`, `drive` (di project), `model`, `preview`, dan `rab` masih berstatus kosong. Terdapat 4 kredensial yang juga memiliki field `driveUrl` kosong.
- **Perlu Verifikasi Manual:** Sebanyak 8 dokumen di `credentials.json` berstatus `needs_manual_verification` karena detail isi sertifikat, seperti nomor sertifikat, belum sepenuhnya terekstrak dengan jelas.
- **Tidak boleh dipublikasikan (Risiko Data Pribadi):** Dokumen dengan ID `cv-fullstack-syah-putra` perlu ditinjau ulang oleh user sebelum di-publish final, untuk memastikan bahwa CV yang diletakkan di public Google Drive tidak memuat informasi sensitif berlebihan (misalnya alamat rumah lengkap, KTP, atau nomor rekening).

## 6. Recommendation for Next Batch
Direkomendasikan **Batch 28B** dilanjutkan hanya sebagai fase "Pengisian URL Final", dengan syarat pengguna (user):
1. Telah menyiapkan dan mengompilasi daftar URL asli secara terpisah.
2. Telah memverifikasi pengaturan *sharing permission* pada Google Drive, Figma, atau cloud storage lainnya sudah di-set ke *Public* (Anyone with the link can view) agar dapat dibuka oleh pengunjung website.
3. Telah memilah dan memastikan dokumen yang di-upload aman dan bebas dari data privasi yang rentan disalahgunakan.

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
| F09H | Admin Login Dev Helper and Credential UI Field Sync | Completed | Penambahan helper login development dan perbaikan pemetaan field pada UI Admin Certification. | F09G |
| F09I | Admin Settings Crash Fix and Settings Structure Review | Completed | Perbaikan missing React hooks di halaman Settings dan review pemisahan struktur Settings admin. | F09E |
| F09J | Admin Layout Sidebar Topbar and Settings Grouping | Completed | Refaktor layout AdminPanel dengan struktur sidebar-topbar dan grouping Settings. | F09I |
| F09K | Admin UI Polish and Credential Actions Fix | Completed | Merapikan admin UI layout (Dashboard) dan memperbaiki mapping tombol action View Credential (View Drive/View File). | F09J |
| F09L | Admin Root Dashboard and Module Overview | Completed | Membuat halaman index `/admin` menjadi Dashboard root yang menampilkan shortcut module dan status CMS. | F09K |
| F09M | Admin CRUD Root Audit and Safe Delete UX Plan | Completed | Melakukan audit status CRUD menyeluruh ke semua page admin dan memetakan pola Delete UX beserta error feedback. | F09L |
| F09N | Reusable Admin Feedback and Delete Confirmation | Completed | Membuat modal konfirmasi delete kustom (React component) untuk menggantikan `window.confirm` bawaan browser di semua module. | F09M |

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
- [F09H] Menambahkan tombol _Use Local Dev Login_ di halaman Admin Login untuk memudahkan fase testing/development tanpa harus mengingat password hash. Mapping kolom di Admin Certifications (`issuedAt` menjadi `issueDate`) sudah diperbaiki agar tidak *undefined*.
- [F09I] Memperbaiki error browser *crash* akibat *missing React hook imports* (`useState` is not defined) pada komponen `AdminHeroSettings.jsx` dan `AdminProfileSettings.jsx`. Struktur *Settings* (Hero, Profile, Contact) dievaluasi tetap terisolasi dan maping komponen dipastikan rapi tanpa pencampuran fungsi.
- [F09J] Merombak struktur UI `AdminLayout.jsx` dari *top-heavy nav* menjadi struktur *Sidebar* + *Topbar*. Navigasi dipisahkan menjadi modul utama (Projects, Credentials, dsb.) dan modul *Settings* (*dropdown* khusus untuk Hero, Profile, Contact, dan Account). Navigasi Logout dan View Site dipindahkan ke bagian atas (Topbar).
- [F09K] Menyempurnakan Sidebar dengan menu _Dashboard_ (merujuk ke index admin), menambah heading kategori navigasi (Main & Configuration), dan memperbaiki tombol aksi (Action View/Edit/Delete) di `AdminCertifications.jsx` (memisahkan label _View Drive_ dan _View File_ agar tidak ambigu). Form `CertificationForm.jsx` juga diberi *section headers* (Basic Info, Links, Metadata, Visibility) untuk pengalaman UX admin yang lebih rapi.
- [F09L] Membuat komponen `AdminDashboard.jsx` sebagai *root page* baru untuk _route_ `/admin` menggantikan `AdminProjects`. Dashboard ini menyediakan rangkuman modul utama, panel status lokal, dan *shortcut cards* untuk mengarahkan pengguna ke setiap segmen (termasuk Settings) guna mempermudah akses CMS.
- [F09M] Melakukan peninjauan statis terhadap fungsi CRUD di seluruh *pages* admin dan mendapati seluruh rutinitas fundamental (Create, Read, Update, Delete) terkoneksi positif ke `api.js` serta merespons perlakuan *Public Sync*. Ditemukan satu anomali *Safe Delete Confirmation* di `AdminEducation.jsx` yang telah ditambal (kini mencantumkan parameter gelar/universitas secara akurat). Rencana perbaikan *Delete UX* yang direkomendasikan untuk _Next Batch_: **F09N — Reusable Admin Feedback and Delete Confirmation**, agar kelak _confirm_ tidak menggunakan fungsi *browser default* yang kaku melainkan Modal React.
- [F09N] Menghapus fungsi *browser default* `window.confirm` pada operasi penghapusan data dan menggantinya dengan komponen `ConfirmModal.jsx`. Modal ini telah diimplementasikan ke halaman Projects, Credentials, Skills, Experience, dan Education dengan dukungan *state* `isDeleting` dan _feedback_ sukses/gagal di dalam antarmuka yang bersih.

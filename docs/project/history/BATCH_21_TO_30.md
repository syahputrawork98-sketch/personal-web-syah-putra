# Batch History 21 - 30

Dokumen ini berisi riwayat pengembangan dari Batch 21 hingga Batch 30 untuk project PW Personal Web.

## Catatan Batch 21

Status: Executed - Portable AI Workflow & Project Governance SOP selesai.

Perubahan Batch 21:
- Membuat dokumentasi SOP ChatGPT Project untuk PW Personal Web.
- Menetapkan Roomchat 00 sebagai Manager utama.
- Menetapkan Roomchat 01 sebagai Analis, Auditor, dan Checker.
- Menetapkan Gemini Anti-Gravity sebagai eksekutor satu kali, bukan checker utama.
- Menegaskan VS Code sebagai tempat validasi nyata oleh user.
- Menegaskan GitHub sebagai memori portable dan sumber dokumentasi utama project.
- Menambahkan aturan pemilihan Gemini 3.1 Pro Low dan Gemini 3.1 Pro High.
- Menambahkan format output Roomchat 00, Roomchat 01, laporan Gemini, dan commit/push workflow.

## Catatan Batch 22

Status: Executed - Docs Structure Cleanup & Batch History Separation selesai.

Perubahan Batch 22:
- Merapikan struktur dokumentasi project pada folder `docs/`.
- Memisahkan history batch dari `FITUR.md` ke folder khusus `docs/01-batch-history/` agar `FITUR.md` kembali fokus.
- Membuat dokumen status `HOLD_ITEMS.md`.
- Membuat catatan teknis `FRONTEND_NOTES.md`, `BACKEND_NOTES.md`, dan `DATABASE_NOTES.md`.
- Menyediakan instruksi copy-paste untuk alur ChatGPT di `CHATGPT_PROJECT_INSTRUCTION.md`.

## Catatan Batch 23

Status: Executed - Legacy Docs Cleanup & Anti-Gravity Workflow Alignment selesai.

Perubahan Batch 23:
- Membersihkan dokumentasi lama (folder audits, checklists, maps, roadmap).
- Mengubah rujukan proses validasi dari VS Code menjadi Anti-Gravity IDE.

## Catatan Batch 24

Status: Executed - Project Bootstrap Memory File selesai.

Perubahan Batch 24:
- Membuat Project Bootstrap Memory File (`PROJECT_BOOTSTRAP.md`).
- Menyediakan prompt siap copy-paste untuk ChatGPT Project, Roomchat 01, dan Gemini Anti-Gravity.
- Menegaskan GitHub sebagai memori portable project.

## Catatan Batch 25

Status: Executed - Vercel Deployment Readiness selesai.

Perubahan Batch 25:
- Menambahkan Vercel SPA rewrite
- Menambahkan deployment notes
- Menyiapkan Vercel frontend-only deployment

## Catatan Batch 26

Status: Executed — Documentation Structure Alignment selesai.

Batch 26 terdiri dari beberapa sub-batch:

### Batch 26A — Docs Project Structure Alignment
- Membuat fondasi struktur `docs/project/`.
- Membuat subfolder `workflow/`, `history/`, `onboarding/`, dan struktur dokumentasi awal.
- Menyiapkan arah migrasi agar mengikuti pola KBT Kosuka Bali Trip.

### Batch 26B — Workflow and Onboarding Migration
- Memigrasikan workflow utama ke `docs/project/workflow/`.
- Memigrasikan bootstrap dan instruksi roomchat ke `docs/project/onboarding/`.
- Menegaskan Anti-Gravity IDE sebagai tempat eksekusi dan validasi nyata.
- Menetapkan Roomchat 00 sebagai manager dan Roomchat 01 sebagai reviewer.

### Batch 26C — Final Docs Migration and Legacy Folder Cleanup
- Memigrasikan batch history dan status project ke `docs/project/history/`.
- Memindahkan status HOLD dan deployment notes ke struktur baru.
- Menghapus folder lama `docs/00-project-control/`, `docs/01-batch-history/`, `docs/02-project-status/`, dan `docs/03-technical-notes/`.
- Membersihkan referensi path lama.

### Batch 26D — Separate Technical Documentation Structure
- Memisahkan dokumentasi teknis dari `docs/project/`.
- Membuat folder setara:
  - `docs/frontend/`
  - `docs/backend/`
  - `docs/database/`
- Memindahkan `FRONTEND_NOTES.md`, `BACKEND_NOTES.md`, dan `DATABASE_NOTES.md` ke folder teknis masing-masing.
- Menghapus `docs/project/technical/`.

### Batch 26E — Cleanup Transition Notes and Update Batch History
- Membersihkan catatan transisi pasca-migrasi.
- Mengupdate history dokumen agar mencerminkan struktur yang final dan stabil.

### Batch 26F — Model Usage Guide
- Menambahkan panduan pemilihan model AI.
- Menetapkan Gemini 3.1 Pro Low dan Gemini 3.1 Pro High sebagai default utama.
- Menetapkan Gemini 3.5 Flash, Claude Sonnet, Claude Opus, dan GPT OSS sebagai alternative acceleration models.
- Menambahkan aturan pencatatan model jika acceleration mode digunakan.

### Batch 26G — Final Instruction Cleanup Before ChatGPT Project Use
- Membersihkan struktur bootstrap agar tidak lagi menyebut docs/project/technical.
- Menegaskan aturan no commit/no push untuk eksekutor.
- Menyiapkan instruksi agar aman dipakai di ChatGPT Project.

### Batch 26H — Simplify Onboarding Structure
- Menyederhanakan folder onboarding agar mengikuti pola KBT.
- Menghapus PROJECT_BOOTSTRAP.md karena fungsinya sudah digabung ke README dan CHATGPT_PROJECT_INSTRUCTIONS.
- Membersihkan seluruh referensi ke PROJECT_BOOTSTRAP.md.

### Batch 26I — Consolidate Active Project Status
- Menggabungkan HOLD items dan deployment notes ke CURRENT_STATUS.md.
- Menjadikan CURRENT_STATUS.md sebagai satu patokan status aktif.
- Menghapus HOLD_ITEMS.md dan DEPLOYMENT_NOTES.md agar history folder lebih sederhana.
- Menegaskan batch history sebagai arsip, bukan status aktif.

### Batch 26J — Optimize Workflow Batch Rules
- Menambahkan definisi Small, Medium, dan Large Batch.
- Menambahkan aturan Scope Area.
- Menambahkan Batch Gate sebelum eksekusi.
- Menyelaraskan rekomendasi model dengan ukuran batch.
- Menegaskan Anti-Gravity IDE sebagai workspace, bukan pengambil keputusan.

### Batch 26K — Align Roomchat Prompts and Checkpoint Policy
- Menyelaraskan prompt Roomchat 00 dan Roomchat 01 dengan Batch Gate.
- Menambahkan Batch Naming Policy.
- Menambahkan History Checkpoint Policy.
- Menetapkan `-CP` sebagai kode checkpoint dokumentasi fleksibel.
- Menegaskan bahwa history detail tidak wajib diisi setiap batch kerja.
- Menegaskan bahwa checkpoint merapikan CURRENT_STATUS, batch history, dan docs/frontend/backend/database sesuai area kerja sebelumnya.

Hasil akhir Batch 26:
- Struktur dokumentasi final menjadi:
  - `docs/project/` untuk manajemen project, workflow, onboarding, dan history.
  - `docs/frontend/` untuk dokumentasi frontend.
  - `docs/backend/` untuk dokumentasi backend.
  - `docs/database/` untuk dokumentasi database.
- Dokumentasi lebih clear, portable, dan mudah dibaca oleh AI/tools baru.

## Catatan Batch 27
*(Placeholder untuk riwayat batch selanjutnya)*

## Catatan Batch 28

Mulai Batch 28, histori menggunakan format bertingkat (Hierarchy Format) yang terdiri dari: Parent Batch, Parent Goal, Parent Status, Scope Area, Children/Stages, Patch Notes (jika ada), Blocked/HOLD reason (jika ada), dan Definition of Done ringkas (jika diperlukan).

### Batch 28 — Workflow Governance Hardening

**Parent goal**:
Memperkuat sistem governance batch, patch, status, dan pencatatan histori agar setiap fitur/goal besar punya alur dari awal sampai ending.

**Parent status**:
In Progress

**Children**:
- **Batch 28A — Batch Hierarchy and History Format Alignment**
  - **Status**: Completed
  - **Scope**: docs/project
  - **Ringkasan**: Menyelaraskan definisi batch induk, tahapan A/B/C, patch .1/.2, checkpoint -CP, status Partial/Blocked/HOLD, dan format histori bertingkat.

Catatan penting:
- Batch 27B tetap Completed.
- Batch 28A bukan checkpoint.
- Batch 28-CP hanya digunakan nanti jika user meminta checkpoint dokumentasi/status.

## Catatan Batch 29
*(Placeholder untuk riwayat batch selanjutnya)*

## Catatan Batch 30
*(Placeholder untuk riwayat batch selanjutnya)*

# Batch F15 — HRD Portfolio Score Improvement

## Feature Summary
Peningkatan kualitas portfolio berdasarkan review HRD Full Stack Developer agar lebih kuat dari sisi recruiter readability, project proof, experience clarity, credentials, CTA, SEO, dan audit teknis.

## Status
Active

## Story
Meningkatkan keterbacaan website portfolio oleh crawler sederhana, recruiter tools, dan akses teks tanpa merombak arsitektur React SPA. Saat ini HTML awal hanya memuat root React sehingga beberapa crawler hanya membaca title/meta, bukan isi utama portfolio. Batch ini dimulai dengan menyisipkan static recruiter snapshot pada berkas HTML dasar (index.html).

## Current State
- SEO static snapshot untuk recruiter baseline (Batch F15A) selesai dibuat dan diintegrasikan secara aman ke client/index.html.
- Penyempurnaan snapshot keamanan SEO (Batch F15A.1) selesai dilakukan dengan memindahkan static snapshot ke dalam tag `<noscript>` guna menghindari penggunaan tag hidden (`display: none`) yang rentan dianggap spam oleh search engine crawler, sekaligus memberikan visual fallback yang rapi saat JavaScript dinonaktifkan.
- Polish Hero CTA dan Recruiter Copy (Batch F15B) selesai dikerjakan pada `Home.jsx` dengan menambahkan akses cepat ke LinkedIn dan GitHub yang bersumber dari API / fallback contact, serta memperkuat deskripsi role, title, dan subtitle default saat backend kosong/down agar web portofolio tetap informatif secara statis.
- Snapshot berisi professional summary, core stack, featured work, dan recruiter links.
- Tampilan visual React Home saat JS aktif tidak terpengaruh sedikit pun.

## Sub-Batch Roadmap
| Sub-Batch | Name | Status | Purpose | Dependency |
|---|---|---|---|---|
| F15A | SEO Static Snapshot and Recruiter Readability Baseline | Completed | Menyisipkan static recruiter snapshot pada client/index.html agar mudah dibaca crawler sederhana. | - |
| F15A.1 | SEO Snapshot Safety Refinement | Completed | Merapikan static snapshot agar fallback recruiter/readability memakai noscript dan tidak bergantung pada hidden SEO content. | F15A |
| F15B | Hero CTA and Recruiter Copy Polish | Completed | Penyesuaian salinan copywriter/CTA di bagian Hero utama. | F15A.1 |
| F15C | Project Case Study Polish | Pending | Peningkatan detail case study pada masing-masing module project. | F15B |
| F15D | Experience Timeline Polish | Pending | Menyempurnakan deskripsi pencapaian pada modul pengalaman. | F15C |
| F15E | Credentials Relevance Polish | Pending | Kurasi relevansi dan deskripsi kredensial/sertifikasi. | F15D |
| F15F | Security and GitHub Recruiter Audit | Pending | Audit repositori dan profil GitHub untuk kebutuhan rekrutmen. | F15E |
| F15G | Lighthouse and Final HRD Score QA | Pending | Pengukuran skor akhir dengan Lighthouse QA. | F15F |

## HOLD / Blocked Notes
- Seluruh pengerjaan pada batch ini dirancang tanpa mengubah arsitektur SPA React atau menambahkan prerendering framework / SSR dependency baru.

## Next Step
- Melanjutkan ke Batch F15B — Hero CTA and Recruiter Copy Polish.

## Validation Checklist
- Menjalankan build frontend (`npm run build`) dan memastikan kompilasi berjalan sukses.
- Memastikan berkas HTML di index.html memiliki snapshot text-only yang valid saat diinspeksi.
- Memastikan visual website React Home tidak bergeser atau rusak.

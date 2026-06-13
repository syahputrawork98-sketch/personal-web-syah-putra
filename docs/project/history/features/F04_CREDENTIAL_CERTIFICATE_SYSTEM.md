# Batch F04 — Credential and Certificate System

## Feature Summary
Halaman credential, kartu sertifikat, modal preview, dan data sertifikat.

## Status
Completed

## Story
Mencakup pengelolaan dan tampilan data sertifikasi/credential. Menunjukkan kualifikasi formal dan pencapaian profesional user dengan bukti visual yang bisa dipreview langsung melalui Google Drive preview.

## Current State
- Sistem list credential berjalan baik.
- Tampilan kartu dan fungsi preview beroperasi.
- Data kredensial diselaraskan dan ditata ulang berdasarkan prioritas kebutuhan rekrutmen HRD Full Stack Developer (Batch F04D).

## Sub-Batch Roadmap
| Sub-Batch | Name | Status | Purpose | Dependency |
|---|---|---|---|---|
| F04A | Credential Data Verification | Completed | Memverifikasi data sertifikat. | - |
| F04B | Certificate Preview QA | Completed | Tes fitur preview Drive iframe. | - |
| F04C | Public Credential Safety Review | Completed | Review kemanan data publik. | - |
| F04D | Public Credential Content Cleanup | Completed | Merapikan prioritas dan wording kredensial agar selaras dengan posisi Full Stack Developer dan memposisikan sertifikat non-IT sebagai pendukung. | F04C |

## HOLD / Blocked Notes
- Sebagian credential masih perlu verifikasi manual oleh user (misalnya memastikan link drive sudah public dan bisa diembed).

## Next Step
- F03C — Project Data Polish (atau F10A — Production Deployment Check)

## Validation Checklist
- Klik sertifikat dan cek apakah preview muncul dengan benar.

## Notes
- [F04A] Data credential telah diverifikasi secara struktur dan konsistensi. Kategori dan status dirapikan, serta narasi diselaraskan.
- [F04B] Seluruh 20 link Google Drive berhasil divalidasi. Response URL menunjukkan HTTP 200 (Public/OK), tidak ada yang meminta login (private). Fitur preview iframe dipastikan berjalan aman.
- [F04C] Public metadata safety review telah dilakukan. Data sensitif dan kode verifikasi detail pada summary telah dinetralisir agar aman untuk publik.
- [F04D] Melakukan penataan ulang kredensial di `credentials.json` agar berorientasi rekrutmen Full Stack. Sertifikat web/full stack utama (BBPVP, BNSP, RevoU) disetel ke prioritas tertinggi (`displayPriority` 1/2, `featured` dan `showOnHomepage` true). Sertifikat non-IT (CAD, Konstruksi, Kepemimpinan, dll.) diturunkan prioritasnya dan diframing sebagai supporting/lintas bidang (`showOnHomepage` false, `displayPriority` 4/5) tanpa menghapus data atau mengubah tautan Drive.

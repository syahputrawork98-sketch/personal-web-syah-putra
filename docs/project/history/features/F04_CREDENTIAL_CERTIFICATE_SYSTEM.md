# Batch F04 — Credential and Certificate System

## Feature Summary
Halaman credential, kartu sertifikat, modal preview, dan data sertifikat.

## Status
Partial

## Story
Mencakup pengelolaan dan tampilan data sertifikasi/credential. Menunjukkan kualifikasi formal dan pencapaian profesional user dengan bukti visual yang bisa dipreview langsung melalui Google Drive preview.

## Current State
- Sistem list credential berjalan baik.
- Tampilan kartu dan fungsi preview beroperasi.
- Data kredensial sebagian sudah terisi.

## Sub-Batch Roadmap
| Sub-Batch | Name | Status | Purpose | Dependency |
|---|---|---|---|---|
| F04A | Credential Data Verification | Completed | Memverifikasi data sertifikat. | - |
| F04B | Certificate Preview QA | Completed | Tes fitur preview Drive iframe. | - |
| F04C | Public Credential Safety Review | Not Started | Review kemanan data publik. | - |

## HOLD / Blocked Notes
- Sebagian credential masih perlu verifikasi manual oleh user (misalnya memastikan link drive sudah public dan bisa diembed).

## Next Step
- F04C — Public Credential Safety Review.

## Validation Checklist
- Klik sertifikat dan cek apakah preview muncul dengan benar.

## Notes
- [F04A] Data credential telah diverifikasi secara struktur dan konsistensi. Kategori dan status dirapikan, serta narasi diselaraskan.
- [F04B] Seluruh 20 link Google Drive berhasil divalidasi. Response URL menunjukkan HTTP 200 (Public/OK), tidak ada yang meminta login (private). Fitur preview iframe dipastikan berjalan aman.

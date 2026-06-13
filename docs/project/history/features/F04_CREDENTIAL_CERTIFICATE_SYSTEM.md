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
| F04E | Credential Homepage Display and Next Step Cleanup | Completed | Verifikasi penayangan kartu beranda dan pembersihan alur rencana langkah berikutnya. | F04D |
| F04F | Credential Manual Verification Follow-up | Completed | Menindaklanjuti verifikasi detail sertifikat BNSP secara manual dari preview. | F04E |
| F04G | Safe Neon Credential Sync Preparation | Completed | Menyiapkan targeted script untuk sinkronisasi kredensial BNSP ke Neon tanpa mengganggu live data. | F04F |

## HOLD / Blocked Notes
- *Tidak ada*

## Next Step
- F04H — Manual Execution of Targeted Sync to Neon (untuk eksekusi apply manual jika env dan backup sudah siap).
- F05 / F06 — Media Assets and Link integration.

## Validation Checklist
- Klik sertifikat dan cek apakah preview muncul dengan benar.

## Notes
- [F04A] Data credential telah diverifikasi secara struktur dan konsistensi. Kategori dan status dirapikan, serta narasi diselaraskan.
- [F04B] Seluruh 20 link Google Drive berhasil divalidasi. Response URL menunjukkan HTTP 200 (Public/OK), tidak ada yang meminta login (private). Fitur preview iframe dipastikan berjalan aman.
- [F04C] Public metadata safety review telah dilakukan. Data sensitif dan kode verifikasi detail pada summary telah dinetralisir agar aman untuk publik.
- [F04D] Melakukan penataan ulang kredensial di `credentials.json` agar berorientasi rekrutmen Full Stack. Sertifikat web/full stack utama (BBPVP, BNSP, RevoU) disetel ke prioritas tertinggi (`displayPriority` 1/2, `featured` dan `showOnHomepage` true). Sertifikat non-IT (CAD, Konstruksi, Kepemimpinan, dll.) diturunkan prioritasnya dan diframing sebagai supporting/lintas bidang (`showOnHomepage` false, `displayPriority` 4/5) tanpa menghapus data atau mengubah tautan Drive.
- [F04E] Homepage credential display dijaga tetap ringkas. Hanya tiga sertifikat utama web development (BBPVP, BNSP, RevoU) yang disetel true untuk showOnHomepage. Next Step F04 diperbarui agar tidak mengarah ke batch lama yang tidak relevan. Tidak ada perubahan sistem, UI, preview, atau link Drive.
- [F04F] Melakukan verifikasi manual terhadap sertifikat BNSP (id: bnsp-web-node-react-2025) menggunakan visual preview dari link Google Drive. Berhasil melengkapi nomor sertifikat (78412 3514 0 0000712 2025), tanggal terbit (2025-10-06), status kompetensi ("Kompeten"), serta mengubah status verifikasi menjadi "verified". Tidak ada link Drive, sistem preview, atau UI yang diubah.
- [F04G] Menyusun script targeted sync khusus (`server/scripts/sync-credential-bnsp.js`) untuk melakukan upsert data BNSP yang terverifikasi ke Neon DB. Script menggunakan mode dry-run secara default untuk keamanan dan mencegah penggunaan query destruktif (tanpa deleteMany/data overwrite lainnya). Menambahkan command `npm run sync:credential:bnsp` pada `package.json` server.

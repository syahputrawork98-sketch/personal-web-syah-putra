# Feature History — PW Personal Web

Dokumen ini adalah riwayat aktif baru untuk project PW Personal Web. Sistem lama berbasis Batch 01 sampai Batch 30 tidak lagi digunakan sebagai tracking aktif. Mulai dari dokumen ini, riwayat project menggunakan Feature Batch Tracking.

## Batch F00 — Project Workflow Reset

Status:
Completed

Story:
Batch F00 mereset sistem dokumentasi project dari batch history lama menjadi feature-based tracking. Tujuannya agar setiap fitur besar seperti CV Download System, Asset Link System, Backend API System, Admin Login System, dan Deployment System punya status, alasan HOLD, dan next step yang jelas.

Scope:
- Reset history aktif
- Buat Feature Tracker
- Konsolidasi audit/security lama
- Jadikan CURRENT_STATUS.md sebagai pusat status aktif
- Hapus dokumen history batch lama dari sistem aktif

Result:
- Menghapus batch history lama.
- Membuat format Feature Batch di CURRENT_STATUS.md.
- Mengupdate README.md, FITUR.md, dan dokumen utama untuk tidak merujuk lagi ke urutan batch lama (Batch 20, 22, 28 dsb).
- Menyatukan file audit dan security (yang sebelumnya terpisah) secara konseptual ke dalam status di Feature Tracker.

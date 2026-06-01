# History

Folder ini berisi dokumen riwayat dan status aktif project menggunakan sistem **Feature Batch Tracking**:

- `CURRENT_STATUS.md` sebagai **pusat status aktif** untuk seluruh fitur (Active Feature Tracker).
- `FEATURE_HISTORY.md` sebagai **index history aktif berbasis fitur**.
- `features/` berisi file detail untuk setiap fitur. Setiap fitur utama wajib memiliki file detail sendiri. Sub-batch seperti F05A, F05B, F05A.1 dicatat di dalam file fitur masing-masing.
- `FEATURE_BATCH_TEMPLATE.md` sebagai template standar untuk feature batch baru.

*Catatan Penting:*
- History lama (Batch 01 sampai Batch 30) tidak lagi dipakai sebagai tracking aktif.
- Jangan menyimpan status aktif di file audit atau security terpisah; semua status dikonsolidasikan ke dalam Feature Tracker di `CURRENT_STATUS.md`.
- Kode `-CP` (misal F05-CP) dapat digunakan khusus untuk **checkpoint dokumentasi**.

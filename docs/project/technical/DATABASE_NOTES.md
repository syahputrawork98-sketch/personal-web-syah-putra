# Database Technical Notes

Dokumen ini merangkum status penggunaan Database di PW Personal Web.

## Status Saat Ini: Belum Digunakan
Project PW Personal Web saat ini belum menggunakan database aktif. Seluruh sistem berjalan mandiri menggunakan data statis (fallback data) yang dikelola langsung di sisi frontend.

## Arahan Penting
- **Tidak Membuat Schema Baru**: Dilarang menginisiasi, mendesain, atau membuat schema database (baik SQL maupun NoSQL) di dalam repository ini sebelum ada keputusan final mengenai arsitektur backend.
- **Konsistensi Data Model**: Jika ada kebutuhan update data (seperti menambah proyek atau sertifikat), lakukan pembaruan langsung pada object JavaScript di dalam folder `client/src/data/` sesuai dengan tipe model yang sudah terbentuk.

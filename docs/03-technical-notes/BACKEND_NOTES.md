# Backend Technical Notes

Dokumen ini merangkum catatan penting mengenai sisi Backend di PW Personal Web.

## Status Saat Ini: HOLD / Skeleton
Saat ini, folder `server/` pada project bertindak hanya sebagai folder skeleton (rangka).
Pengembangan logika backend (Express, API endpoint, logic database, Auth) sedang berstatus **HOLD**.

## Arahan Penting
- **Tidak Membangun Fitur Backend Baru**: Jangan menambahkan API route, logic, atau skrip backend baru sampai fase pengembangan frontend (termasuk static integration) dinyatakan sepenuhnya selesai dan fokus project beralih ke integrasi server.
- **Kemandirian Frontend**: Seluruh kebutuhan data saat ini dilayani oleh sistem fallback statis yang ada di folder `client/src/data/`.
- **Akses Admin / Auth**: Dikerjakan belakangan. Tidak boleh ada sistem login parsial yang diterapkan ke website publik saat ini.

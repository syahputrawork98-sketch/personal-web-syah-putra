# FITUR - Personal Web Syah Putra

Dokumen ini mencatat area fitur dan rencana refactor repository personal web.

## Status Umum

Project berada pada tahap persiapan refactor struktur folder dan modularisasi frontend ringan.

## Target Struktur Repository

```txt
client/
server/
docs/
README.md
FITUR.md
```

## Area Project

| Area | Status | Catatan |
| --- | --- | --- |
| Frontend personal web | Existing | Source awal berada di `webstrip/`. |
| Dokumentasi | Existing | Dokumentasi awal berada di README dan `cutback-master/`. |
| Struktur root baru | Planned | Target folder utama: `client/`, `server/`, `docs/`. |
| Modularisasi frontend | Planned | Rencana pemisahan halaman, komponen, data, hook, service, layout, dan style. |
| Server skeleton | Planned | Disiapkan sebagai folder backend ringan untuk pengembangan berikutnya. |

## Roadmap Refactor Awal

1. Root structure refactor.
2. Client folder layering.
3. Static data extraction.
4. Component extraction.
5. Hooks, services, dan dokumentasi sinkron.

## Catatan

Fokus refactor adalah kerapian struktur, modularitas, maintainability, dan menjaga project tetap ringan.

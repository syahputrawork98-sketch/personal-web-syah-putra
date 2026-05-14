# Refactor Plan - Personal Web Syah Putra

Dokumen ini mencatat rencana refactor repo personal web agar struktur project lebih rapi, modular, ringan, dan mudah dikembangkan.

## Target Struktur Root

Target akhir repository:

```txt
client/   # frontend
server/   # backend atau backend skeleton ringan
docs/     # dokumentasi
README.md
FITUR.md
```

Mapping awal:

```txt
webstrip/       -> client/
cutback-master/ -> docs/
server/         -> folder baru/skeleton ringan
FITUR.md        -> status fitur dan refactor
README.md       -> dokumentasi utama root
```

## Arah Arsitektur

Project menggunakan pendekatan layered architecture ringan, bukan OOP berat.

Prinsip yang dipakai:

- halaman utama ditempatkan di folder pages.
- komponen UI reusable ditempatkan di folder components.
- data statis ditempatkan di folder data.
- logic React reusable ditempatkan di folder hooks.
- helper non-UI ditempatkan di folder services.
- layout utama ditempatkan di folder layouts.
- styling global ditempatkan di folder styles.

## Batasan Refactor

Refactor dilakukan bertahap dan tidak boleh memperbesar scope tanpa keputusan baru.

Batasan awal:

- React tetap memakai functional component.
- Tidak memakai class component secara paksa.
- Tidak membuat inheritance kompleks.
- Tidak menambah fitur baru saat refactor struktur.
- Tidak membuat backend besar pada batch awal.
- Tidak membuat auth, database, CMS, admin panel, atau deployment baru pada batch awal.
- Tidak menghapus file lama tanpa mapping yang jelas.

## Roadmap Awal

### Batch 1 - Root Structure Refactor

Tujuan:

- rename/move `webstrip/` menjadi `client/`.
- move/merge `cutback-master/` ke area `docs/`.
- tambah `server/` sebagai skeleton ringan.
- tambah/update `FITUR.md`.
- update `README.md` agar sesuai struktur baru.
- tidak mengubah behavior frontend.

### Batch 2 - Client Folder Layering

Tujuan:

- rapikan `client/src/` menjadi struktur pages, components, data, hooks, services, layouts, dan styles.
- tidak mengubah behavior UI.

### Batch 3 - Static Data Extraction

Tujuan:

- pindahkan data statis dari page ke `client/src/data/`.
- page menjadi lebih tipis dan mudah dibaca.

### Batch 4 - Component Extraction

Tujuan:

- pecah page besar menjadi komponen kecil reusable.
- jaga visual dan behavior tetap sama.

### Batch 5 - Services, Hooks, and Docs Sync

Tujuan:

- pindahkan logic berulang ke hooks/services kecil.
- sinkronkan dokumentasi setelah beberapa batch refactor.

## Catatan Kerja

Fokus utama refactor adalah maintainability. Jangan membuat project lebih berat dari kebutuhan website personal.

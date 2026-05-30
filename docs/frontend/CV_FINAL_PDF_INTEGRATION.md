# Panduan Integrasi CV Final PDF

## Tujuan
Dokumen ini menjadi panduan untuk memasukkan file PDF asli ke dalam website, sehingga pengunjung dapat mengunduh CV Final dengan aman.

## Lokasi Data CV Saat Ini
Data *variants* dari CV (termasuk judul, deskripsi, skill, dan tautan PDF) dikonfigurasi di dalam file:
`client/src/data/cvVariants.js`

Saat ini, property `pdfUrl` pada setiap objek *variant* masih kosong (atau null/falsy), yang membuat tombol unduh PDF dalam mode "PDF Belum Tersedia".

## Aturan Penempatan File PDF Final Nanti
Jika file PDF sudah tersedia:
1. File PDF tersebut disarankan disimpan di dalam folder `public/` (misalnya: `client/public/cv/`).
2. Pastikan penamaan file PDF menggunakan huruf kecil, tanpa spasi (bisa gunakan *dash* / tanda hubung), agar kompatibel dengan lingkungan *hosting*.

## Contoh Pola Path Aman
Jika Anda meletakkan file bernama `cv-fullstack-developer.pdf` ke dalam `client/public/cv/`, maka di dalam file `cvVariants.js`, bagian `pdfUrl` diisi seperti berikut:

```javascript
export const cvVariants = [
  {
    id: "fullstack-developer",
    title: "Full Stack Developer",
    // ...
    pdfUrl: "/cv/cv-fullstack-developer.pdf"
  }
]
```

## Catatan Batch 28A
Pada Batch 28A, komponen *frontend* (`CVVariantSelector.jsx`) **sudah disiapkan (Readiness)** agar tombol unduh akan otomatis berfungsi jika `pdfUrl` terisi. Namun, **file PDF final asli BELUM dimasukkan** pada Batch ini dan masih menunggu file final dari user.

## Larangan Data Sensitif
**Penting:** File PDF yang diletakkan di dalam folder publik (atau *hosting* publik lainnya) dapat diunduh oleh siapa saja.
- DILARANG menaruh data pribadi yang terlampau sensitif seperti: NIK, Foto KTP, KK, Nomor Rekening, atau alamat rumah yang sangat lengkap di dalam CV versi publik.
- Pastikan CV sudah disensor/dikondisikan khusus untuk keperluan sebaran daring terbuka (Public Facing).

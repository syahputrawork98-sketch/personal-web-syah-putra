# Batch History 11 - 20

Dokumen ini berisi riwayat pengembangan dari Batch 11 hingga Batch 20 untuk project PW Personal Web.

## Catatan Batch 11

Status: Executed - Branding Header SPN + Public Name selesai.

Perubahan Batch 11:
- Membuat komponen `BrandLogo.jsx` dan `BrandLogo.css` untuk manajemen branding terpusat.
- Mengubah logo Navbar dari teks "SYAHPUTRA NUGRAHA" menjadi monogram **"SPN"** bergaya gradient dan nama publik **"Syah Putra N"**.
- Menyelaraskan branding di Footer agar menggunakan nama publik **"Syah Putra N"**.
- Memastikan tampilan responsif Navbar tetap aman dengan branding baru.
- Nama panjang penuh "Syah Putra Nugraha" tetap digunakan di metadata SEO dan dokumen resmi, namun tidak lagi digunakan di branding utama UI.

## Catatan Batch 12

Status: Executed - Credentials Page Structure + Drive Preview Support selesai.

Perubahan Batch 12:
- Membuat halaman publik baru **"Sertifikat & Kredensial"** di route `/credentials`.
- Menambahkan menu **"Sertifikat"** pada Navbar publik.
- Membuat komponen `CredentialCard.jsx` dan `CredentialModal.jsx` dengan dukungan **Google Drive Preview** (iframe).
- Menyiapkan struktur data terpusat di `client/src/data/credentialsData.js`.
- Mendukung filter kategori (BNSP, Web Development, Konstruksi, Manufaktur, Pelatihan).
- Halaman ini dirancang untuk kemandirian konten; data final link Google Drive akan diisi pada Batch 13.

## Catatan Batch 13 Fix

Status: Executed - Complete Drive Certificate Inventory selesai.

Perubahan Batch 13 Fix:
- Melakukan audit mendalam terhadap folder Google Drive **02–07** (folder 08 tidak ditemukan).
- Mengintegrasikan **20 item** sertifikat/kredensial asli ke dalam `credentialsData.js`.
- Menerapkan sistem klasifikasi item:
  - `featured: true`: Untuk sertifikat utama (BNSP, BBPVP, RevoU, OJT).
  - `status: "active"`: Item valid dan utama.
  - `status: "supporting"`: Dokumen pendukung atau verifikasi tambahan.
  - `status: "duplicate-review"`: Item yang muncul di lebih dari satu folder Drive untuk ditinjau lebih lanjut.
- Memperbarui komponen `CredentialCard` untuk menampilkan lencana status (**STAR / SUPPORTING / REVIEW**) secara visual.
- Memperbarui halaman `/credentials` agar mengurutkan item **Featured** di posisi teratas.
- Menambahkan kategori filter yang lebih komprehensif: BNSP, IT & Digital, Teknik & Manufaktur, Konstruksi, Pengembangan Diri, Magang & Partisipasi, Dokumen Pendukung.
- Seluruh 20 item telah terhubung dengan `viewUrl` dan `previewUrl` Google Drive yang valid.

## Catatan Batch 14

Status: Executed - Project Category Tabs + Project Data Model selesai.

Perubahan Batch 14:
- Menambahkan sistem **Tab Kategori** pada halaman Proyek untuk mendukung klasifikasi lintas bidang:
  - IT & Web
  - Manufaktur & Teknik
  - Model Mesin 3D
  - Model Bangunan & RAB
- Menormalisasi **Data Model Proyek** di frontend dengan field baru: `category`, `links` object (github, demo, drive, model, rab), dan `featured`.
- Memperbarui `projectsFallback.js` dengan contoh proyek di setiap kategori baru untuk validasi UI.
- Mengimplementasikan logika filter kategori di `Projects.jsx` dengan dukungan *fallback* otomatis ke "IT & Web" untuk data lama.
- Memperbarui komponen `ProjectCard` agar dapat merender lencana kategori dan menangani struktur link yang baru.
- Menambahkan styling responsif untuk tab filter kategori di `projects.css`.

## Catatan Batch 15

Status: Executed - Project Detail Modal + Link Tiles selesai.

Perubahan Batch 15:
- Mengimplementasikan **Project Detail Modal** sebagai overlay interaktif untuk menampilkan rincian proyek secara komprehensif.
- Menghubungkan tombol "Lihat Detail Proyek" di `ProjectCard` untuk membuka modal dengan animasi *smooth* menggunakan Framer Motion.
- Menambahkan sistem **Link Tiles** (Ubin Tautan) yang dinamis:
  - Muncul secara otomatis berdasarkan ketersediaan aset di data proyek (`links`).
  - Mendukung ikon dan label khusus untuk: **GitHub, Demo, Figma, Google Drive, RAB, dan Model Preview**.
  - Menggunakan `target="_blank"` dan `rel="noopener noreferrer"` untuk keamanan tautan eksternal.
- Menyempurnakan tata letak modal dengan desain dua kolom pada desktop dan tumpukan responsif pada mobile.
- Menyederhanakan `ProjectCard` dengan menghapus ekspansi baris (*inline expansion*) demi pengalaman pengguna yang lebih bersih dan terpusat.

## Catatan Batch 16

Status: Executed - Project Data Population dari Google Drive Links selesai.

Perubahan Batch 16:
- Mengisi data proyek pada `projectsFallback.js` dengan konten yang realistis dan komprehensif untuk 8 proyek di 4 kategori utama.
- Melengkapi setiap item proyek dengan detail mendalam:
  - **Status**: Production, Prototype, Completed.
  - **Peran**: Lead Developer, Mechanical Designer, Estimator, dll.
  - **Naratif**: Penjelasan tantangan teknis, solusi yang diimplementasikan, dan dampak proyek.
  - **Teknologi**: Pemetaan alat spesifik (React, SolidWorks, AutoCAD, SAP2000, dll).
- Menyiapkan struktur **Link Aset Eksternal** (GitHub, Figma, Google Drive, RAB, Model Preview) pada setiap proyek.
- Memastikan konsistensi data model antara frontend dan modal detail untuk mencegah error tampilan.
- Sebagian besar link Google Drive/RAB/Model masih menggunakan *placeholder* atau link komunitas sebagai demonstrasi fungsionalitas Link Tiles (Batch 17 akan mematangkan URL asli).

## Catatan Batch 16 Fix

Status: Executed - Remove Placeholder Project Asset Links selesai.

Perubahan Batch 16 Fix:
- Menghapus seluruh URL **dummy, placeholder, dan demonstratif** (seperti *example.com*, *figma prototype id*, dll) dari data proyek di `projectsFallback.js`.
- Memastikan sistem **Link Tiles** pada modal detail proyek hanya merender tombol untuk link yang benar-benar tersedia dan asli.
- Mempertahankan link GitHub profil Syah Putra N sebagai satu-satunya link aktif yang valid untuk saat ini.
- Menyiapkan *clean state* data aset proyek untuk pengisian URL asli di masa mendatang (HOLD).

## Catatan Batch 17

Status: Executed - Project Visual Polish & UI/UX Refinement selesai.

Perubahan Batch 17:
- Melakukan **Visual Polish** mendalam pada seluruh komponen halaman Projects:
  - **Category Tabs**: Menambahkan efek transisi halus, bayangan dinamis pada *active state*, dan dukungan scroll horizontal pada tampilan mobile.
  - **Project Cards**: Memperbaiki hierarki tipografi, menambahkan gradien overlay pada gambar untuk keterbacaan badge, dan memperhalus animasi hover.
  - **Project Detail Modal**: Memperluas area informasi, menambahkan efek *glassmorphism* yang lebih kuat pada *backdrop*, dan memperbaiki tata letak dua kolom agar lebih seimbang.
  - **Link Tiles**: Memperbaiki *spacing*, menambahkan animasi mikro saat hover, dan memastikan responsivitas grid (1 kolom di mobile sangat kecil).
- Melakukan **CSS Namespace Refactoring**:
  - Mengganti class generik menjadi lebih spesifik untuk menghindari konflik gaya (misal: `.project-modal-overlay`, `.project-link-tile`).
- Meningkatkan **Responsivitas**: Menyesuaikan padding, ukuran font, dan penataan elemen agar terlihat premium di semua ukuran layar (Mobile, Tablet, Desktop).

## Catatan Batch 17 Fix

Status: Executed - Refine Project Cards, Category Spacing, and Quick Actions selesai.

Perubahan Batch 17 Fix:
- Memperbaiki **Spasi Antar Elemen**: Menambah jarak yang signifikan antara tab filter kategori dengan grid proyek untuk menghindari kesan tumpang tindih.
- Optimalisasi **Project Card**:
  - Menetapkan tinggi gambar yang konsisten untuk menjaga keselarasan baris grid.
  - Membatasi jumlah teks deskripsi agar kartu tetap rapi.
  - Memperkecil ukuran lencana (*badge*) pada gambar agar tidak mendominasi visual.
- Implementasi **Quick Action Buttons**:
  - Menambahkan baris tautan cepat di bawah tombol utama pada setiap kartu proyek.
  - Tautan (GitHub, Demo, Drive, dll) muncul secara otomatis hanya jika URL tersedia.
  - Menggunakan `e.stopPropagation()` agar klik pada tautan cepat tidak memicu pembukaan modal detail.
- Peningkatan **UX Mobile**: Memberikan ruang gerak lebih luas pada tab filter dan menyesuaikan proporsi kartu untuk layar kecil.

## Catatan Batch 18

Status: Executed - CV Variant Selector + Newspaper CV Wireframe Readiness selesai.

Perubahan Batch 18:
- Mengimplementasikan sistem **CV Variant Selector** untuk menggantikan alur unduh file tunggal:
  - Tersedia 3 varian CV: **Web Developer**, **Manufaktur & Teknik**, serta **Sipil / Estimator / RAB**.
  - Mengintegrasikan modal selector pada tombol "Unduh CV" di halaman Beranda.
- Menambahkan **Newspaper CV Wireframe**:
  - Pratinjau visual konsep CV bergaya editorial koran (headline besar, kolom berita, skill highlight).
  - Menggunakan tipografi serif dan layout satu halaman yang elegan untuk memberikan gambaran format CV masa depan.
- Menyiapkan **Data Model CV**: Struktur data varian CV yang mencakup fokus bidang, proyek unggulan, dan daftar alat/teknologi terkait.
- Penanganan **Status PDF**: Tombol unduhan PDF secara otomatis menampilkan status "Belum Tersedia" (Coming Soon) karena file asli sedang dalam tahap finalisasi tata letak, mencegah tautan rusak atau palsu.

## Catatan Batch 18 Fix

Status: Executed - Resolve CV Wireframe Preview Runtime Issue selesai.

Perubahan Batch 18 Fix:
- Memperbaiki kesalahan referensi variabel (`selectedProject` menjadi `selectedVariant`) pada komponen `CVVariantSelector.jsx` untuk mencegah *runtime error* saat membuka pratinjau wireframe.

## Catatan Batch 19

Status: Executed - Public QA & Final Content Audit selesai.

Perubahan Batch 19:
- Melakukan **Public QA & Content Audit** menyeluruh pada seluruh halaman utama (Beranda, Tentang, Proyek, Sertifikat, Kontak).
- Memastikan **Konsistensi Branding**: Memperbaiki sisa-sisa penggunaan nama panjang penuh pada bagian copyright (Kontak) menjadi "Syah Putra N" agar selaras dengan identitas visual website.
- Meningkatkan **Aksesibilitas (A11y)**: Menambahkan atribut `aria-label` pada tombol-tombol interaktif (seperti tombol tutup modal CV) untuk pengalaman pengguna yang lebih inklusif.
- Validasi **CTA & Alur Navigasi**: Mengonfirmasi bahwa seluruh tombol fungsional (Unduh CV, Detail Proyek, Drive Preview) bekerja dengan stabil tanpa adanya tautan palsu atau data dummy yang tersisa.
- Audit **Data Sensitif**: Memastikan tidak ada alamat pribadi, nomor telepon privat yang tidak terproteksi, atau dokumen internal yang terekspos di dalam repositori.

## Catatan Batch 20

Status: Executed - Final Documentation & Production Readiness Checklist selesai.

Perubahan Batch 20:
- Melakukan pemutakhiran menyeluruh pada **README.md** untuk mencerminkan branding SPN dan seluruh fitur yang telah dibangun hingga Batch 20.
- Menyusun **Production Readiness Checklist** (dalam `docs/production-checklist.md`) untuk memetakan status setiap fitur publik.
- Mengidentifikasi secara formal butir-butir **HOLD** (seperti PDF CV asli, Admin Auth, dan Deployment) untuk referensi pengembangan fase berikutnya.
- Memastikan riwayat Batch 14-20 tercatat dengan rapi sebagai basis audit pengembangan.
- Verifikasi akhir melalui `npm run build` untuk memastikan integritas kode tetap terjaga setelah seluruh pembersihan data.

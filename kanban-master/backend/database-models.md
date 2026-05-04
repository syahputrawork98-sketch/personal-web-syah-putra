# Database Models

Berikut adalah model data utama yang terdefinisi dalam `schema.prisma`:

- **Admin/User**: Data user untuk akses login dashboard admin.
- **Project**: Data proyek portofolio (termasuk *case study*).
- **SiteSetting**: Model *key-value store* menggunakan JSON untuk pengaturan hero, profile, dan contact.
- **Education**: Riwayat pendidikan formal.
- **Experience**: Riwayat pengalaman kerja profesional.
- **Certification**: Data sertifikat dan lisensi.
- **Skill**: Daftar keahlian teknis dan *soft skills*.

*Catatan: Struktur detail setiap model dapat dilihat langsung di file `backend/prisma/schema.prisma`.*

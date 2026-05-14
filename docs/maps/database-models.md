# Database Models

Berikut adalah model data utama yang terdefinisi dalam `schema.prisma`:

- **AdminUser**: Data user untuk akses login dashboard admin.
- **Project**: Data proyek portofolio (termasuk *case study*).
- **SiteSetting**: Model *key-value store* menggunakan JSON untuk pengaturan hero, profile, dan contact.
- **Education**: Riwayat pendidikan formal.
- **Experience**: Riwayat pengalaman kerja profesional.
- **Credential**: Data sertifikat, lisensi, dan dokumen pendukung (Portfolio/CV).
- **FeaturedCredential**: Pemetaan kredensial unggulan untuk tampilan utama.
- **Skill**: Daftar keahlian teknis dan *soft skills* (Technical/Soft/Tool).

*Catatan: Struktur detail setiap model dapat dilihat langsung di file `backend/prisma/schema.prisma`.*


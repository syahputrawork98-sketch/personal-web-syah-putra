# Database Models

Berdasarkan `schema.prisma` saat ini, berikut adalah model yang tersedia di PostgreSQL:

1. **User**
   - Autentikasi Admin Dashboard.
2. **Project**
   - Proyek portofolio (termasuk fitur *featured*, *techStack*, *images*).
3. **SiteSetting**
   - Model *key-value store* JSON untuk pengaturan dinamis (contoh: "hero", "profile", "contact").
4. **Skill**
   - Data keahlian (tipe: TECHNICAL, SOFT, dll).
5. **Experience**
   - Riwayat pengalaman kerja profesional.
6. **Certification**
   - Sertifikasi dan lisensi keahlian.
7. **Education**
   - Riwayat pendidikan formal.

# i18n Planning: Multi-language Support

Dokumen ini menjelaskan strategi implementasi dukungan multi-bahasa (Indonesia, English, Japanese) untuk **Personal Web Syah Putra Nugraha**.

## 1. Supported Languages

| Kode | Bahasa | Default | Status |
| :--- | :--- | :--- | :--- |
| `id` | Bahasa Indonesia | ✅ Ya | Utama |
| `en` | English | ❌ Tidak | Global Reach |
| `jp` | 日本語 (Japanese) | ❌ Tidak | Regional Reach |

## 2. Pendekatan Arsitektur (Key-Value Pairs)

Kita akan menggunakan struktur **JSON-based Translation** agar scalable dan mudah dikelola.

- **Struktur File**:
    - `webstrip/src/i18n/id.json` (Default)
    - `webstrip/src/i18n/en.json`
    - `webstrip/src/i18n/jp.json`

- **Contoh Konsep Isi JSON**:
    ```json
    {
      "nav": {
        "home": "Beranda",
        "projects": "Proyek",
        "about": "Tentang"
      },
      "hero": {
        "title": "Membangun Pengalaman Digital dengan Presisi.",
        "cta": "Lihat Karya Saya"
      }
    }
    ```

## 3. Mekanisme Switch Bahasa

- **Initialization**:
    1. Sistem mengecek `localStorage` untuk melihat apakah user sudah pernah memilih bahasa.
    2. Jika tidak ada, sistem akan menggunakan **Bahasa Indonesia** sebagai default.
    3. Opsional: Deteksi bahasa browser sebagai *fallback* sebelum ke default ID.
- **Switching Logic**:
    - Menggunakan **React Context API (`I18nContext`)** untuk manajemen state bahasa secara global.
    - Data terjemahan dimuat secara asinkron dari `/public/i18n/` menggunakan `fetch`.
    - Semua komponen halaman menggunakan hook `useI18n()` untuk mengakses fungsi terjemahan `t`.

## 4. UI/UX Language Switcher

- **Posisi**: Terletak di Navbar, di samping Theme Toggle.
- **Komponen**: **Custom Dropdown** atau **Icon-based Toggle**.
    - Mobile: Icon Globe dengan label bahasa yang singkat (ID | EN | JP).
    - Desktop: Nama bahasa atau kode bahasa (misal: "ID" atau "Bahasa").
- **UX Feel**: Transisi teks saat berubah harus mulus (fade effect) agar tidak mengagetkan user.

## 5. Pertimbangan Desain & Readability

- **Flexible Containers**: Mengingat teks bahasa Indonesia cenderung lebih panjang daripada English, dan Japanese menggunakan karakter yang lebih lebar (Full-width), layout akan menggunakan **Flexbox/Grid** dengan properti `min-height` atau `min-width` agar tidak pecah.
- **Typography Consistency**:
    - Untuk Latin (ID/EN), kita menggunakan `Inter`.
    - Untuk Japanese (JP), kita menggunakan `Noto Sans JP`.
    - Keduanya dipilih karena memiliki *x-height* yang mirip, sehingga hierarki visual tetap terjaga meskipun bahasa berubah.
- **Line Height**: Memberikan jarak baris yang cukup (`line-height: 1.6`) untuk mengakomodasi karakter Japanese yang lebih kompleks agar tetap nyaman dibaca.

## 6. Scalability

- Jika ingin menambah bahasa baru (misal: Spanish atau German), kita cukup menambahkan file `.json` baru dan mendaftarkannya ke dalam konfigurasi switcher. Struktur kode tidak perlu diubah secara signifikan.

# Design System: Personal Web Syah Putra Nugraha

Dokumen ini mendefinisikan identitas visual dan sistem desain untuk memastikan konsistensi antara gaya *modern developer* dan *corporate professional*.

## 1. Color Palette (Dual Theme)

Menggunakan pendekatan **Slate & Sky** untuk kesan tech yang dingin namun tetap bersih dan profesional.

### 🌑 Dark Mode (Default)
- **Primary**: `#38BDF8` (Sky 400) - Untuk link, active state, dan main branding.
- **Secondary**: `#94A3B8` (Slate 400) - Untuk deskripsi dan teks pendukung.
- **Background**: `#0F172A` (Slate 900) - Warna dasar halaman.
- **Surface / Card**: `#1E293B` (Slate 800) - Untuk komponen yang mengapung di atas background.
- **Text Primary**: `#F1F5F9` (Slate 100) - Headings dan teks utama.
- **Text Secondary**: `#94A3B8` (Slate 400) - Teks paragraf.
- **Accent**: `#818CF8` (Indigo 400) - Highlight kecil, badge, atau ikon.
- **Border**: `#334155` (Slate 700) - Garis pemisah tipis.

### ☀️ Light Mode
- **Primary**: `#0284C7` (Sky 600)
- **Secondary**: `#475569` (Slate 600)
- **Background**: `#F8FAFC` (Slate 50)
- **Surface / Card**: `#FFFFFF` (White)
- **Text Primary**: `#0F172A` (Slate 900)
- **Text Secondary**: `#475569` (Slate 600)
- **Accent**: `#4F46E5` (Indigo 600)
- **Border**: `#E2E8F0` (Slate 200)

---

## 2. Typography

Menggunakan font modern yang sangat terbaca (*highly readable*) dan memiliki kesan tech.

- **Font Pairing**:
    - **Headings**: `Outfit` atau `Inter` (Sans-serif, Bold/ExtraBold).
    - **Body**: `Inter` (Sans-serif, Regular/Medium).
    - **Japanese Text**: `Noto Sans JP` (Sans-serif) - Digunakan secara otomatis untuk karakter Jepang guna menjaga kejelasan dan estetika.
    - **Accents/Code**: `JetBrains Mono` atau `Fira Code`.

- **Hierarki Ukuran**:
    - **H1**: 3.5rem (56px) - Hero Headline
    - **H2**: 2.25rem (36px) - Section Title
    - **H3**: 1.5rem (24px) - Card Title / Sub-section
    - **Body**: 1rem (16px) - Standard Paragraph
    - **Small**: 0.875rem (14px) - Meta info / Badge

---

## 3. Spacing & UI Feel

- **Spacing System**: Skala 8px (`8px, 16px, 24px, 32px, 48px, 64px, 128px`).
- **Border Radius**: `12px` (Soft corners) untuk Card dan Button agar terlihat *friendly* namun tetap *structured*.
- **Shadows**:
    - Subtle: `0 4px 6px -1px rgb(0 0 0 / 0.1)`
    - Elevated: `0 20px 25px -5px rgb(0 0 0 / 0.1)`
- **UI Style**:
    - Clean lines (1px borders).
    - Subtle gradients (Sky to Indigo).
    - Glassmorphism (efek blur pada Navbar saat scroll).

---

## 5. Layout & Page Structure

Website menggunakan arsitektur **Multi-page Routing** untuk memisahkan konten secara logis.

1.  **Global Elements**:
    - **Navbar**: Sticky, logo, navigasi utama, **Language Switcher**, dan **Theme Toggle**.
    - **Footer**: Copyright, link sosial, dan navigasi cepat.
2.  **Pages**:
    - **Home**: Hero section, ringkasan profil, dan highlight skill utama.
    - **About**: Narasi karier mendalam, Soft Skills, Pendidikan, dan Sertifikasi.
    - **Experience**: Riwayat kerja mendetail dengan bullet points tanggung jawab.
    - **Projects**: Grid showcase proyek dengan deskripsi teknologi dan **Impact**.
    - **Contact**: Hub informasi kontak, GitHub, dan Portfolio.

---

## 6. Component Planning

- **Button**:
    - *Primary*: Solid color (Sky 600/400), White text, hover effect (slightly brighter).
    - *Secondary*: Outline style, subtle border, hover background.
- **Card (Project)**:
    - Image di atas, Title, Deskripsi singkat, Tag teknologi (badge), link "View Project".
- **Section Container**: Max-width `1280px` dengan padding horizontal `24px` (mobile) hingga `64px` (desktop).

---

## 7. Responsiveness (Mobile First)

- **Breakpoints**:
    - **Mobile**: `< 640px` (Single column, larger touch targets).
    - **Tablet**: `640px - 1024px` (2 columns for cards, sidebar/hamburger menu).
    - **Desktop**: `> 1024px` (Full grid, horizontal nav).
- **Adaptive Layout**: Ukuran font akan mengecil secara proporsional di layar kecil menggunakan unit `rem` atau `clamp()`.

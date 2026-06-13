# Frontend Public/Admin Audit

## Metadata
- Feature Batch: Batch F14 — Repository Normalization and Documentation Sync
- Execution Batch: Batch F14C — Frontend Public/Admin Audit
- Status: Completed
- Scope: Frontend audit only, no code changes, no cleanup
- Last updated: 2026-06-13

## Routing Map
Daftar rute frontend yang dikonfigurasi di dalam [App.jsx](file:///i:/Workspace/Workspace-Syahputrawork/PWSP-Personal-Web-Syah-Putra/client/src/App.jsx):

| Route | Page Component | Layout | Status | Evidence | Notes |
|---|---|---|---|---|---|
| `/` | `Home` | `MainLayout` | Active | App.jsx line 44 | Halaman beranda utama |
| `/about` | `About` | `MainLayout` | Active | App.jsx line 45 | Halaman detail profil, pendidikan & keahlian |
| `/projects` | `Projects` | `MainLayout` | Active | App.jsx line 46 | Portfolio proyek publik dengan filter kategori |
| `/learn` | `Learn` | `MainLayout` | Active | App.jsx line 47 | Learning library publik dengan fallback data |
| `/experience` | `Experience` | `MainLayout` | Active | App.jsx line 48 | Riwayat karier / resume publik |
| `/contact` | `Contact` | `MainLayout` | Active | App.jsx line 49 | Form kontak & media sosial publik |
| `/credentials` | `Credentials` | `MainLayout` | Active | App.jsx line 50 | Daftar sertifikasi publik dengan Drive preview |
| `/admin/login` | `AdminLogin` | None | Active | App.jsx line 53 | Halaman masuk CMS Admin |
| `/admin` | `AdminDashboard` | `AdminLayout` (Protected) | Active | App.jsx line 64 | Halaman utama dashboard admin |
| `/admin/projects` | `AdminProjects` | `AdminLayout` (Protected) | Active | App.jsx line 65 | Panel manajemen proyek portfolio |
| `/admin/projects/new` | `AdminProjectCreate` | `AdminLayout` (Protected) | Active | App.jsx line 66 | Form tambah proyek portfolio baru |
| `/admin/projects/:id/edit` | `AdminProjectEdit` | `AdminLayout` (Protected) | Active | App.jsx line 67 | Form edit proyek portfolio |
| `/admin/account` | `AdminAccount` | `AdminLayout` (Protected) | Active | App.jsx line 68 | Pengaturan password & email admin |
| `/admin/contact` | `AdminContact` | `AdminLayout` (Protected) | Active | App.jsx line 69 | Pengaturan data kontak CMS |
| `/admin/settings/hero` | `AdminHeroSettings` | `AdminLayout` (Protected) | Active | App.jsx line 70 | Pengaturan teks hero homepage |
| `/admin/settings/profile` | `AdminProfileSettings` | `AdminLayout` (Protected) | Active | App.jsx line 71 | Pengaturan teks profil & foto CMS |
| `/admin/skills` | `AdminSkills` | `AdminLayout` (Protected) | Active | App.jsx line 72 | Panel manajemen daftar keahlian |
| `/admin/skills/new` | `AdminSkillCreate` | `AdminLayout` (Protected) | Active | App.jsx line 73 | Form tambah keahlian baru |
| `/admin/skills/:id/edit` | `AdminSkillEdit` | `AdminLayout` (Protected) | Active | App.jsx line 74 | Form edit keahlian |
| `/admin/experience` | `AdminExperiences` | `AdminLayout` (Protected) | Active | App.jsx line 75 | Panel manajemen pengalaman kerja |
| `/admin/experience/new` | `AdminExperienceCreate` | `AdminLayout` (Protected) | Active | App.jsx line 76 | Form tambah pengalaman baru |
| `/admin/experience/:id/edit` | `AdminExperienceEdit` | `AdminLayout` (Protected) | Active | App.jsx line 77 | Form edit pengalaman |
| `/admin/certifications` | `AdminCertifications` | `AdminLayout` (Protected) | Active | App.jsx line 78 | Panel manajemen sertifikasi |
| `/admin/certifications/new` | `AdminCertificationCreate` | `AdminLayout` (Protected) | Active | App.jsx line 79 | Form tambah sertifikasi baru |
| `/admin/certifications/:id/edit` | `AdminCertificationEdit` | `AdminLayout` (Protected) | Active | App.jsx line 80 | Form edit sertifikasi |
| `/admin/education` | `AdminEducation` | `AdminLayout` (Protected) | Active | App.jsx line 81 | Panel manajemen pendidikan akademik |
| `/admin/cv-builder` | `AdminCvBuilder` | `AdminLayout` (Protected) | Active | App.jsx line 82 | Panel pembangun tata letak CV PDF |
| `/admin/learning` | `AdminLearning` | `AdminLayout` (Protected) | Active | App.jsx line 83 | Panel manajemen data Learning Library |
| `/admin/learning/new` | `AdminLearningCreate` | `AdminLayout` (Protected) | Active | App.jsx line 84 | Form tambah item learning library baru |
| `/admin/learning/:id/edit` | `AdminLearningEdit` | `AdminLayout` (Protected) | Active | App.jsx line 85 | Form edit item learning library |

*Catatan: Rute tambah/create pada dashboard admin diimplementasikan menggunakan path `new` (seperti `/admin/projects/new`), bukan `create`. Namun fungsinya setara dengan spesifikasi admin panel.*

## Public Pages Audit
| Page File | Route | Imported Components | Data/API Used | Status | Evidence | Next Action |
|---|---|---|---|---|---|---|
| `Home.jsx` | `/` | `ServiceCard`, `TypeAnimation` | `getPublicSkills`, `getPublicHero` | Active | App.jsx line 44 | Pertahankan |
| `About.jsx` | `/about` | `CredentialsSection`, `TechSkillGroup`, `ExperienceReframing`, `EducationCard` | `getPublicSkills`, `getPublicContact`, `getPublicProfile`, `getPublicEducation` | Active | App.jsx line 45 | Pertahankan |
| `Projects.jsx` | `/projects` | `ProjectCard`, `ProjectDetailModal`, `EmptyState` | `getPublicProjects` | Active | App.jsx line 46 | Pertahankan |
| `Learn.jsx` | `/learn` | `EmptyState` | `getPublicLearningItems` | Active | App.jsx line 47 | Pertahankan |
| `Experience.jsx` | `/experience` | `ExperienceCard`, `EmptyState` | `getPublicExperiences` | Active | App.jsx line 48 | Pertahankan |
| `Credentials.jsx` | `/credentials` | `CredentialCard`, `CredentialModal`, `EmptyState` | `getPublicCertifications` | Active | App.jsx line 50 | Pertahankan |
| `Contact.jsx` | `/contact` | None | `getPublicContact` | Active | App.jsx line 49 | Pertahankan |

## Admin Pages Audit
| Admin Page File | Route | Imported Components | API/Auth Used | Status | Evidence | Next Action |
|---|---|---|---|---|---|---|
| `AdminLogin.jsx` | `/admin/login` | None | `loginAdmin` | Active | App.jsx line 53 | Pertahankan |
| `AdminDashboard.jsx` | `/admin` | None | None (General metrics read from API) | Active | App.jsx line 64 | Pertahankan |
| `AdminProjects.jsx` | `/admin/projects` | `ConfirmModal` | `getAdminProjects`, `deleteProject` | Active | App.jsx line 65 | Pertahankan |
| `AdminProjectCreate.jsx` | `/admin/projects/new` | `ProjectForm` | `createProject` | Active | App.jsx line 66 | Pertahankan |
| `AdminProjectEdit.jsx` | `/admin/projects/:id/edit` | `ProjectForm` | `getAdminProject`, `updateProject` | Active | App.jsx line 67 | Pertahankan |
| `AdminAccount.jsx` | `/admin/account` | None | `getAdminAccount`, `updateAdminEmail`, `updateAdminPassword` | Active | App.jsx line 68 | Pertahankan |
| `AdminContact.jsx` | `/admin/contact` | None | `getAdminContact`, `updateAdminContact` | Active | App.jsx line 69 | Pertahankan |
| `AdminHeroSettings.jsx` | `/admin/settings/hero` | None | `getAdminHero`, `updateAdminHero` | Active | App.jsx line 70 | Pertahankan |
| `AdminProfileSettings.jsx` | `/admin/settings/profile` | None | `getAdminProfile`, `updateAdminProfile` | Active | App.jsx line 71 | Pertahankan |
| `AdminSkills.jsx` | `/admin/skills` | `ConfirmModal` | `getAdminSkills`, `deleteSkill` | Active | App.jsx line 72 | Pertahankan |
| `AdminSkillCreate.jsx` | `/admin/skills/new` | `SkillForm` | `createSkill` | Active | App.jsx line 73 | Pertahankan |
| `AdminSkillEdit.jsx` | `/admin/skills/:id/edit` | `SkillForm` | `getAdminSkill`, `updateSkill` | Active | App.jsx line 74 | Pertahankan |
| `AdminExperiences.jsx` | `/admin/experience` | `ConfirmModal` | `getAdminExperiences`, `deleteExperience` | Active | App.jsx line 75 | Pertahankan |
| `AdminExperienceCreate.jsx` | `/admin/experience/new` | `ExperienceForm` | `createExperience` | Active | App.jsx line 76 | Pertahankan |
| `AdminExperienceEdit.jsx` | `/admin/experience/:id/edit` | `ExperienceForm` | `getAdminExperience`, `updateExperience` | Active | App.jsx line 77 | Pertahankan |
| `AdminCertifications.jsx` | `/admin/certifications` | `ConfirmModal` | `getAdminCertifications`, `deleteCertification` | Active | App.jsx line 78 | Pertahankan |
| `AdminCertificationCreate.jsx` | `/admin/certifications/new` | `CertificationForm` | `createCertification` | Active | App.jsx line 79 | Pertahankan |
| `AdminCertificationEdit.jsx` | `/admin/certifications/:id/edit` | `CertificationForm` | `getAdminCertification`, `updateCertification` | Active | App.jsx line 80 | Pertahankan |
| `AdminEducation.jsx` | `/admin/education` | `ConfirmModal` (Implicit) | `getAdminEducation`, `createAdminEducation`, `updateAdminEducation`, `deleteAdminEducation` | Active | App.jsx line 81 | Pertahankan |
| `AdminCvBuilder.jsx` | `/admin/cv-builder` | `NewspaperCVWireframe` | `getCvBuilderConfig`, `updateCvBuilderConfig`, `getAdminProfile`, `getAdminEducation`, `getAdminExperiences`, `getAdminCertifications`, `getAdminProjects` | Active | App.jsx line 82 | Pertahankan |
| `AdminLearning.jsx` | `/admin/learning` | `ConfirmModal` | `getAdminLearningItems`, `deleteLearningItem` | Active | App.jsx line 83 | Pertahankan |
| `AdminLearningCreate.jsx` | `/admin/learning/new` | None (Direct input fields) | `createLearningItem` | Active | App.jsx line 84 | Pertahankan |
| `AdminLearningEdit.jsx` | `/admin/learning/:id/edit` | None (Direct input fields) | `getAdminLearningItem`, `updateLearningItem` | Active | App.jsx line 85 | Pertahankan |

## Components Audit

### Shared Components
| Component File | Imported By | Status | Evidence | Next Action |
|---|---|---|---|---|
| `BrandLogo.jsx` | `Navbar.jsx` | Active | Import BrandLogo inside Navbar.jsx | Pertahankan |
| `BrandLogo.css` | `BrandLogo.jsx` | Active | CSS untuk SPN monogram logo | Pertahankan |
| `CVVariantSelector.jsx` | `About.jsx` | Active | VariantSelector inside About.jsx | Pertahankan |
| `EmptyState.jsx` | `Projects.jsx`, `Learn.jsx`, `Experience.jsx`, `Credentials.jsx`, `About.jsx`, `Home.jsx` | Active | Fallback UI display jika data kosong | Pertahankan |
| `Footer.jsx` | `MainLayout.jsx` | Active | Global bottom footer | Pertahankan |
| `Navbar.jsx` | `MainLayout.jsx` | Active | Global public top navigation bar | Pertahankan |
| `NewspaperCVWireframe.jsx` | `About.jsx`, `AdminCvBuilder.jsx` | Active | Visual preview CV variants wireframe | Pertahankan |
| `ProjectCard.jsx` | `Projects.jsx` | Active | Card teaser item portfolio | Pertahankan |
| `ProjectDetailModal.jsx` | `Projects.jsx` | Active | Popup modal detail komparatif proyek | Pertahankan |

### About Components
| Component File | Imported By | Status | Evidence | Next Action |
|---|---|---|---|---|
| `about/CertificationModal.jsx` | `About.jsx` (via `CredentialsSection`/direct) | Active | Di-import untuk pop-up sertifikat | Pertahankan |
| `about/CredentialsSection.jsx` | `About.jsx` | Active | Credentials panel at bottom of About page | Pertahankan |
| `about/EducationCard.jsx` | `About.jsx` | Active | Card item riwayat akademik | Pertahankan |
| `about/ExperienceReframing.jsx` | `About.jsx` | Active | Bagian reframe karier / deskripsi About | Pertahankan |
| `about/TechSkillGroup.jsx` | `About.jsx` | Active | Group filter untuk keahlian utama | Pertahankan |

### Admin Components
| Component File | Imported By | Status | Evidence | Next Action |
|---|---|---|---|---|
| `admin/CertificationForm.jsx` | `AdminCertificationCreate.jsx`, `AdminCertificationEdit.jsx` | Active | CRUD sertifikat admin forms | Pertahankan |
| `admin/ConfirmModal.jsx` | `AdminProjects.jsx`, `AdminSkills.jsx`, `AdminExperiences.jsx`, `AdminCertifications.jsx`, `AdminLearning.jsx` | Active | Generic alert warning model | Pertahankan |
| `admin/ExperienceForm.jsx` | `AdminExperienceCreate.jsx`, `AdminExperienceEdit.jsx` | Active | Form input detail karier admin | Pertahankan |
| `admin/ProjectForm.jsx` | `AdminProjectCreate.jsx`, `AdminProjectEdit.jsx` | Active | Form input detail proyek portfolio | Pertahankan |
| `admin/ProtectedRoute.jsx` | `App.jsx` | Active | JWT guard check router admin | Pertahankan |
| `admin/SkillForm.jsx` | `AdminSkillCreate.jsx`, `AdminSkillEdit.jsx` | Active | Form input detail skill admin | Pertahankan |

### Credentials Components
| Component File | Imported By | Status | Evidence | Next Action |
|---|---|---|---|---|
| `credentials/CredentialCard.jsx` | `Credentials.jsx` | Active | Tampilan card sertifikasi publik | Pertahankan |
| `credentials/CredentialModal.jsx` | `Credentials.jsx` | Active | Modal Google Drive preview | Pertahankan |

### Experience Components
| Component File | Imported By | Status | Evidence | Next Action |
|---|---|---|---|---|
| `experience/ExperienceCard.jsx` | `Experience.jsx` | Active | Tampilan timeline karier publik | Pertahankan |

### Home Components
| Component File | Imported By | Status | Evidence | Next Action |
|---|---|---|---|---|
| `home/ServiceCard.jsx` | `Home.jsx` | Active | Card item keahlian homepage | Pertahankan |

## Data / Lib / Utils / Hooks / Context Audit
| File | Used By | Status | Evidence | Next Action |
|---|---|---|---|---|
| `client/src/data/aboutData.js` | `TechSkillGroup.jsx`, `ExperienceReframing.jsx` | Active | Ekspor data statis kategori skill | Pertahankan |
| `client/src/data/credentialsData.js` | `Credentials.jsx` | Active | Ekspor data filter sertifikat publik | Pertahankan |
| `client/src/data/cvVariants.js` | `CVVariantSelector.jsx`, `AdminCvBuilder.jsx` | Active | Konfigurasi CV download variants | Pertahankan |
| `client/src/data/homeData.js` | `Home.jsx` | Active | Data statis layanan / core stack | Pertahankan |
| `client/src/lib/api.js` | Digunakan hampir di seluruh page & admin pages | Active | Wrapper fetches API backend | Pertahankan |
| `client/src/lib/auth.js` | `api.js`, `AdminAuthContext.jsx`, `AdminLogin.jsx` | Active | Getter/setter localStorage token | Pertahankan |
| `client/src/lib/dateUtils.js` | `ExperienceCard.jsx`, `EducationCard.jsx` | Active | Utilitas pemformatan range tanggal | Pertahankan |
| `client/src/hooks/useFetch.js` | `Projects.jsx`, `Credentials.jsx`, `Experience.jsx` | Active | Custom fetch loader hook | Pertahankan |
| `client/src/utils/skillIcons.jsx` | `TechSkillGroup.jsx` | Active | Ikon tech stack list map | Pertahankan |
| `client/src/context/admin/AdminAuthContext.jsx` | `App.jsx`, `AdminLayout.jsx`, `ProtectedRoute.jsx` | Active | State provider token admin | Pertahankan |

## Styles Audit
| Style File | Imported By | Status | Evidence | Next Action |
|---|---|---|---|---|
| `client/src/styles/style.css` | `main.jsx` | Active | Main styling global design system | Pertahankan |
| `client/src/styles/about.css` | `About.jsx` | Active | Desain grid layout About page | Pertahankan |
| `client/src/styles/contact.css` | `Contact.jsx` | Active | Desain forms layout kontak | Pertahankan |
| `client/src/styles/credentials.css` | `Credentials.jsx` | Active | Desain grid layout sertifikat | Pertahankan |
| `client/src/styles/cv-print.css` | `AdminCvBuilder.jsx` | Active | Desain media print PDF CV builder | Pertahankan |
| `client/src/styles/experience.css` | `Experience.jsx` | Active | Desain timeline pengalaman kerja | Pertahankan |
| `client/src/styles/home.css` | `Home.jsx` | Active | Desain hero dan service list | Pertahankan |
| `client/src/styles/navbar.css` | `Navbar.jsx` | Active | Desain top bar mobile/desktop menu | Pertahankan |
| `client/src/styles/projects.css` | `Projects.jsx` | Active | Desain grid card portfolio publik | Pertahankan |

## Public Assets Audit
| Asset Path | Referenced By | Status | Evidence | Next Action |
|---|---|---|---|---|
| `/favicon.svg` | `client/index.html` | Active | Pemuatan favicon web tab | Pertahankan |
| `/icons.svg` | None | Unreferenced Placeholder | Tidak dipanggil di `.jsx` atau `.css` | Tandai verifikasi sisa legacy |
| `/cv/cv-syah-putra-nugraha-web-developer.pdf` | `Home.jsx`, `About.jsx` | Referenced but Missing | Tautan file CV statis unduhan publik (saat ini *file not found* di disk) | Pengguna wajib mengunggah file PDF final dengan nama yang persis |
| `client/src/assets/hero.png` | None | Confirmed Unused Candidate | Tidak di-import/direferensikan | Tandai verifikasi sisa legacy |
| `client/src/assets/javascript.svg` | None | Confirmed Unused Candidate | Tidak di-import/direferensikan | Tandai verifikasi sisa legacy |
| `client/src/assets/vite.svg` | None | Confirmed Unused Candidate | Tidak di-import/direferensikan | Tandai verifikasi sisa legacy |

## Frontend Cleanup Candidates Verification
*(Penting: Tidak ada tindakan penghapusan file yang dijalankan pada batch audit ini).*

| Path | Previous Status in Inventory | F14C Verification Status | Evidence | Required Manual Check Before Cleanup |
|---|---|---|---|---|
| `client/build_log.txt` | Delete candidate after validation | Confirmed unused candidate | Log sisa build lokal terdahulu. Tidak dipanggil di codebase. | Aman dihapus setelah siklus QA mandiri selesai. |
| `client/src/fallback/certificationsFallback.js` | Delete candidate after validation | Confirmed unused candidate | Kode internal pages menggunakan inline fallbacks atau data CMS langsung. File ini tidak di-import. | Aman dihapus setelah manual runtime check. |
| `client/src/fallback/contactFallback.js` | Delete candidate after validation | Confirmed unused candidate | File fallback tidak di-import. Halaman kontak menggunakan internal payload. | Aman dihapus. |
| `client/src/fallback/educationFallback.js` | Delete candidate after validation | Confirmed unused candidate | File fallback tidak di-import. | Aman dihapus. |
| `client/src/fallback/experienceFallback.js` | Delete candidate after validation | Confirmed unused candidate | File fallback tidak di-import. | Aman dihapus. |
| `client/src/fallback/heroFallback.js` | Delete candidate after validation | Confirmed unused candidate | File fallback tidak di-import. | Aman dihapus. |
| `client/src/fallback/profileFallback.js` | Delete candidate after validation | Confirmed unused candidate | File fallback tidak di-import. | Aman dihapus. |
| `client/src/fallback/projectsFallback.js` | Delete candidate after validation | Confirmed unused candidate | File fallback tidak di-import. | Aman dihapus. |
| `client/src/fallback/skillsFallback.js` | Delete candidate after validation | Confirmed unused candidate | File fallback tidak di-import. | Aman dihapus. |
| `client/src/assets/hero.png` | Needs verification | Confirmed unused candidate | Tidak ada file `.jsx` / `.css` yang memuat import aset ini. | Aman dihapus. |
| `client/src/assets/javascript.svg` | Needs verification | Confirmed unused candidate | Ikon dimuat lewat mapping di `skillIcons.jsx` menggunakan inline SVG, bukan import file lokal ini. | Aman dihapus. |
| `client/src/assets/vite.svg` | Needs verification | Confirmed unused candidate | Aset logo bawaan Vite tidak digunakan. | Aman dihapus. |

## Runtime Validation Checklist
Instruksi pengujian manual bagi pengguna di Anti-Gravity IDE untuk memverifikasi fungsionalitas visual:
1. **Jalankan Frontend Dev Server**:
   Masuk ke folder `client/` dan pastikan server Vite hidup (`npm run dev`).
2. **Uji Rute Publik**:
   Buka browser pada:
   - `http://localhost:5173/` (Homepage)
   - `http://localhost:5173/about` (About page & resume)
   - `http://localhost:5173/projects` (Portfolio filter check)
   - `http://localhost:5173/learn` (Learning library)
   - `http://localhost:5173/experience` (Timeline check)
   - `http://localhost:5173/credentials` (Google Drive thumbnail modal check)
   - `http://localhost:5173/contact` (WhatsApp details & contact info check)
3. **Uji Halaman Masuk Admin**:
   Buka `http://localhost:5173/admin/login` dan pastikan form login ter-render dengan rapi.
4. **Uji Proteksi Rute Admin**:
   Buka `http://localhost:5173/admin` secara langsung tanpa login, pastikan otomatis ter-redireksi kembali ke `/admin/login`.
5. **Cek DevTools Browser (Console & Network)**:
   - Pastikan tidak ada pesan kesalahan (Error) merah pada Console saat menjelajahi rute publik.
   - Periksa tab Network untuk memastikan asset `favicon.svg` berhasil dimuat (Status 200).
6. **Validasi CV Link**:
   - Klik tombol unduh CV pada Homepage atau About. Pastikan menunjuk ke `/cv/cv-syah-putra-nugraha-web-developer.pdf`.
   - Unggah berkas PDF asli dengan nama yang sama ke folder `client/public/cv/` untuk mengaktifkan fungsi unduhan statis.

## Recommended Next Batch
- **Batch F14D — Backend/API Audit**: Audit controller, routing middleware, penanganan exception, CORS, dan variabel lingkungan backend.
- **Batch F14E — Database/Prisma Audit**: Audit Prisma models, model indexes, data seeds, dan policies migrasi skema database.
- **Batch F14F — Cleanup Candidates Validation**: Eksekusi pembersihan file-file tak terpakai (*confirmed unused*) yang teridentifikasi di atas secara aman.

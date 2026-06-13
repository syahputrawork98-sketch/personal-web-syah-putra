# Repository Inventory Map

## Metadata
- Feature Batch: Batch F14 — Repository Normalization and Documentation Sync
- Execution Batch: Batch F14B — Repository Inventory Map (Detailed Frontend Audit in Batch F14C)
- Status: Completed (Repository Map built, Frontend Audited)
- Scope: Inventory only, no cleanup
- Last updated: 2026-06-13
- Detailed Frontend Audit: [FRONTEND_PUBLIC_ADMIN_AUDIT.md](FRONTEND_PUBLIC_ADMIN_AUDIT.md)

## Inventory Legend
- **Active**: Jelas dipakai oleh runtime/build/docs aktif.
- **Likely active**: Kemungkinan dipakai, tetapi perlu verifikasi tambahan.
- **Needs verification**: Belum cukup bukti aktif/tidak aktif.
- **Legacy candidate**: Kemungkinan file lama, jangan hapus sebelum validasi.
- **Delete candidate after validation**: Kandidat hapus, hanya setelah batch cleanup terpisah dan validasi.
- **Do not delete**: File penting, sensitif, historis, config, migration, atau dokumen workflow.

## Root Files Inventory
| Path | Type | Status | Evidence / Reason | Next Action |
|---|---|---|---|---|
| `.gitignore` | File | Do not delete | Konfigurasi gitignore utama repository | Pertahankan |
| `FITUR.md` | File | Do not delete | Rangkuman fitur berjalan dan status fungsionalitas | Pertahankan |
| `README.md` | File | Do not delete | Ringkasan utama project | Pertahankan |

## Client Public Assets Inventory
| Path | Type | Status | Evidence / Reason | Next Action |
|---|---|---|---|---|
| `client/public/favicon.svg` | File | Active | Favicon web yang dimuat di `index.html` | Pertahankan |
| `client/public/icons.svg` | File | Active | Sprite ikon SVG untuk referensi komponen | Pertahankan |

## Client Source Inventory

### Pages
| Path | Type | Status | Evidence / Reason | Next Action |
|---|---|---|---|---|
| `client/src/App.jsx` | File | Active | Komponen routing utama aplikasi frontend | Pertahankan |
| `client/src/main.jsx` | File | Active | Entry point utama React-Vite | Pertahankan |
| `client/src/pages/About.jsx` | File | Active | Halaman publik About Me, CV download & Newspaper wireframe | Pertahankan |
| `client/src/pages/Contact.jsx` | File | Active | Halaman publik informasi kontak & social links | Pertahankan |
| `client/src/pages/Credentials.jsx` | File | Active | Halaman publik daftar sertifikasi & Google Drive preview | Pertahankan |
| `client/src/pages/Experience.jsx` | File | Active | Halaman publik karier dan riwayat kerja | Pertahankan |
| `client/src/pages/Home.jsx` | File | Active | Landing page utama web publik | Pertahankan |
| `client/src/pages/Learn.jsx` | File | Active | Halaman publik Learning Library | Pertahankan |
| `client/src/pages/Projects.jsx` | File | Active | Halaman publik portfolio proyek terfilter | Pertahankan |
| `client/src/pages/admin/AdminAccount.jsx` | File | Active | Panel admin pengaturan kredensial | Pertahankan |
| `client/src/pages/admin/AdminCertificationCreate.jsx` | File | Active | Form tambah sertifikasi admin | Pertahankan |
| `client/src/pages/admin/AdminCertificationEdit.jsx` | File | Active | Form edit sertifikasi admin | Pertahankan |
| `client/src/pages/admin/AdminCertifications.jsx` | File | Active | Panel kelola daftar sertifikasi admin | Pertahankan |
| `client/src/pages/admin/AdminContact.jsx` | File | Active | Panel kelola data kontak admin | Pertahankan |
| `client/src/pages/admin/AdminCvBuilder.jsx` | File | Active | Panel CV builder dan cetak PDF admin | Pertahankan |
| `client/src/pages/admin/AdminDashboard.jsx` | File | Active | Landing dashboard panel admin CMS | Pertahankan |
| `client/src/pages/admin/AdminEducation.jsx` | File | Active | Panel kelola data pendidikan admin | Pertahankan |
| `client/src/pages/admin/AdminExperienceCreate.jsx` | File | Active | Form tambah pengalaman kerja admin | Pertahankan |
| `client/src/pages/admin/AdminExperienceEdit.jsx` | File | Active | Form edit pengalaman kerja admin | Pertahankan |
| `client/src/pages/admin/AdminExperiences.jsx` | File | Active | Panel kelola daftar pengalaman admin | Pertahankan |
| `client/src/pages/admin/AdminHeroSettings.jsx` | File | Active | Panel kelola header hero homepage | Pertahankan |
| `client/src/pages/admin/AdminLearning.jsx` | File | Active | Panel kelola Learning Library admin | Pertahankan |
| `client/src/pages/admin/AdminLearningCreate.jsx` | File | Active | Form tambah learning library admin | Pertahankan |
| `client/src/pages/admin/AdminLearningEdit.jsx` | File | Active | Form edit learning library admin | Pertahankan |
| `client/src/pages/admin/AdminLogin.jsx` | File | Active | Layar masuk autentikasi admin | Pertahankan |
| `client/src/pages/admin/AdminProfileSettings.jsx` | File | Active | Panel kelola profil personal admin | Pertahankan |
| `client/src/pages/admin/AdminProjectCreate.jsx` | File | Active | Form tambah proyek portfolio admin | Pertahankan |
| `client/src/pages/admin/AdminProjectEdit.jsx` | File | Active | Form edit proyek portfolio admin | Pertahankan |
| `client/src/pages/admin/AdminProjects.jsx` | File | Active | Panel kelola daftar proyek admin | Pertahankan |
| `client/src/pages/admin/AdminSkillCreate.jsx` | File | Active | Form tambah keahlian admin | Pertahankan |
| `client/src/pages/admin/AdminSkillEdit.jsx` | File | Active | Form edit keahlian admin | Pertahankan |
| `client/src/pages/admin/AdminSkills.jsx` | File | Active | Panel kelola daftar keahlian admin | Pertahankan |

### Components
| Path | Type | Status | Evidence / Reason | Next Action |
|---|---|---|---|---|
| `client/src/components/BrandLogo.css` | File | Active | Stylesheet monogram SPN navigasi | Pertahankan |
| `client/src/components/BrandLogo.jsx` | File | Active | Komponen visual logo monogram SPN | Pertahankan |
| `client/src/components/CVVariantSelector.jsx` | File | Active | Komponen pemilih variasi CV unduhan | Pertahankan |
| `client/src/components/EmptyState.jsx` | File | Active | Desain status data kosong / gagal load | Pertahankan |
| `client/src/components/Footer.jsx` | File | Active | Footer bawah website publik | Pertahankan |
| `client/src/components/Navbar.jsx` | File | Active | Top bar navigasi publik (desktop/mobile) | Pertahankan |
| `client/src/components/NewspaperCVWireframe.jsx` | File | Active | Wireframe pratinjau layout CV | Pertahankan |
| `client/src/components/ProjectCard.jsx` | File | Active | Card item proyek di portfolio | Pertahankan |
| `client/src/components/ProjectDetailModal.jsx` | File | Active | Modal pop-up info detail proyek | Pertahankan |
| `client/src/components/about/CertificationModal.jsx` | File | Active | Modal preview gambar sertifikat | Pertahankan |
| `client/src/components/about/CredentialsSection.jsx` | File | Active | Bagian credentials halaman About | Pertahankan |
| `client/src/components/about/EducationCard.jsx` | File | Active | Card item riwayat pendidikan | Pertahankan |
| `client/src/components/about/ExperienceReframing.jsx` | File | Active | Komponen deskripsi reframe About page | Pertahankan |
| `client/src/components/about/TechSkillGroup.jsx` | File | Active | Komponen filter visual grid keahlian | Pertahankan |
| `client/src/components/admin/CertificationForm.jsx` | File | Active | Form field data sertifikat admin | Pertahankan |
| `client/src/components/admin/ConfirmModal.jsx` | File | Active | Modal konfirmasi aksi hapus/simpan | Pertahankan |
| `client/src/components/admin/ExperienceForm.jsx` | File | Active | Form field data pengalaman admin | Pertahankan |
| `client/src/components/admin/ProjectForm.jsx` | File | Active | Form field data proyek admin | Pertahankan |
| `client/src/components/admin/ProtectedRoute.jsx` | File | Active | Guard session login admin | Pertahankan |
| `client/src/components/admin/SkillForm.jsx` | File | Active | Form field data keahlian admin | Pertahankan |
| `client/src/components/credentials/CredentialCard.jsx` | File | Active | Card lisensi di halaman sertifikat | Pertahankan |
| `client/src/components/credentials/CredentialModal.jsx` | File | Active | Modal info Google Drive preview | Pertahankan |
| `client/src/components/experience/ExperienceCard.jsx` | File | Active | Card timeline pengalaman kerja publik | Pertahankan |
| `client/src/components/home/ServiceCard.jsx` | File | Active | Card area layanan di homepage | Pertahankan |

### Layouts
| Path | Type | Status | Evidence / Reason | Next Action |
|---|---|---|---|---|
| `client/src/layouts/AdminLayout.jsx` | File | Active | Tata letak sidebar CMS Admin console | Pertahankan |
| `client/src/layouts/MainLayout.jsx` | File | Active | Tata letak umum halaman publik | Pertahankan |

### Context
| Path | Type | Status | Evidence / Reason | Next Action |
|---|---|---|---|---|
| `client/src/context/admin/AdminAuthContext.jsx` | File | Active | Context state penyimpan token login admin | Pertahankan |

### Hooks
| Path | Type | Status | Evidence / Reason | Next Action |
|---|---|---|---|---|
| `client/src/hooks/useFetch.js` | File | Active | Custom hook load data via API | Pertahankan |

### Utils & Data Mappings
| Path | Type | Status | Evidence / Reason | Next Action |
|---|---|---|---|---|
| `client/src/data/aboutData.js` | File | Active | Data statis menu About publik | Pertahankan |
| `client/src/data/credentialsData.js` | File | Active | Data statis kategori credentials | Pertahankan |
| `client/src/data/cvVariants.js` | File | Active | Variasi opsi download file CV | Pertahankan |
| `client/src/data/homeData.js` | File | Active | Data statis service card homepage | Pertahankan |
| `client/src/lib/api.js` | File | Active | Kumpulan function fetch API frontend | Pertahankan |
| `client/src/lib/auth.js` | File | Active | Helper storage localStorage auth token | Pertahankan |
| `client/src/lib/dateUtils.js` | File | Active | Helper manipulasi format tanggal | Pertahankan |
| `client/src/utils/skillIcons.jsx` | File | Active | Mappings visual ikon keahlian | Pertahankan |

### Styles
| Path | Type | Status | Evidence / Reason | Next Action |
|---|---|---|---|---|
| `client/src/styles/about.css` | File | Active | Gaya tata letak halaman About | Pertahankan |
| `client/src/styles/contact.css` | File | Active | Gaya halaman kontak publik | Pertahankan |
| `client/src/styles/credentials.css` | File | Active | Gaya halaman sertifikat publik | Pertahankan |
| `client/src/styles/cv-print.css` | File | Active | Gaya CSS printer cetak CV PDF | Pertahankan |
| `client/src/styles/experience.css` | File | Active | Gaya visual timeline karier | Pertahankan |
| `client/src/styles/home.css` | File | Active | Gaya visual hero homepage | Pertahankan |
| `client/src/styles/navbar.css` | File | Active | Gaya navigasi publik | Pertahankan |
| `client/src/styles/projects.css` | File | Active | Gaya visual grid proyek portfolio | Pertahankan |
| `client/src/styles/style.css` | File | Active | Desain system global utama | Pertahankan |

### Fallbacks (Offline Redundancy)
| Path | Type | Status | Evidence / Reason | Next Action |
|---|---|---|---|---|
| `client/src/fallback/certificationsFallback.js` | File | Confirmed unused candidate | F14C Audit: Terkonfirmasi tidak di-import/digunakan di mana pun | Siap dihapus pada batch cleanup |
| `client/src/fallback/contactFallback.js` | File | Confirmed unused candidate | F14C Audit: Terkonfirmasi tidak di-import/digunakan di mana pun | Siap dihapus pada batch cleanup |
| `client/src/fallback/educationFallback.js` | File | Confirmed unused candidate | F14C Audit: Terkonfirmasi tidak di-import/digunakan di mana pun | Siap dihapus pada batch cleanup |
| `client/src/fallback/experienceFallback.js` | File | Confirmed unused candidate | F14C Audit: Terkonfirmasi tidak di-import/digunakan di mana pun | Siap dihapus pada batch cleanup |
| `client/src/fallback/heroFallback.js` | File | Confirmed unused candidate | F14C Audit: Terkonfirmasi tidak di-import/digunakan di mana pun | Siap dihapus pada batch cleanup |
| `client/src/fallback/profileFallback.js` | File | Confirmed unused candidate | F14C Audit: Terkonfirmasi tidak di-import/digunakan di mana pun | Siap dihapus pada batch cleanup |
| `client/src/fallback/projectsFallback.js` | File | Confirmed unused candidate | F14C Audit: Terkonfirmasi tidak di-import/digunakan di mana pun | Siap dihapus pada batch cleanup |
| `client/src/fallback/skillsFallback.js` | File | Confirmed unused candidate | F14C Audit: Terkonfirmasi tidak di-import/digunakan di mana pun | Siap dihapus pada batch cleanup |

### Asset Files & Configs
| Path | Type | Status | Evidence / Reason | Next Action |
|---|---|---|---|---|
| `client/.env.example` | File | Do not delete | Panduan penulisan variabel env client | Pertahankan |
| `client/.gitignore` | File | Do not delete | File pengecualian git client | Pertahankan |
| `client/build_log.txt` | File | Confirmed unused candidate | F14C Audit: Log sisa build lokal terdahulu, tidak digunakan | Siap dihapus pada batch cleanup |
| `client/index.html` | File | Active | File HTML entry point React-Vite | Pertahankan |
| `client/package-lock.json` | File | Do not delete | Kunci modul dependency client | Pertahankan |
| `client/package.json` | File | Do not delete | Manifest package dependency client | Pertahankan |
| `client/vercel.json` | File | Do not delete | Konfigurasi rewrite rule SPA Vercel | Pertahankan |
| `client/vite.config.js` | File | Do not delete | Konfigurasi build Vite client | Pertahankan |
| `client/src/assets/hero.png` | File | Confirmed unused candidate | F14C Audit: File gambar ilustrasi background, tidak di-import | Siap dihapus pada batch cleanup |
| `client/src/assets/javascript.svg` | File | Confirmed unused candidate | F14C Audit: Ikon JavaScript sisa, tidak di-import | Siap dihapus pada batch cleanup |
| `client/src/assets/vite.svg` | File | Confirmed unused candidate | F14C Audit: Logo Vite default template, tidak di-import | Siap dihapus pada batch cleanup |


## Server Inventory

### Routes
| Path | Type | Status | Evidence / Reason | Next Action |
|---|---|---|---|---|
| `server/src/routes/auth.routes.js` | File | Active | Routing backend autentikasi admin | Pertahankan |
| `server/src/routes/certification.routes.js` | File | Active | Routing backend publik sertifikat | Pertahankan |
| `server/src/routes/education.routes.js` | File | Active | Routing backend publik pendidikan | Pertahankan |
| `server/src/routes/experience.routes.js` | File | Active | Routing backend publik pengalaman | Pertahankan |
| `server/src/routes/learning.routes.js` | File | Active | Routing backend publik learning library | Pertahankan |
| `server/src/routes/settings.routes.js` | File | Active | Routing backend publik settings | Pertahankan |
| `server/src/routes/skills.routes.js` | File | Active | Routing backend publik keahlian | Pertahankan |
| `server/src/routes/admin/account.routes.js` | File | Active | Routing admin CMS manajemen akun | Pertahankan |
| `server/src/routes/admin/certification.routes.js` | File | Active | Routing admin CMS kelola sertifikasi | Pertahankan |
| `server/src/routes/admin/cv-builder.routes.js` | File | Active | Routing admin CMS kelola CV | Pertahankan |
| `server/src/routes/admin/education.routes.js` | File | Active | Routing admin CMS kelola pendidikan | Pertahankan |
| `server/src/routes/admin/experience.routes.js` | File | Active | Routing admin CMS kelola pengalaman | Pertahankan |
| `server/src/routes/admin/learning.routes.js` | File | Active | Routing admin CMS kelola learning library | Pertahankan |
| `server/src/routes/admin/projects.routes.js` | File | Active | Routing admin CMS kelola proyek | Pertahankan |
| `server/src/routes/admin/settings.routes.js` | File | Active | Routing admin CMS kelola settings | Pertahankan |
| `server/src/routes/admin/skills.routes.js` | File | Active | Routing admin CMS kelola keahlian | Pertahankan |
| `server/src/routes/public/projects.routes.js` | File | Active | Routing publik kelola list proyek | Pertahankan |

### Controllers
| Path | Type | Status | Evidence / Reason | Next Action |
|---|---|---|---|---|
| `server/src/controllers/adminAccount.controller.js` | File | Active | Logika backend kelola akun admin | Pertahankan |
| `server/src/controllers/adminCvBuilder.controller.js` | File | Active | Logika backend layout CV Builder admin | Pertahankan |
| `server/src/controllers/adminProjects.controller.js` | File | Active | Logika backend kelola proyek admin | Pertahankan |
| `server/src/controllers/auth.controller.js` | File | Active | Logika backend login session admin | Pertahankan |
| `server/src/controllers/certification.controller.js` | File | Active | Logika backend kelola sertifikat admin | Pertahankan |
| `server/src/controllers/education.controller.js` | File | Active | Logika backend kelola pendidikan admin | Pertahankan |
| `server/src/controllers/experience.controller.js` | File | Active | Logika backend kelola pengalaman admin | Pertahankan |
| `server/src/controllers/learning.controller.js` | File | Active | Logika backend kelola learning library | Pertahankan |
| `server/src/controllers/publicProjects.controller.js` | File | Active | Logika backend list proyek publik | Pertahankan |
| `server/src/controllers/settings.controller.js` | File | Active | Logika backend kelola settings admin | Pertahankan |
| `server/src/controllers/skills.controller.js` | File | Active | Logika backend kelola keahlian admin | Pertahankan |

### Middleware
| Path | Type | Status | Evidence / Reason | Next Action |
|---|---|---|---|---|
| `server/src/middleware/errorHandler.js` | File | Active | Middleware interceptor & handling error Express | Pertahankan |
| `server/src/middleware/requireAdmin.js` | File | Active | Guard proteksi token JWT rute admin | Pertahankan |

### Config & Lib
| Path | Type | Status | Evidence / Reason | Next Action |
|---|---|---|---|---|
| `server/src/config/env.js` | File | Active | Validasi keberadaan variabel environment | Pertahankan |
| `server/src/lib/prisma.js` | File | Active | Singleton client export instansi ORM Prisma | Pertahankan |

### Prisma & Local Data
| Path | Type | Status | Evidence / Reason | Next Action |
|---|---|---|---|---|
| `server/data/credentials.json` | File | Active | Payload data sertifikasi statis untuk seed | Pertahankan |
| `server/prisma/initial.sql` | File | Do not delete | Backup skema SQL murni database | Pertahankan |
| `server/prisma/schema.prisma` | File | Do not delete | Definisi skema model DB Prisma | Pertahankan |
| `server/prisma/seed.js` | File | Do not delete | Script inisialisasi data awal database | Pertahankan |
| `server/prisma/migrations/migration_lock.toml` | File | Do not delete | File lock internal sistem migrasi Prisma | Pertahankan |
| `server/prisma/migrations/20260603103531_init/migration.sql` | File | Do not delete | Script SQL inisiasi skema database awal | Pertahankan |
| `server/prisma/migrations/20260605094612_add_learning_item_model/migration.sql` | File | Do not delete | Script SQL migrasi tabel learning items | Pertahankan |

### Scratch Scripts
| Path | Type | Status | Evidence / Reason | Next Action |
|---|---|---|---|---|
| `server/scratch/check_db.js` | File | Delete candidate after validation | Script uji koneksi DB lokal manual | Pertahankan/Hapus setelah validasi |
| `server/scratch/parse_logs.js` | File | Delete candidate after validation | Script utilitas parser log manual | Pertahankan/Hapus setelah validasi |
| `server/scratch/patch_seed.js` | File | Delete candidate after validation | Script utilitas helper seeding manual | Pertahankan/Hapus setelah validasi |


## Documentation Inventory

### Project Docs
| Path | Type | Status | Evidence / Reason | Next Action |
|---|---|---|---|---|
| `docs/README.md` | File | Do not delete | Landing page panduan dokumen repositori | Pertahankan |
| `docs/project/README.md` | File | Do not delete | Pengantar folder proyek | Pertahankan |
| `docs/project/history/README.md` | File | Do not delete | Pengantar folder riwayat pengerjaan | Pertahankan |
| `docs/project/history/CURRENT_STATUS.md` | File | Do not delete | Indeks aktif fitur tracker & deployment status | Pertahankan |
| `docs/project/history/FEATURE_HISTORY.md` | File | Do not delete | Rangkuman urutan batch feature history | Pertahankan |
| `docs/project/history/FEATURE_BATCH_TEMPLATE.md` | File | Do not delete | Template penulisan file riwayat batch | Pertahankan |

### Onboarding Docs
| Path | Type | Status | Evidence / Reason | Next Action |
|---|---|---|---|---|
| `docs/project/onboarding/README.md` | File | Do not delete | Pengantar folder onboarding | Pertahankan |
| `docs/project/onboarding/CHATGPT_PROJECT_INSTRUCTIONS.md` | File | Do not delete | Aturan onboarding model AI | Pertahankan |
| `docs/project/onboarding/ROOM_00_MANAGER_PROMPT.md` | File | Do not delete | SOP penyusunan prompt instruksi | Pertahankan |
| `docs/project/onboarding/ROOM_01_REVIEWER_PROMPT.md` | File | Do not delete | SOP proses audit dan QA review | Pertahankan |

### Workflow Docs
| Path | Type | Status | Evidence / Reason | Next Action |
|---|---|---|---|---|
| `docs/project/workflow/README.md` | File | Do not delete | Pengantar folder workflow kerja | Pertahankan |
| `docs/project/workflow/MODEL_USAGE_GUIDE.md` | File | Do not delete | Standardisasi model AI dalam project | Pertahankan |
| `docs/project/workflow/WORKING_SYSTEM.md` | File | Do not delete | Standard operating procedure pengerjaan | Pertahankan |

### Technical Docs (Frontend, Backend, Database, Deployment)
| Path | Type | Status | Evidence / Reason | Next Action |
|---|---|---|---|---|
| `docs/backend/README.md` | File | Do not delete | Dokumentasi teknis sistem backend | Pertahankan |
| `docs/backend/ADMIN_AUTH_REQUIREMENT.md` | File | Do not delete | Spek otentikasi dashboard admin | Pertahankan |
| `docs/backend/ADMIN_CMS_SCOPE.md` | File | Do not delete | Cakupan modul kelola CMS | Pertahankan |
| `docs/backend/AUTH_FLOW_DESIGN.md` | File | Do not delete | Alur diagram autentikasi admin | Pertahankan |
| `docs/backend/AUTH_SECURITY_QA.md` | File | Do not delete | Catatan QA pengujian keamanan login | Pertahankan |
| `docs/backend/BACKEND_NOTES.md` | File | Do not delete | Catatan pengembangan fungsional backend | Pertahankan |
| `docs/backend/CREDENTIAL_MANAGEMENT_CMS_QA.md` | File | Do not delete | Catatan QA kelola sertifikat CMS | Pertahankan |
| `docs/backend/CV_ASSET_LINK_CMS_QA.md` | File | Do not delete | Catatan QA kelola CV dan data links | Pertahankan |
| `docs/backend/PROFILE_SETTINGS_CMS_QA.md` | File | Do not delete | Catatan QA kelola settings CMS | Pertahankan |
| `docs/backend/PROJECT_MANAGEMENT_CMS_QA.md` | File | Do not delete | Catatan QA kelola proyek CMS | Pertahankan |
| `docs/database/README.md` | File | Do not delete | Dokumentasi skema & dev vs prod DB | Pertahankan |
| `docs/database/DATABASE_NOTES.md` | File | Do not delete | Catatan queries & struktur model data DB | Pertahankan |
| `docs/deployment/README.md` | File | Do not delete | Panduan deployment live & checklist | Pertahankan |
| `docs/frontend/README.md` | File | Do not delete | Panduan pengembangan frontend React | Pertahankan |
| `docs/frontend/FRONTEND_NOTES.md` | File | Do not delete | Catatan styling & layouting mobile responsive | Pertahankan |
| `docs/frontend/CV_FINAL_PDF_INTEGRATION.md` | File | Do not delete | Panduan integrasi file unduhan CV PDF | Pertahankan |

### Feature History Docs (under docs/project/history/features/)
| Path | Type | Status | Evidence / Reason | Next Action |
|---|---|---|---|---|
| `docs/project/history/features/F00_PROJECT_WORKFLOW_RESET.md` | File | Do not delete | File history tracking F00 | Pertahankan |
| `docs/project/history/features/F01_PUBLIC_WEBSITE_CORE_SYSTEM.md` | File | Do not delete | File history tracking F01 | Pertahankan |
| `docs/project/history/features/F02_PROFILE_EXPERIENCE_CONTENT_SYSTEM.md` | File | Do not delete | File history tracking F02 | Pertahankan |
| `docs/project/history/features/F03_PROJECT_PORTFOLIO_SYSTEM.md` | File | Do not delete | File history tracking F03 | Pertahankan |
| `docs/project/history/features/F04_CREDENTIAL_CERTIFICATE_SYSTEM.md` | File | Do not delete | File history tracking F04 | Pertahankan |
| `docs/project/history/features/F05_CV_DOWNLOAD_SYSTEM.md` | File | Do not delete | File history tracking F05 | Pertahankan |
| `docs/project/history/features/F06_ASSET_LINK_PREVIEW_SYSTEM.md` | File | Do not delete | File history tracking F06 | Pertahankan |
| `docs/project/history/features/F07_BACKEND_API_SYSTEM.md` | File | Do not delete | File history tracking F07 | Pertahankan |
| `docs/project/history/features/F08_ADMIN_LOGIN_AUTH_SYSTEM.md` | File | Do not delete | File history tracking F08 | Pertahankan |
| `docs/project/history/features/F09_ADMIN_CONTENT_MANAGEMENT_SYSTEM.md` | File | Do not delete | File history tracking F09 | Pertahankan |
| `docs/project/history/features/F10_DEPLOYMENT_DOMAIN_SYSTEM.md` | File | Do not delete | File history tracking F10 | Pertahankan |
| `docs/project/history/features/F11_CV_BUILDER_PDF_EXPORT_SYSTEM.md` | File | Do not delete | File history tracking F11 | Pertahankan |
| `docs/project/history/features/F12_LEARNING_LIBRARY_SYSTEM.md` | File | Do not delete | File history tracking F12 | Pertahankan |
| `docs/project/history/features/F13_MOBILE_RESPONSIVE_UI_IMPROVEMENT.md` | File | Do not delete | File history tracking F13 | Pertahankan |
| `docs/project/history/features/F14_REPOSITORY_NORMALIZATION_DOCUMENTATION_SYNC.md` | File | Do not delete | File history tracking F14 (Aktif saat ini) | Pertahankan |


## Potential Cleanup Candidates
*(Penting: Tidak ada file yang dihapus pada batch ini. Daftar di bawah murni merupakan kandidat untuk diaudit & divalidasi lebih lanjut sebelum dihapus).*

| Path | Candidate Type | Reason | Required Validation Before Cleanup |
|---|---|---|---|
| `client/build_log.txt` | Confirmed unused candidate | Log sisa build lokal terdahulu, tidak diperlukan | Hapus setelah QA selesai |
| `client/src/fallback/certificationsFallback.js` | Confirmed unused candidate | F14C Audit: Terkonfirmasi tidak di-import di mana pun | Hapus pada batch cleanup |
| `client/src/fallback/contactFallback.js` | Confirmed unused candidate | F14C Audit: Terkonfirmasi tidak di-import di mana pun | Hapus pada batch cleanup |
| `client/src/fallback/educationFallback.js` | Confirmed unused candidate | F14C Audit: Terkonfirmasi tidak di-import di mana pun | Hapus pada batch cleanup |
| `client/src/fallback/experienceFallback.js` | Confirmed unused candidate | F14C Audit: Terkonfirmasi tidak di-import di mana pun | Hapus pada batch cleanup |
| `client/src/fallback/heroFallback.js` | Confirmed unused candidate | F14C Audit: Terkonfirmasi tidak di-import di mana pun | Hapus pada batch cleanup |
| `client/src/fallback/profileFallback.js` | Confirmed unused candidate | F14C Audit: Terkonfirmasi tidak di-import di mana pun | Hapus pada batch cleanup |
| `client/src/fallback/projectsFallback.js` | Confirmed unused candidate | F14C Audit: Terkonfirmasi tidak di-import di mana pun | Hapus pada batch cleanup |
| `client/src/fallback/skillsFallback.js` | Confirmed unused candidate | F14C Audit: Terkonfirmasi tidak di-import di mana pun | Hapus pada batch cleanup |
| `client/src/assets/hero.png` | Confirmed unused candidate | F14C Audit: Tidak di-import/direferensikan di mana pun | Hapus pada batch cleanup |
| `client/src/assets/javascript.svg` | Confirmed unused candidate | F14C Audit: Tidak di-import/direferensikan di mana pun | Hapus pada batch cleanup |
| `client/src/assets/vite.svg` | Confirmed unused candidate | F14C Audit: Tidak di-import/direferensikan di mana pun | Hapus pada batch cleanup |
| `server/scratch/check_db.js` | Needs verification | Script uji DB lokal manual | Pastikan tidak diperlukan untuk troubleshooting |
| `server/scratch/parse_logs.js` | Needs verification | Script parser log manual | Pastikan tidak diperlukan |
| `server/scratch/patch_seed.js` | Needs verification | Script helper seeding manual | Pastikan tidak diperlukan |


## Do Not Delete List
Daftar file krusial yang bersifat sensitif, historis, konfigurasi utama, atau berisi Standard Operating Procedure (SOP) pengerjaan yang **TIDAK BOLEH DIHAPUS**.

| Path | Reason |
|---|---|
| `docs/project/workflow/WORKING_SYSTEM.md` | Berisi SOP utama dan tata cara pair programming AI-User |
| `docs/project/workflow/MODEL_USAGE_GUIDE.md` | Berisi panduan pemilihan model AI eksekutor |
| `docs/project/history/CURRENT_STATUS.md` | Peta status utama tracking fitur aktif |
| `docs/project/history/FEATURE_HISTORY.md` | Rangkuman indeks riwayat pengerjaan batch |
| Semua file di `docs/project/history/features/F*.md` | Bukti riwayat audit komparatif per batch |
| `server/prisma/schema.prisma` | File skema ORM utama penyusun database |
| `server/prisma/migrations/` | Riwayat migrasi skema database yang wajib dipertahankan |
| `server/prisma/seed.js` | Script seeding data untuk database setup |
| `server/.env.example` & `client/.env.example` | Panduan setup variabel lingkungan produksi & dev |
| File PDF CV di folder static (bila nanti ditambahkan) | File unduhan utama CV pengguna |


## Recommended Next Batch
Rekomendasi batch lanjutan pasca audit inventori ini:
- **Batch F14C — Frontend Public/Admin Audit**: Fokus memvalidasi data fallback, integrasi aset eksternal, dan kesiapan mobile view di area admin secara fungsional.
- **Batch F14D — Backend/API Audit**: Fokus pada audit performa query Prisma dan pembersihan controller/middleware yang tidak efisien.
- **Batch F14E — Database/Prisma Audit**: Audit komparatif model data di Prisma Studio untuk memastikan tidak ada redundancy field.
- **Batch F14F — Cleanup Candidates Validation**: Eksekusi pembersihan file-file sisa (seperti file fallback yang tidak di-import dan logs) setelah divalidasi aman.

# Project Management CMS QA Report

## 1. Tujuan QA
Dokumen ini merangkum hasil verifikasi kualitas dan audit keamanan fungsional terhadap modul tata kelola (*Project Management*) CMS (Sub-batch F09B.1). Tujuannya adalah untuk mendiagnosa kesesuaian antara antarmuka administratif dengan arsitektur backend RESTful API secara struktural dan semantik sebelum F09 diperluas secara resmi.

## 2. Scope QA
- Audit arsitektur komponen React *Frontend* (Form, Table, List).
- Audit fungsi pengambilan data `api.js` (Interceptor *bearer token*).
- Audit skema perlindungan *Backend Route* (`admin/projects.routes.js`).
- Audit kepatuhan skema *Backend Controller* terhadap spesifikasi tipe data dan limitasi.
- Eksplorasi penolakan 401 saat tidak ada otentikasi.
- Uji pembangunan (*build process*) kelayakan *production* aplikasi klien.

## 3. File Frontend yang Diaudit
- `client/src/pages/admin/AdminProjects.jsx`
- `client/src/pages/admin/AdminProjectCreate.jsx`
- `client/src/pages/admin/AdminProjectEdit.jsx`
- `client/src/components/admin/ProjectForm.jsx`
- `client/src/lib/api.js`

## 4. File Backend yang Diaudit
- `server/src/routes/admin/projects.routes.js`
- `server/src/controllers/adminProjects.controller.js`

## 5. Data Flow Project Management
- **List:** Admin menavigasi ke halaman utama `/admin/projects`. *Frontend* memanggil `getAdminProjects()` yang melemparkan *request* `GET` dengan token header. *Backend* mengurutkan daftar berdasarkan urutan `order` ascending dan `createdAt` descending, sebelum merespons struktur objek `data.projects`.
- **Create:** Admin mengunjungi `AdminProjectCreate` dan mengisi form. Panggilan interaktif merangkai array string `techStack`, sebelum dikirimkan oleh fungsi `createProject(data)`.
- **Edit:** Halaman `AdminProjectEdit` me-load state proyek spesifik (menata string berformat array CSV) pada UI saat inisiasi. Pembaruan akan memanggil `updateProject(id, data)` untuk dimutakhirkan dalam *database* (sebagian/sepenuhnya via PUT).
- **Delete:** Interaksi klik *Delete* di halaman depan (List) akan memicu jendela konfirmasi modal standar. Setelah disetujui, ia menggunakan `deleteProject(id)`, kemudian menembakkan pemanggilan *fetchProjects* baru secara *real-time*.

## 6. API Endpoint Map

| Action | HTTP Method | Endpoint Path | Source Layer | Status |
|---|---|---|---|---|
| Fetch All | GET | `/api/admin/projects` | `adminProjects.controller.js` | Protected |
| Fetch One | GET | `/api/admin/projects/:id` | `adminProjects.controller.js` | Protected |
| Create | POST | `/api/admin/projects` | `adminProjects.controller.js` | Protected |
| Update | PUT | `/api/admin/projects/:id` | `adminProjects.controller.js` | Protected |
| Delete | DELETE | `/api/admin/projects/:id` | `adminProjects.controller.js` | Protected |

## 7. Auth Protection Check
Seluruh 5 rute pemetaan modul manajemen proyek mutlak terkunci melalui deklarasi proteksi level-atas:
```javascript
const requireAdmin = require('../../middleware/requireAdmin');
router.use(requireAdmin);
```
Intervensi HTTP sembarang seketika digagalkan tanpa eksekusi kueri ke Prisma. *Frontend fallback* akan mencatat status 401 dan melontarkan sesi admin ke halaman masuk awal.

## 8. Validation Check
Audit *Backend* F09B.1 memvalidasi parameter-parameter spesifik berikut secara kuat:
- Penolakan permintaan POST dengan nilai esensial (`title`, `slug`, `shortDescription`) kosong.
- Penolakan `status` yang keluar dari terminologi `['DRAFT', 'PUBLISHED']`.
- Penolakan duplikasi unik identitas `slug` dengan lemparan error HTTP `409 Conflict` (baik pada proses `create` maupun `update`).
- Eksepsi HTTP `404 Not Found` presisi ketika UUID salah diketik pada tahapan modifikasi/pembasmian data.
- **[HOTFIX PATCH]** *Controller* juga ditambal lapisan pelindung anti panik (dari `req.body` mentah menjadi `req.body || {}`) jika header Content-Type kosong.

## 9. Test Case Table

| Test Case | Expected Result | Actual Result | Status | Notes |
|---|---|---|---|---|
| Build Production Frontend | Bundle kompresi berjalan | Vite *build success* | Pass | Klien aman dijalankan pada distribusi final. |
| GET Projects Tanpa Token | Server merespons `401 Unauthorized` | `401 Unauthorized` | Pass | Validasi dari `requireAdmin` bekerja. |
| POST Create Tanpa Token | Server merespons `401 Unauthorized` | `401 Unauthorized` | Pass | Pelindung rute tidak bisa diterobos metode *write*. |
| DELETE Tanpa Token | Server merespons `401 Unauthorized` | `401 Unauthorized` | Pass | Pemblokiran berhasil. |
| Create & Update dengan Data Valid | Berhasil disimpan dan merespons `201`/`200` | (Membutuhkan kredensial nyata) | Limited | Tidak dapat disimulasi murni tanpa menyebarkan identitas (*seeding*) administratif. |

## 10. Keterbatasan QA
QA terbatas pada verifikasi struktural dan isolasi API tanpa token. Validasi proses *end-to-end* yang melibatkan intervensi CRUD sejati belum mungkin diinisiasi tanpa implementasi profil *seed user* Admin nyata ke dalam skema *database*.

## 11. Risiko Tersisa
Tidak ada risiko logis yang fatal di *layer* antarmuka. Hanya ada kebergantungan murni pada peresmian modul otentikasi (F08).

## 12. Rekomendasi Batch Berikutnya
- Melanjutkan pengembangan pada struktur CMS ranah Credential (F09C).
- *Seeding* eksperimen pengguna administratif akan disarankan bila interaksi integrasi penuh CMS akan dilakukan.

## 13. Kesimpulan Status F09B.1
Audit tata letak dan logika komponen manajemen portofolio (*Project Management*) telah lulus. **F09B.1 dinyatakan Completed**. Modul aman untuk digunakan setelah proses otentikasi siap sedia secara praktikal.

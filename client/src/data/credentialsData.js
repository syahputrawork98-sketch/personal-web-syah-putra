/**
 * Data Sertifikat & Kredensial
 * Batch 12 - Struktur & Placeholder Awal
 * Batch 13 - Isi Data Final dari Google Drive
 */

export const credentialCategories = [
  "Semua",
  "BNSP",
  "Web Development",
  "Konstruksi",
  "Manufaktur",
  "Pelatihan"
];

export const credentialsData = [
  {
    id: "bnsp-web-dev",
    title: "Pengembangan Web (Junior Web Developer)",
    issuer: "BNSP - LSP Teknologi Digital",
    date: "2023",
    category: "BNSP",
    summary: "Sertifikasi kompetensi nasional untuk Junior Web Developer yang mencakup implementasi user interface, pemrograman terstruktur, dan pengelolaan basis data.",
    previewUrl: "", // Akan diisi di Batch 13
    viewUrl: "",    // Akan diisi di Batch 13
    skills: ["HTML5", "CSS3", "JavaScript", "SQL", "Pemrograman Terstruktur"]
  },
  {
    id: "bnsp-manufaktur",
    title: "Sertifikat Kompetensi Manufaktur",
    issuer: "BNSP",
    date: "2021",
    category: "Manufaktur",
    summary: "Sertifikasi keahlian dalam bidang operasional manufaktur dan standar industri.",
    previewUrl: "",
    viewUrl: "",
    skills: ["Manufacturing Process", "Quality Control", "Industrial Standards"]
  },
  {
    id: "bnsp-konstruksi",
    title: "Sertifikat Jasa Konstruksi",
    issuer: "LPJK / BNSP",
    date: "2022",
    category: "Konstruksi",
    summary: "Kredensial profesional dalam manajemen dan pelaksanaan jasa konstruksi sesuai standar nasional.",
    previewUrl: "",
    viewUrl: "",
    skills: ["Construction Management", "Safety Standards", "Project Planning"]
  },
  {
    id: "azure-bootcamp",
    title: "Global Azure Bootcamp Participant",
    issuer: "Microsoft Azure Community",
    date: "2023",
    category: "Pelatihan",
    summary: "Partisipasi dalam pelatihan global mengenai teknologi cloud Microsoft Azure dan implementasi solusi berbasis cloud.",
    previewUrl: "",
    viewUrl: "",
    skills: ["Cloud Computing", "Microsoft Azure", "Serverless Architecture"]
  }
];

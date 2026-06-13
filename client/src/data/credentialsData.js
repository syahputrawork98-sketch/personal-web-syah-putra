/**
 * Data Sertifikat & Kredensial
 * Batch 13 Fix - Complete Drive Certificate Inventory (Folders 02-07)
 */

export const credentialCategories = [
  "Semua",
  "BNSP",
  "IT & Digital",
  "Teknik & Manufaktur",
  "Konstruksi",
  "Pengembangan Diri",
  "Magang & Partisipasi",
  "Dokumen Pendukung"
];

const createUrls = (id) => ({
  previewUrl: `https://drive.google.com/file/d/${id}/preview`,
  viewUrl: `https://drive.google.com/file/d/${id}/view`
});

export const credentialsData = [
  // 02 - Sertifikat IT & Digital
  {
    id: "bbpvp-web-node-react-2025",
    title: "Program Pengembangan Web dengan Node.js dan React",
    issuer: "BBPVP Bandung",
    date: "2025",
    category: "IT & Digital",
    featured: true,
    status: "active",
    sourceFolder: "02 - Sertifikat IT & Digital",
    summary: "Pelatihan intensif pengembangan aplikasi web menggunakan stack Node.js dan React, mencakup REST API, integrasi database, arsitektur frontend/backend, dan penerapan modular coding.",
    ...createUrls("1ZcWx5tA4-lSITUUfFS4ntV7ybSpVoPk-"),
    skills: ["Node.js", "React.js", "JavaScript", "REST API", "Full Stack Development", "Database Integration"]
  },
  {
    id: "revou-coding-camp-2025",
    title: "Intro to Software Engineering",
    issuer: "RevoU",
    date: "2025",
    category: "IT & Digital",
    featured: true,
    status: "active",
    sourceFolder: "02 - Sertifikat IT & Digital",
    summary: "Program intensif pengantar software engineering yang memperkuat fondasi logika pemrograman, workflow git/collaborative development, penyelesaian masalah, serta siklus hidup pengembangan perangkat lunak.",
    ...createUrls("1iSaJpNmqK_3TGZV2MJ4WsPb7iCteSF07"),
    skills: ["Software Engineering", "Web Development", "Git", "Problem Solving", "Frontend Development"]
  },
  {
    id: "blue-data-intelligence",
    title: "Blue Data Intelligence Specialization",
    issuer: "Blue Data / Partner",
    date: "2024",
    category: "IT & Digital",
    featured: false,
    status: "active",
    sourceFolder: "02 - Sertifikat IT & Digital",
    summary: "Sertifikasi keahlian dalam analisis data, pengolahan database relasional, serta pemodelan intelijen bisnis (BI) untuk pengambilan keputusan berbasis data.",
    ...createUrls("1JTo_bFidFsvo_cZLCq2N_9Qo8BWUaQBJ"),
    skills: ["Data Analysis", "Database", "Business Intelligence", "SQL Fundamentals"]
  },
  {
    id: "it-foundation",
    title: "IT Foundation Certificate",
    issuer: "IT Training Center",
    date: "2024",
    category: "IT & Digital",
    featured: false,
    status: "supporting",
    sourceFolder: "02 - Sertifikat IT & Digital",
    summary: "Sertifikat dasar kompetensi IT, memvalidasi pemahaman fundamental tentang infrastruktur sistem informasi, jaringan komputer dasar, dan pengoperasian perangkat lunak.",
    ...createUrls("1Bx4xf0BFIjJFoxL0kZFelh0n01csN_Gz"),
    skills: ["IT Fundamentals", "Computer Networks", "Information Systems"]
  },
  {
    id: "azure-bootcamp-2017",
    title: "Global Azure Bootcamp 2017",
    issuer: "Microsoft Azure Community",
    date: "2017",
    category: "IT & Digital",
    featured: false,
    status: "active",
    sourceFolder: "02 - Sertifikat IT & Digital",
    summary: "Partisipasi dalam event global workshop mengenai teknologi cloud Microsoft Azure.",
    ...createUrls("12wURxZ8GHF7Qm-iz7aY8YyGFIb6Pi0VS"),
    skills: ["Cloud Computing", "Microsoft Azure"]
  },

  // 03 - Sertifikat Teknik & Manufaktur
  {
    id: "bbpvp-cad-2025",
    title: "Mekanik dengan CAD",
    issuer: "BBPVP Bandung",
    date: "2025",
    category: "Teknik & Manufaktur",
    featured: false,
    status: "active",
    sourceFolder: "03 - Sertifikat Teknik & Manufaktur",
    summary: "Sertifikat keahlian dalam perancangan mekanik menggunakan perangkat lunak CAD di BBPVP Bandung.",
    ...createUrls("1GIEg0So-Jhb_0W1QLkhta9ekcO364ZNj"),
    skills: ["CAD", "Mechanical Design", "Technical Drawing"]
  },
  {
    id: "lubricants-fundamental-2017",
    title: "Lubricants & Lubrication Fundamental",
    issuer: "Pertamina Lubricants",
    date: "2017",
    category: "Teknik & Manufaktur",
    featured: false,
    status: "active",
    sourceFolder: "03 - Sertifikat Teknik & Manufaktur",
    summary: "Sertifikat pelatihan dasar mengenai teknologi pelumasan industri.",
    ...createUrls("1DnhA89dV6MvMFBznFoABetqCJ22N9-Bf"),
    skills: ["Industrial Lubricants", "Maintenance"]
  },
  {
    id: "jasa-konstruksi-lv2",
    title: "Sertifikat Jasa Konstruksi Lv.2",
    issuer: "LPJK",
    date: "2024",
    category: "Konstruksi",
    featured: false,
    status: "supporting",
    sourceFolder: "03 - Sertifikat Teknik & Manufaktur",
    summary: "Sertifikat kompetensi tingkat 2 dalam bidang jasa konstruksi.",
    ...createUrls("1ttUPkHFK4OmXN7iBRMsJ-7WCSVTEWK2B"),
    skills: ["Construction", "Technical Supervision"]
  },
  {
    id: "itenas-relasi-2018-03",
    title: "Pelatihan Dasar Pengembangan Relasi & Kepemimpinan",
    issuer: "ITENAS Bandung",
    date: "2018",
    category: "Teknik & Manufaktur",
    featured: false,
    status: "duplicate-review",
    sourceFolder: "03 - Sertifikat Teknik & Manufaktur",
    summary: "Sertifikat pelatihan pengembangan relasi dan kepemimpinan (terindikasi duplikat dengan folder Pengembangan Diri).",
    ...createUrls("1BBLH25QvvyB1dQv-VMIpFHK4czn1vTrh"),
    skills: ["Leadership", "Communication"]
  },

  // 04 - Sertifikat BNSP & Profesi
  {
    id: "bnsp-web-node-react",
    title: "Junior Web Developer (Node.js & React)",
    issuer: "BNSP - LSP Teknologi Digital",
    date: "2025",
    category: "BNSP",
    featured: true,
    status: "active",
    sourceFolder: "04 - Sertifikat BNSP & Profesi",
    summary: "Sertifikasi Kompetensi Nasional (BNSP) di bidang Junior Web Developer, memvalidasi kemampuan teknis perancangan web, logika pemrograman JavaScript, serta pengembangan aplikasi menggunakan React dan Node.js.",
    ...createUrls("1FjjCWj0a9b7HUD7vy8RJXt21_ESsp8pk"),
    skills: ["React.js", "Node.js", "JavaScript", "Web Development", "BNSP Certified"]
  },
  {
    id: "bnsp-manufaktur-2025",
    title: "Sertifikat Kompetensi Manufaktur",
    issuer: "BNSP",
    date: "2025",
    category: "BNSP",
    featured: false,
    status: "active",
    sourceFolder: "04 - Sertifikat BNSP & Profesi",
    summary: "Sertifikasi Kompetensi Nasional dalam bidang manufaktur dan mekanik.",
    ...createUrls("1MWdbUYB54SbMNxeAdFIroBnaV4SelIfp"),
    skills: ["Manufacturing", "Industrial Competency"]
  },
  {
    id: "bnsp-konstruksi-2024",
    title: "Sertifikat Kompetensi Jasa Konstruksi",
    issuer: "BNSP",
    date: "2024",
    category: "BNSP",
    featured: false,
    status: "active",
    sourceFolder: "04 - Sertifikat BNSP & Profesi",
    summary: "Sertifikasi Kompetensi Nasional untuk tenaga kerja ahli di bidang jasa konstruksi.",
    ...createUrls("1h_KiKLhk2rTyxkGhEanr2gbmBTp32TxV"),
    skills: ["Construction", "Quality Control"]
  },

  // 05 - Sertifikat Pengembangan Diri
  {
    id: "itenas-relasi-2018-05",
    title: "Pelatihan Dasar Pengembangan Relasi & Kepemimpinan",
    issuer: "ITENAS Bandung",
    date: "2018",
    category: "Pengembangan Diri",
    featured: false,
    status: "active",
    sourceFolder: "05 - Sertifikat Pengembangan Diri",
    summary: "Sertifikat pelatihan pengembangan karakter dan kepemimpinan di ITENAS.",
    ...createUrls("1SZG_PZ1eYHC2ksLcEjaXHqnm4MSK0JKt"),
    skills: ["Leadership", "Teamwork", "Relational Skills"]
  },
  {
    id: "itenas-pengembangan-diri-2017",
    title: "Program Pelatihan Dasar Pengembangan Diri",
    issuer: "ITENAS Bandung",
    date: "2017",
    category: "Pengembangan Diri",
    featured: false,
    status: "active",
    sourceFolder: "05 - Sertifikat Pengembangan Diri",
    summary: "Sertifikat dasar pengembangan kepribadian dan profesionalisme.",
    ...createUrls("1MAT9cR6Qp8gM_Q5syp7H0tYMJja4jiRq"),
    skills: ["Personal Growth", "Effective Communication"]
  },
  {
    id: "pfm-smk-2016",
    title: "Sertifikasi PFM (Pemesinan)",
    issuer: "SMK Negeri 1 Cimahi",
    date: "2016",
    category: "Teknik & Manufaktur",
    featured: false,
    status: "active",
    sourceFolder: "05 - Sertifikat Pengembangan Diri",
    summary: "Sertifikat keahlian teknik pemesinan tingkat dasar.",
    ...createUrls("1nYFMPeIJIVPC77mf7w9D5iituygqpzQ0"),
    skills: ["Machining", "Workshop Safety"]
  },

  // 06 - OJT, Magang & Pengalaman Kerja
  {
    id: "ojt-gen-creative-2025",
    title: "On the Job Training - Web Developer",
    issuer: "Gen Creative",
    date: "2025",
    category: "Magang & Partisipasi",
    featured: true,
    status: "active",
    sourceFolder: "06 - OJT, Magang & Pengalaman Kerja",
    summary: "Sertifikat pengalaman kerja lapangan (OJT) sebagai Web Developer, berkontribusi dalam tim pengembang profesional.",
    ...createUrls("1WA3iORY4AENkCp_SZpVYGWg_YZM2yfCK"),
    skills: ["OJT", "Work Experience", "Collaboration"]
  },
  {
    id: "itenas-fti-partisipasi-2017",
    title: "Sertifikat Partisipasi Fakultas Teknologi Industri",
    issuer: "ITENAS Bandung",
    date: "2017",
    category: "Magang & Partisipasi",
    featured: false,
    status: "active",
    sourceFolder: "06 - OJT, Magang & Pengalaman Kerja",
    summary: "Sertifikat partisipasi dalam kegiatan akademik/organisasi di Fakultas Teknologi Industri ITENAS.",
    ...createUrls("1alz1pAWSaMRFHkVANbe3_POmnFBkJaLA"),
    skills: ["Participation", "Academic Activity"]
  },

  // 07 - Dokumen Pendukung & Surat Keterangan
  {
    id: "pelatihan-kelulusan-2025-v3",
    title: "Sertifikat Kelulusan Pelatihan (v2025)",
    issuer: "Lembaga Pelatihan",
    date: "2025",
    category: "Dokumen Pendukung",
    featured: false,
    status: "active",
    sourceFolder: "07 - Dokumen Pendukung & Surat Keterangan",
    summary: "Dokumen kelulusan pelatihan resmi yang dapat diverifikasi melalui dokumen sumber.",
    ...createUrls("1ZU9K9an6K7BzxZqSftKVb6DpEGdDAvk6"),
    skills: ["Training Completion"]
  },
  {
    id: "pelatihan-kelulusan-supporting-1",
    title: "Sertifikat Kelulusan Pelatihan (Supporting)",
    issuer: "Lembaga Pelatihan",
    date: "2024",
    category: "Dokumen Pendukung",
    featured: false,
    status: "supporting",
    sourceFolder: "07 - Dokumen Pendukung & Surat Keterangan",
    summary: "Dokumen pendukung kelulusan pelatihan resmi.",
    ...createUrls("1q-QcN_hyQQ3k4RPG1Um50ZZk62oPmaXI"),
    skills: ["Verification Document"]
  },
  {
    id: "surat-keterangan-pelatihan",
    title: "Surat Keterangan Selesai Pelatihan",
    issuer: "Lembaga Pelatihan",
    date: "2024",
    category: "Dokumen Pendukung",
    featured: false,
    status: "supporting",
    sourceFolder: "07 - Dokumen Pendukung & Surat Keterangan",
    summary: "Surat keterangan resmi telah menyelesaikan seluruh rangkaian pelatihan.",
    ...createUrls("10skQV1qYQb4V4DYyQwf3XP3dv9UPsW81"),
    skills: ["Official Statement"]
  }
];

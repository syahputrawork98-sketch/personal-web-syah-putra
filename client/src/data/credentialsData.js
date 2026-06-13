/**
 * Data Sertifikat & Kredensial
 * Batch F04J.1 — Credential Data Realignment with Latest Certificate Inventory
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
  // A. Sertifikat BNSP
  {
    id: "bnsp-web-node-react",
    title: "Sertifikat Kompetensi BNSP — Pengembangan Web dengan Node.js dan React",
    issuer: "Badan Nasional Sertifikasi Profesi",
    date: "Okt 06, 2025",
    category: "BNSP",
    featured: true,
    status: "active",
    sourceFolder: "04 - Sertifikat BNSP & Profesi",
    summary: "Sertifikasi Kompetensi Nasional (BNSP) di bidang pengembangan web menggunakan Node.js dan React, memvalidasi kemampuan teknis perancangan web dan logika pemrograman JavaScript standar industri.",
    ...createUrls("1FjjCWj0a9b7HUD7vy8RJXt21_ESsp8pk"),
    skills: ["Node.js", "React.js", "JavaScript", "Web Development", "BNSP Certified"]
  },
  {
    id: "bnsp-cad-3d",
    title: "Sertifikat Kompetensi BNSP — Penggambaran Model 3D dengan CAD",
    issuer: "Badan Nasional Sertifikasi Profesi",
    date: "Agu 05, 2025",
    category: "BNSP",
    featured: false,
    status: "active",
    sourceFolder: "04 - Sertifikat BNSP & Profesi",
    summary: "Sertifikasi Kompetensi Nasional (BNSP) untuk keahlian penggambaran model 3D menggunakan perangkat lunak CAD dengan standar industri.",
    ...createUrls("1MWdbUYB54SbMNxeAdFIroBnaV4SelIfp"),
    skills: ["CAD", "3D Modeling", "Technical Drawing", "BNSP Certified"]
  },
  {
    id: "bnsp-jasa-konstruksi",
    title: "Sertifikat Kompetensi BNSP — Jasa Konstruksi - Tukang Bangunan Gedung",
    issuer: "Badan Nasional Sertifikasi Profesi",
    date: "Nov 22, 2024",
    category: "BNSP",
    featured: false,
    status: "active",
    sourceFolder: "04 - Sertifikat BNSP & Profesi",
    summary: "Sertifikasi Kompetensi Nasional (BNSP) dalam bidang jasa konstruksi bangunan gedung, memvalidasi pemahaman standar teknis dan keselamatan kerja konstruksi.",
    ...createUrls("1h_KiKLhk2rTyxkGhEanr2gbmBTp32TxV"),
    skills: ["Construction", "Building Construction", "Workplace Safety", "BNSP Certified"]
  },

  // B. IT & Digital
  {
    id: "cbec-blue-data-intelligence",
    title: "Certified Blue Economist (CBEc) — Blue Data Intelligence Specialization",
    issuer: "The Blue Economist International Association",
    date: "Mar 07, 2026",
    category: "IT & Digital",
    featured: true,
    status: "active",
    sourceFolder: "02 - Sertifikat IT & Digital",
    summary: "Sertifikasi keahlian khusus Blue Data Intelligence yang mencakup pemanfaatan AI, big data analytics, GIS, remote sensing, digital twin, dan data governance untuk konteks maritim.",
    ...createUrls("1JTo_bFidFsvo_cZLCq2N_9Qo8BWUaQBJ"),
    skills: ["AI", "Big Data Analytics", "GIS", "Remote Sensing", "Data Integration", "Cybersecurity", "Data Governance"]
  },
  {
    id: "cbec-foundation",
    title: "Certified Blue Economist (CBEc) — Foundation Level",
    issuer: "The Blue Economist International Association",
    date: "Apr 02, 2026",
    category: "IT & Digital",
    featured: false,
    status: "active",
    sourceFolder: "02 - Sertifikat IT & Digital",
    summary: "Sertifikasi tingkat dasar dalam bidang Blue Economy, berfokus pada ESG, keberlanjutan, tata kelola terintegrasi, dan penilaian jasa ekosistem.",
    ...createUrls("1Bx4xf0BFIjJFoxL0kZFelh0n01csN_Gz"),
    skills: ["Blue Economy", "ESG", "Sustainability", "Governance", "Natural Capital Valuation"]
  },
  {
    id: "bbpvp-web-node-react-2025",
    title: "Sertifikat Kelulusan Pelatihan — Pengembangan Web dengan Node.js dan React 200 Jam",
    issuer: "Balai Besar Pelatihan Vokasi dan Produktivitas Bandung",
    date: "Sep 19, 2025",
    category: "IT & Digital",
    featured: true,
    status: "active",
    sourceFolder: "02 - Sertifikat IT & Digital",
    summary: "Pelatihan berbasis kompetensi intensif 200 jam pengembangan web dengan Node.js dan React, mencakup REST API, integrasi database, OOP, dan versioning Git.",
    ...createUrls("1ZcWx5tA4-lSITUUfFS4ntV7ybSpVoPk-"),
    skills: ["Node.js", "React.js", "JavaScript", "REST API", "Database Integration", "Git"]
  },
  {
    id: "revou-intro-se",
    title: "Sertifikat Kehadiran — Coding Camp Intro to Software Engineering - RevoU",
    issuer: "RevoU",
    date: "Agu 08, 2025",
    category: "IT & Digital",
    featured: true,
    status: "active",
    sourceFolder: "02 - Sertifikat IT & Digital",
    summary: "Program pengantar rekayasa perangkat lunak intensif, memperkuat konsep pemrograman dasar, logika pemrograman, dan software development lifecycle.",
    ...createUrls("1iSaJpNmqK_3TGZV2MJ4WsPb7iCteSF07"),
    skills: ["Software Engineering", "Programming Fundamentals", "Problem Solving", "Web Development"]
  },
  {
    id: "azure-bootcamp-2017",
    title: "Sertifikat Partisipasi — Global Azure Bootcamp 2017",
    issuer: "Microsoft Azure Community",
    date: "Apr 22, 2017",
    category: "IT & Digital",
    featured: false,
    status: "active",
    sourceFolder: "02 - Sertifikat IT & Digital",
    summary: "Partisipasi dalam event global workshop mengenai implementasi dan teknologi cloud computing Microsoft Azure.",
    ...createUrls("12wURxZ8GHF7Qm-iz7aY8YyGFIb6Pi0VS"),
    skills: ["Cloud Computing", "Microsoft Azure"]
  },

  // C. Teknik & Manufaktur
  {
    id: "bbpvp-cad-mekanik",
    title: "Sertifikat Kelulusan Pelatihan — Penggambaran Mekanik dengan CAD 80 Jam",
    issuer: "Balai Besar Pelatihan Vokasi dan Produktivitas Bandung",
    date: "Jul 30, 2025",
    category: "Teknik & Manufaktur",
    featured: false,
    status: "active",
    sourceFolder: "03 - Sertifikat Teknik & Manufaktur",
    summary: "Sertifikat pelatihan berbasis kompetensi 80 jam di bidang perancangan mekanik menggunakan perangkat lunak CAD dengan standar industri.",
    ...createUrls("1GIEg0So-Jhb_0W1QLkhta9ekcO364ZNj"),
    skills: ["CAD", "Mechanical Drawing", "Technical Drawing"]
  },
  {
    id: "lubricants-fundamental",
    title: "Sertifikat Pelatihan — Lubricants & Lubrication Fundamental - PT Pertamina Lubricants",
    issuer: "PT Pertamina Lubricants",
    date: "Des 20, 2017",
    category: "Teknik & Manufaktur",
    featured: false,
    status: "active",
    sourceFolder: "03 - Sertifikat Teknik & Manufaktur",
    summary: "Sertifikat kompetensi dasar tentang teknologi pelumasan, formula pelumas, dan aplikasinya pada mesin industri.",
    ...createUrls("1DnhA89dV6MvMFBznFoABetqCJ22N9-Bf"),
    skills: ["Industrial Lubricants", "Maintenance", "Mechanical Engineering"]
  },

  // D. Konstruksi
  {
    id: "lpk-denicont-konstruksi",
    title: "Sertifikat Pelatihan — Tukang Bangunan Gedung Jasa Konstruksi Level 2 - LPK Denicont",
    issuer: "LPK Denicont",
    date: "Nov 25, 2024",
    category: "Konstruksi",
    featured: false,
    status: "active",
    sourceFolder: "03 - Sertifikat Teknik & Manufaktur",
    summary: "Sertifikat pelatihan jasa konstruksi level 2 yang menunjukkan kualifikasi teknis operasional dan koordinasi kerja lapangan.",
    ...createUrls("1ttUPkHFK4OmXN7iBRMsJ-7WCSVTEWK2B"),
    skills: ["Construction", "Field Coordination", "Project Administration"]
  },

  // E. Pengembangan Diri
  {
    id: "japanese-n5",
    title: "Sertifikat Kelulusan — Bahasa Jepang Level N5 - LPK Graha Navigasi Horizon",
    issuer: "LPK Graha Navigasi Horizon",
    date: "Apr 28, 2026",
    category: "Pengembangan Diri",
    featured: false,
    status: "active",
    sourceFolder: "05 - Sertifikat Pengembangan Diri",
    summary: "Sertifikat kelulusan formal untuk kompetensi Bahasa Jepang tingkat dasar (N5), membuktikan kesiapan komunikasi dasar.",
    ...createUrls("182D2qZjwiufYrdWa_acPMwYNXf7AFIyo"),
    skills: ["Japanese Language", "N5 Level", "Intercultural Communication"]
  },
  {
    id: "japanese-lms-disnakertrans",
    title: "Sertifikat Pelatihan — Bahasa Jepang melalui LMS - Disnakertrans Jawa Barat",
    issuer: "Disnakertrans Jawa Barat",
    date: "Apr 28, 2026",
    category: "Pengembangan Diri",
    featured: false,
    status: "active",
    sourceFolder: "05 - Sertifikat Pengembangan Diri",
    summary: "Sertifikat pelatihan Bahasa Jepang terstruktur melalui platform LMS resmi Disnakertrans Jawa Barat.",
    ...createUrls("1ZW62kcf2E4NlF73uUR7cYpfbTVLdyJye"),
    skills: ["Japanese Language", "E-Learning", "Self-Discipline"]
  },
  {
    id: "itenas-leadership",
    title: "Sertifikat Pelatihan — Dasar Pengembangan Relasi dan Sikap Kepemimpinan - Itenas",
    issuer: "Institut Teknologi Nasional Bandung",
    date: "Feb 10-12, 2018",
    category: "Pengembangan Diri",
    featured: false,
    status: "active",
    sourceFolder: "05 - Sertifikat Pengembangan Diri",
    summary: "Pelatihan kepemimpinan dasar mahasiswa untuk membangun soft skill komunikasi, kolaborasi, dan kepemimpinan dalam tim.",
    ...createUrls("1BBLH25QvvyB1dQv-VMIpFHK4czn1vTrh"),
    skills: ["Leadership", "Teamwork", "Relational Skills", "Communication"]
  },
  {
    id: "itenas-self-development",
    title: "Sertifikat Pelatihan — Dasar Pengembangan Diri - Itenas",
    issuer: "Institut Teknologi Nasional Bandung",
    date: "Sep 05-08, 2017",
    category: "Pengembangan Diri",
    featured: false,
    status: "active",
    sourceFolder: "05 - Sertifikat Pengembangan Diri",
    summary: "Sertifikat pelatihan pengembangan kepribadian, manajemen diri, dan kesiapan profesional dari Itenas.",
    ...createUrls("1MAT9cR6Qp8gM_Q5syp7H0tYMJja4jiRq"),
    skills: ["Self Development", "Personal Growth", "Effective Communication"]
  },
  {
    id: "pembinaan-fisik-mental",
    title: "Surat Tanda Tamat Pelatihan — Pembinaan Fisik dan Mental - SMKN 1 Cimahi",
    issuer: "SMK Negeri 1 Cimahi",
    date: "Mei 16, 2016",
    category: "Pengembangan Diri",
    featured: false,
    status: "active",
    sourceFolder: "05 - Sertifikat Pengembangan Diri",
    summary: "Surat tanda tamat pelatihan kedisiplinan, pembinaan fisik, mental, dan etika kerja yang diselenggarakan oleh SMKN 1 Cimahi.",
    ...createUrls("1nYFMPeIJIVPC77mf7w9D5iituygqpzQ0"),
    skills: ["Physical Discipline", "Mental Resilience", "Teamwork", "Responsibility"]
  },
  {
    id: "massage-reflexology-spa",
    title: "Sertifikat Pelatihan — Pijat Tradisional, Refleksi, dan SPA - LKP Anugrah",
    issuer: "LKP Anugrah",
    date: "Agu 13, 2023",
    category: "Pengembangan Diri",
    featured: false,
    status: "active",
    sourceFolder: "05 - Sertifikat Pengembangan Diri",
    summary: "Sertifikat pelatihan kompetensi hospitality dasar, keahlian pijat tradisional, refleksi, dan SPA dari LKP Anugrah.",
    ...createUrls("1FDwISjz8ukJ5RvNAqRD0gjUI_l20xtrL"),
    skills: ["Customer Service", "Traditional Massage", "Reflexology", "Hospitality"]
  },
  {
    id: "vocational-spa",
    title: "Sertifikat Pelatihan Kejuruan — SPA - LKP Anugrah",
    issuer: "LKP Anugrah",
    date: "Agu 08, 2024",
    category: "Pengembangan Diri",
    featured: false,
    status: "active",
    sourceFolder: "05 - Sertifikat Pengembangan Diri",
    summary: "Sertifikat pelatihan kejuruan khusus bidang SPA, memvalidasi keterampilan pelayanan pelanggan dan manajemen kebersihan.",
    ...createUrls("1FDwISjz8ukJ5RvNAqRD0gjUI_l20xtrL"),
    skills: ["Customer Service", "SPA Techniques", "Hospitality", "Wellness Principles"]
  },

  // F. Magang & Partisipasi
  {
    id: "ojt-gen-creative",
    title: "Sertifikat On Job Training (OJT) — Gen Creative Agency",
    issuer: "Gen Creative Agency",
    date: "Sep 27, 2025",
    category: "Magang & Partisipasi",
    featured: true,
    status: "active",
    sourceFolder: "06 - OJT, Magang & Pengalaman Kerja",
    summary: "Sertifikat magang kerja (OJT) sebagai Web Developer, berpartisipasi langsung dalam kolaborasi tim untuk membangun web app komersial.",
    ...createUrls("1WA3iORY4AENkCp_SZpVYGWg_YZM2yfCK"),
    skills: ["OJT", "Web Development", "Collaboration", "Work Experience"]
  },
  {
    id: "pre-university-itenas",
    title: "Sertifikat Partisipasi — Pre University Program Persiapan Belajar - Itenas",
    issuer: "Institut Teknologi Nasional Bandung",
    date: "Sep 11, 2017",
    category: "Magang & Partisipasi",
    featured: false,
    status: "active",
    sourceFolder: "06 - OJT, Magang & Pengalaman Kerja",
    summary: "Sertifikat partisipasi program orientasi akademik dan persiapan belajar mahasiswa di ITENAS.",
    ...createUrls("1alz1pAWSaMRFHkVANbe3_POmnFBkJaLA"),
    skills: ["Academic Orientation", "University Preparation", "Personal Adaptation"]
  },

  // G. Dokumen Pendukung
  {
    id: "ringkas-web-node-react",
    title: "Sertifikat Kelulusan Pelatihan Versi Ringkas — Pengembangan Web dengan Node.js dan React",
    issuer: "Balai Besar Pelatihan Vokasi dan Produktivitas Bandung",
    date: "Agu 2025",
    category: "Dokumen Pendukung",
    featured: false,
    status: "supporting",
    sourceFolder: "07 - Dokumen Pendukung & Surat Keterangan",
    summary: "Dokumen resmi versi ringkas yang membuktikan kelulusan pelatihan pengembangan web di BBPVP Bandung.",
    ...createUrls("1q-QcN_hyQQ3k4RPG1Um50ZZk62oPmaXI"),
    skills: ["Node.js", "React.js", "Web Development"]
  },
  {
    id: "ringkas-cad-mekanik",
    title: "Sertifikat Kelulusan Pelatihan Versi Ringkas — Penggambaran Mekanik dengan CAD",
    issuer: "Balai Besar Pelatihan Vokasi dan Produktivitas Bandung",
    date: "Jul 2025",
    category: "Dokumen Pendukung",
    featured: false,
    status: "supporting",
    sourceFolder: "07 - Dokumen Pendukung & Surat Keterangan",
    summary: "Dokumen resmi versi ringkas kelulusan pelatihan perancangan mekanik menggunakan CAD.",
    ...createUrls("1ZU9K9an6K7BzxZqSftKVb6DpEGdDAvk6"),
    skills: ["CAD", "Drafting"]
  },
  {
    id: "surat-keterangan-cad",
    title: "Surat Keterangan Selesai Pelatihan — Penggambaran Mekanik dengan CAD",
    issuer: "Balai Besar Pelatihan Vokasi dan Produktivitas Bandung",
    date: "Agu 07, 2025",
    category: "Dokumen Pendukung",
    featured: false,
    status: "supporting",
    sourceFolder: "07 - Dokumen Pendukung & Surat Keterangan",
    summary: "Surat keterangan resmi dari BBPVP Bandung yang menyatakan telah menyelesaikan seluruh program pelatihan CAD Mekanik.",
    ...createUrls("10skQV1qYQb4V4DYyQwf3XP3dv9UPsW81"),
    skills: ["CAD", "Official Statement"]
  }
];

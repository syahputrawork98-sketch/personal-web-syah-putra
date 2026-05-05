const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Setup Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'password123';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash: hashedPassword,
    },
    create: {
      email: adminEmail,
      passwordHash: hashedPassword,
    },
  });

  console.log(`✅ Admin user ${admin.email} is ready.`);

  // 2. Setup Default Site Settings (Hero, Profile, Contact)
  console.log('⚙️ Setting up Site Settings...');
  
  const settings = [
    {
      key: 'hero',
      value: {
        name: 'Syah Putra Nugraha',
        roles: ['Full Stack Web Developer', 'Digital Operations Specialist'],
        title: 'Membangun aplikasi web yang rapi, fungsional, dan sesuai kebutuhan bisnis.',
        subtitle: 'Saya mengembangkan website, dashboard, REST API, dan sistem digital untuk membantu proses kerja menjadi lebih efisien, terstruktur, dan mudah dipantau. Berpengalaman di web development serta memiliki latar belakang 8+ tahun di IT, administrasi proyek, konstruksi, manufaktur, dan digitalisasi operasional.',
        primaryCtaLabel: 'Lihat Proyek',
        secondaryCtaLabel: 'Download CV',
        resumeUrl: '#'
      }
    },
    {
      key: 'profile',
      value: {
        aboutTitle: 'About Me',
        summaryTitle: 'Professional Summary',
        summary: 'Saya adalah Full Stack Web Developer dengan pengalaman membangun aplikasi web berbasis React.js, Node.js, Express.js, PHP, MySQL, MongoDB, dan PostgreSQL. Selain kemampuan teknis, saya memiliki latar belakang panjang di bidang IT support, administrasi proyek, general affair, logistik, manufaktur, konstruksi, dan digitalisasi proses kerja.<br/><br/>Pengalaman lintas bidang tersebut membuat saya terbiasa melihat masalah dari sisi teknis sekaligus operasional. Saya tidak hanya membangun aplikasi berdasarkan fitur, tetapi juga memahami bagaimana sistem digunakan oleh admin, tim lapangan, manajemen, klien, dan pengguna akhir dalam pekerjaan sehari-hari.<br/><br/>Saya terbiasa mengerjakan proses pengembangan secara end-to-end, mulai dari analisis kebutuhan, perancangan struktur data, pembuatan frontend dan backend, REST API, authentication, dashboard admin, deployment, hingga maintenance. Saat ini saya berfokus mengembangkan aplikasi web, sistem monitoring, dashboard operasional, dan solusi digital yang membantu bisnis bekerja lebih cepat, rapi, dan terukur.',
        professionalSummary: 'Full Stack Web Developer dengan pengalaman membangun aplikasi web, dashboard admin, REST API, sistem autentikasi, aplikasi monitoring, company profile, dan sistem internal perusahaan. Memiliki latar belakang 8+ tahun di IT, administrasi proyek, manufaktur, konstruksi, general affair, logistik, dan digitalisasi operasional.<br/><br/>Terbiasa menggunakan React.js, Node.js, Express.js, PHP, MySQL, MongoDB, PostgreSQL, Git, GitHub, Vercel, Netlify, cPanel, Google Sheets, Apps Script, dan Excel VBA.',
        valuePropositionTitle: 'Value Proposition',
        valuePropositionIntro: 'Saya membantu bisnis mengubah proses manual menjadi sistem digital yang lebih rapi, cepat, dan mudah dipantau.',
        valuePropositions: [
          {
            title: 'Web Development',
            description: 'Membangun aplikasi web full-stack, dashboard, REST API, sistem login, database, dan website responsif.'
          },
          {
            title: 'Operational Understanding',
            description: 'Memahami kebutuhan lapangan, administrasi proyek, logistik, laporan harian, RAB/RAP, invoice, dokumentasi, dan koordinasi tim.'
          },
          {
            title: 'Digitalization',
            description: 'Mengubah laporan manual, spreadsheet, arsip, dan alur kerja operasional menjadi sistem digital yang lebih terstruktur.'
          },
          {
            title: 'Cross-Functional Coordination',
            description: 'Terbiasa bekerja dengan tim IT, operasional, manajemen, vendor, mandor, kontraktor, HR, dan klien.'
          }
        ],
        avatarUrl: 'https://placehold.co/400x400/000000/FFFFFF/png?text=SP',
        resumeUrl: '#'
      }
    },
    {
      key: 'contact',
      value: {
        email: 'syah.putrawork98@gmail.com',
        location: 'Cimahi, Jawa Barat',
        github: 'https://github.com/syahputrawork98-sketch',
        description: 'Saya terbuka untuk peluang kerja, freelance project, kolaborasi, atau diskusi pengembangan website dan sistem digital. Bila Anda membutuhkan website, dashboard, aplikasi monitoring, atau sistem internal yang lebih rapi dan efisien, saya siap membantu membangun solusinya.',
        title: 'Mari Bekerja Sama'
      }
    }
  ];

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: { key: s.key, value: s.value },
    });
  }
  console.log('✅ Site settings (Hero, Profile, Contact) seeded.');

  // 3. Setup Default Skills
  const defaultSkills = [
    // Frontend
    { name: 'HTML5', type: 'TECHNICAL', category: 'Frontend', order: 1, visible: true },
    { name: 'CSS3', type: 'TECHNICAL', category: 'Frontend', order: 2, visible: true },
    { name: 'JavaScript', type: 'TECHNICAL', category: 'Frontend', order: 3, visible: true },
    { name: 'React.js', type: 'TECHNICAL', category: 'Frontend', order: 4, visible: true },
    { name: 'Bootstrap', type: 'TECHNICAL', category: 'Frontend', order: 5, visible: true },
    { name: 'Responsive Design', type: 'TECHNICAL', category: 'Frontend', order: 6, visible: true },

    // Backend
    { name: 'Node.js', type: 'TECHNICAL', category: 'Backend', order: 7, visible: true },
    { name: 'Express.js', type: 'TECHNICAL', category: 'Backend', order: 8, visible: true },
    { name: 'PHP Native', type: 'TECHNICAL', category: 'Backend', order: 9, visible: true },
    { name: 'REST API', type: 'TECHNICAL', category: 'Backend', order: 10, visible: true },
    { name: 'JWT Authentication', type: 'TECHNICAL', category: 'Backend', order: 11, visible: true },

    // Database
    { name: 'MySQL', type: 'TECHNICAL', category: 'Database', order: 12, visible: true },
    { name: 'MongoDB', type: 'TECHNICAL', category: 'Database', order: 13, visible: true },
    { name: 'PostgreSQL', type: 'TECHNICAL', category: 'Database', order: 14, visible: true },

    // Tools & Deployment
    { name: 'Git', type: 'TOOL', category: 'Tools', order: 15, visible: true },
    { name: 'GitHub', type: 'TOOL', category: 'Tools', order: 16, visible: true },
    { name: 'Postman', type: 'TOOL', category: 'Tools', order: 17, visible: true },
    { name: 'Vercel', type: 'TOOL', category: 'Tools', order: 18, visible: true },
    { name: 'Netlify', type: 'TOOL', category: 'Tools', order: 19, visible: true },
    { name: 'cPanel', type: 'TOOL', category: 'Tools', order: 20, visible: true },

    // Automation & Productivity
    { name: 'Google Sheets', type: 'TOOL', category: 'Automation', order: 21, visible: true },
    { name: 'Google Apps Script', type: 'TOOL', category: 'Automation', order: 22, visible: true },
    { name: 'Excel VBA', type: 'TOOL', category: 'Automation', order: 23, visible: true },
    { name: 'Microsoft Office', type: 'TOOL', category: 'Automation', order: 24, visible: true },

    // Design & Others
    { name: 'Figma Basic', type: 'TOOL', category: 'Others', order: 25, visible: true },
    { name: 'Canva', type: 'TOOL', category: 'Others', order: 26, visible: true },
    { name: 'Photoshop Basic', type: 'TOOL', category: 'Others', order: 27, visible: true },
    { name: 'Basic SEO', type: 'TECHNICAL', category: 'Others', order: 28, visible: true },
    { name: 'Basic Networking', type: 'TECHNICAL', category: 'Others', order: 29, visible: true },
    { name: 'CCTV System', type: 'TECHNICAL', category: 'Others', order: 30, visible: true },
    { name: 'AutoCAD/Revit Understanding', type: 'TECHNICAL', category: 'Others', order: 31, visible: true },
  ];

  await prisma.skill.deleteMany({}); // Clear existing to prevent duplicates/old skills
  for (const skill of defaultSkills) {
    await prisma.skill.create({ data: skill });
  }
  console.log('✅ Default skills seeded.');

  // 4. Setup Experience
  const experiences = [
    {
      role: 'Freelance Full Stack Web Developer',
      company: 'Self-employed / Mandiri',
      startDate: new Date('2025-01-01'),
      isCurrent: true,
      description: 'Mengembangkan website dan aplikasi web untuk UMKM, bisnis lokal, serta kebutuhan operasional. Berfokus pada pembuatan frontend, backend, database, REST API, authentication, dashboard admin, responsive design, deployment, dan maintenance aplikasi.',
      highlights: [
        'Membangun aplikasi berbasis React.js dan Node.js.',
        'Membuat REST API, sistem login berbasis JWT, dan dashboard admin.',
        'Mengembangkan website company profile, katalog layanan, dan aplikasi monitoring.',
        'Melakukan deployment dan maintenance aplikasi.'
      ],
      order: 1,
      status: 'PUBLISHED'
    },
    {
      role: 'Field General Staff — Project Digitalization',
      company: 'PT Sedayu Jaya Konstruksi',
      startDate: new Date('2022-08-01'),
      endDate: new Date('2024-12-31'),
      isCurrent: false,
      description: 'Mendukung administrasi dan koordinasi proyek lapangan pada proyek OK Building Dustira Hospital. Berperan dalam penyusunan laporan proyek, dokumentasi, RAB/RAP, invoice, laporan material, dan koordinasi dengan tim lapangan serta kontraktor utama.',
      highlights: [
        'Mendigitalisasi laporan proyek harian, mingguan, dan bulanan.',
        'Menyusun RAB, RAP, invoice, surat jalan, dan dokumentasi proyek.',
        'Berkoordinasi dengan mandor, vendor, tim lapangan, dan main contractor.',
        'Membantu proses kerja proyek menjadi lebih rapi dan mudah dipantau.'
      ],
      order: 2,
      status: 'PUBLISHED'
    },
    {
      role: 'Personal Assistant & General Staff — Digital Documentation',
      company: 'PT Erusatria Grup',
      startDate: new Date('2020-03-01'),
      endDate: new Date('2022-07-31'),
      isCurrent: false,
      description: 'Menangani administrasi proyek, logistik, stok material, jadwal, dokumen, notulen, dan pelaporan. Membantu merapikan sistem pengarsipan serta laporan logistik berbasis digital.',
      highlights: [
        'Mengelola data stok material dan laporan gudang.',
        'Membuat pengajuan barang, RAP, dan dokumen pendukung proyek.',
        'Mengembangkan sistem laporan digital sederhana berbasis spreadsheet.',
        'Membantu meningkatkan efisiensi dokumentasi sekitar 25%.'
      ],
      order: 3,
      status: 'PUBLISHED'
    },
    {
      role: 'General Affair & System Support',
      company: 'Wisata Ngaprak Bandung',
      startDate: new Date('2018-10-01'),
      endDate: new Date('2019-12-31'),
      isCurrent: false,
      description: 'Mendukung administrasi umum, fasilitas, aset, dokumentasi, kebutuhan IT ringan, serta promosi digital melalui website company profile.',
      highlights: [
        'Membuat website company profile untuk promosi digital.',
        'Mengelola administrasi umum dan pengarsipan.',
        'Mendukung kebutuhan IT internal dan perangkat komputer.',
        'Berkoordinasi dengan pihak internal, eksternal, dan vendor.'
      ],
      order: 4,
      status: 'PUBLISHED'
    },
    {
      role: 'IT Support & System Administrator',
      company: 'PT OTICS Indonesia',
      startDate: new Date('2016-11-01'),
      endDate: new Date('2017-12-31'),
      isCurrent: false,
      description: 'Mengelola perangkat IT pabrik, server, jaringan, CCTV, data karyawan, serta membantu digitalisasi proses HR melalui aplikasi rekrutmen internal.',
      highlights: [
        'Mengelola server, jaringan, CCTV, dan perangkat IT pabrik.',
        'Melakukan troubleshooting hardware dan software.',
        'Mengembangkan aplikasi rekrutmen internal berbasis PHP dan MySQL.',
        'Membuat database karyawan dan dashboard admin sederhana.'
      ],
      order: 5,
      status: 'PUBLISHED'
    }
  ];

  await prisma.experience.deleteMany({});
  for (const exp of experiences) {
    await prisma.experience.create({ data: exp });
  }
  console.log('✅ Experience seeded.');

  // 5. Setup Projects
  const projects = [
    {
      title: 'Construction Project Monitoring Application',
      slug: 'construction-project-monitoring',
      shortDescription: 'Aplikasi web untuk membantu monitoring progres pembangunan rumah, dokumentasi proyek, dan laporan harian.',
      description: 'Aplikasi web untuk membantu monitoring progres pembangunan rumah, dokumentasi proyek, dan laporan harian. Sistem ini dirancang agar proses pelaporan dari lapangan lebih cepat, terstruktur, dan mudah dipantau oleh tim manajemen.\n\n**Fitur utama:**\n- Dashboard progres\n- Laporan harian digital\n- Upload dokumentasi foto\n- Monitoring pekerjaan\n- Manajemen logistik\n\n**Impact:**\nMembantu meningkatkan efisiensi pelaporan proyek hingga sekitar 35%.',
      techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
      status: 'PUBLISHED',
      featured: true,
      order: 1,
    },
    {
      title: 'Event Organizer Showcase Website',
      slug: 'event-organizer-showcase',
      shortDescription: 'Website promosi untuk layanan event organizer dan catering.',
      description: 'Website promosi untuk layanan event organizer dan catering. Website ini menampilkan katalog layanan, portofolio acara, serta jalur inquiry/pemesanan agar calon klien lebih mudah memahami layanan yang ditawarkan.\n\n**Fitur utama:**\n- Portfolio gallery\n- Katalog layanan\n- Inquiry service\n- Responsive mobile design\n\n**Impact:**\nMeningkatkan kepercayaan calon klien dan memperluas jangkauan digital bisnis.',
      techStack: ['React.js', 'Node.js', 'Express.js', 'MySQL'],
      status: 'PUBLISHED',
      featured: true,
      order: 2,
    },
    {
      title: 'Internal Recruitment Application',
      slug: 'internal-recruitment-application',
      shortDescription: 'Sistem internal untuk membantu HR mengelola data pelamar, status seleksi, dan monitoring proses rekrutmen.',
      description: 'Sistem internal untuk membantu HR mengelola data pelamar, status seleksi, dan monitoring proses rekrutmen. Aplikasi ini dibuat untuk menggantikan proses manual yang rawan kesalahan dan memakan waktu.\n\n**Fitur utama:**\n- Database pelamar\n- Filter status\n- Dashboard HR\n- Export data\n\n**Impact:**\nMempercepat proses rekrutmen dan mengurangi kesalahan administrasi data.',
      techStack: ['PHP', 'MySQL', 'HTML', 'CSS'],
      status: 'PUBLISHED',
      featured: false,
      order: 3,
    },
    {
      title: 'Company Profile Website',
      slug: 'company-profile-website',
      shortDescription: 'Website company profile untuk menampilkan profil usaha, layanan, galeri destinasi, dan informasi kontak.',
      description: 'Website company profile untuk menampilkan profil usaha, layanan, galeri destinasi, dan informasi kontak. Website ini membantu perusahaan memiliki pusat informasi digital yang lebih mudah diakses calon pelanggan.\n\n**Fitur utama:**\n- Informasi destinasi\n- Galeri foto\n- Google Maps integration\n- Kontak cepat\n\n**Impact:**\nMembantu memperkuat kehadiran digital perusahaan.',
      techStack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
      status: 'PUBLISHED',
      featured: false,
      order: 4,
    }
  ];

  await prisma.project.deleteMany({});
  for (const project of projects) {
    await prisma.project.create({ data: project });
  }
  console.log('✅ Projects seeded.');

  // 6. Setup Credentials (Sample if needed, or based on previous draft)
  const credentials = [
    {
      id: 'cert-001',
      slug: 'full-stack-web-development',
      title: 'Full Stack Web Development',
      issuer: 'Udemy',
      category: 'IT & Software',
      summary: 'Comprehensive course covering frontend and backend technologies.',
      portfolioRelevance: 'Directly applicable to current role.',
      skills: ['React', 'Node.js', 'PostgreSQL'],
      issueDate: new Date('2023-01-01'),
      driveUrl: 'https://google.com',
      featured: true,
      showOnCertificatePage: true,
      verificationStatus: 'VERIFIED'
    }
  ];

  await prisma.credential.deleteMany({});
  for (const cert of credentials) {
    await prisma.credential.create({ data: cert });
  }
  console.log('✅ Credentials seeded.');

  console.log('🏁 Seeding finished successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Error while seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

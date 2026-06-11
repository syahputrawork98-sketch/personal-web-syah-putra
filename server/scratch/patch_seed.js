const fs = require('fs');

const path = 'prisma/seed.js';
let content = fs.readFileSync(path, 'utf8');

// Target string to replace
const target = `  // 5. Setup Projects
  const projects = [
    {
      title: 'Construction Project Monitoring Application',
      slug: 'construction-project-monitoring',
      shortDescription: 'Aplikasi web untuk membantu monitoring progres pembangunan rumah, dokumentasi proyek, dan laporan harian.',
      description: 'Aplikasi web untuk membantu monitoring progres pembangunan rumah, dokumentasi proyek, dan laporan harian. Sistem ini dirancang agar proses pelaporan dari lapangan lebih cepat, terstruktur, dan mudah dipantau oleh tim manajemen.\\n\\n**Fitur utama:**\\n- Dashboard progres\\n- Laporan harian digital\\n- Upload dokumentasi foto\\n- Monitoring pekerjaan\\n- Manajemen logistik\\n\\n**Impact:**\\nMembantu meningkatkan efisiensi pelaporan proyek hingga sekitar 35%.',
      techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
      status: 'PUBLISHED',
      featured: true,
      order: 1,
    },
    {
      title: 'Event Organizer Showcase Website',
      slug: 'event-organizer-showcase',
      shortDescription: 'Website promosi untuk layanan event organizer dan catering.',
      description: 'Website promosi untuk layanan event organizer dan catering. Website ini menampilkan katalog layanan, portofolio acara, serta jalur inquiry/pemesanan agar calon klien lebih mudah memahami layanan yang ditawarkan.\\n\\n**Fitur utama:**\\n- Portfolio gallery\\n- Katalog layanan\\n- Inquiry service\\n- Responsive mobile design\\n\\n**Impact:**\\nMeningkatkan kepercayaan calon klien dan memperluas jangkauan digital bisnis.',
      techStack: ['React.js', 'Node.js', 'Express.js', 'MySQL'],
      status: 'PUBLISHED',
      featured: true,
      order: 2,
    },
    {
      title: 'Internal Recruitment Application',
      slug: 'internal-recruitment-application',
      shortDescription: 'Sistem internal untuk membantu HR mengelola data pelamar, status seleksi, dan monitoring proses rekrutmen.',
      description: 'Sistem internal untuk membantu HR mengelola data pelamar, status seleksi, dan monitoring proses rekrutmen. Aplikasi ini dibuat untuk menggantikan proses manual yang rawan kesalahan dan memakan waktu.\\n\\n**Fitur utama:**\\n- Database pelamar\\n- Filter status\\n- Dashboard HR\\n- Export data\\n\\n**Impact:**\\nMempercepat proses rekrutmen dan mengurangi kesalahan administrasi data.',
      techStack: ['PHP', 'MySQL', 'HTML', 'CSS'],
      status: 'PUBLISHED',
      featured: false,
      order: 3,
    },
    {
      title: 'Company Profile Website',
      slug: 'company-profile-website',
      shortDescription: 'Website company profile untuk menampilkan profil usaha, layanan, galeri destinasi, dan informasi kontak.',
      description: 'Website company profile untuk menampilkan profil usaha, layanan, galeri destinasi, dan informasi kontak. Website ini membantu perusahaan memiliki pusat informasi digital yang lebih mudah diakses calon pelanggan.\\n\\n**Fitur utama:**\\n- Informasi destinasi\\n- Galeri foto\\n- Google Maps integration\\n- Kontak cepat\\n\\n**Impact:**\\nMembantu memperkuat kehadiran digital perusahaan.',
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
  console.log('✅ Projects seeded.');`;

const replacement = `  // 5. Setup Projects
  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    const projects = [
      {
        title: 'Construction Project Monitoring Application',
        slug: 'construction-project-monitoring',
        shortDescription: 'Aplikasi web untuk membantu monitoring progres pembangunan rumah, dokumentasi proyek, dan laporan harian.',
        description: 'Aplikasi web untuk membantu monitoring progres pembangunan rumah, dokumentasi proyek, dan laporan harian. Sistem ini dirancang agar proses pelaporan dari lapangan lebih cepat, terstruktur, dan mudah dipantau oleh tim manajemen.\\n\\n**Fitur utama:**\\n- Dashboard progres\\n- Laporan harian digital\\n- Upload dokumentasi foto\\n- Monitoring pekerjaan\\n- Manajemen logistik\\n\\n**Impact:**\\nMembantu meningkatkan efisiensi pelaporan proyek hingga sekitar 35%.',
        techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
        status: 'PUBLISHED',
        featured: true,
        order: 1,
      },
      {
        title: 'Event Organizer Showcase Website',
        slug: 'event-organizer-showcase',
        shortDescription: 'Website promosi untuk layanan event organizer dan catering.',
        description: 'Website promosi untuk layanan event organizer dan catering. Website ini menampilkan katalog layanan, portofolio acara, serta jalur inquiry/pemesanan agar calon klien lebih mudah memahami layanan yang ditawarkan.\\n\\n**Fitur utama:**\\n- Portfolio gallery\\n- Katalog layanan\\n- Inquiry service\\n- Responsive mobile design\\n\\n**Impact:**\\nMeningkatkan kepercayaan calon klien dan memperluas jangkauan digital bisnis.',
        techStack: ['React.js', 'Node.js', 'Express.js', 'MySQL'],
        status: 'PUBLISHED',
        featured: true,
        order: 2,
      },
      {
        title: 'Internal Recruitment Application',
        slug: 'internal-recruitment-application',
        shortDescription: 'Sistem internal untuk membantu HR mengelola data pelamar, status seleksi, dan monitoring proses rekrutmen.',
        description: 'Sistem internal untuk membantu HR mengelola data pelamar, status seleksi, dan monitoring proses rekrutmen. Aplikasi ini dibuat untuk menggantikan proses manual yang rawan kesalahan dan memakan waktu.\\n\\n**Fitur utama:**\n- Database pelamar\n- Filter status\n- Dashboard HR\n- Export data\n\\n**Impact:**\\nMempercepat proses rekrutmen dan mengurangi kesalahan administrasi data.',
        techStack: ['PHP', 'MySQL', 'HTML', 'CSS'],
        status: 'PUBLISHED',
        featured: false,
        order: 3,
      },
      {
        title: 'Company Profile Website',
        slug: 'company-profile-website',
        shortDescription: 'Website company profile untuk menampilkan profil usaha, layanan, galeri destinasi, dan informasi kontak.',
        description: 'Website company profile untuk menampilkan profil usaha, layanan, galeri destinasi, dan informasi kontak. Website ini membantu perusahaan memiliki pusat informasi digital yang lebih mudah diakses calon pelanggan.\\n\\n**Fitur utama:**\\n- Informasi destinasi\\n- Galeri foto\\n- Google Maps integration\\n- Kontak cepat\\n\\n**Impact:**\\nMembantu memperkuat kehadiran digital perusahaan.',
        techStack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
        status: 'PUBLISHED',
        featured: false,
        order: 4,
      }
    ];

    for (const project of projects) {
      await prisma.project.create({ data: project });
    }
    console.log('✅ Default projects seeded.');
  } else {
    console.log('ℹ️ Projects already exist in database. Skipping project seeding.');
  }`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(path, content, 'utf8');
  console.log('Successfully patched seed.js!');
} else {
  console.log('Target string not found in seed.js');
}

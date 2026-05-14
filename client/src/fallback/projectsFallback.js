/**
 * Data Proyek Fallback
 * Batch 14 - Menyiapkan kategori lintas bidang
 */

export const projectsFallback = [
  // IT & Web
  {
    id: "construction-monitoring-system",
    title: "Sistem Monitoring Proyek Konstruksi",
    subtitle: "Rumahku Kontraktor",
    category: "IT & Web",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    description: "Aplikasi web untuk monitoring progres pembangunan rumah. Fitur utama mencakup dashboard progres, laporan harian, dokumentasi proyek, dan monitoring pekerjaan.",
    role: "Full Stack Developer",
    impact: "Meningkatkan efisiensi pelaporan proyek hingga 35%.",
    challenge: "Sulitnya memantau progres harian secara real-time dari banyak lokasi proyek konstruksi.",
    solution: "Membangun sistem pelaporan berbasis cloud yang memungkinkan mandor mengupload laporan langsung dari lapangan.",
    features: ["Dashboard Progres", "Upload Dokumentasi Foto", "Laporan Harian Digital", "Manajemen Logistik"],
    imageUrl: "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=800",
    links: {
      github: "https://github.com/syahputranugraha",
      demo: ""
    },
    featured: true,
    orderIndex: 1
  },
  {
    id: "event-organizer-showcase",
    title: "Website Showcase Event Organizer",
    subtitle: "Siqah",
    category: "IT & Web",
    techStack: ["React.js", "Node.js", "Express.js", "MySQL"],
    description: "Website promosi jasa event organizer dan catering dengan katalog layanan, portfolio acara, serta fitur inquiry/pemesanan.",
    role: "Full Stack Developer",
    impact: "Meningkatkan kepercayaan klien dan memperluas jangkauan digital bisnis.",
    challenge: "Kurangnya kehadiran digital untuk menarik klien menengah-keatas dalam industri EO.",
    solution: "Desain website premium dengan galeri portofolio interaktif dan sistem katalog layanan yang dinamis.",
    features: ["Portfolio Gallery", "Layanan Inquiry", "Katalog Paket Catering", "Responsif Mobile"],
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
    links: {
      github: "https://github.com/syahputranugraha",
      demo: ""
    },
    featured: true,
    orderIndex: 2
  },

  // Manufaktur & Teknik
  {
    id: "mechanical-fixture-design",
    title: "Desain Fixture Produksi Manufaktur",
    subtitle: "Optimization Project",
    category: "Manufaktur & Teknik",
    techStack: ["AutoCAD", "SolidWorks", "Technical Drawing"],
    description: "Perancangan fixture untuk meningkatkan akurasi dan kecepatan proses produksi komponen mesin.",
    role: "Mechanical Designer",
    impact: "Mengurangi tingkat reject produk hingga 15%.",
    challenge: "Presisi pemasangan komponen yang tidak konsisten pada lini produksi lama.",
    solution: "Merancang jig dan fixture kustom dengan sistem penguncian pneumatik.",
    features: ["Pneumatic Clamping", "High Precision Design", "Standard Component Usage"],
    imageUrl: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=800",
    links: {
      drive: "",
      model: ""
    },
    featured: false,
    orderIndex: 3
  },

  // Model Mesin 3D
  {
    id: "engine-component-3d",
    title: "Pemodelan 3D Komponen Mesin Industri",
    subtitle: "3D Asset Library",
    category: "Model Mesin 3D",
    techStack: ["SolidWorks", "Blender", "KeyShot"],
    description: "Pembuatan model 3D detail untuk berbagai komponen mesin industri yang siap digunakan untuk simulasi dan visualisasi produk.",
    role: "3D Modeler",
    impact: "Mempercepat proses prototyping dan presentasi teknis kepada klien.",
    challenge: "Visualisasi teknis komponen internal mesin yang sulit dijelaskan hanya dengan gambar 2D.",
    solution: "Membuat model 3D high-fidelity dengan rendering fotorealistik untuk presentasi teknis.",
    features: ["Photorealistic Rendering", "Detailed Assembly", "Exploded View"],
    imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
    links: {
      model: "",
      preview: ""
    },
    featured: false,
    orderIndex: 4
  },

  // Model Bangunan & RAB
  {
    id: "residential-building-estimate",
    title: "Pemodelan Bangunan & Estimasi Biaya (RAB)",
    subtitle: "Residential Project",
    category: "Model Bangunan & RAB",
    techStack: ["AutoCAD", "Excel", "SketchUp"],
    description: "Penyusunan Rencana Anggaran Biaya (RAB) dan pemodelan bangunan 2D/3D untuk proyek hunian residensial.",
    role: "Cost Estimator & Drafter",
    impact: "Akurasi estimasi biaya mencapai 95% dari nilai realisasi lapangan.",
    challenge: "Variasi harga material yang fluktuatif dan kebutuhan visualisasi ruang yang akurat bagi klien.",
    solution: "Integrasi data material dinamis di Excel dengan pemodelan ruang 3D yang presisi.",
    features: ["Detailed RAB", "2D/3D Visualization", "Material Schedule"],
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    links: {
      rab: "",
      drive: ""
    },
    featured: false,
    orderIndex: 5
  }
];

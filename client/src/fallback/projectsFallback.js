/**
 * Data Proyek Fallback
 * Batch 16 Fix - Clean Project Asset Links
 * Menghapus semua link demonstratif/placeholder dan hanya menyisakan field kosong 
 * atau URL yang benar-benar asli.
 */

export const projectsFallback = [
  // ==========================================
  // IT & WEB
  // ==========================================
  {
    id: "construction-monitoring-system",
    title: "Sistem Monitoring Proyek Konstruksi",
    subtitle: "Enterprise Management System",
    category: "IT & Web",
    status: "Production",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Framer Motion"],
    description: "Aplikasi web responsif untuk pemantauan progres konstruksi secara real-time. Menjembatani koordinasi operasional antara manajemen, kontraktor, dan tim lapangan melalui dashboard digital.",
    role: "Full Stack Web Developer",
    impact: "Meningkatkan efisiensi pelaporan harian dan mempercepat pengambilan keputusan operasional lintas departemen.",
    challenge: "Kebutuhan sinkronisasi data operasional dari lokasi proyek ke pusat secara akurat, serta visualisasi progres yang mudah dipahami oleh berbagai peran.",
    solution: "Membangun arsitektur backend yang tangguh untuk sinkronisasi data yang konsisten, dipadukan dengan frontend interaktif yang merangkum metrik proyek.",
    features: ["Dashboard Progres Real-time", "Manajemen Logistik & Material", "Laporan Harian Digital", "Dokumentasi Foto Lapangan"],
    imageUrl: "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=800",
    links: {
      github: "https://github.com/syahputranugraha",
      demo: "",
      figma: ""
    },
    featured: true,
    orderIndex: 1
  },
  {
    id: "event-organizer-showcase",
    title: "Website Portfolio Event Organizer",
    subtitle: "High-End Service Showcase",
    category: "IT & Web",
    status: "Production",
    techStack: ["React.js", "Vite", "Vanilla CSS", "EmailJS"],
    description: "Website company profile modern yang dirancang untuk penyedia jasa event organizer, berfokus pada performa tinggi, SEO, dan konversi calon klien.",
    role: "Web Developer",
    impact: "Meningkatkan visibilitas digital perusahaan dan memberikan pengalaman pengguna yang profesional dan responsif.",
    challenge: "Menyajikan galeri media berkualitas tinggi dan interaksi UI yang halus tanpa membebani performa load time website.",
    solution: "Mengimplementasikan teknik optimasi aset, lazy loading, dan struktur komponen UI yang efisien menggunakan ekosistem React.",
    features: ["Interactive Portfolio Gallery", "Katalog Layanan Dinamis", "Sistem Inquiry Terintegrasi", "Optimasi SEO Dasar"],
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
    links: {
      github: "https://github.com/syahputranugraha",
      demo: ""
    },
    featured: true,
    orderIndex: 2
  },

  // ==========================================
  // MANUFAKTUR & TEKNIK
  // ==========================================
  {
    id: "mechanical-fixture-design",
    title: "Desain Fixture Produksi Komponen Mesin",
    subtitle: "Manufacturing Process Optimization",
    category: "Manufaktur & Teknik",
    status: "Completed",
    techStack: ["AutoCAD", "SolidWorks", "Mechanical Engineering"],
    description: "Perancangan solusi mekanik khusus untuk mengoptimalkan proses pemesinan komponen industri, menunjukkan kemampuan analisis teknis presisi tinggi.",
    role: "Mechanical Designer",
    impact: "Meningkatkan efisiensi setup produksi serta mengurangi tingkat kesalahan posisi pada manufaktur massal.",
    challenge: "Kebutuhan akan pencekaman (clamping) yang kuat namun tetap presisi tanpa merusak permukaan benda kerja yang sensitif.",
    solution: "Merancang fixture dengan sistem toggle clamp yang disesuaikan dengan geometri spesifik benda kerja.",
    features: ["Precision Alignment Pins", "Quick-Release Clamping System", "Material Sourcing List", "Detailed Shop Drawings"],
    imageUrl: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=800",
    links: {
      drive: "",
      model: ""
    },
    featured: false,
    orderIndex: 3
  },
  {
    id: "mold-design-injection",
    title: "Desain Mold Plastic Injection",
    subtitle: "Industrial Tooling Design",
    category: "Manufaktur & Teknik",
    status: "Completed",
    techStack: ["SolidWorks", "MoldFlow", "CAD"],
    description: "Perancangan sistem cetakan (mold) untuk produk plastik industri dengan fokus pada efisiensi pendinginan dan optimasi siklus produksi.",
    role: "CAD Engineer",
    impact: "Menghasilkan desain cetakan yang andal dengan efisiensi waktu siklus yang lebih baik dari target standar.",
    challenge: "Menghindari terjadinya cacat produksi seperti 'sink marks' pada bagian dinding produk yang tidak merata.",
    solution: "Optimasi sistem pendinginan (cooling system) dan penentuan gate location yang strategis melalui simulasi desain.",
    features: ["Core & Cavity Separation", "Ejection System Design", "Cooling Channel Layout", "BOM for Hardware"],
    imageUrl: "https://images.unsplash.com/photo-1565608438257-fac3c27beb36?auto=format&fit=crop&q=80&w=800",
    links: {
      drive: ""
    },
    featured: false,
    orderIndex: 4
  },

  // ==========================================
  // MODEL MESIN 3D
  // ==========================================
  {
    id: "engine-component-3d",
    title: "Pemodelan 3D Komponen V6 Engine",
    subtitle: "Detailed Mechanical Modeling",
    category: "Model Mesin 3D",
    status: "Prototype",
    techStack: ["SolidWorks", "KeyShot", "Blender"],
    description: "Pemodelan 3D mendalam untuk komponen mesin V6, termasuk piston, crankshaft, dan connecting rod untuk tujuan edukasi dan simulasi teknis.",
    role: "3D Modeler",
    impact: "Mendukung digitalisasi materi pelatihan mekanik melalui visualisasi teknis yang akurat dan interaktif.",
    challenge: "Memodelkan geometri kompleks komponen presisi agar selaras dengan standar dimensi industri perakitan.",
    solution: "Penggunaan teknik surface modeling mutakhir untuk menangani profil kurva yang rumit dan memastikan assembly yang sempurna.",
    features: ["Exploded View Animation", "High-Resolution Render", "Accurate Dimension Scaling", "Multiple Format Export (STEP, OBJ)"],
    imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
    links: {
      model: "",
      preview: ""
    },
    featured: false,
    orderIndex: 5
  },
  {
    id: "robotic-arm-assembly",
    title: "Assembly 3D Lengan Robot Industri",
    subtitle: "Automation Asset Library",
    category: "Model Mesin 3D",
    status: "Prototype",
    techStack: ["SolidWorks", "Fusion 360"],
    description: "Pemodelan dan perakitan (assembly) 6-axis robotic arm yang dirancang untuk keperluan simulasi layout dan otomasi pabrik.",
    role: "3D Modeler",
    impact: "Menyediakan referensi tata letak digital yang andal untuk kebutuhan perencanaan dan simulasi otomasi industri.",
    challenge: "Memastikan seluruh persendian (joints) robot memiliki rentang gerak yang realistis tanpa benturan komponen.",
    solution: "Implementasi analisis 'Motion Study' dan penerapan batas 'Mates Constraint' yang presisi dalam perakitan CAD.",
    features: ["6-Axis Movement Simulation", "Integrated Wiring Routing", "Standard Motor Components", "Weight & Balance Analysis"],
    imageUrl: "https://images.unsplash.com/photo-1531325082793-ca7c9ad6583a?auto=format&fit=crop&q=80&w=800",
    links: {
      model: ""
    },
    featured: false,
    orderIndex: 6
  },

  // ==========================================
  // MODEL BANGUNAN & RAB
  // ==========================================
  {
    id: "residential-building-estimate",
    title: "RAB & Pemodelan Hunian Residensial",
    subtitle: "Cost Estimation & Planning",
    category: "Model Bangunan & RAB",
    status: "Completed",
    techStack: ["AutoCAD", "SketchUp", "Excel (VBA)"],
    description: "Penyusunan Rencana Anggaran Biaya (RAB) detail untuk pembangunan rumah tinggal, lengkap dengan pemodelan visual 3D struktural.",
    role: "Quantity Surveyor & Estimator",
    impact: "Mengendalikan anggaran proyek secara sistematis serta memberikan transparansi biaya yang jelas kepada stakeholders.",
    challenge: "Menyelaraskan kebutuhan desain visual klien dengan batasan budget yang ketat tanpa mengorbankan keamanan struktur.",
    solution: "Melakukan rekayasa nilai (value engineering) secara mendalam untuk menawarkan alternatif material yang lebih efisien.",
    features: ["Detail Daftar Kuantitas (BoQ)", "Visualisasi Eksterior 3D", "Analisis Harga Sahuan (AHS)", "Jadwal Pelaksanaan (Curve-S)"],
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    links: {
      rab: "",
      drive: ""
    },
    featured: false,
    orderIndex: 7
  },
  {
    id: "warehouse-structure-rab",
    title: "Estimasi Biaya Struktur Gudang Baja",
    subtitle: "Industrial Costing",
    category: "Model Bangunan & RAB",
    status: "Completed",
    techStack: ["Excel", "SAP2000", "AutoCAD"],
    description: "Perhitungan estimasi kelayakan biaya konstruksi untuk bangunan fasilitas gudang rangka baja bentang lebar.",
    role: "Cost Estimator",
    impact: "Menyediakan estimasi pembiayaan yang andal dan dinamis untuk mendukung dokumen penawaran tender.",
    challenge: "Menghadapi risiko fluktuasi harga baja profil yang tinggi selama siklus perencanaan proyek yang panjang.",
    solution: "Merancang sistem RAB dinamis berbasis Excel dengan variabel referensi silang yang memperbarui total biaya otomatis.",
    features: ["Steel Weight Calculation", "Foundation Cost Analysis", "Labor Productivity Rate", "Material Waste Estimation"],
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    links: {
      rab: ""
    },
    featured: false,
    orderIndex: 8
  }
];

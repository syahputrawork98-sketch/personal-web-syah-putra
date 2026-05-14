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
    description: "Platform digital untuk mengelola progres pembangunan konstruksi secara real-time. Memungkinkan kolaborasi antara pemilik proyek, kontraktor, dan mandor lapangan.",
    role: "Lead Full Stack Developer",
    impact: "Meningkatkan akurasi pelaporan lapangan hingga 40% dan mengurangi keterlambatan koordinasi logistik.",
    challenge: "Sinkronisasi data dari lokasi konstruksi dengan koneksi internet terbatas dan kebutuhan visualisasi progres yang intuitif.",
    solution: "Implementasi sistem offline-first untuk input data dan dashboard interaktif dengan progres bar otomatis berdasarkan bobot pekerjaan.",
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
    description: "Website showcase premium untuk jasa event organizer dan catering yang berfokus pada estetika visual dan kemudahan pemesanan layanan.",
    role: "Full Stack Developer",
    impact: "Berhasil menarik klien korporasi baru dan meningkatkan volume inquiry lewat website hingga 25%.",
    challenge: "Menampilkan galeri foto acara berkualitas tinggi tanpa mengorbankan kecepatan loading halaman.",
    solution: "Penggunaan teknik lazy loading gambar dan optimasi aset visual menggunakan format modern.",
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
    description: "Perancangan fixture mekanik khusus untuk proses machining komponen mesin guna memastikan presisi tinggi dan pengulangan (repeatability) produksi.",
    role: "Mechanical Designer",
    impact: "Mengurangi waktu setup produksi sebesar 20% dan menurunkan angka produk reject akibat kesalahan posisi.",
    challenge: "Kebutuhan akan pencekaman yang kuat namun tetap presisi tanpa merusak permukaan benda kerja.",
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
    description: "Perancangan sistem cetakan (mold) untuk produk plastik industri dengan fokus pada efisiensi pendinginan dan siklus produksi.",
    role: "CAD Engineer",
    impact: "Desain berhasil diproduksi dan mencapai cycle time yang lebih cepat dari target awal.",
    challenge: "Menghindari terjadinya cacat produksi seperti 'sink marks' pada bagian dinding yang tebal.",
    solution: "Optimasi sistem pendinginan (cooling system) dan penentuan gate location yang strategis.",
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
    description: "Pemodelan 3D mendalam untuk komponen mesin V6, termasuk piston, crankshaft, dan connecting rod untuk tujuan edukasi dan simulasi.",
    role: "3D Modeler",
    impact: "Digunakan sebagai aset visual dalam materi pelatihan teknis mekanik.",
    challenge: "Memodelkan geometri kompleks piston head agar sesuai dengan standar teknis industri.",
    solution: "Penggunaan teknik surface modeling untuk geometri yang rumit dan assembly mating yang presisi.",
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
    description: "Pemodelan dan perakitan (assembly) 6-axis robotic arm yang dirancang untuk keperluan simulasi otomasi pabrik.",
    role: "3D Modeler & Assembly Specialist",
    impact: "Memudahkan tim engineering dalam merencanakan layout ruang kerja robot.",
    challenge: "Memastikan seluruh join (persendian) robot memiliki limitasi gerak yang realistis.",
    solution: "Implementasi 'Motion Study' dan 'Mates Constraint' yang akurat di SolidWorks.",
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
    description: "Penyusunan Rencana Anggaran Biaya (RAB) detail untuk pembangunan rumah tinggal tipe 70, lengkap dengan pemodelan visual 3D.",
    role: "Quantity Surveyor & Estimator",
    impact: "Memberikan transparansi biaya bagi klien dan mencegah pembengkakan anggaran saat konstruksi.",
    challenge: "Menyesuaikan desain keinginan klien dengan budget yang terbatas tanpa mengurangi kualitas struktur.",
    solution: "Melakukan analisis harga satuan material secara mendalam dan menawarkan alternatif material berkualitas setara.",
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
    description: "Perhitungan estimasi biaya untuk konstruksi gudang rangka baja bentang lebar seluas 1200 m2.",
    role: "Cost Estimator",
    impact: "Dokumen RAB digunakan sebagai dasar penawaran tender kontraktor.",
    challenge: "Fluktuasi harga baja profil yang sangat tinggi saat proses perencanaan.",
    solution: "Membuat template RAB dinamis di Excel yang terhubung dengan database harga material terkini.",
    features: ["Steel Weight Calculation", "Foundation Cost Analysis", "Labor Productivity Rate", "Material Waste Estimation"],
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    links: {
      rab: ""
    },
    featured: false,
    orderIndex: 8
  }
];

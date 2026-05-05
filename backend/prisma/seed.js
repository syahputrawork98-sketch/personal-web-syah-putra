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

  // 2. Setup Sample Projects
  const sampleProjects = [
    {
      title: 'Construction Monitoring System',
      slug: 'construction-monitoring-system',
      shortDescription: 'A web-based platform for monitoring construction project progress.',
      description: 'Built with React and Node.js to help project managers track daily reports and material logs from various field locations.',
      techStack: ['React', 'Node.js', 'PostgreSQL', 'Prisma'],
      status: 'PUBLISHED',
      featured: true,
      order: 1,
    },
    {
      title: 'E-Commerce Backend API',
      slug: 'ecommerce-backend-api',
      shortDescription: 'Robust RESTful API for a modern e-commerce platform.',
      description: 'Features include JWT authentication, role-based access control, and complex order management logic.',
      techStack: ['Express', 'Prisma', 'PostgreSQL', 'JWT'],
      status: 'PUBLISHED',
      featured: false,
      order: 2,
    },
    {
      title: 'Personal Portfolio CMS',
      slug: 'personal-portfolio-cms',
      shortDescription: 'Custom CMS for managing portfolio content.',
      description: 'This is the current project! A simple yet powerful dashboard to manage projects and certifications.',
      techStack: ['React', 'Express', 'Prisma', 'Tailwind'],
      status: 'DRAFT',
      featured: false,
      order: 3,
    }
  ];

  for (const project of sampleProjects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    });
  }

  console.log('✅ Sample projects seeded.');
  
  // 3. Setup Default Site Settings (Hero, Profile, Contact)
  console.log('⚙️ Setting up Site Settings...');
  
  const settings = [
    {
      key: 'hero',
      value: {
        name: 'Syah Putra Nugraha',
        roles: ['Fullstack Web Developer', 'Frontend Specialist', 'Backend Enthusiast'],
        title: 'Building Digital Experiences with Precision.',
        subtitle: 'Specializing in high-performance web applications and digital transformation with over 8 years of IT experience.',
        primaryCtaLabel: 'View Projects',
        secondaryCtaLabel: 'Download CV',
        resumeUrl: '#'
      }
    },
    {
      key: 'profile',
      value: {
        aboutTitle: 'About Me',
        summaryTitle: 'Professional Overview',
        summary: 'Experienced Fullstack Web Developer with a strong background in React.js, Node.js, and modern web technologies. I have spent years bridging the gap between complex business requirements and elegant technical solutions.',
        avatarUrl: 'https://placehold.co/400x400/000000/FFFFFF/png?text=SP',
        resumeUrl: '#'
      }
    },
    {
      key: 'contact',
      value: {
        email: adminEmail,
        phone: '+628123456789',
        whatsapp: '+628123456789',
        github: 'https://github.com/syahputranugraha',
        linkedin: 'https://linkedin.com/in/syahputranugraha',
        instagram: 'https://instagram.com/syah_putra_n',
        location: 'Cimahi, West Java, Indonesia'
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

  // 4. Setup Default Skills
  const defaultSkills = [
    // Technical Skills
    { name: 'React', type: 'TECHNICAL', category: 'Frontend', level: 'Advanced', order: 1, visible: true },
    { name: 'JavaScript', type: 'TECHNICAL', category: 'Language', level: 'Advanced', order: 2, visible: true },
    { name: 'TypeScript', type: 'TECHNICAL', category: 'Language', level: 'Intermediate', order: 3, visible: true },
    { name: 'Node.js', type: 'TECHNICAL', category: 'Backend', level: 'Intermediate', order: 4, visible: true },
    { name: 'Express.js', type: 'TECHNICAL', category: 'Backend', level: 'Intermediate', order: 5, visible: true },
    { name: 'PostgreSQL', type: 'TECHNICAL', category: 'Database', level: 'Intermediate', order: 6, visible: true },
    { name: 'Prisma', type: 'TECHNICAL', category: 'ORM', level: 'Intermediate', order: 7, visible: true },
    
    // Soft Skills
    { name: 'Communication', type: 'SOFT', category: 'General', order: 10, visible: true },
    { name: 'Problem Solving', type: 'SOFT', category: 'General', order: 11, visible: true },
    { name: 'Teamwork', type: 'SOFT', category: 'General', order: 12, visible: true },
    { name: 'Adaptability', type: 'SOFT', category: 'General', order: 13, visible: true },
    { name: 'Time Management', type: 'SOFT', category: 'General', order: 14, visible: true },
    
    // Tools
    { name: 'Git', type: 'TOOL', category: 'Tools', order: 20, visible: true },
    { name: 'GitHub', type: 'TOOL', category: 'Tools', order: 21, visible: true },
    { name: 'VS Code', type: 'TOOL', category: 'Tools', order: 22, visible: true },
  ];

  for (const skill of defaultSkills) {
    await prisma.skill.upsert({
      where: {
        name_type: {
          name: skill.name,
          type: skill.type
        }
      },
      update: skill,
      create: skill,
    });
  }
  console.log('✅ Default skills seeded.');

  // 5. Setup Education
  const defaultEdu = [
    {
      school: 'SMK Negeri 1 Cimahi',
      degree: 'Software Engineering',
      period: '2013 - 2017',
      description: 'Focused on web development and software architecture.',
      sortOrder: 1,
      isActive: true
    }
  ];

  const eduCount = await prisma.education.count();
  if (eduCount === 0) {
    for (const edu of defaultEdu) {
      await prisma.education.create({ data: edu });
    }
    console.log('✅ Education seeded.');
  }

  // 6. Setup Experience
  const defaultExp = [
    {
      role: 'Fullstack Web Developer',
      company: 'Self-employed',
      location: 'Remote',
      type: 'Freelance',
      startDate: new Date('2023-05-01'),
      isCurrent: true,
      description: 'Building modern web applications using React and Node.js.',
      highlights: ['Developed custom CMS', 'Optimized database performance'],
      techStack: ['React', 'Node.js', 'PostgreSQL'],
      status: 'PUBLISHED',
      order: 1
    }
  ];

  const expCount = await prisma.experience.count();
  if (expCount === 0) {
    for (const exp of defaultExp) {
      await prisma.experience.create({ data: exp });
    }
    console.log('✅ Experience seeded.');
  }

  // 7. Setup Sample Credentials
  const sampleCerts = [
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

  const certCount = await prisma.credential.count();
  if (certCount === 0) {
    for (const cert of sampleCerts) {
      await prisma.credential.create({ data: cert });
    }
    console.log('✅ Sample credentials seeded.');
  }

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

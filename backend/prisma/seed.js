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
  
  // 3. Setup Default Contact Settings
  const defaultContact = {
    email: adminEmail,
    phone: '',
    whatsapp: '',
    github: '',
    linkedin: '',
    instagram: '',
    location: 'Indonesia'
  };

  await prisma.siteSetting.upsert({
    where: { key: 'contact' },
    update: {},
    create: {
      key: 'contact',
      value: defaultContact,
    },
  });

  console.log('✅ Default contact settings seeded.');

  // 4. Setup Default Skills
  const defaultSkills = [
    // Technical Skills
    { name: 'React', type: 'TECHNICAL', category: 'Frontend', level: 'Advanced', order: 1 },
    { name: 'JavaScript', type: 'TECHNICAL', category: 'Language', level: 'Advanced', order: 2 },
    { name: 'TypeScript', type: 'TECHNICAL', category: 'Language', level: 'Intermediate', order: 3 },
    { name: 'Node.js', type: 'TECHNICAL', category: 'Backend', level: 'Intermediate', order: 4 },
    { name: 'Express.js', type: 'TECHNICAL', category: 'Backend', level: 'Intermediate', order: 5 },
    { name: 'PostgreSQL', type: 'TECHNICAL', category: 'Database', level: 'Intermediate', order: 6 },
    { name: 'Prisma', type: 'TECHNICAL', category: 'ORM', level: 'Intermediate', order: 7 },
    
    // Soft Skills
    { name: 'Communication', type: 'SOFT', category: 'General', order: 10 },
    { name: 'Problem Solving', type: 'SOFT', category: 'General', order: 11 },
    { name: 'Teamwork', type: 'SOFT', category: 'General', order: 12 },
    { name: 'Adaptability', type: 'SOFT', category: 'General', order: 13 },
    { name: 'Time Management', type: 'SOFT', category: 'General', order: 14 },
    
    // Tools
    { name: 'Git', type: 'TOOL', category: 'Tools', order: 20 },
    { name: 'GitHub', type: 'TOOL', category: 'Tools', order: 21 },
    { name: 'VS Code', type: 'TOOL', category: 'Tools', order: 22 },
    
    // Languages
    { name: 'English', type: 'LANGUAGE', category: 'Languages', level: 'Professional', order: 30 },
    { name: 'Indonesian', type: 'LANGUAGE', category: 'Languages', level: 'Native', order: 31 },
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
  console.log('✅ Default skills (Technical, Soft, Tools, Language) seeded.');

  // 5. Setup Sample Certifications
  const sampleCerts = [
    {
      title: 'Full Stack Web Development',
      issuer: 'Udemy',
      credentialId: 'UC-123456',
      credentialUrl: 'https://udemy.com/certificate/UC-123456',
      issuedAt: new Date('2023-01-01'),
      doesNotExpire: true,
      skills: ['React', 'Node.js', 'PostgreSQL'],
      status: 'PUBLISHED',
      order: 1
    }
  ];

  const certCount = await prisma.certification.count();
  if (certCount === 0) {
    for (const cert of sampleCerts) {
      await prisma.certification.create({ data: cert });
    }
    console.log('✅ Sample certifications seeded.');
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

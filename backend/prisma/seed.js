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
    { name: 'React', category: 'Frontend', level: 'Advanced', order: 1 },
    { name: 'Node.js', category: 'Backend', level: 'Intermediate', order: 2 },
    { name: 'Express.js', category: 'Backend', level: 'Intermediate', order: 3 },
    { name: 'JavaScript', category: 'Language', level: 'Advanced', order: 4 },
    { name: 'TypeScript', category: 'Language', level: 'Intermediate', order: 5 },
    { name: 'PostgreSQL', category: 'Database', level: 'Intermediate', order: 6 },
    { name: 'Prisma', category: 'ORM', level: 'Intermediate', order: 7 },
    { name: 'Tailwind CSS', category: 'Styling', level: 'Advanced', order: 8 },
    { name: 'Git', category: 'Tools', level: 'Intermediate', order: 9 },
    { name: 'Python', category: 'Language', level: 'Basic', order: 10 },
    { name: 'Java', category: 'Language', level: 'Basic', order: 11 },
    { name: 'Rust', category: 'Language', level: 'Basic', order: 12 },
  ];

  const skillCount = await prisma.skill.count();
  if (skillCount === 0) {
    for (const skill of defaultSkills) {
      await prisma.skill.create({ data: skill });
    }
    console.log('✅ Default skills seeded.');
  } else {
    console.log('ℹ️ Skills already exist, skipping default skills seed.');
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

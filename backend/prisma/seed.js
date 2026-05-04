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

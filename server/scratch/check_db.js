const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkData() {
  const hero = await prisma.siteSetting.findUnique({ where: { key: 'hero' } });
  const projects = await prisma.project.count();
  const experiences = await prisma.experience.count();
  const skills = await prisma.skill.count();
  const education = await prisma.education.count();
  const certifications = await prisma.credential.count();

  console.log('--- Database Stats ---');
  console.log('Hero Settings:', hero ? 'EXISTS' : 'MISSING');
  console.log('Projects:', projects);
  console.log('Experiences:', experiences);
  console.log('Skills:', skills);
  console.log('Education:', education);
  console.log('Certifications:', certifications);
  
  if (hero) console.log('Hero Value:', JSON.stringify(hero.value, null, 2));
}

checkData()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());

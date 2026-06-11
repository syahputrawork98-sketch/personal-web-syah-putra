const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const profile = await prisma.siteSetting.findUnique({
    where: { key: 'profile' }
  });
  console.log('--- PROFILE IN DATABASE ---');
  console.log(JSON.stringify(profile, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

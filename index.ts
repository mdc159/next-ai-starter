import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Query the _prisma_migrations table
  const migrations = await prisma.$queryRaw`SELECT * FROM _prisma_migrations LIMIT 10`;
  console.log('Migrations:', migrations);
  
  // You can also try querying your User or Post tables if they exist
  try {
    const users = await prisma.user.findMany({
      take: 10,
    });
    console.log('Users:', users);
  } catch (error) {
    console.log('Error querying users:', error.message);
  }
  
  try {
    const posts = await prisma.post.findMany({
      take: 10,
    });
    console.log('Posts:', posts);
  } catch (error) {
    console.log('Error querying posts:', error.message);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
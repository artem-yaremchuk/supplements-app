import { PrismaClient } from '@prisma/client';
import { supplements } from './data/supplements';

const prisma = new PrismaClient();

async function main() {
  await prisma.supplement.createMany({
    data: supplements,
    skipDuplicates: true,
  });

  console.log('Supplements seeded successfully');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

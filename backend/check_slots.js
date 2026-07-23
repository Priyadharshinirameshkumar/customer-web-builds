const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const slots = await prisma.slot.findMany({
    where: {
      date: {
        gte: new Date('2026-07-27T00:00:00Z'),
        lte: new Date('2026-07-27T23:59:59Z')
      }
    }
  });
  console.log('Slots on July 27, 2026:', slots);
}

main().catch(console.error).finally(() => prisma.$disconnect());


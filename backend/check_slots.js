const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const slots = await prisma.slot.findMany();
  console.log('Slots in DB:', slots);
}

main().catch(console.error).finally(() => prisma.$disconnect());

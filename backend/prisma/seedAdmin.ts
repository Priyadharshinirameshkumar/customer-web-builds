import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_LOGIN_EMAIL || "admin@customerwebbuilds.com";
  const rawPassword = process.env.ADMIN_LOGIN_PASSWORD || "AdminPass123!";

  console.log(`Seeding admin user: ${email}`);

  const existingAdmin = await prisma.admin.findUnique({
    where: { email },
  });

  const passwordHash = await bcrypt.hash(rawPassword, 10);

  if (existingAdmin) {
    await prisma.admin.update({
      where: { email },
      data: { passwordHash },
    });
    console.log(`Admin user password updated.`);
  } else {
    await prisma.admin.create({
      data: {
        email,
        passwordHash,
      },
    });
    console.log(`Admin user created.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

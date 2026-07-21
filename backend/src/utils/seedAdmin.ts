import prisma from "../lib/prisma";
import {
  ADMIN_LOGIN_EMAIL,
  ADMIN_LOGIN_PASSWORD,
  isAdminSeedConfigured,
} from "../config/env";
import { hashPassword } from "../services/auth.service";

export const seedAdmin = async () => {
  try {
    const count = await prisma.admin.count();

    if (count > 0) {
      console.log("Admin account already exists. Skipping admin seeding.");
      return;
    }

    if (!isAdminSeedConfigured()) {
      console.warn(
        "ADMIN_LOGIN_EMAIL and ADMIN_LOGIN_PASSWORD are not configured. Skipping admin seeding."
      );
      return;
    }

    const passwordHash = await hashPassword(ADMIN_LOGIN_PASSWORD);

    await prisma.admin.create({
      data: {
        email: ADMIN_LOGIN_EMAIL.toLowerCase(),
        passwordHash,
      },
    });

    console.log(`Admin account seeded for ${ADMIN_LOGIN_EMAIL.toLowerCase()}.`);
  } catch (error) {
    console.error("Failed to seed admin account:", error);
  }
};

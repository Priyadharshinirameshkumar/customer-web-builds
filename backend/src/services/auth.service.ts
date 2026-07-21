import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env";
import { UnauthorizedError } from "../utils/errors";
import { AdminJwtPayload, AuthenticatedAdmin } from "../types/auth.types";
import { LoginInput } from "../validations/auth.validation";

const SALT_ROUNDS = 10;

export const hashPassword = (password: string) =>
  bcrypt.hash(password, SALT_ROUNDS);

export const comparePassword = (password: string, passwordHash: string) =>
  bcrypt.compare(password, passwordHash);

export const signAdminToken = (admin: AuthenticatedAdmin) => {
  const payload: AdminJwtPayload = {
    adminId: admin.id,
    email: admin.email,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as any });
};

export const verifyAdminToken = (token: string): AdminJwtPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminJwtPayload;
  } catch {
    throw new UnauthorizedError("Invalid or expired token");
  }
};

export const loginAdmin = async ({ email, password }: LoginInput) => {
  const admin = await prisma.admin.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!admin) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const isValidPassword = await comparePassword(password, admin.passwordHash);

  if (!isValidPassword) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const authenticatedAdmin: AuthenticatedAdmin = {
    id: admin.id,
    email: admin.email,
  };

  const token = signAdminToken(authenticatedAdmin);

  return {
    token,
    admin: authenticatedAdmin,
  };
};

export const getAdminById = async (adminId: number) => {
  const admin = await prisma.admin.findUnique({
    where: { id: adminId },
    select: { id: true, email: true },
  });

  if (!admin) {
    throw new UnauthorizedError("Admin account not found");
  }

  return admin;
};

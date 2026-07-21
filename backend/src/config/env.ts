import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export const PORT = process.env.PORT || 5000;

export const SMTP_HOST = process.env.SMTP_HOST || "";
export const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
export const SMTP_USER = process.env.SMTP_USER || "";
export const SMTP_PASS = process.env.SMTP_PASS || "";
export const SMTP_FROM = process.env.SMTP_FROM || "";
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";

export const JWT_SECRET = process.env.JWT_SECRET || "";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h";

export const ADMIN_LOGIN_EMAIL = process.env.ADMIN_LOGIN_EMAIL || "";
export const ADMIN_LOGIN_PASSWORD = process.env.ADMIN_LOGIN_PASSWORD || "";

export const isSmtpConfigured = () =>
  Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS && SMTP_FROM);

export const isAdminEmailConfigured = () =>
  Boolean(isSmtpConfigured() && ADMIN_EMAIL);

export const isJwtConfigured = () => Boolean(JWT_SECRET);

export const isAdminSeedConfigured = () =>
  Boolean(ADMIN_LOGIN_EMAIL && ADMIN_LOGIN_PASSWORD);

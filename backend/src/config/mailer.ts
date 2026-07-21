import nodemailer, { Transporter } from "nodemailer";
import {
  ADMIN_EMAIL,
  isAdminEmailConfigured,
  isSmtpConfigured,
  SMTP_FROM,
  SMTP_HOST,
  SMTP_PASS,
  SMTP_PORT,
  SMTP_USER,
} from "./env";

let transporterInstance: Transporter | null = null;

export const getTransporter = () => {
  if (!isSmtpConfigured()) {
    return null;
  }

  if (!transporterInstance) {
    transporterInstance = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
  }

  return transporterInstance;
};

export const getMailFrom = () => SMTP_FROM;

export const verifySmtpConnection = async () => {
  const transporter = getTransporter();

  if (!transporter) {
    console.warn("SMTP is not configured. Confirmation emails will be skipped.");
    return false;
  }

  try {
    await transporter.verify();
    console.log("SMTP ready. Confirmation emails enabled.");

    if (isAdminEmailConfigured()) {
      console.log(`Admin notification emails enabled for ${ADMIN_EMAIL}.`);
    } else {
      console.warn(
        "ADMIN_EMAIL is not configured. Admin notification emails will be skipped."
      );
    }

    return true;
  } catch (error) {
    console.error("SMTP verification failed:", error);
    return false;
  }
};

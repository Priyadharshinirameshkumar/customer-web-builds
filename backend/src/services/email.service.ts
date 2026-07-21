import { Booking, BookingStatus } from "@prisma/client";
import prisma from "../lib/prisma";
import { ADMIN_EMAIL, isAdminEmailConfigured, isSmtpConfigured } from "../config/env";
import { getMailFrom, getTransporter } from "../config/mailer";
import { buildConfirmationEmailHtml } from "../templates/confirmationEmail.template";
import {
  buildAdminNotificationEmailHtml,
  mapAdminNotificationData,
} from "../templates/adminNotificationEmail.template";

const formatMeetingDate = (preferredDate: string) => {
  const date = new Date(preferredDate);

  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
};

const formatMeetingTime = (preferredTime: string) => `${preferredTime} IST`;

const sendEmail = async (to: string, subject: string, html: string) => {
  const transporter = getTransporter();

  if (!transporter) {
    throw new Error("SMTP transporter is unavailable.");
  }

  return transporter.sendMail({
    from: getMailFrom(),
    to,
    subject,
    html,
  });
};

export const sendConfirmationEmail = async (booking: Booking) => {
  if (!isSmtpConfigured()) {
    console.warn("SMTP is not configured. Skipping confirmation email.");
    return;
  }

  const html = buildConfirmationEmailHtml({
    customerName: booking.fullName,
    companyName: booking.companyName,
    meetingDate: formatMeetingDate(booking.preferredDate),
    meetingTime: formatMeetingTime(booking.preferredTime),
    meetingMethod: booking.meetingMethod,
    bookingStatus: booking.status,
  });

  let subject = "Your Discovery Call Booking Confirmation";
  if (booking.status === BookingStatus.CONFIRMED) {
    subject = "Your Discovery Call Booking Has Been Confirmed!";
  } else if (booking.status === BookingStatus.CANCELLED) {
    subject = "Your Discovery Call Booking Has Been Cancelled";
  }

  const info = await sendEmail(
    booking.email,
    subject,
    html
  );

  console.log(
    `Confirmation email sent to ${booking.email} (messageId: ${info.messageId})`
  );
};

export const sendAdminNotificationEmail = async (bookingId: number) => {
  if (!isAdminEmailConfigured()) {
    console.warn(
      "Admin email is not configured. Skipping admin notification email."
    );
    return;
  }

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { websitePlan: true },
  });

  if (!booking) {
    throw new Error(`Booking #${bookingId} not found for admin notification.`);
  }

  const meetingDate = formatMeetingDate(booking.preferredDate);
  const meetingTime = formatMeetingTime(booking.preferredTime);

  const html = buildAdminNotificationEmailHtml(
    mapAdminNotificationData(booking, meetingDate, meetingTime)
  );

  const info = await sendEmail(
    ADMIN_EMAIL,
    `New Booking: ${booking.fullName} - ${meetingDate}`,
    html
  );

  console.log(
    `Admin notification email sent to ${ADMIN_EMAIL} (messageId: ${info.messageId})`
  );
};

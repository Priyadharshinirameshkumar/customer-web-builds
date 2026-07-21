import { AdminNotificationEmailData } from "../types/email.types";
import { buildDetailRow, buildEmailTemplate } from "./emailLayout.template";

const buildSection = (title: string, rows: string) => `
  <h2 style="margin: 0 0 12px; font-size: 18px; color: #111827;">${title}</h2>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
    ${rows}
  </table>
`;

const displayValue = (value?: string | null) => value?.trim() || "Not provided";

export const buildAdminNotificationEmailHtml = (
  data: AdminNotificationEmailData
) => {
  const bodyHtml = `
    <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #374151;">
      A new discovery call booking has been created.
    </p>
    ${buildSection(
      "Customer Details",
      `
      ${buildDetailRow("Full Name", data.customerName)}
      ${buildDetailRow("Email", data.customerEmail)}
      ${buildDetailRow("Phone", data.customerPhone)}
      ${buildDetailRow("Company Name", data.companyName)}
    `
    )}
    ${buildSection(
      "Website Plan Details",
      `
      ${buildDetailRow("Business Name", data.businessName)}
      ${buildDetailRow("Website Size", data.websiteSize)}
      ${buildDetailRow("Business Type", data.businessType)}
      ${buildDetailRow("Features", data.features)}
      ${buildDetailRow("Hosting", data.hosting)}
      ${buildDetailRow("Maintenance", data.maintenance)}
      ${buildDetailRow("SEO Requirement", data.seoRequirement)}
      ${buildDetailRow("Additional Requirements", data.additionalRequirements)}
    `
    )}
    ${buildSection(
      "Booking Details",
      `
      ${buildDetailRow("Booking ID", String(data.bookingId))}
      ${buildDetailRow("Budget", data.budget)}
      ${buildDetailRow("Meeting Date", data.meetingDate)}
      ${buildDetailRow("Meeting Time", data.meetingTime)}
      ${buildDetailRow("Meeting Method", data.meetingMethod)}
      ${buildDetailRow("Additional Notes", data.additionalNotes)}
      ${buildDetailRow("Status", data.bookingStatus)}
    `
    )}
  `;

  return buildEmailTemplate({
    title: "New Booking Notification",
    previewText: `New booking from ${data.customerName} for ${data.meetingDate} at ${data.meetingTime}.`,
    bodyHtml,
  });
};

export const mapAdminNotificationData = (
  booking: {
    id: number;
    fullName: string;
    companyName: string;
    email: string;
    phone: string;
    budget: string;
    preferredDate: string;
    preferredTime: string;
    meetingMethod: string;
    additionalNotes: string | null;
    status: string;
    websitePlan: {
      businessName: string;
      websiteSize: string;
      businessType: string;
      features: string | null;
      hosting: string | null;
      maintenance: string | null;
      seoRequirement: string | null;
      additionalRequirements: string | null;
    };
  },
  meetingDate: string,
  meetingTime: string
): AdminNotificationEmailData => ({
  bookingId: booking.id,
  customerName: booking.fullName,
  customerEmail: booking.email,
  customerPhone: booking.phone,
  companyName: booking.companyName,
  businessName: booking.websitePlan.businessName,
  websiteSize: booking.websitePlan.websiteSize,
  businessType: booking.websitePlan.businessType,
  features: displayValue(booking.websitePlan.features),
  hosting: displayValue(booking.websitePlan.hosting),
  maintenance: displayValue(booking.websitePlan.maintenance),
  seoRequirement: displayValue(booking.websitePlan.seoRequirement),
  additionalRequirements: displayValue(
    booking.websitePlan.additionalRequirements
  ),
  budget: booking.budget,
  meetingDate,
  meetingTime,
  meetingMethod: booking.meetingMethod,
  additionalNotes: displayValue(booking.additionalNotes),
  bookingStatus: booking.status,
});

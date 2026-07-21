import { ConfirmationEmailData } from "../types/email.types";
import { buildDetailRow, buildEmailTemplate } from "./emailLayout.template";

export const buildConfirmationEmailHtml = (data: ConfirmationEmailData) => {
  const isConfirmed = data.bookingStatus === "CONFIRMED";
  const isCancelled = data.bookingStatus === "CANCELLED";

  let statusMessage = "Your discovery call has been booked successfully. Here are your booking details:";
  let emailTitle = "Booking Confirmation";
  let previewText = `Your discovery call on ${data.meetingDate} at ${data.meetingTime} is received.`;

  if (isConfirmed) {
    statusMessage = "Great news! Your discovery call booking has been officially confirmed by our team.";
    emailTitle = "Booking Confirmed";
    previewText = `Your discovery call on ${data.meetingDate} at ${data.meetingTime} has been confirmed.`;
  } else if (isCancelled) {
    statusMessage = "Your discovery call booking has been cancelled.";
    emailTitle = "Booking Cancelled";
    previewText = `Your discovery call scheduled for ${data.meetingDate} at ${data.meetingTime} has been cancelled.`;
  }

  const bodyHtml = `
    <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #374151;">
      Hi ${data.customerName},
    </p>
    <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #374151;">
      ${statusMessage}
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
      ${buildDetailRow("Customer Name", data.customerName)}
      ${buildDetailRow("Company Name", data.companyName)}
      ${buildDetailRow("Meeting Date", data.meetingDate)}
      ${buildDetailRow("Meeting Time", data.meetingTime)}
      ${buildDetailRow("Meeting Method", data.meetingMethod)}
      ${buildDetailRow("Booking Status", data.bookingStatus)}
    </table>
    <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #6b7280;">
      If you have any questions or need to reschedule, please contact our team.
    </p>
  `;

  return buildEmailTemplate({
    title: emailTitle,
    previewText,
    bodyHtml,
  });
};

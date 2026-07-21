export interface ConfirmationEmailData {
  customerName: string;
  companyName: string;
  meetingDate: string;
  meetingTime: string;
  meetingMethod: string;
  bookingStatus: string;
}

export interface AdminNotificationEmailData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  companyName: string;
  businessName: string;
  websiteSize: string;
  businessType: string;
  features: string;
  hosting: string;
  maintenance: string;
  seoRequirement: string;
  additionalRequirements: string;
  budget: string;
  meetingDate: string;
  meetingTime: string;
  meetingMethod: string;
  additionalNotes: string;
  bookingStatus: string;
  bookingId: number;
}

export interface EmailTemplateOptions {
  title: string;
  previewText: string;
  bodyHtml: string;
}

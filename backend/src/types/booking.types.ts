export interface BookingInput {
  websitePlanId: number;

  fullName: string;
  companyName: string;
  email: string;
  phone: string;

  budget: string;

  preferredDate: string;
  preferredTime: string;

  meetingMethod: string;

  additionalNotes?: string;
}
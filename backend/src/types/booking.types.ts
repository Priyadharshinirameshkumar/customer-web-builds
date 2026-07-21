export interface BookingInput {
  websitePlanId: number;
  slotId: number;

  fullName: string;
  companyName: string;
  email: string;
  phone: string;

  budget: string;

  meetingMethod: string;

  additionalNotes?: string;
}
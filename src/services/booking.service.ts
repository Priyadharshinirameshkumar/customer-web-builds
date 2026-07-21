import api from "../api/api";

export interface BookingData {
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

export const createBooking = async (data: BookingData) => {
  const response = await api.post("/bookings", data);
  return response.data;
};
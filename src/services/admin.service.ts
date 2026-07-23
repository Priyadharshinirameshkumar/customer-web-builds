import api from "../api/api";

export interface DashboardSummary {
  todayBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  availableSlots: number;
  bookedSlots: number;
}

export interface WebsitePlanItem {
  id: number;
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  websiteSize: string;
  businessType: string;
  targetAudience?: string;
  features?: string;
  hosting?: string;
  maintenance?: string;
  seoRequirement?: string;
  additionalRequirements?: string;
  createdAt: string;
  booking?: AdminBookingItem;
}

export interface SlotItem {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  createdAt: string;
  booking?: AdminBookingItem;
}

export interface AdminBookingItem {
  id: number;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  budget: string;
  preferredDate: string;
  preferredTime: string;
  meetingMethod: string;
  additionalNotes?: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  createdAt: string;
  websitePlanId: number;
  slotId?: number;
  websitePlan?: WebsitePlanItem;
  slot?: SlotItem;
}

export const getDashboardSummary = async () => {
  const response = await api.get<{ success: boolean; data: DashboardSummary }>("/admin/dashboard/summary");
  return response.data.data;
};

export const getWebsitePlans = async () => {
  const response = await api.get<{ success: boolean; data: WebsitePlanItem[] }>("/admin/website-plans");
  return response.data.data;
};

export const getAdminBookings = async () => {
  const response = await api.get<{ success: boolean; data: AdminBookingItem[] }>("/admin/bookings");
  return response.data.data;
};

export const getAdminBookingById = async (id: number) => {
  const response = await api.get<{ success: boolean; data: AdminBookingItem }>(`/admin/bookings/${id}`);
  return response.data.data;
};

export const confirmBooking = async (id: number) => {
  const response = await api.patch<{ success: boolean; data: AdminBookingItem }>(`/admin/bookings/${id}/confirm`);
  return response.data.data;
};

export const cancelBooking = async (id: number) => {
  const response = await api.patch<{ success: boolean; data: AdminBookingItem }>(`/admin/bookings/${id}/cancel`);
  return response.data.data;
};

export const deleteBooking = async (id: number) => {
  const response = await api.delete<{ success: boolean; message: string }>(`/admin/bookings/${id}`);
  return response.data;
};

export const getAdminSlots = async () => {
  const response = await api.get<{ success: boolean; data: SlotItem[] }>("/admin/slots");
  return response.data.data;
};

export const createAdminSlot = async (slot: { date: string; startTime: string; endTime: string; isBooked: boolean }) => {
  const response = await api.post<{ success: boolean; data: SlotItem }>("/admin/slots", slot);
  return response.data.data;
};

export const updateAdminSlot = async (id: number, slot: { date: string; startTime: string; endTime: string; isBooked: boolean }) => {
  const response = await api.put<{ success: boolean; data: SlotItem }>(`/admin/slots/${id}`, slot);
  return response.data.data;
};

export const deleteAdminSlot = async (id: number) => {
  const response = await api.delete<{ success: boolean; message: string }>(`/admin/slots/${id}`);
  return response.data;
};


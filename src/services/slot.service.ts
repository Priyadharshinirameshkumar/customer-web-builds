import api from "../api/api";

export interface AvailableSlot {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

export const getAvailableSlots = async (): Promise<AvailableSlot[]> => {
  const response = await api.get("/slots");
  return response.data.data;
};

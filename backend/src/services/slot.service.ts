import prisma from "../lib/prisma";
import { AvailableSlot } from "../types/slot.types";

export const getAvailableSlots = async (): Promise<AvailableSlot[]> => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  return prisma.slot.findMany({
    where: {
      isBooked: false,
      date: {
        gte: today,
      },
    },
    select: {
      id: true,
      date: true,
      startTime: true,
      endTime: true,
    },
    orderBy: [{ date: "asc" }, { startTime: "asc" }],
  });
};

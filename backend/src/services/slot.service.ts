import prisma from "../lib/prisma";
import { AvailableSlot } from "../types/slot.types";

export const ensureFutureSlots = async (daysAhead: number = 90) => {
  try {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const timeSlots = [
      { start: "09:00", end: "10:00" },
      { start: "10:00", end: "11:00" },
      { start: "11:00", end: "12:00" },
      { start: "13:00", end: "14:00" },
      { start: "14:00", end: "15:00" },
      { start: "15:00", end: "16:00" },
      { start: "16:00", end: "17:00" },
      { start: "17:00", end: "18:00" },
    ];

    const existingSlots = await prisma.slot.findMany({
      where: { date: { gte: today } },
      select: { date: true, startTime: true },
    });

    const existingSet = new Set(
      existingSlots.map((s) => {
        const d = s.date.toISOString().split("T")[0];
        return `${d}_${s.startTime}`;
      })
    );

    const slotsToCreate = [];

    for (let i = 0; i < daysAhead; i++) {
      const currentDate = new Date();
      currentDate.setDate(today.getDate() + i);
      currentDate.setUTCHours(0, 0, 0, 0);

      const day = currentDate.getUTCDay();
      // Skip Sunday (0) and Saturday (6)
      if (day === 0 || day === 6) continue;

      const dateStr = currentDate.toISOString().split("T")[0];

      for (const slot of timeSlots) {
        const key = `${dateStr}_${slot.start}`;
        if (!existingSet.has(key)) {
          slotsToCreate.push({
            date: currentDate,
            startTime: slot.start,
            endTime: slot.end,
            isBooked: false,
          });
        }
      }
    }

    if (slotsToCreate.length > 0) {
      await prisma.slot.createMany({
        data: slotsToCreate,
        skipDuplicates: true,
      });
    }
  } catch (err) {
    console.error("Error ensuring future slots:", err);
  }
};

export const getAvailableSlots = async (): Promise<AvailableSlot[]> => {
  await ensureFutureSlots(90);

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  return prisma.slot.findMany({
    where: {
      isBooked: false,
      isDeleted: false,
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


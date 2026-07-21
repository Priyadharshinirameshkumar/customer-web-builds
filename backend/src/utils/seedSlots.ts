import prisma from "../lib/prisma";

export const seedSlots = async () => {
  try {
    const count = await prisma.slot.count();
    if (count > 0) {
      console.log("Slots already exist in the database. Skipping seeding.");
      return;
    }

    console.log("Seeding slots for the next 30 days...");
    const slotsData = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const currentDate = new Date();
      currentDate.setDate(today.getDate() + i);
      currentDate.setUTCHours(0, 0, 0, 0);

      const day = currentDate.getUTCDay();
      // Skip Sundays (0) and Saturdays (6)
      if (day === 0 || day === 6) continue;

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

      for (const slot of timeSlots) {
        slotsData.push({
          date: currentDate,
          startTime: slot.start,
          endTime: slot.end,
          isBooked: false,
        });
      }
    }

    await prisma.slot.createMany({
      data: slotsData,
    });
    console.log(`🚀 Seeded ${slotsData.length} slots successfully.`);
  } catch (error) {
    console.error("Failed to seed slots:", error);
  }
};

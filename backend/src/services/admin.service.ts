import prisma from "../lib/prisma";
import { BookingStatus } from "@prisma/client";
import { listBookings } from "./adminBooking.service";

const getTodayUtcRange = () => {
  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);

  const end = new Date();
  end.setUTCHours(23, 59, 59, 999);

  return { start, end };
};

export const getDashboardSummary = async () => {
  const { start, end } = getTodayUtcRange();

  const [
    todaysBookings,
    pendingBookings,
    confirmedBookings,
    cancelledBookings,
    availableSlots,
    bookedSlots,
  ] = await Promise.all([
    prisma.booking.count({
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
      },
    }),
    prisma.booking.count({ where: { status: BookingStatus.PENDING } }),
    prisma.booking.count({ where: { status: BookingStatus.CONFIRMED } }),
    prisma.booking.count({ where: { status: BookingStatus.CANCELLED } }),
    prisma.slot.count({ where: { isBooked: false } }),
    prisma.slot.count({ where: { isBooked: true } }),
  ]);

  return {
    todaysBookings,
    pendingBookings,
    confirmedBookings,
    cancelledBookings,
    availableSlots,
    bookedSlots,
  };
};

export const getAllWebsitePlans = async () => {
  return prisma.websitePlan.findMany({
    include: {
      booking: {
        select: {
          id: true,
          status: true,
          preferredDate: true,
          preferredTime: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getAllBookings = async () => {
  return listBookings({
    sortBy: "createdAt",
    sortOrder: "desc",
  });
};

export const getAllSlots = async () => {
  const slots = await prisma.slot.findMany({
    where: { isDeleted: false },
    include: {
      booking: {
        select: {
          id: true,
          fullName: true,
          status: true,
        },
      },
    },
    orderBy: [{ date: "asc" }, { startTime: "asc" }],
  });

  const now = new Date();

  return slots.filter((slot) => {
    const slotDate = new Date(slot.date);
    const [hours, minutes] = slot.startTime.split(":").map(Number);
    slotDate.setUTCHours(hours, minutes, 0, 0);
    return slotDate.getTime() >= now.getTime();
  });
};


export const createSlot = async (dateStr: string, startTime: string, endTime: string, isBooked: boolean) => {
  const date = new Date(dateStr);
  date.setUTCHours(0, 0, 0, 0);
  return prisma.slot.create({
    data: {
      date,
      startTime,
      endTime,
      isBooked,
    },
  });
};

export const updateSlot = async (id: number, dateStr: string, startTime: string, endTime: string, isBooked: boolean) => {
  const date = new Date(dateStr);
  date.setUTCHours(0, 0, 0, 0);
  return prisma.slot.update({
    where: { id },
    data: {
      date,
      startTime,
      endTime,
      isBooked,
    },
  });
};

export const deleteSlot = async (id: number) => {
  await prisma.booking.updateMany({
    where: { slotId: id },
    data: { slotId: null },
  });
  return prisma.slot.update({
    where: { id },
    data: { isDeleted: true },
  });
};



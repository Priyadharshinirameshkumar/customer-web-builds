import prisma from "../lib/prisma";
import { BookingStatus, Prisma } from "@prisma/client";
import { BookingListQuery } from "../validations/admin.validation";
import { NotFoundError } from "../utils/errors";

const bookingInclude = {
  websitePlan: true,
  slot: {
    select: {
      id: true,
      date: true,
      startTime: true,
      endTime: true,
      isBooked: true,
    },
  },
} satisfies Prisma.BookingInclude;

const buildBookingWhere = (
  search?: string,
  status?: BookingStatus
): Prisma.BookingWhereInput => {
  const where: Prisma.BookingWhereInput = {};

  if (status) {
    where.status = status;
  }

  if (search) {
    where.OR = [
      { fullName: { contains: search, mode: "insensitive" } },
      { companyName: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { phone: { contains: search, mode: "insensitive" } },
    ];
  }

  return where;
};

const buildBookingOrderBy = (
  sortBy: BookingListQuery["sortBy"],
  sortOrder: BookingListQuery["sortOrder"]
): Prisma.BookingOrderByWithRelationInput => ({
  [sortBy]: sortOrder,
});

export const listBookings = async (query: BookingListQuery) => {
  return prisma.booking.findMany({
    where: buildBookingWhere(query.search, query.status),
    include: bookingInclude,
    orderBy: buildBookingOrderBy(query.sortBy, query.sortOrder),
  });
};

export const getBookingById = async (id: number) => {
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: bookingInclude,
  });

  if (!booking) {
    throw new NotFoundError("Booking not found");
  }

  return booking;
};

export const confirmBooking = async (id: number) => {
  const booking = await prisma.booking.findUnique({ where: { id } });

  if (!booking) {
    throw new NotFoundError("Booking not found");
  }

  if (booking.status === BookingStatus.CANCELLED) {
    throw new Error("Cannot confirm a cancelled booking.");
  }

  return prisma.booking.update({
    where: { id },
    data: { status: BookingStatus.CONFIRMED },
    include: bookingInclude,
  });
};

export const cancelBooking = async (id: number) => {
  return prisma.$transaction(async (tx) => {
    const booking = await tx.booking.findUnique({ where: { id } });

    if (!booking) {
      throw new NotFoundError("Booking not found");
    }

    if (booking.slotId) {
      await tx.slot.update({
        where: { id: booking.slotId },
        data: { isBooked: false },
      });
    }

    return tx.booking.update({
      where: { id },
      data: { status: BookingStatus.CANCELLED },
      include: bookingInclude,
    });
  });
};

export const deleteBooking = async (id: number) => {
  return prisma.$transaction(async (tx) => {
    const booking = await tx.booking.findUnique({ where: { id } });

    if (!booking) {
      throw new NotFoundError("Booking not found");
    }

    if (booking.slotId) {
      await tx.slot.update({
        where: { id: booking.slotId },
        data: { isBooked: false },
      });
    }

    return tx.booking.delete({
      where: { id },
      include: bookingInclude,
    });
  });
};

import prisma from "../lib/prisma";
import { BookingInput } from "../types/booking.types";
export const createBooking = async (data: BookingInput) => {
  return prisma.booking.create({
    data,
  });
};
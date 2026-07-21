import prisma from "../lib/prisma";
import { BookingInput } from "../types/booking.types";
import { BookingStatus, Prisma } from "@prisma/client";

export class SlotUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SlotUnavailableError";
  }
}

export const createBooking = async (data: BookingInput) => {
  try {
    return await prisma.$transaction(
      async (tx) => {
        const updatedSlot = await tx.slot.updateMany({
          where: {
            id: data.slotId,
            isBooked: false,
          },
          data: {
            isBooked: true,
          },
        });

        if (updatedSlot.count === 0) {
          const slot = await tx.slot.findUnique({
            where: { id: data.slotId },
          });

          if (!slot) {
            throw new SlotUnavailableError(
              "Selected slot is not available or does not exist."
            );
          }

          throw new SlotUnavailableError(
            "Selected slot was just booked by another user."
          );
        }

        const slot = await tx.slot.findUniqueOrThrow({
          where: { id: data.slotId },
        });

        return tx.booking.create({
          data: {
            websitePlanId: data.websitePlanId,
            fullName: data.fullName,
            companyName: data.companyName,
            email: data.email,
            phone: data.phone,
            budget: data.budget,
            preferredDate: slot.date.toISOString(),
            preferredTime: slot.startTime,
            meetingMethod: data.meetingMethod,
            additionalNotes: data.additionalNotes,
            slotId: data.slotId,
          },
        });
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      }
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new SlotUnavailableError(
        "Selected slot was just booked by another user."
      );
    }

    throw error;
  }
};

export const getBookingStatus = async (id: number) => {
  return prisma.booking.findUnique({
    where: { id },
    select: { status: true },
  });
};

export const updateBookingStatus = async (id: number, status: BookingStatus) => {
  return prisma.booking.update({
    where: { id },
    data: { status },
  });
};

import { z } from "zod";
import { BookingStatus } from "@prisma/client";

export const bookingSchema = z.object({
  websitePlanId: z.number(),
  slotId: z.number().int().positive(),

  fullName: z.string().min(3, "Full name is required"),

  companyName: z.string().min(2, "Company name is required"),

  email: z.string().email("Invalid email"),

  phone: z.string().min(10, "Phone number is required"),

  budget: z.string(),

  meetingMethod: z.string(),

  additionalNotes: z.string().optional()
});

export const updateBookingStatusSchema = z.object({
  status: z.nativeEnum(BookingStatus)
});

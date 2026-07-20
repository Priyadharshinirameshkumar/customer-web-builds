import { z } from "zod";

export const bookingSchema = z.object({
  websitePlanId: z.number(),

  fullName: z.string().min(3, "Full name is required"),

  companyName: z.string().min(2, "Company name is required"),

  email: z.string().email("Invalid email"),

  phone: z.string().min(10, "Phone number is required"),

  budget: z.string(),

  preferredDate: z.string(),

  preferredTime: z.string(),

  meetingMethod: z.string(),

  additionalNotes: z.string().optional()
});
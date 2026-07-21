import { z } from "zod";
import { BookingStatus } from "@prisma/client";

export const bookingListQuerySchema = z.object({
  search: z.string().trim().optional(),
  status: z.nativeEnum(BookingStatus).optional(),
  sortBy: z
    .enum(["createdAt", "preferredDate", "fullName", "status"])
    .default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const bookingIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type BookingListQuery = z.infer<typeof bookingListQuerySchema>;

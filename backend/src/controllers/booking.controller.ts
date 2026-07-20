import { Request, Response } from "express";
import { bookingSchema } from "../validations/booking.validation";
import { createBooking } from "../services/booking.service";
import { asyncHandler } from "../middleware/asyncHandler";

export const createBookingController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = bookingSchema.parse(req.body);

    const booking = await createBooking({
      ...body,
      preferredDate: new Date(body.preferredDate).toISOString()
    });

    return res.status(201).json({
      success: true,
      message: "Booking Created Successfully",
      data: booking
    });
  }
);
import { Request, Response } from "express";
import { bookingSchema, updateBookingStatusSchema } from "../validations/booking.validation";
import {
  createBooking,
  getBookingStatus,
  SlotUnavailableError,
  updateBookingStatus,
} from "../services/booking.service";
import { sendConfirmationEmail, sendAdminNotificationEmail } from "../services/email.service";
import { asyncHandler } from "../middleware/asyncHandler";

export const createBookingController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const body = bookingSchema.parse(req.body);

      const booking = await createBooking(body);

      try {
        await sendConfirmationEmail(booking);
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
      }

      try {
        await sendAdminNotificationEmail(booking.id);
      } catch (emailError) {
        console.error("Failed to send admin notification email:", emailError);
      }

      return res.status(201).json({
        success: true,
        message: "Booking Created Successfully",
        data: booking
      });
    } catch (error: any) {
      if (error.name === "ZodError") {
        throw error;
      }
      if (error instanceof SlotUnavailableError) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      throw error;
    }
  }
);

export const getBookingStatusController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID"
      });
    }

    const booking = await getBookingStatus(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        status: booking.status
      }
    });
  }
);

export const updateBookingStatusController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID"
      });
    }

    const body = updateBookingStatusSchema.parse(req.body);

    // Check if booking exists
    const existing = await getBookingStatus(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    const updatedBooking = await updateBookingStatus(id, body.status);

    if (body.status === "CONFIRMED" || body.status === "CANCELLED") {
      try {
        await sendConfirmationEmail(updatedBooking);
      } catch (emailError) {
        console.error("Failed to send booking status email:", emailError);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      data: updatedBooking
    });
  }
);

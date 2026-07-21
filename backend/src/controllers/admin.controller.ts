import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import {
  getAllSlots,
  getAllWebsitePlans,
  getDashboardSummary,
} from "../services/admin.service";
import {
  cancelBooking,
  confirmBooking,
  deleteBooking,
  getBookingById,
  listBookings,
} from "../services/adminBooking.service";
import {
  bookingIdParamSchema,
  bookingListQuerySchema,
} from "../validations/admin.validation";
import { NotFoundError } from "../utils/errors";
import { sendConfirmationEmail } from "../services/email.service";

const handleAdminBookingError = (error: unknown, res: Response) => {
  if (error instanceof NotFoundError) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }

  if (error instanceof Error && error.message.includes("Cannot confirm")) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  throw error;
};

export const getDashboardSummaryController = asyncHandler(
  async (_req: Request, res: Response) => {
    const summary = await getDashboardSummary();

    return res.status(200).json({
      success: true,
      message: "Dashboard summary fetched successfully",
      data: summary,
    });
  }
);

export const getWebsitePlansController = asyncHandler(
  async (_req: Request, res: Response) => {
    const websitePlans = await getAllWebsitePlans();

    return res.status(200).json({
      success: true,
      message: "Website plans fetched successfully",
      data: websitePlans,
    });
  }
);

export const getBookingsController = asyncHandler(
  async (req: Request, res: Response) => {
    const query = bookingListQuerySchema.parse(req.query);
    const bookings = await listBookings(query);

    return res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      data: bookings,
    });
  }
);

export const getBookingByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = bookingIdParamSchema.parse(req.params);
      const booking = await getBookingById(id);

      return res.status(200).json({
        success: true,
        message: "Booking details fetched successfully",
        data: booking,
      });
    } catch (error) {
      return handleAdminBookingError(error, res);
    }
  }
);

export const confirmBookingController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = bookingIdParamSchema.parse(req.params);
      const booking = await confirmBooking(id);

      try {
        await sendConfirmationEmail(booking);
      } catch (emailError) {
        console.error("Failed to send booking confirmation email:", emailError);
      }

      return res.status(200).json({
        success: true,
        message: "Booking confirmed successfully",
        data: booking,
      });
    } catch (error) {
      return handleAdminBookingError(error, res);
    }
  }
);

export const cancelBookingController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = bookingIdParamSchema.parse(req.params);
      const booking = await cancelBooking(id);

      try {
        await sendConfirmationEmail(booking);
      } catch (emailError) {
        console.error("Failed to send booking cancellation email:", emailError);
      }

      return res.status(200).json({
        success: true,
        message: "Booking cancelled successfully",
        data: booking,
      });
    } catch (error) {
      return handleAdminBookingError(error, res);
    }
  }
);

export const deleteBookingController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = bookingIdParamSchema.parse(req.params);
      const booking = await deleteBooking(id);

      return res.status(200).json({
        success: true,
        message: "Booking deleted successfully",
        data: booking,
      });
    } catch (error) {
      return handleAdminBookingError(error, res);
    }
  }
);

export const getSlotsController = asyncHandler(
  async (_req: Request, res: Response) => {
    const slots = await getAllSlots();

    return res.status(200).json({
      success: true,
      message: "Slots fetched successfully",
      data: slots,
    });
  }
);

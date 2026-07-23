import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import {
  getAllSlots,
  getAllWebsitePlans,
  getDashboardSummary,
  createSlot,
  updateSlot,
  deleteSlot,
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

export const createSlotController = asyncHandler(
  async (req: Request, res: Response) => {
    const { date, startTime, endTime, isBooked } = req.body;
    if (!date || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: "Date, startTime, and endTime are required",
      });
    }
    try {
      const slot = await createSlot(date, startTime, endTime, !!isBooked);
      return res.status(201).json({
        success: true,
        message: "Slot created successfully",
        data: slot,
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        return res.status(400).json({
          success: false,
          message: "A slot already exists for this date and start time",
        });
      }
      throw error;
    }
  }
);

export const updateSlotController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string, 10);
    const { date, startTime, endTime, isBooked } = req.body;
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid slot ID",
      });
    }
    if (!date || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: "Date, startTime, and endTime are required",
      });
    }
    try {
      const slot = await updateSlot(id, date, startTime, endTime, !!isBooked);
      return res.status(200).json({
        success: true,
        message: "Slot updated successfully",
        data: slot,
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        return res.status(400).json({
          success: false,
          message: "A slot already exists for this date and start time",
        });
      }
      throw error;
    }
  }
);

export const deleteSlotController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid slot ID",
      });
    }
    await deleteSlot(id);
    return res.status(200).json({
      success: true,
      message: "Slot deleted successfully",
    });
  }
);



import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { getAvailableSlots } from "../services/slot.service";

export const getAvailableSlotsController = asyncHandler(
  async (_req: Request, res: Response) => {
    const slots = await getAvailableSlots();

    return res.status(200).json({
      success: true,
      message: "Available slots fetched successfully",
      data: slots,
    });
  }
);

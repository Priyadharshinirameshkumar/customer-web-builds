import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { websitePlanSchema } from "../validations/websitePlan.validation";
import { createWebsitePlan } from "../services/websitePlan.service";

export const createWebsitePlanController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      console.log("Request Body:", req.body);

      const body = websitePlanSchema.parse(req.body);

      const plan = await createWebsitePlan(body);

      return res.status(201).json({
        success: true,
        message: "Website Plan Submitted Successfully",
        data: plan,
      });
    } catch (error: any) {
      console.error("FULL ERROR:");
      console.error(error);

      return res.status(400).json({
        success: false,
        error: error,
      });
    }
  }
);
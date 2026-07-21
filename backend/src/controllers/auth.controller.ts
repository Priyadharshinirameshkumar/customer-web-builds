import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { loginAdmin } from "../services/auth.service";
import { loginSchema } from "../validations/auth.validation";

export const loginController = asyncHandler(
  async (req: Request, res: Response) => {
    const credentials = loginSchema.parse(req.body);
    const result = await loginAdmin(credentials);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  }
);

export const getMeController = asyncHandler(
  async (req: Request, res: Response) => {
    return res.status(200).json({
      success: true,
      message: "Authenticated admin fetched successfully",
      data: req.admin,
    });
  }
);

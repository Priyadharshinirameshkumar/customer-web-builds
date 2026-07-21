import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../config/env";
import { UnauthorizedError } from "../utils/errors";
import { getAdminById, verifyAdminToken } from "../services/auth.service";

export const authenticateAdmin = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    if (!JWT_SECRET) {
      throw new UnauthorizedError("Authentication is not configured");
    }

    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new UnauthorizedError("Authentication token required");
    }

    const token = authHeader.slice(7);
    const payload = verifyAdminToken(token);
    const admin = await getAdminById(payload.adminId);

    req.admin = admin;
    next();
  } catch (error) {
    next(error);
  }
};

import { Router } from "express";
import {
  createBookingController,
  getBookingStatusController,
  updateBookingStatusController,
} from "../controllers/booking.controller";

const router = Router();

router.post("/", createBookingController);
router.get("/:id/status", getBookingStatusController);
router.patch("/:id/status", updateBookingStatusController);

export default router;
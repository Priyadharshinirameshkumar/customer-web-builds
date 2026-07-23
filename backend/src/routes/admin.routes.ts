import { Router } from "express";
import {
  cancelBookingController,
  confirmBookingController,
  deleteBookingController,
  getBookingByIdController,
  getBookingsController,
  getDashboardSummaryController,
  getSlotsController,
  getWebsitePlansController,
  createSlotController,
  updateSlotController,
  deleteSlotController,
} from "../controllers/admin.controller";
import { authenticateAdmin } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticateAdmin);

router.get("/dashboard/summary", getDashboardSummaryController);
router.get("/website-plans", getWebsitePlansController);
router.get("/bookings", getBookingsController);
router.get("/bookings/:id", getBookingByIdController);
router.patch("/bookings/:id/confirm", confirmBookingController);
router.patch("/bookings/:id/cancel", cancelBookingController);
router.delete("/bookings/:id", deleteBookingController);
router.get("/slots", getSlotsController);
router.post("/slots", createSlotController);
router.put("/slots/:id", updateSlotController);
router.delete("/slots/:id", deleteSlotController);

export default router;


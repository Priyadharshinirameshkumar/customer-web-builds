import { Router } from "express";
import { getAvailableSlotsController } from "../controllers/slot.controller";

const router = Router();

router.get("/", getAvailableSlotsController);

export default router;

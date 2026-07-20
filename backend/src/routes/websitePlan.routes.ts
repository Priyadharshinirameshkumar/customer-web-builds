import { Router } from "express";
import { createWebsitePlanController } from "../controllers/websitePlan.controller";

const router = Router();

router.post("/", createWebsitePlanController);

export default router;
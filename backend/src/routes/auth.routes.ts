import { Router } from "express";
import { getMeController, loginController } from "../controllers/auth.controller";
import { authenticateAdmin } from "../middleware/auth.middleware";

const router = Router();

router.post("/login", loginController);
router.get("/me", authenticateAdmin, getMeController);

export default router;

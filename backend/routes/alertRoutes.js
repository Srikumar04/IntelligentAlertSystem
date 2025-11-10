import express from "express";
import { createAlert, getAlerts, resolveAlert } from "../controllers/alertController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
const router = express.Router();

router.post("/", protect, createAlert);
router.get("/", protect, getAlerts);
router.post("/:id/resolve", protect, adminOnly, resolveAlert);


export default router;

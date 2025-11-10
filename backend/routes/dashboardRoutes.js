import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getDashboardStats,
  getAlertTrends,
  getTopDrivers,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/stats", protect,  getDashboardStats);
router.get("/trends", protect,  getAlertTrends);
router.get("/top-drivers", protect, getTopDrivers);


export default router;

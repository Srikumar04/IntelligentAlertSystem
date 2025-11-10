import express from "express";
import { addRule, getRules } from "../controllers/ruleController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
const router = express.Router();

router.post("/", protect, adminOnly, addRule);
router.get("/", protect, adminOnly, getRules);

export default router;

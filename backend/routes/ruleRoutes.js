import express from "express";
import { addRule, getRules } from "../controllers/ruleController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", protect, addRule);
router.get("/", protect, getRules);

export default router;

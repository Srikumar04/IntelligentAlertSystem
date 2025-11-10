import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cron from "node-cron";

import authRoutes from "./routes/authRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import ruleRoutes from "./routes/ruleRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import { autoCloseJob } from "./jobs/autoCloseJob.js";
import connectDB from "./config/db.js";
import { cleanupJob } from "./jobs/cleanupJob.js";
import { errorHandler } from "./middleware/errorHandler.js";



dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(errorHandler);

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/rules", ruleRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Run every 5 minutes
cron.schedule("*/5 * * * *", async () => {
  console.log("⏳ Running auto-close job...");
  await autoCloseJob();
});
cron.schedule("0 0 * * *", cleanupJob); // daily at midnight
app.listen(5000, () => console.log("Server running on port 5000"));

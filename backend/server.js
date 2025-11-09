import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cron from "node-cron";

import authRoutes from "./routes/authRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import ruleRoutes from "./routes/ruleRoutes.js";
import { autoCloseJob } from "./jobs/autoCloseJob.js";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/rules", ruleRoutes);

cron.schedule("*/5 * * * *", autoCloseJob); // every 5 minutes
app.listen(5000, () => console.log("Server running on port 5000"));

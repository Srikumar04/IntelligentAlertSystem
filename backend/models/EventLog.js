import mongoose from "mongoose";

const eventLogSchema = new mongoose.Schema({
  type: { type: String, enum: ["INFO", "ERROR", "ALERT", "SYSTEM"], default: "INFO" },
  message: String,
  details: Object,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("EventLog", eventLogSchema);

import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  alertId: String,
  sourceType: String,
  severity: { type: String, default: "INFO" },
  timestamp: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["OPEN", "ESCALATED", "AUTO-CLOSED", "RESOLVED"],
    default: "OPEN",
  },
  metadata: Object,
  resolvedBy: String,
  resolvedAt: Date
});

export default mongoose.model("Alert", alertSchema);

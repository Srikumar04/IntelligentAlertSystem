import EventLog from "../models/EventLog.js";
import Alert from "../models/Alert.js";

export const cleanupJob = async () => {
  try {
    const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days
    await EventLog.deleteMany({ createdAt: { $lt: cutoff } });
    await Alert.deleteMany({ timestamp: { $lt: cutoff } });
    console.log("Cleanup job executed:", new Date().toISOString());
  } catch (e) {
    console.error("Cleanup job failed:", e.message);
  }
};

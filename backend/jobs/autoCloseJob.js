import Alert from "../models/Alert.js";

export const autoCloseJob = async () => {
  try {
    const alerts = await Alert.find({ status: { $in: ["OPEN", "ESCALATED"] } });
    for (const a of alerts) {
      if (a.sourceType === "compliance" && a.metadata?.document_valid) {
        a.status = "AUTO-CLOSED";
        await a.save();
      }
    }
    console.log("Auto-close job executed at", new Date().toISOString());
  } catch (e) {
    console.error("Auto-close job failed:", e.message);
  }
};

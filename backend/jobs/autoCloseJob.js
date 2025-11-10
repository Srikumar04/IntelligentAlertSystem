import Alert from "../models/Alert.js";

// Auto-close compliance alerts if document renewed
export const autoCloseJob = async () => {
  try {
    const alerts = await Alert.find({ sourceType: "compliance", status: { $in: ["OPEN", "ESCALATED"] } });
    for (const a of alerts) {
      if (a.metadata?.document_valid) {
        a.status = "AUTO-CLOSED";
        await a.save();
      }
    }
    console.log("✅ Auto-close compliance alerts executed");
  } catch (err) {
    console.error("❌ Auto-close job failed:", err);
  }
};


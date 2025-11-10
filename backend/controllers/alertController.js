import Alert from "../models/Alert.js";
import Rule from "../models/Rule.js";

export const createAlert = async (req, res) => {
  try {
    const alert = await Alert.create(req.body);
    // console.log(alert);

    // check rules dynamically
    const rule = await Rule.findOne({ type: alert.sourceType });
    // console.log(rule);
    console.log(rule.config.escalate_if_count);
    if (rule && rule.config.escalate_if_count) {
          const since = new Date(Date.now() - rule.config.window_mins * 60000);
          const count = await Alert.countDocuments({
            sourceType: alert.sourceType,
            "metadata.driverId": alert.metadata.driverId,
            timestamp: { $gte: since },
          });
          console.log(`count is ${count}`);
          console.log(rule.config.escalate_if_count);
          if (count >= rule.config.escalate_if_count) {
            alert.status = "ESCALATED";
            alert.severity = "CRITICAL";
            await alert.save();
          }
    }

    if (
      rule &&
      rule.config.auto_close_if_document_valid &&
      alert.metadata.document_valid
    ) {
      alert.status = "AUTO-CLOSED";
      await alert.save();
    }

    if (
      rule &&
      rule.config.escalate_if_bad_feedbacks &&
      alert.metadata.feedback === "bad"
    ) {
      const since = new Date(Date.now() - rule.config.window_hours * 60 * 60 * 1000);
      const count = await Alert.countDocuments({
        sourceType: alert.sourceType,
        "metadata.userId": alert.metadata.userId,
        "metadata.feedback": "bad",
        timestamp: { $gte: since },
      });

      if (count >= rule.config.escalate_if_bad_feedbacks) {
        alert.status = "ESCALATED";
        alert.severity = "CRITICAL";
        await alert.save();
      }
    }

    res.json(alert);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

export const getAlerts = async (req, res) => {
  const alerts = await Alert.find().sort({ timestamp: -1 });
  res.json(alerts);
};


export const resolveAlert = async (req, res) => {
  try {
    // Find the reference alert
    const alert = await Alert.findById(req.params.id);
    if (!alert) return res.status(404).json({ msg: "Alert not found" });

    const driverId = alert.metadata?.driverId;
    if (!driverId) return res.status(400).json({ msg: "No driverId in metadata" });

    // Update all alerts with same driverId
    const result = await Alert.updateMany(
      { "metadata.driverId": driverId, status: { $in: ["OPEN", "ESCALATED"] } },
      {
        $set: {
          status: "RESOLVED",
          resolvedBy: req.user.id,
          resolvedAt: new Date()
        }
      }
    );

    res.json({
      msg: `Resolved ${result.modifiedCount} alerts for driver ${driverId}`,
      driverId
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

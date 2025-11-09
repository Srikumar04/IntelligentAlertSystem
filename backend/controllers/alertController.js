import Alert from "../models/Alert.js";
import Rule from "../models/Rule.js";

export const createAlert = async (req, res) => {
  try {
    const alert = await Alert.create(req.body);

    // check rules dynamically
    const rule = await Rule.findOne({ type: alert.sourceType });
    if (rule && rule.config.escalate_if_count) {
      const since = new Date(Date.now() - rule.config.window_mins * 60000);
      const count = await Alert.countDocuments({
        sourceType: alert.sourceType,
        "metadata.driverId": alert.metadata.driverId,
        timestamp: { $gte: since },
      });
      if (count >= rule.config.escalate_if_count) {
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

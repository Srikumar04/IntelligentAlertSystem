import Alert from "../models/Alert.js";
import EventLog from "../models/EventLog.js";

export const getDashboardStats = async (req, res) => {
  try {
    const total = await Alert.countDocuments();
    const open = await Alert.countDocuments({ status: "OPEN" });
    const escalated = await Alert.countDocuments({ status: "ESCALATED" });
    const autoClosed = await Alert.countDocuments({ status: "AUTO-CLOSED" });

    const recentAlerts = await Alert.find().sort({ timestamp: -1 }).limit(5);
    const recentLogs = await EventLog.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      summary: { total, open, escalated, autoClosed },
      recentAlerts,
      recentLogs,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getAlertTrends = async (req, res) => {
  try {
    const trends = await Alert.aggregate([
      { $group: { _id: { $substr: ["$timestamp", 0, 10] }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    res.json(trends);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getTopDrivers = async (req, res) => {
  try {
    const drivers = await Alert.aggregate([
      { $group: { _id: "$metadata.driverId", totalAlerts: { $sum: 1 } } },
      { $sort: { totalAlerts: -1 } },
      { $limit: 5 },
    ]);
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

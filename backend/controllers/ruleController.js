import Rule from "../models/Rule.js";

export const addRule = async (req, res) => {
  try {
    const { type, config } = req.body;
    const existing = await Rule.findOneAndUpdate({ type }, { config }, { new: true, upsert: true });
    res.json(existing);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

export const getRules = async (req, res) => {
  const rules = await Rule.find();
  res.json(rules);
};

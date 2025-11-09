import mongoose from "mongoose";

const ruleSchema = new mongoose.Schema({
  type: String,
  config: Object,
});

export default mongoose.model("Rule", ruleSchema);

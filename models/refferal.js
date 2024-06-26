import mongoose from "mongoose";

const ReferralSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  position: { type: String, required: true },
  company: { type: String, required: true },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Referral = mongoose.model("Referral", ReferralSchema);

export default Referral;

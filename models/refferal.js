import mongoose from "mongoose";

const ReferralSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  position: { type: String, required: true },
  company: { type: String, required: true },
  message: { type: String },
  resumeReview: { type: Boolean, default: false },
  interviewHandhold: { type: Boolean, default: false },
  careerGuidance: { type: Boolean, default: false },
  mockInterview: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Referral = mongoose.model("Referral", ReferralSchema);

export default Referral;

const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    // Contact Information
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    location: { type: String },
    linkedin: { type: String },

    // Resume
    resumeUrl: { type: String, required: true }, // stored file path or cloud URL

    // Design Background
    portfolio: { type: String, required: true },

    scalableDecision: { type: String, required: true },
    tightDeadlineFeature: { type: String, required: true },
    impactEvaluation: { type: String, required: true },

    // Clueso & You
    whyClueso: { type: String, required: true },
    additionalInfo: { type: String },

    // Source
    source: {
      type: String,
      enum: ["Company website", "Company employee", "LinkedIn", "Other"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);

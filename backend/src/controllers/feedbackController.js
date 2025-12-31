const Feedback = require("../models/Feedback");

/* CREATE FEEDBACK */
exports.createFeedback = async (req, res) => {
  try {
    const { rating, message } = req.body;

    if (!rating || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    const feedback = await Feedback.create({
      user: req.user.id,
      rating,
      message
    });

    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: "Failed to submit feedback" });
  }
};

/* GET ALL FEEDBACK (for dashboard) */
exports.getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: "Failed to load feedback" });
  }
};

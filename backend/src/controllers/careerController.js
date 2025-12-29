const Application = require("../models/Application");

exports.applyForJob = async (req, res) => {
  try {
    const resumePath = req.file?.path;

    if (!resumePath) {
      return res.status(400).json({ message: "Resume is required" });
    }

    const application = await Application.create({
      ...req.body,
      resumeUrl: resumePath,
    });

    res.status(201).json({
      message: "Application submitted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Submission failed" });
  }
};

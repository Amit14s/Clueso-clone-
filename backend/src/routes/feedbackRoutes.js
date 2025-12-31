const express = require("express");
const router = express.Router();
const { createFeedback, getFeedback } = require("../controllers/feedbackController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createFeedback);
router.get("/", authMiddleware, getFeedback);

module.exports = router;

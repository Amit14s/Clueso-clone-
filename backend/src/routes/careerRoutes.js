const express = require("express");
const upload = require("../middleware/resumeUpload");
const { applyForJob } = require("../controllers/careerController");

const router = express.Router();

router.post("/apply", upload.single("resume"), applyForJob);

module.exports = router;

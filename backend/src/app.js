const express = require("express");
const cors = require("cors");
const passport = require("passport");
const feedbackRoutes = require("./routes/feedbackRoutes");
require("./config/googleAuth");



const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
// app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/careers", require("./routes/careerRoutes"));
app.use("/api/feedback", feedbackRoutes);


module.exports = app;

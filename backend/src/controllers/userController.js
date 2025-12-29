const User = require("../models/User");

exports.getMe = async (req, res) => {
  res.json(req.user);
};

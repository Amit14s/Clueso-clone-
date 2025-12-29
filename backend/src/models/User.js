const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    googleId: String,
    ssoProvider: {
  type: String,
  enum: ["google", "sso", "password"],
  default: "password",
},
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const crypto = require("crypto");
const transporter = require("../config/mailer");

/*SIGN UP (Email + Password)*/
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      ssoProvider: "password",
    });

    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Signup failed" });
  }
};

/* LOGIN (Email + Password)*/
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

/*
   GOOGLE LOGIN CALLBACK
*/
exports.googleCallback = async (req, res) => {
  try {
    const user = req.user;

    const token = generateToken(user._id);

    // Redirect back to frontend with token
    res.redirect(
      `http://localhost:3000/dashboard?token=${token}`
    );
  } catch (error) {
    res.status(500).json({ message: "Google login failed" });
  }
};
  // SSOLOGIN
  exports.ssoLogin = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  const domain = email.split("@")[1];

  // Example: allow only company domains
  if (!domain) {
    return res.status(400).json({ message: "Invalid email" });
  }

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      email,
      name: email.split("@")[0],
      ssoProvider: "sso",
    });
  }

  const token = generateToken(user._id);

  res.json({
    token,
    user,
  });
};

//FORGOT PASSWORD CONTROLLER
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({
        message: "If the email exists, a reset link has been sent"
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await transporter.sendMail({
      to: user.email,
      subject: "Reset your Clueso password",
      html: `
        <p>You requested a password reset.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link expires in 15 minutes.</p>
      `
    });

    res.json({
      message: "If the email exists, a reset link has been sent"
    });

  } catch (error) {
    res.status(500).json({ message: "Forgot password failed" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (error) {
    res.status(500).json({ message: "Reset password failed" });
  }
};

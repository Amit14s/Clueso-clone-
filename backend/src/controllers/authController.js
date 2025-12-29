const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

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

const express = require("express");
const passport = require("passport");
const {
  signup,
  login,
  googleCallback,
  ssoLogin,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallback
);
router.post("/sso", ssoLogin);

module.exports = router;

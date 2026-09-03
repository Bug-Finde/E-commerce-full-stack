const express = require("express");
const passport = require("../config/passport"); // use configured instance with strategies loaded
const {
  register,
  verifyUser,
  resendEmail,
  login,
  logout,
  forgetPassowrd,
  verifyOtp,
  changePassword,
  changePasswordAuth,
  oauthCallback,
} = require("../controllers/auth");
const { fetchUser } = require("../middleware/fetchUser");
const rateLimit = require("express-rate-limit");

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: "Too many requests, please try again later" },
});

// ─── Email / password routes ──────────────────────────────────────────────────
router.post("/register", authLimiter, register);
router.post("/verify", verifyUser);
router.post("/resend", authLimiter, resendEmail);
router.post("/login", authLimiter, login);
router.post("/logout", fetchUser, logout);
router.post("/forget", authLimiter, forgetPassowrd);
router.post("/verify-otp", authLimiter, verifyOtp);
router.post("/change-password", authLimiter, changePassword);
router.post("/change-password-auth", fetchUser, changePasswordAuth);

// ─── Google OAuth ─────────────────────────────────────────────────────────────
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: `${process.env.FRONTEND_URL}/login?error=google_failed`, session: false }),
  oauthCallback
);

// ─── Facebook OAuth ───────────────────────────────────────────────────────────
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"], session: false })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: `${process.env.FRONTEND_URL}/login?error=facebook_failed`, session: false }),
  oauthCallback
);

module.exports = router;

import { Router } from "express";
import {
  loginUser,
  registerUser,
  getProfile,
  sendOtpEmail,
  sendOtpSms,
  verifyOtp,
  signupUser,
  getMe,
} from "../controllers/user.ts";
import {
  isUserauthenticatedJWTBased,
} from "../middlewares/auth";
import { isUserauthenticatedSupabaseOauth } from "../middlewares/supabaseOauth";

const router = Router();

// JWT routes
router.post("/login", loginUser);
router.post("/register", isUserauthenticatedJWTBased, registerUser);
router.get("/profile", isUserauthenticatedJWTBased, getProfile);


router.post("/send-otp-email", sendOtpEmail);
router.post("/send-otp-sms", sendOtpSms);
router.post("/verify-otp", verifyOtp);

// supabase
router.post("/signup", isUserauthenticatedSupabaseOauth, signupUser);
router.get("/me", isUserauthenticatedSupabaseOauth, getMe);

export default router;

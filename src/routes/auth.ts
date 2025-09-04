import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { isUserauthenticatedJWTBased, AuthenticatedRequest } from "../middlewares/auth";
import { isUserauthenticatedSupabaseOauth } from "../middlewares/supabaseOauth";
import { ENV } from "../config/env";
import { supabase } from "../config/supabase";

const router = Router();

router.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "password123") {
    const token = jwt.sign(
      { username, role: "admin" },
      ENV.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

router.post("/register", isUserauthenticatedJWTBased, (req: Request, res: Response) => {
  const { username, password } = req.body;

  const useSaved = { username, password };
  return res.json({ message: "User registered", user: useSaved });
});


router.post("/signup", isUserauthenticatedSupabaseOauth, (req: Request, res: Response) => {
  const { username, password } = req.body;

  const useSaved = { username, password };
  return res.json({ message: "User registered", user: useSaved });
});



router.get(
  "/profile",
  isUserauthenticatedJWTBased,
  (req: AuthenticatedRequest, res: Response) => {
    res.json({ message: "Secure profile data", user: req.user });
  }
);


router.get(
  "/me",
  isUserauthenticatedSupabaseOauth,
  (req: AuthenticatedRequest, res: Response) => {
    res.json({ message: "Secure profile data", user: req.user });
  }
);





router.post("/send-otp-email", async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    if (email) {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) return res.status(400).json({ error: error.message });
      return res.json({ message: "OTP sent to email" });
    } 
    return res.status(400).json({ error: "Email or phone is required" });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});


router.post("/send-otp-sms", async (req: Request, res: Response) => {
  const { phone } = req.body;

  try {
    if (phone) {
      const { error } = await supabase.auth.signInWithOtp({ phone });
      if (error) return res.status(400).json({ error: error.message });
      return res.json({ message: "OTP sent to phone" });
    }
    return res.status(400).json({ error: "Email or phone is required" });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});


router.post("/verify-otp", async (req: Request, res: Response) => {
  const { email, phone, token } = req.body;

  try {
    let data, error;

    if (email) {
      ({ data, error } = await supabase.auth.verifyOtp({
        type: "magiclink",
        email,
        token,
      }));
    } else if (phone) {
      ({ data, error } = await supabase.auth.verifyOtp({
        type: "sms",
        phone,
        token,
      }));
    } else {
      return res.status(400).json({ error: "Email or phone required" });
    }

    if (error) return res.status(400).json({ error: error.message });

    return res.json({
      message: "OTP verified",
      session: data.session,
      user: data.user,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});


export default router;



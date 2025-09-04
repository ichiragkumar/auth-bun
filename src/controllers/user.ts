import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { supabase } from "../config/supabase";
import { ENV } from "../config/env";
import { AuthenticatedRequest } from "../middlewares/auth";
import { ResponseHandler } from "../utils/responseHandler";



export const loginUser = (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "password123") {
    const token = jwt.sign({ username, role: "admin" }, ENV.JWT_SECRET!, {
      expiresIn: "1h",
    });
    return ResponseHandler.success(res, { token }, "Login successful");
  }
  return ResponseHandler.notAuthorized(res, "Invalid credentials");
};


export const registerUser = (req: Request, res: Response) => {
  const { username, password } = req.body;
  const savedUser = { username, password }; 
  return ResponseHandler.created(res, savedUser, "User registered");
};


export const getProfile = (req: AuthenticatedRequest, res: Response) => {
  return ResponseHandler.success(res, req.user, "Profile data");
};


export const sendOtpEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    if (!email) return ResponseHandler.badRequest(res, null, "Email required");

    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) return ResponseHandler.badRequest(res, error, error.message);

    return ResponseHandler.success(res, null, "OTP sent to email");
  } catch (err: any) {
    return ResponseHandler.error(res, err, err.message);
  }
};


export const sendOtpSms = async (req: Request, res: Response) => {
  const { phone } = req.body;
  try {
    if (!phone) return ResponseHandler.badRequest(res, null, "Phone required");

    const { error } = await supabase.auth.signInWithOtp({ phone });
    if (error) return ResponseHandler.badRequest(res, error, error.message);

    return ResponseHandler.success(res, null, "OTP sent to phone");
  } catch (err: any) {
    return ResponseHandler.error(res, err, err.message);
  }
};


export const verifyOtp = async (req: Request, res: Response) => {
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
      return ResponseHandler.badRequest(res, null, "Email or phone required");
    }

    if (error) return ResponseHandler.badRequest(res, error, error.message);

    return ResponseHandler.success(res, data, "OTP verified");
  } catch (err: any) {
    return ResponseHandler.error(res, err, err.message);
  }
};


export const signupUser = (req: Request, res: Response) => {
  const { username, password } = req.body;
  const savedUser = { username, password };
  return ResponseHandler.created(res, savedUser, "User registered");
};


export const getMe = (req: AuthenticatedRequest, res: Response) => {
  return ResponseHandler.success(res, req.user, "Me data");
};

import { z } from "zod";

export const userSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const userEmailSchema = z.object({
  email: z.string(),
});

export const userPasswordSchema = z.object({
  phone: z.string(),
});

export const verifyOtpSchema = z
  .object({
    email: z.string().optional(),
    phone: z.string().optional(),
    token: z.string(),
  })
  .refine((data) => data.email || data.phone, "Email or phone is required");
export type User = z.infer<typeof userSchema>;
export type UserEmail = z.infer<typeof userEmailSchema>;

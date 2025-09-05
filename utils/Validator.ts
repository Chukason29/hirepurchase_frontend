import { email, z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, "Full name is required"),
    email: email("Invalid email address").min(1, "Email is required"),
    phone: z.string().min(1, "Phone number is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirm: z.string().min(8, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "Passwords do not match",
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const otpSchema = z.object({
  otp: z.string().min(1, "OTP is required"),
});

export type OtpSchema = z.infer<typeof otpSchema>;

export const forgotPasswordSchema = z.object({
  email: email("Invalid email address").min(1, "Email is required"),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const createPinSchema = z
  .object({
    pin: z.string().min(4, "Please enter a pin you can easily recall"),
    confirm_pin: z.string().min(4, "Confirm the Pin you've entered"),
  })
  .refine((data) => data.pin === data.confirm_pin, {
    message: "pins do not match",
  });

export type CreatePinSchema = z.infer<typeof createPinSchema>;

export const resetPinSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    pin: z
      .string()
      .length(4, "PIN must be exactly 4 characters")
      .regex(/^\d+$/, "PIN must contain only digits"),
    confirm_pin: z
      .string()
      .length(4, "Confirm PIN must be exactly 4 characters")
      .regex(/^\d+$/, "Confirm PIN must contain only digits"),
  })
  .refine((data) => data.pin === data.confirm_pin, {
    message: "PINs must match",
    path: ["confirm_pin"],
  });

export type ResetPinSChema = z.infer<typeof resetPinSchema>;

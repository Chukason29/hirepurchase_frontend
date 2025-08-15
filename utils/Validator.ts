import { email, z } from "zod"

export const registerSchema = z.object({
    fullname: z.string().min(1, "Full name is required"),
    email: email("Invalid email address").min(1, "Email is required"),
    phone: z.string().min(1, "Phone number is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirm: z.string().min(8, "Password confirmation is required"),
}).refine((data) => data.password === data.password_confirm, {
    message: "Passwords do not match",
})

export type RegisterSchema = z.infer<typeof registerSchema>
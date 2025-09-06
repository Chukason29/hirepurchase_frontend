"use client";

import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from "@/utils/Validator";
import { useForm } from "react-hook-form";
import { forgotPassword } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const router = useRouter();

  const onSubmit = async (data: ForgotPasswordSchema) => {
    setLoading(true);
    try {
      const otpToken = await forgotPassword(data.email);

      if (otpToken) {
        // Save otpToken for use in OTP verification page
        localStorage.setItem("otp_token", otpToken);
      }

      router.push("/forgot-password/otp");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Top navbar */}
      <div className="flex items-center justify-start p-4 bg-white shadow-sm sticky top-0 z-50">
        <Image
          src="https://res.cloudinary.com/djjqicpga/image/upload/v1756282560/hire-purchase-logo_rih8e5.png"
          alt="Hire purchase logo"
          height={30}
          width={150}
        />
      </div>

      {/* Main content */}
      <div className="flex flex-col min-h-screen w-full items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
          {/* Heading */}
          <h2 className="font-dm-sans font-black text-black text-3xl md:text-4xl text-center mb-3">
            Forgot Password
          </h2>
          <p className="font-dm-sans font-medium text-gray-600 text-center mb-6 text-sm md:text-base">
            Enter your registered email address and we’ll send you a 6-digit
            verification code.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block font-dm-sans font-light text-black text-sm mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              disabled={!isValid || loading}
              type="submit"
              className={`w-full flex items-center justify-center bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition ${
                !isValid || loading
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              {loading ? (
                <div className="flex items-center space-x-1">
                  <motion.span
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                  />
                  <motion.span
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                  />
                  <motion.span
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                  />
                  <span className="ml-2">Sending Code...</span>
                </div>
              ) : (
                "Send OTP"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

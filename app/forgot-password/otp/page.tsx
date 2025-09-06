"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { otpSchema, type OtpSchema } from "@/utils/Validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordOtp } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

export default function VerifyEmail() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
    mode: "onChange",
  });

  const router = useRouter();

  const onSubmit = async (data: OtpSchema) => {
    setLoading(true);
    try {
      await forgotPasswordOtp(data.otp);
      router.push("/reset-password");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Logo header */}
      <div className="flex items-center justify-end p-4 bg-white shadow-sm sticky top-0 z-50">
        <Image
          src="https://res.cloudinary.com/djjqicpga/image/upload/v1756282560/hire-purchase-logo_rih8e5.png"
          alt="Hire purchase logo"
          width={150}
          height={30}
        />
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50">
        {/* Left image */}
        <div className="hidden md:flex w-1/2 justify-center p-8">
          <Image
            src="https://res.cloudinary.com/djjqicpga/image/upload/v1756282564/reg-image_ie5jgz.png"
            width={600}
            height={10}
            alt="Hire purchase register image"
            className="rounded-lg shadow-lg object-contain max-w-full h-auto"
            priority
          />
        </div>

        {/* Right form section */}
        <div className="flex w-full md:w-1/2 justify-center p-4 md:p-8 mt-8">
          <div className="bg-white shadow-xl rounded-xl p-6 md:p-8 w-full max-w-md">
            {/* Title */}
            <h2 className="text-lg md:text-lg font-extrabold text-gray-900 mb-6 text-center">
              Enter OTP to Change Password
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* OTP */}
              <input
                type="text"
                placeholder="Enter OTP"
                {...register("otp")}
                name="otp"
                className="w-full px-4 py-2 border text-center rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              {errors.otp && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.otp.message}
                </p>
              )}

              {/* Submit */}
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
                      transition={{
                        repeat: Infinity,
                        duration: 0.6,
                        delay: 0.2,
                      }}
                    />
                    <motion.span
                      className="w-2 h-2 bg-white rounded-full"
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.6,
                        delay: 0.4,
                      }}
                    />
                    <span className="ml-2">Verifying OTP...</span>
                  </div>
                ) : (
                  "Verify OTP"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

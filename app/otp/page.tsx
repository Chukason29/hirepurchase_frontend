"use client";

import Image from "next/image";
import logo from "@/public/images/hire-purchase-logo.png";
import registerImage from "@/public/images/reg-image.png";
import Link from "next/link";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { otpSchema, type OtpSchema } from "@/utils/Validator";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser, verifyOtp } from "@/services/auth.service";
import { useRouter } from "next/navigation";

export default function verifyEmail() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: any) => {
    console.log("Submitting:", data);
    try {
      await verifyOtp(data);
    //   toast.success("Otp v successful!");
      router.push("/login");
    } catch (error: any) {
      toast(error.message);
      console.error(error);
    }
  };

  return (
    <>
      {/* Logo header */}
      <div className="flex items-center justify-end p-4 bg-white shadow-sm sticky top-0 z-50">
        <Image src={logo} alt="Hire purchase logo" height={30} />
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50">
        {/* Left image */}
        <div className="hidden md:flex w-1/2 justify-center p-8 ">
          <Image
            src={registerImage}
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
              Enter OTP to Verify Email
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* OTP*/}
              <input
                type="text"
                placeholder="Enter OTP"
                {...register("otp")}
                className="w-full px-4 py-2 border text-center rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              {errors.otp && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.otp.message}
                </p>
              )}

              {/* Submit */}
              <button
                disabled={!isValid}
                type="submit"
                className={`w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition ${
                  !isValid ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                Verify OTP
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

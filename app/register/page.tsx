"use client";

import Image from "next/image";
import logo from "@/public/images/hire-purchase-logo.png";
import registerImage from "@/public/images/reg-image.png";
import Link from "next/link";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterSchema } from "@/utils/Validator";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";

export default function registerPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const router = useRouter()

  const onSubmit = async (data: any) => {
    console.log("Submitting:", data);
    try {
      await registerUser(data);
      // toast.success("Registration successful!");
      router.push('/otp');
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
            {/* Already have account */}
            <p className="text-center text-gray-500 mb-4 text-sm">
              Have an account already?{" "}
              <Link
                href="/login"
                className="font-semibold text-blue-600 hover:underline"
              >
                Login
              </Link>
            </p>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 text-center">
              Create a Secure Account
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Full Name */}
              <input
                type="text"
                placeholder="Full Name"
                {...register("name")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}

              {/* Email */}
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}

              {/* Phone */}
              <input
                type="text"
                placeholder="E.g. 0803000000123"
                {...register("phone")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>

              <p className="text-xs italic text-gray-500">
                At least one capital, small letters, number and special
                character
              </p>

              {/* Confirm Password */}
              <div className="relative">
                <input
                  type={showRePassword ? "text" : "password"}
                  placeholder="Re-enter Password"
                  {...register("password_confirm")}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                {errors.password_confirm && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password_confirm.message}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setShowRePassword(!showRePassword)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                >
                  {showRePassword ? (
                    <FiEyeOff size={20} />
                  ) : (
                    <FiEye size={20} />
                  )}
                </button>
              </div>

              {/* Referral Code */}
              <input
                type="text"
                placeholder="Referral Code (optional)"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              />

              {/* Submit */}
              <button
                disabled={!isValid}
                type="submit"
                className={`w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition ${
                  !isValid ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                Sign Up
              </button>

              <p className="text-center text-gray-500 mt-4 text-xs">
                By registering you agree to our{" "}
                <Link
                  href="#"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Terms of Use
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

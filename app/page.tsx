"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterSchema } from "@/utils/Validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { hirePurchaseApi } from "@/api/API";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("ENV:", process.env.NEXT_PUBLIC_BASE_URL);
    console.log("Axios instance baseURL:", hirePurchaseApi.defaults.baseURL);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const router = useRouter();

  const onSubmit = async (data: RegisterSchema) => {
    console.log("Submitting:", data);
    setLoading(true);
    try {
      await registerUser(data);
      router.push("/otp");
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
                    <FiEyeOff size={20} className="cursor-pointer" />
                  ) : (
                    <FiEye size={20} className="cursor-pointer" />
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
                    <span className="ml-2">Signing Up...</span>
                  </div>
                ) : (
                  "Sign Up"
                )}
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

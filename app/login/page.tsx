"use client";
import logo from "@/public/images/hire-purchase-logo.png";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import registerImage from "@/public/images/reg-image.png";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchema } from "@/utils/Validator";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "@/services/auth.service";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    watch,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    console.log("Submitting:", data);
    try {
      await loginUser(data);
      // toast.success("Login successful!");
      reset();
    } catch (error: any) {
      toast(error.message);
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-end p-4 bg-white shadow-sm sticky top-0 z-50">
        <Image src={logo} alt="Hire purchase logo" height={30} />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50 px-4">
        {/* Left image (hidden on small screens) */}
        <div className="hidden md:flex w-1/2 justify-center p-8">
          <Image
            src={registerImage}
            alt="Hire purchase register image"
            className="rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Right form section */}
        <div className="flex w-full md:w-1/2 justify-center p-4 md:p-8">
          <div className="bg-white shadow-xl rounded-xl p-6 md:p-8 w-full max-w-md">
            {/* Already have account */}
            <p className="text-center text-gray-500 mb-4 text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/"
                className="font-semibold text-blue-600 hover:underline"
              >
                Sign Up
              </Link>
            </p>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 text-center">
              Welcome Back
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />

              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}

              {/* Password with eye toggle */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
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

              {/* Forgot password link aligned right */}
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-xs text-blue-500 hover:underline italic"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login button */}
              <button
                type="submit"
                disabled={!isValid}
                className={`w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition ${
                  !isValid ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

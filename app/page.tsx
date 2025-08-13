"use client";

import Image from "next/image";
import logo from "@/public/images/hire-purchase-logo.png";
import registerImage from "@/public/images/reg-image.png";
import Link from "next/link";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  return (
    <>
      {/* Logo header */}
      <div className="flex items-center justify-end p-4 bg-white shadow-sm sticky top-0 z-50">
        <Image src={logo} alt="Hire purchase logo" height={30} />
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50">
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
            <form action="" className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              <input
                type="text"
                placeholder="E.g. 0803000000123"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
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

              {/* Re-enter password field with toggle */}
              <div className="relative">
                <input
                  type={showRePassword ? "text" : "password"}
                  placeholder="Re-enter Password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
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
              <input
                type="text"
                placeholder="Referral Code (optional)"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              />

              <button
                type="submit"
                className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition cursor-pointer"
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

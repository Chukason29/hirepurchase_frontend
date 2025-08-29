"use client";

import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from "@/utils/Validator";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { forgotPassword } from "@/services/auth.service";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const router = useRouter();

  const onSubmit = async (data: ForgotPasswordSchema) => {
    console.log("Submitting:", data);
    try {
      await forgotPassword(data.email);
      // toast.success("Verification code sent to your email!");
      router.push("/otp");
    } catch (error) {
      toast.error(
        (error as { message?: string })?.message || "Something went wrong"
      );
      console.error(error);
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
              type="submit"
              className="w-full bg-gray-600 text-white py-2.5 rounded-lg hover:bg-gray-700 transition-all duration-200 ease-in-out shadow-sm"
            >
              Send 6-digit Code
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

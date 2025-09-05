"use client";
import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   forgotPasswordSchema,
//   type ForgotPasswordSchema,
// } from "@/utils/Validator";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { forgotPassword } from "@/services/auth.service";
// import { motion } from "framer-motion";
import CreatePin from "@/components/create-pin";
import UpdatePin from "@/components/update-pin";

const SecuritySettings: React.FC = () => {
  // const [loading, setLoading] = useState(false);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isValid },
  // } = useForm<ForgotPasswordSchema>({
  //   resolver: zodResolver(forgotPasswordSchema),
  //   mode: "onChange",
  // });

  // const router = useRouter();

  // const onSubmit = async (data: ForgotPasswordSchema) => {
  //   console.log("Submitting:", data);
  //   setLoading(true);
  //   try {
  //     await forgotPassword(data.email);
  //     router.push("/forgot-password/otp");
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="space-y-8">
      <h2 className="font-semibold">Security Settings</h2>
      <p>Manage your account security</p>

      <div className="space-y-4">
        {/* <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Label>Reset Password</Label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
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
        </form> */}

        <CreatePin />
        <UpdatePin />
      </div>
    </div>
  );
};

export default SecuritySettings;

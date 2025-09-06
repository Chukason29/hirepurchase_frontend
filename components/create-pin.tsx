"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPinSchema, type CreatePinSchema } from "@/utils/Validator";
import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
import { createPin } from "@/services/auth.service";
import { motion } from "framer-motion";

const CreatePin = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreatePinSchema>({
    resolver: zodResolver(createPinSchema),
    mode: "onChange",
  });

  // const router = useRouter();

  const onSubmit = async (data: CreatePinSchema) => {
    setLoading(true);
    try {
      await createPin(data.pin);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mb-5"
      >
        <Label>Create New Pin</Label>
        <Input
          placeholder="Enter pin here"
          id="pin"
          {...register("pin")}
          className="bg-gray-100"
        />
        {errors.pin && (
          <p className="text-red-500 text-xs">{errors.pin.message}</p>
        )}

        <Input
          placeholder="Enter pin confirmation here"
          className="bg-gray-100"
          id="confirm_pin"
          {...register("confirm_pin")}
        />
        {errors.confirm_pin && (
          <p className="text-red-500 text-xs">{errors.confirm_pin.message}</p>
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
              <span className="ml-2">Creating Pin...</span>
            </div>
          ) : (
            "Create Pin"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreatePin;

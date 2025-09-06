/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPinSchema, type ResetPinSChema } from "@/utils/Validator";
import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
import { updatePin } from "@/services/auth.service";
import { motion } from "framer-motion";
import { toast } from "sonner";

const UpdatePin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<ResetPinSChema>({
    resolver: zodResolver(resetPinSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ResetPinSChema) => {
    const maxLength = 4; // Adjust based on your database schema
    if (data.pin.length > maxLength) {
      setError(
        `PIN is too long (${data.pin.length} characters). Must be ${maxLength} characters or less.`
      );
      return;
    }
    if (data.confirm_pin.length > maxLength) {
      setError(
        `Confirm PIN is too long (${data.confirm_pin.length} characters). Must be ${maxLength} characters or less.`
      );
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await updatePin(data.password, data.pin, data.confirm_pin);
      reset();
    } catch (error: any) {
      toast.error("UpdatePin error:", error);

      const errorMessage = error.message.includes(
        "value too long for type character varying(4)"
      )
        ? `Database error: One of the fields (likely PIN or Confirm PIN) exceeds 4 characters.`
        : error.message || "Failed to reset PIN. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mb-5"
      >
        <Label>Reset Pin</Label>
        <Input
          placeholder="Enter password here"
          id="password"
          {...register("password")}
          className="bg-gray-100"
        />
        <Input
          placeholder="Enter new pin here"
          id="pin"
          maxLength={4} // Prevent user from entering more than 4 characters
          {...register("pin")}
          className="bg-gray-100"
        />
        <Input
          id="confirm_pin"
          maxLength={4} // Prevent user from entering more than 4 characters
          {...register("confirm_pin")}
          placeholder="Enter new pin confirmation here"
          className="bg-gray-100"
        />
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
              <span className="ml-2">Resetting Pin...</span>
            </div>
          ) : (
            "Reset Pin"
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdatePin;

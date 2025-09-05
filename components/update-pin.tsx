// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPinSchema, type ResetPinSChema } from "@/utils/Validator";
import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
import { updatePin } from "@/services/auth.service";
import { motion } from "framer-motion";

const UpdatePin = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<ResetPinSChema>({
    resolver: zodResolver(resetPinSchema),
    mode: "onChange",
  });

  // const router = useRouter();

  const onSubmit = async (data: ResetPinSChema) => {
    console.log("Submitting:", data);
    setLoading(true);
    try {
      await updatePin(data.old_pin, data.new_pin, data.confirm_new_pin);
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
        <Label>Reset Pin</Label>
        <Input
          placeholder="Enter old pin here"
          id="old_pin"
          {...register("old_pin")}
          className="bg-gray-100"
        />
        <Input
          placeholder="Enter new pin here"
          id="new_pin"
          {...register("new_pin")}
          className="bg-gray-100"
        />
        <Input
          id="confirm_new_pin"
          {...register("confirm_new_pin")}
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

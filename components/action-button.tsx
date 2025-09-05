/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ActionButtonProps {
  text: string;
  route?: string; // optional route to navigate
  onClickApi?: () => Promise<any>; // optional API call
  bgColor?: string; // e.g., "bg-yellow-400"
  textColor?: string; // e.g., "text-black"
  className?: string; // extra classes
}

const ActionButton: React.FC<ActionButtonProps> = ({
  text,
  route,
  onClickApi,
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);
    try {
      // Call API if provided
      if (onClickApi) await onClickApi();

      // Navigate if route is provided
      if (route) router.push(route);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className={`${bgColor} ${textColor} flex items-center justify-center gap-2 cursor-pointer ${className}`}
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? (
        <div className="flex items-center gap-1">
          <motion.span
            className="w-2 h-2 bg-white rounded-full"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            className="w-2 h-2 bg-white rounded-full"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          />
          <motion.span
            className="w-2 h-2 bg-white rounded-full"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
          />
        </div>
      ) : (
        text
      )}
    </Button>
  );
};

export default ActionButton;

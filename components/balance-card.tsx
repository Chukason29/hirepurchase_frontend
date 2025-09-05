"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import ActionButton from "@/components/action-button";

export default function BalanceCard() {
  const [showBalance, setShowBalance] = useState(false);
  const balance = "₦500,000.00"; // replace with real data
  // const [loading, setLoading] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative w-full rounded-2xl p-6 bg-gray-600 text-white overflow-hidden"
    >
      {/* Toggle eye button */}

      <h3 className="text-sm font-medium">Total Balance</h3>
      {/* Balance text */}
      <div className="flex flex-row gap-10 mt-2">
        <motion.p
          key={showBalance ? "visible" : "hidden"}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-bold tracking-wide"
        >
          {showBalance ? balance : "*****"}
        </motion.p>
        <button
          onClick={() => setShowBalance(!showBalance)}
          className=" bg-white/20 hover:bg-white/30 p-2 rounded-full transition cursor-pointer"
        >
          {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex gap-3">
        <ActionButton
          text="Withdraw"
          route="/portfolio"
          bgColor="bg-yellow-400"
          textColor="text-black"
          className="bg-yellow-400 text-black hover:bg-yellow-500 cursor-pointer"
        />

        {/* <Button className="bg-green-500 hover:bg-green-600">Deposit</Button> */}
      </div>
    </motion.div>
  );
}

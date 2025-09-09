"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import ActionButton from "@/components/action-button";
import {
  returnOnActiveInvestments,
  totalActiveInvestments,
  totalAmountInvested,
} from "@/services/balance.service";
import { toast } from "sonner";

export default function BalanceCard() {
  const [showBalance, setShowBalance] = useState(false);
  const [amountInvested, setAmountInvested] = useState<string | null>(null);
  const [activeInvestments, setActiveInvestments] = useState<string | null>(
    null
  );
  const [roi, setRoi] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const invested = await totalAmountInvested();
        setAmountInvested(invested?.amount || "₦0.00");

        const active = await totalActiveInvestments();
        setActiveInvestments(active?.total || "0");

        const returns = await returnOnActiveInvestments();
        setRoi(returns?.amount || "₦0.00");
      } catch (error) {
        toast.error("Error loading balances");
        console.error(error)
      }
    };

    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative w-full rounded-2xl p-6 bg-gray-600 text-white overflow-hidden"
    >
      <h3 className="text-sm font-medium">Portfolio Overview</h3>

      {/* 3-Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {/* Grid 1: Total Invested */}
        <div className="flex flex-col items-start">
          <span className="text-xs text-gray-300">Total Invested</span>
          <motion.p
            key={showBalance ? "amount" : "hidden1"}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-xl font-bold tracking-wide"
          >
            {showBalance ? amountInvested : "*****"}
          </motion.p>
        </div>

        {/* Grid 2: Active Investments */}
        <div className="flex flex-col items-start">
          <span className="text-xs text-gray-300">Active Investments</span>
          <motion.p
            key={showBalance ? "active" : "hidden2"}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-xl font-bold tracking-wide"
          >
            {showBalance ? activeInvestments : "*****"}
          </motion.p>
        </div>

        {/* Grid 3: ROI */}
        <div className="flex flex-col items-start">
          <span className="text-xs text-gray-300">Return on Investments</span>
          <motion.p
            key={showBalance ? "roi" : "hidden3"}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-xl font-bold tracking-wide"
          >
            {showBalance ? roi : "*****"}
          </motion.p>
        </div>
      </div>

      {/* Toggle + Buttons */}
      <div className="flex justify-between items-center mt-6">
        {/* Eye Toggle */}
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition cursor-pointer"
        >
          {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>

        {/* Withdraw Button */}
        <ActionButton
          text="Withdraw"
          route="/portfolio"
          bgColor="bg-yellow-400"
          textColor="text-black"
          className="bg-yellow-400 text-black hover:bg-yellow-500 cursor-pointer"
        />
      </div>
    </motion.div>
  );
}

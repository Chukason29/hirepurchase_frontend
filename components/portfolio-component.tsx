"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ActiveInvestmentsTable from "@/components/active-investment-table";
import CompletedInvestmentsTable from "@/components/completed-investment-table";

const PortfolioComponent = () => {
  const [isActive, setIsActive] = useState(true);

  // Mock investment data
  const activeData = [
    {
      id: "1",
      name: "Real Estate Fund",
      code: "INV-001",
      status: "Active",
      amount: "₦500,000",
      roi: "12%",
    },
  ];

  const completedData = [
    {
      id: "2",
      name: "Tech Startup Seed",
      code: "INV-002",
      status: "Completed",
      amount: "₦300,000",
      roi: "15%",
    },
  ];

  return (
    <div className="min-h-screen text-gray-700 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center neon-text">
        My Portfolio
      </h1>
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsActive(true)}
          className={`px-6 py-3 rounded-lg font-semibold cursor-pointer transition-colors ${
            isActive ? "bg-yellow-400 text-black" : "bg-gray-800 text-white"
          } hover:bg-yellow-500`}
        >
          Active Investments
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsActive(false)}
          className={`px-6 py-3 rounded-lg font-semibold cursor-pointer transition-colors ${
            !isActive ? "bg-yellow-400 text-black" : "bg-gray-800 text-white"
          } hover:bg-yellow-500`}
        >
          Completed Investments
        </motion.button>
      </div>

      {isActive ? (
        <ActiveInvestmentsTable
          data={activeData}
          onWithdraw={(id) => console.log("Withdraw from:", id)}
        />
      ) : (
        <CompletedInvestmentsTable data={completedData} />
      )}
    </div>
  );
};

export default PortfolioComponent;

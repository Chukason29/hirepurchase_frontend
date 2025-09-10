/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ActiveInvestmentsTable from "@/components/active-investment-table";
import CompletedInvestmentsTable from "@/components/completed-investment-table";
import {
  getActiveInvestments,
  getCompletedInvestments,
} from "@/services/investments.service";

const PortfolioComponent = () => {
  const [isActive, setIsActive] = useState(true);
  const [activeData, setActiveData] = useState<any[]>([]);
  const [completedData, setCompletedData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchActive = async () => {
      setLoading(true);
      try {
        const investments = await getActiveInvestments(1, 10);
        setActiveData(investments);
      } catch (err) {
        console.error("Error fetching active investments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActive();
  }, []);

  useEffect(() => {
    const fetchCompleted = async () => {
      setLoading(true);
      try {
        const investments = await getCompletedInvestments(1, 10);
        setCompletedData(investments);
      } catch (err) {
        console.error("Error fetching completed investments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompleted();
  }, []);

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
        loading ? (
          <div className="flex justify-center items-center py-10">
            <motion.div
              className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "linear",
              }}
            />
          </div>
        ) : (
          <ActiveInvestmentsTable
            data={activeData}
            onWithdraw={(id) =>
              setActiveData((prev) => prev.filter((inv) => inv.id !== id))
            }
          />
        )
      ) : (
        <CompletedInvestmentsTable data={completedData} />
      )}
    </div>
  );
};

export default PortfolioComponent;

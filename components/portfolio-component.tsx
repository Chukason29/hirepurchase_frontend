"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";

const PortfolioComponent = () => {
  const [isActive, setIsActive] = useState(true);
  // const [isIndividual, setIsIndividual] = useState(true);

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
      <div className="flex justify-center gap-4 mb-4">
        {/* <Button
          variant="outline"
          onClick={() => setIsIndividual(true)}
          className={`bg-gray-800 text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-black cursor-pointer ${
            isIndividual ? "bg-yellow-400 text-black" : ""
          }`}
        >
          Individual
        </Button>
        <Button
          variant="outline"
          onClick={() => setIsIndividual(false)}
          className={`bg-gray-800 text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-black cursor-pointer ${
            !isIndividual ? "bg-yellow-400 text-black" : ""
          }`}
        >
          Clique
        </Button> */}
      </div>
      {isActive ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-400"
        >
          No active individual investments found.
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-400"
        >
          No completed individual investments found.
        </motion.div>
      )}
    </div>
  );
};

export default PortfolioComponent;

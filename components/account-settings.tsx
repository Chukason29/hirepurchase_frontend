/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import PersonalInfo from "@/components/personal-info";
import KYCVerification from "@/components/kyc-verification";
import SecuritySettings from "@/components/security-settings";

const AccountSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"personal" | "kyc" | "security">(
    "personal"
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6 relative">
      {/* Tabs */}
      <div className="flex justify-between items-center mb-4 border-b border-gray-200">
        <div className="flex space-x-8">
          {["personal", "kyc", "security"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-2 font-medium cursor-pointer ${
                activeTab === tab
                  ? "border-b-4 border-yellow-400 text-gray-900"
                  : "text-gray-500"
              }`}
            >
              {tab === "personal"
                ? "Personal Info"
                : tab === "kyc"
                ? "KYC Verification"
                : "Password & Security"}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {activeTab === "personal" && <PersonalInfo />}
        {activeTab === "kyc" && <KYCVerification />}
        {activeTab === "security" && <SecuritySettings />}
      </motion.div>
    </div>
  );
};

export default AccountSettings;

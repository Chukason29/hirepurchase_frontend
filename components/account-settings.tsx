"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState<"personal" | "kyc" | "security">(
    "personal"
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // ✅ Handle the uploaded file (e.g., show preview or upload to server)
      console.log("Selected file:", file);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6 relative">
      <div className="flex justify-between items-center mb-4 border-b border-gray-200">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab("personal")}
            className={`pb-2 font-medium cursor-pointer ${
              activeTab === "personal"
                ? "border-b-4 border-yellow-400 text-gray-900"
                : "text-gray-500"
            }`}
          >
            Personal Info
          </button>
          <button
            onClick={() => setActiveTab("kyc")}
            className={`pb-2 font-medium ${
              activeTab === "kyc"
                ? "border-b-4 border-yellow-400 text-gray-900"
                : "text-gray-500"
            }`}
          >
            KYC Verification
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`pb-2 font-medium ${
              activeTab === "security"
                ? "border-b-4 border-yellow-400 text-gray-900"
                : "text-gray-500"
            }`}
          >
            Password & Security
          </button>
        </div>
      </div>
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {activeTab === "personal" && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                {/* ✅ Hidden input */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />

                <Button
                  variant="ghost"
                  onClick={handleClick}
                  className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value="chukwuebuka"
                    className="bg-gray-100"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value="aloaegbu"
                    className="bg-gray-100"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value="chukwuebukaaloaegbu@gmail.com"
                    className="bg-gray-100"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="Enter address here"
                    className="bg-gray-100"
                  />
                </div>
              </div>
            </div>
            <Button className="bg-gray-600 text-white cursor-pointer">
              Create Transaction PIN
            </Button>
            <div className="space-y-2">
              <h3 className="font-semibold">Your Referral Code</h3>
              <p className="bg-green-100 text-green-800 p-2 rounded">
                chuk027c
              </p>
              <div className="flex space-x-4">
                <Button className="bg-green-500 text-white">Copy Code</Button>
                <Button className="bg-blue-500 text-white">Share Code</Button>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Referral Bonus</h3>
              <p>No referral bonuses yet.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Verification Status</h3>
              <Button variant="secondary" className="bg-gray-200 text-gray-700">
                Not Verified
              </Button>
            </div>
            <Button className="bg-yellow-400 text-black">Withdraw</Button>
          </div>
        )}
        {activeTab === "kyc" && (
          <div className="space-y-8">
            <h2 className="text-orange-500 font-semibold">KYC Verification</h2>
            <h3 className="font-semibold">Identity Verification</h3>
            <div className="space-y-4">
              <div className="mb-5">
                <Label className="font-bold">
                  Upload your Government ID card
                </Label>
                <Input
                  type="file"
                  placeholder=""
                  className="bg-gray-100 cursor-pointer"
                />
              </div>
              <Label className="font-bold text-sm">
                Upload a clear photo of your face holding it
              </Label>
              <Input
                type="file"
                placeholder=""
                className="bg-gray-100 cursor-pointer"
              />
              <Button className="bg-green-500 text-white w-full md:w-auto cursor-pointer">
                Submit
              </Button>
            </div>
          </div>
        )}
        {activeTab === "security" && (
          <div className="space-y-8">
            <h2 className="font-semibold">Security Settings</h2>
            <p>Manage your account security</p>
            <div className="space-y-4">
              <div className="flex flex-col gap-4">
                <Label>Reset Password</Label>
                <Input
                  id="email"
                  placeholder="Enter email address here"
                  className="bg-gray-100"
                />
                <Button
                  variant="secondary"
                  className="bg-gray-800 text-white text-center items-center justify-center w-full"
                >
                  Send OTP
                </Button>
              </div>

              <div className="flex flex-col gap-4 mb-5">
                <Label>Reset Pin</Label>
                <Input
                  id="pin"
                  placeholder="Enter old here"
                  className="bg-gray-100"
                />

                <Input
                  id="pin"
                  placeholder="Enter new pin here"
                  className="bg-gray-100"
                />
                <Input
                  id="pin"
                  placeholder="Enter new pin confirmation here"
                  className="bg-gray-100"
                />
                <Button
                  variant="secondary"
                  className="bg-gray-800 text-white text-center items-center justify-center w-full"
                >
                  Reset Pin
                </Button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AccountSettings;

"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const KYCVerification: React.FC = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-orange-500 font-semibold">KYC Verification</h2>
      <h3 className="font-semibold">Identity Verification</h3>
      <div className="space-y-4">
        <div className="mb-5">
          <Label className="font-bold">Upload your Government ID card</Label>
          <Input type="file" className="bg-gray-100 cursor-pointer" />
        </div>
        <Label className="font-bold text-sm">
          Upload a clear photo of your face holding it
        </Label>
        <Input type="file" className="bg-gray-100 cursor-pointer" />
        <Button className="bg-green-500 text-white w-full md:w-auto cursor-pointer">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default KYCVerification;

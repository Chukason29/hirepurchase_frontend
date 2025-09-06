/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { type DecodedToken, decodeJWT } from "@/utils/jwt";
import Cookies from "js-cookie";
import ReferralButtons from "@/components/referral-buttons";

// interface PersonalInfoProps {}

const PersonalInfo: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) console.log("Selected file:", file);
  };

  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    // console.log("Stored token:", token);

    if (token) {
      const decoded = decodeJWT(token);
      // console.log("Decoded token:", decoded);
      setUser(decoded);
    }
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
        <div className="relative">
          <Avatar className="w-24 h-24 flex items-center justify-center">
            <AvatarImage src="" />
            {user?.name
              ? user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
              : ""}
          </Avatar>

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
            <Label htmlFor="name">Name</Label>
            <Input
              id="firstName"
              defaultValue={user?.name || ""}
              className="bg-gray-100"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              defaultValue={user?.email || ""}
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

      <div className="space-y-2">
        <h3 className="font-semibold">Your Referral Code</h3>
        <p className="bg-green-100 text-green-800 p-2 rounded">chuk027c</p>
        <div className="flex space-x-4">
          <ReferralButtons code={user?.name || "chuk2341"} />
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
  );
};

export default PersonalInfo;

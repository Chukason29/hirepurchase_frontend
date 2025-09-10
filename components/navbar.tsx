"use client";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
// import { useAuthStore } from "@/store/authStore";
import { type DecodedToken, decodeJWT } from "@/utils/jwt";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [notifications] = useState(0);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      const decoded = decodeJWT(token);
      setUser(decoded);
    }
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 80 }}
      className="w-full bg-yellow-400 shadow-md px-4 md:px-8 h-14 flex items-center justify-between"
    >
      {/* Left Section: Hamburger (mobile) / Logo (desktop) */}
      <div className="flex items-center">
        {/* Hamburger menu only on mobile */}
        <div className="block md:hidden">
          <Image
            src="https://res.cloudinary.com/djjqicpga/image/upload/v1756282560/hire-purchase-logo_rih8e5.png"
            alt="Hire purchase Logo"
            width={50}
            height={40}
          />
        </div>
      </div>

      {/* Center (mobile) / Right (desktop): Notifications + User */}
      <div className="flex items-center gap-6 md:ml-auto mx-auto md:mx-0">
        {/* Notification bell */}
        <div className="relative cursor-pointer">
          <Bell size={22} className="text-black" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {notifications}
            </span>
          )}
        </div>

        {/* verification status */}
        <div className="w-full sm:w-auto">
          <Button
            variant="secondary"
            className="w-full sm:w-auto bg-gray-200 text-gray-700 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
          >
            Verified
          </Button>
        </div>

        {/* User profile */}
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="" alt="user" />
            <AvatarFallback>👤</AvatarFallback>
          </Avatar>
          {/* Username visible only on md and above */}
          <p className="hidden md:block text-sm text-gray-800">
            Hello,{" "}
            {user?.name ? (
              <span className="font-medium">{user.name}</span>
            ) : (
              <span>User</span>
            )}
          </p>
        </div>
      </div>

      {/* Right Section: Logo for mobile only */}
      {/* <div className="block md:hidden">
        <Image
          src="https://res.cloudinary.com/djjqicpga/image/upload/v1756282560/hire-purchase-logo_rih8e5.png"
          alt="Hire purchase Logo"
          width={120}
          height={32}
        />
      </div> */}
    </motion.header>
  );
}

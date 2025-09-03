"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  LayoutDashboard,
  ArrowRightCircle,
  Wallet,
  User,
  Users,
  FileText,
  Menu,
  X,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation"; // ✅ to track active route

const navLinks = [
  { name: "Overview", href: "/overview", icon: LayoutDashboard },
  { name: "Transactions", href: "/transactions", icon: FileText },
  { name: "Assets", href: "/assets", icon: Wallet },
  { name: "My Portfolio", href: "/portfolio", icon: FileText },
  { name: "Profile", href: "/profile", icon: User },
  // { name: "Clique", href: "/clique", icon: Users },
  { name: "Log out", href: "/login", icon: ArrowRightCircle },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // ✅ current route

  return (
    <>
      {/* Mobile Toggle */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setOpen(!open)}
          className="rounded-full"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </Button>
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -260 }}
        animate={{
          x:
            open || (typeof window !== "undefined" && window.innerWidth >= 768)
              ? 0
              : -260,
        }}
        transition={{ type: "spring", stiffness: 80 }}
        className="fixed md:static top-0 left-0 h-screen w-60 bg-gray-600 text-white flex flex-col justify-between shadow-xl z-40"
      >
        {/* Top Section */}
        <div>
          <div className="flex items-center space-x-2 p-6">
            <Image
              src="https://res.cloudinary.com/djjqicpga/image/upload/v1756282560/hire-purchase-logo_rih8e5.png"
              alt="Hire purchase Logo"
              width={150}
              height={40}
            />
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col space-y-2 px-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive =
                pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? "bg-yellow-400 text-black"
                      : "hover:bg-neutral-800 text-gray-200"
                  }`}
                >
                  <Icon size={18} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Card */}
        <div className="p-4">
          <Card className="bg-yellow-400 text-black rounded-xl shadow-lg">
            <CardContent className="p-4 flex flex-col items-start">
              <div className="bg-black text-white p-2 rounded-full mb-3">
                <Wallet size={22} />
              </div>
              <h3 className="text-lg font-bold">Hire Purchase</h3>
              <p className="text-sm mb-3">
                Would you like to start a hire purchase contract?
              </p>
              <Button variant="secondary" className="bg-black text-white">
                Start now
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.aside>
    </>
  );
}

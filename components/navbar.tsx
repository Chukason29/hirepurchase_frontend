"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import logo from "@/public/images/hire-purchase-logo.png";

export default function Navbar() {
  return (
    <nav className="bg-gray-100 shadow-md fixed w-full z-50">
      <div className="flex justify-between items-center p-5 max-w-7xl mx-auto">
        {/* Logo - Left */}
        <div className="flex-shrink-0">
          <Link
            href="/"
            className="font-poppins font-black text-2xl text-black hover:text-gray-700 transition-colors"
          >
            <Image src={logo} alt="hire purchase logo" width={150} />
          </Link>
        </div>

        {/* Desktop Menu - Center */}
        <div className="hidden md:flex flex-1 justify-center space-x-6">
          <Link href="#about" scroll={true} className="hover:text-gray-700">
            About
          </Link>
          <Link
            href="#investments"
            scroll={true}
            className="hover:text-gray-700"
          >
            Investments
          </Link>
        </div>

        {/* Contact Button - Right */}
        <div className="hidden md:flex justify-end flex-shrink-0">
          <Link
            href="https://invest.hirepurchase.ng"
            className="p-3 bg-gray-700 text-white rounded-lg hover:bg-black"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button>
                <Menu className="h-8 w-8 text-black" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-gray-100 flex items-center justify-center"
            >
              {/* Mobile Menu */}
              <div className="flex flex-col space-y-4 mt-8">
                <Link href="#about" className="hover:text-gray-700">
                  About
                </Link>
                <Link href="#investments" className="hover:text-gray-700">
                  Investments
                </Link>

                <Link
                  href="https://invest.hirepurchase.ng"
                  className="hover:text-gray-700"
                >
                  Get Started
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

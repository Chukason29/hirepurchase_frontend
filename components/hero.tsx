"use client";
import { Button } from "@/components/ui/button";
import YouTubeEmbed from "@/components/youtube-embed";
import { motion } from "framer-motion";
import { ArrowBigRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center justify-center mt-10 w-full px-4 md:px-10 lg:px-20 py-16 lg:py-24"
    >
      {/* Top text and arrow */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-10 text-center md:text-left">
        <p className="font-montserrat font-light text-2xl md:text-4xl lg:text-5xl text-gray-500">
          Enjoy referral bonuses while investing with as little as{" "}
          <span className="font-semibold text-purple-700">₦1000</span>
        </p>
        <div className="hidden md:flex rounded-full bg-purple-900 p-3 text-white shadow-md hover:scale-105 transition-transform">
          <ArrowBigRight size={30} />
        </div>
      </div>

      {/* Main Heading */}
      <div className="flex flex-col items-center text-center">
        <h2 className="font-montserrat font-bold text-4xl md:text-6xl lg:text-7xl leading-tight text-gray-800">
          <span className="bg-gray-800 text-white px-3 py-1 rounded-lg">
            Grow wealth
          </span>{" "}
          sustainably with the{" "}
          <span className="text-purple-600">
            power of <br className="hidden md:block" /> interconnectivity
          </span>
        </h2>

        {/* Subheading */}
        <p className="font-montserrat font-medium text-gray-600 text-lg md:text-xl lg:text-2xl mt-6 max-w-2xl">
          Hire purchase is a platform to power crowdsourced venture, enabling
          both individual and collective investment.
        </p>

        {/* CTA Button */}
        <div className="mt-8">
          <Link href="https://invest.hirepurchase.ng">
            <Button className="bg-purple-600 font-bold text-lg md:text-xl px-8 md:px-12 py-4 md:py-6 rounded-2xl text-white shadow-lg hover:bg-purple-700 hover:shadow-xl transition-all duration-200 ease-in-out cursor-pointer">
              Get Started
            </Button>
          </Link>
        </div>
      </div>

      {/* Video Embed */}
      <div className="mt-12 w-full max-w-5xl px-4">
        <div className="rounded-2xl overflow-hidden shadow-lg aspect-video">
          <YouTubeEmbed videoId="OtLB2-Qm6KA" />
        </div>
      </div>
    </motion.section>
  );
}

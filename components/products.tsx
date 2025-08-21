"use client";

import { motion } from "framer-motion";
import { ArrowBigRightDashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import bus from "@/images/bus.webp";
import billboard from "@/images/billboard.png";

export function Products() {
  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    whileHover: { scale: 1.03, boxShadow: "0px 10px 30px rgba(0,0,0,0.2)" },
  };

  return (
    <section id="investments" className="w-full px-6 md:px-12 lg:px-20 py-16 bg-gray-50">
      <h3 className="font-bold text-4xl text-gray-800 mb-10 text-center">
        Products
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Card 1 */}
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="whileHover"
          transition={{ duration: 0.4 }}
          className="flex flex-col bg-blue-900 rounded-2xl overflow-hidden shadow-lg"
        >
          <div className="p-6 flex flex-col gap-4 flex-grow">
            <h3 className="font-bold text-2xl text-white">
              Cars, Buses, and Vehicles
            </h3>
            <p className="text-gray-200 leading-relaxed">
              Exploring Smart Investment Opportunities in the Automotive Sector
            </p>
            <div className="flex items-center gap-2 mt-auto">
              <Link
                href="/register"
                className="font-bold text-lg text-[#ace8e4] hover:underline"
              >
                Get Started
              </Link>
              <ArrowBigRightDashIcon className="text-[#ace8e4]" />
            </div>
          </div>
          <Image
            src={bus}
            alt="Bus image"
            className="w-full h-60 object-cover"
          />
        </motion.div>

        {/* Card 2 */}
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="whileHover"
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col bg-purple-700 rounded-2xl overflow-hidden shadow-lg"
        >
          <div className="p-6 flex flex-col gap-4 flex-grow">
            <h3 className="font-bold text-2xl text-white">Billboards</h3>
            <p className="text-gray-200 leading-relaxed">
              A Strategic Approach to Investing in Billboard Advertising Assets
            </p>
            <div className="flex items-center gap-2 mt-auto">
              <Link
                href="/register"
                className="font-bold text-lg text-purple-300 hover:underline"
              >
                Get Started
              </Link>
              <ArrowBigRightDashIcon className="text-purple-300" />
            </div>
          </div>
          <Image
            src={billboard}
            alt="Billboard image"
            className="w-full h-60 object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}

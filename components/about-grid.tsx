"use client";

import { motion } from "framer-motion";
import { ArrowBigRightDashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import image from "@/images/invest.webp";
import returnImage from "@/images/return.webp";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export function AboutGrid() {
  return (
    <motion.section
      initial="hidden"
      id="about"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-12 w-full bg-gradient-to-b from-white to-gray-50"
    >
      {/* Card 1 */}
      <motion.div
        variants={cardVariants}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
        className="bg-[#ace8e4] p-8 flex flex-col md:flex-row items-center justify-between w-full rounded-2xl shadow-md hover:shadow-xl transition-all"
      >
        <div className="flex flex-col gap-4 md:w-1/2 text-center md:text-left">
          <h3 className="font-bold text-2xl text-gray-800">
            Flexible Investment to grow your money
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Start small, think big, invest in major projects with
            pocket-friendly cash and watch your money do the hustle for you.
          </p>
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <Link
              href="/register"
              className="font-bold text-lg text-purple-900 hover:underline"
            >
              Get Started
            </Link>
            <ArrowBigRightDashIcon className="text-purple-900" />
          </div>
        </div>
        <div className="flex justify-center md:w-1/2 mt-6 md:mt-0">
          <Image
            src={image}
            alt="Investment Image"
            className="object-contain w-64 h-64"
          />
        </div>
      </motion.div>

      {/* Card 2 */}
      <motion.div
        variants={cardVariants}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
        className="bg-[#ace8e4] p-8 flex flex-col md:flex-row items-center justify-between w-full rounded-2xl shadow-md hover:shadow-xl transition-all"
      >
        <div className="flex flex-col gap-4 md:w-1/2 text-center md:text-left">
          <h3 className="font-bold text-2xl text-gray-800">
            Get up to 35% Returns
          </h3>
          <p className="text-gray-700 leading-relaxed">
            No wahala, no grammar. Just simple investing — start with as low as
            ₦1,000 and watch your money grow, even if you&apos;re new to the game.
          </p>
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <Link
              href="/register"
              className="font-bold text-lg text-purple-900 hover:underline"
            >
              Get Started
            </Link>
            <ArrowBigRightDashIcon className="text-purple-900" />
          </div>
        </div>
        <div className="flex justify-center md:w-1/2 mt-6 md:mt-0">
          <Image
            src={returnImage}
            alt="Return Image"
            className="object-contain w-64 h-64"
          />
        </div>
      </motion.div>
    </motion.section>
  );
}

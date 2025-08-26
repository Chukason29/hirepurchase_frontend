"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import holder from "@/public/images/holder.webp";
import { Button } from "@/components/ui/button";
import { PiAppleLogoBold } from "react-icons/pi";
import { IoLogoGooglePlaystore } from "react-icons/io5";

export function DownloadApp() {
  return (
    <section className="w-full bg-gradient-to-r from-blue-50 to-blue-100 py-16 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Phone Image */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Image
            src={holder}
            alt="Phone Image"
            className="w-[80%] md:w-[70%] lg:w-[60%] drop-shadow-2xl"
          />
        </motion.div>

        {/* Text + Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col items-center md:items-start gap-6 text-center md:text-left"
        >
          <h3 className="font-bold text-3xl md:text-4xl text-blue-950">
            Download The App
          </h3>
          <p className="font-medium text-lg md:text-xl text-gray-700 max-w-md">
            Experience the best of Hire Purchase on your phone or tablet. Coming
            soon on iOS and Android operating systems.
          </p>

          {/* iOS Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="flex items-center gap-3 bg-black hover:bg-gray-800 px-6 py-4 rounded-xl shadow-lg transition-all">
              <PiAppleLogoBold className="text-white text-2xl" />
              <p className="font-bold text-lg text-white">
                Coming Soon to iPhone
              </p>
            </Button>
          </motion.div>

          {/* Android Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="flex items-center gap-3 bg-green-500 hover:bg-green-600 px-6 py-4 rounded-xl shadow-lg transition-all">
              <IoLogoGooglePlaystore className="text-white text-2xl" />
              <p className="font-bold text-lg text-white">
                Coming Soon to Android
              </p>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

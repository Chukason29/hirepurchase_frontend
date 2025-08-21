"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import punch from "@/images/punch.svg";
import nl from "@/images/nl.webp";
import pulse from "@/images/pulse.svg";
import vanguard from "@/images/vanguard.svg";
import tp from "@/images/tp.svg";

const logos = [
  { src: punch, alt: "Punch Logo" },
  { src: nl, alt: "Naija loaded Logo" },
  { src: pulse, alt: "Pulse Logo" },
  { src: vanguard, alt: "Vanguard Logo" },
  { src: tp, alt: "Techpoint Logo" },
];

export function Logo() {
  return (
    <section className="w-full bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-8">
        {logos.map((logo, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center justify-center w-32 h-20 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              className="object-contain w-full h-auto"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

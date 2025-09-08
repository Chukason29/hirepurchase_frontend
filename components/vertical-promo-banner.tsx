"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const VerticalPromoBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        backgroundImage: `url("https://res.cloudinary.com/djjqicpga/image/upload/v1756685392/bgi_uxgj1s.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="h-200  w-full rounded-lg overflow-hidden shadow-md flex"
    >
      <Card className="bg-black/50 border-none w-full flex items-center justify-center">
        <CardContent className="p-6 text-center space-y-3">
          <h2 className="text-xl font-bold text-white">Up to 50% ROI</h2>
          <p className="text-base text-gray-200">on Hire Purchase</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default VerticalPromoBanner;

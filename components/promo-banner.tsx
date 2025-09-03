"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const PromoBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundImage: `url("https://res.cloudinary.com/djjqicpga/image/upload/v1756685392/bgi_uxgj1s.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full text-white rounded-lg overflow-hidden shadow-md"
    >
      <Card className="bg-black/50 border-none">
        {" "}
        {/* black overlay for readability */}
        <CardContent className="p-4 flex items-center justify-between flex-col md:flex-row">
          <div className="text-left">
            <h2 className="text-2xl font-bold text-white">Up to 50% ROI</h2>
            <p className="text-lg text-white">on Hire Purchase</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PromoBanner;

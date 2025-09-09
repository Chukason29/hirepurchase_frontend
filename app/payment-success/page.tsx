"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="shadow-lg border-0 rounded-2xl bg-white">
          <CardHeader className="flex flex-col items-center gap-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="rounded-full bg-green-100 p-3"
            >
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Payment Successful
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
             Your investment has been made successfully 🎉
            </p>
            <p className="text-gray-500 text-sm">
              Thank you for your payment. You will receive a confirmation email
              shortly.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4"
            >
              <Button
                asChild
                className="w-full bg-green-600 hover:bg-green-500"
              >
                <Link href="/overview">Back to Dashboard</Link>
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

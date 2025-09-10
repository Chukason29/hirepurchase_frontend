/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getInvestmentSummary } from "@/services/investments.service";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

interface InvestmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assetId: string;
  amount: number;
}

const InvestmentModal = ({
  open,
  onOpenChange,
  assetId,
  amount,
}: InvestmentModalProps) => {
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [summary, setSummary] = useState<any>(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      const fetchSummary = async () => {
        setSummaryLoading(true);
        try {
          const data = await getInvestmentSummary(assetId, amount);
          if (data) {
            setSummary(data);
          } else {
            setSummary(null);
            toast.error("Could not fetch summary");
          }
        } catch (err) {
          console.error(err);
          setSummary(null);
          toast.error("Error fetching summary");
        } finally {
          setSummaryLoading(false);
        }
      };

      fetchSummary();
    }
  }, [open, assetId, amount]);

  // 🔹 Reset payment loading when route changes
  useEffect(() => {
    if (paymentLoading) {
      setPaymentLoading(false);
    }
  }, [pathname, paymentLoading]);

  const handleProceed = () => {
    setPaymentLoading(true);
    router.push("https://invest.hirepurchase.ng/api/invest/set");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 text-white rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-lg text-cyan-300">
            Investment Breakdown
          </DialogTitle>
        </DialogHeader>

        {summaryLoading ? (
          <div className="flex flex-row justify-center mb-10 items-center gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.span
                key={i}
                className="w-2 h-2 bg-white rounded-full"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        ) : summary ? (
          <div className="space-y-3 text-gray-300">
            <p>
              <strong>Amount Invested:</strong> ₦
              {summary.amount_invested.toLocaleString()}
            </p>
            <p>
              <strong>Expected Returns:</strong> ₦
              {summary.expected_returns.toLocaleString()}
            </p>
            <p>
              <strong>Duration:</strong> {summary["investment duration"]} months
            </p>
            <p>
              <strong>Expected Return Date:</strong>{" "}
              {summary.expected_return_date}
            </p>
          </div>
        ) : (
          <p className="text-gray-400">No summary available</p>
        )}

        <Button
          className="bg-green-600 hover:bg-green-500 cursor-pointer flex items-center justify-center gap-2"
          onClick={handleProceed}
          disabled={paymentLoading}
        >
          {paymentLoading ? (
            <div className="flex items-center gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          ) : (
            "Proceed to Payment"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentModal;

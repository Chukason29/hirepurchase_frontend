/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  // DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getInvestmentSummary,
  setInvestment,
} from "@/services/investments.service";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

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
  // const router = useRouter();

  const [summaryLoading, setSummaryLoading] = useState(false); // for fetching summary
  const [paymentLoading, setPaymentLoading] = useState(false); // for payment button

  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    if (open) {
      const fetchSummary = async () => {
        setSummaryLoading(true);
        try {
          console.log("Payload being sent:", { asset_id: assetId, amount });
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
            <motion.span
              className="w-2 h-2 bg-white rounded-full"
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.span
              className="w-2 h-2 bg-white rounded-full"
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
            />
            <motion.span
              className="w-2 h-2 bg-white rounded-full"
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
            />
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
              <strong>Duration:</strong> {summary["investment duration"]} weeks
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
          onClick={async () => {
            try {
              setPaymentLoading(true);
              await setInvestment(assetId, amount);
              // ✅ Redirect handled by backend
            } catch (err) {
              console.error(err);
              toast.error("Unable to process investment");
              setPaymentLoading(false); // stop loader if backend fails
            }
          }}
          disabled={paymentLoading}
        >
          {paymentLoading ? (
            <div className="flex items-center gap-1">
              <motion.span
                className="w-2 h-2 bg-white rounded-full"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.span
                className="w-2 h-2 bg-white rounded-full"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
              />
              <motion.span
                className="w-2 h-2 bg-white rounded-full"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4,
                }}
              />
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

/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { withdrawInvestment } from "@/services/investments.service";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface WithdrawFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  investmentId: string | null;
  onSuccess: () => void;
  returnsAmount?: number; // auto-filled returns
}

const WithdrawFormModal = ({
  isOpen,
  onClose,
  investmentId,
  onSuccess,
  returnsAmount = 0,
}: WithdrawFormModalProps) => {
  const [otp, setOtp] = useState("");
  const [amount, setAmount] = useState(""); // formatted string for UI
  const [rawAmount, setRawAmount] = useState<number>(0); // numeric value
  const [loading, setLoading] = useState(false);

  // ✅ Auto-fill amount when modal opens
  useEffect(() => {
    if (isOpen && returnsAmount) {
      setRawAmount(returnsAmount);
      setAmount(
        new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
          minimumFractionDigits: 0,
        }).format(returnsAmount)
      );
    }
  }, [isOpen, returnsAmount]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // keep only digits
    const numericValue = Number(value) || 0;
    setRawAmount(numericValue);

    // format as ₦ currency
    setAmount(
      new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 0,
      }).format(numericValue)
    );
  };

  const handleSubmit = async () => {
    if (!otp || !rawAmount || !investmentId) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      await withdrawInvestment(otp, rawAmount, investmentId);
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Withdrawal failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col space-y-6"
        >
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-semibold">
              Withdraw Investment
            </DialogTitle>
          </DialogHeader>

          {/* OTP */}
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          {/* Amount (formatted) */}
          <input
            type="text"
            placeholder="Enter Amount"
            value={amount}
            onChange={handleAmountChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Withdraw"
              )}
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawFormModal;

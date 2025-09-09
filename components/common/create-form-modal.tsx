/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { accountSet, SetAccountPayload } from "@/services/account.service";
import { toast } from "sonner";

interface CreateFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newAccount: Account, message: string) => void;
}

type Account = {
  bank_name: string;
  account_number: string;
  account_name: string;
};

const CreateFormModal = ({
  isOpen,
  onClose,
  onSuccess,
}: CreateFormModalProps) => {
  const [formData, setFormData] = useState<SetAccountPayload>({
    otp: "",
    account_name: "",
    account_number: "",
    bank_name: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { otp, account_name, account_number, bank_name } = formData;

    if (!otp || !account_name || !account_number || !bank_name) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const response = await accountSet(formData);

      const msg =
        typeof response.message === "string"
          ? response.message
          : `${response.message.title || "Success"}: ${
              response.message.description || ""
            }`;

      toast.success(msg);

      // Pass the actual account info to onSuccess
      const newAccount: Account = {
        bank_name: formData.bank_name,
        account_number: formData.account_number,
        account_name: formData.account_name,
      };

      onSuccess(newAccount, msg);
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Failed to create account");
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
          className="space-y-4"
        >
          <DialogHeader>
            <DialogTitle>Create Account</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              name="otp"
              placeholder="OTP"
              value={formData.otp}
              onChange={handleChange}
              disabled={loading}
            />
            <Input
              name="account_name"
              placeholder="Account Name"
              value={formData.account_name}
              onChange={handleChange}
              disabled={loading}
            />
            <Input
              name="account_number"
              placeholder="Account Number"
              value={formData.account_number}
              onChange={handleChange}
              disabled={loading}
            />
            <Input
              name="bank_name"
              placeholder="Bank Name"
              value={formData.bank_name}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Close
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFormModal;

/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import CheckPinModal from "./check-pin-modal";
import CreateFormModal from "./create-form-modal";
import UpdateFormModal from "./update-form-modal";
import { accountGet } from "@/services/account.service";
import { toast } from "sonner";

type Account = {
  bank_name: string;
  account_number: string;
  account_name: string;
};

type ModalType = "create" | "update" | "delete" | "show" | null;

const AccountTable = () => {
  const [account, setAccount] = useState<Account | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasCreated, setHasCreated] = useState(false);
  const [isCheckPinOpen, setIsCheckPinOpen] = useState(false);
  const [currentModalType, setCurrentModalType] = useState<ModalType>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentAccountData, setCurrentAccountData] = useState<Account | null>(
    null
  );

  // Helper to normalize messages (string or object)
  const normalizeMessage = (
    msg: string | { title?: string; description?: string }
  ) =>
    typeof msg === "string"
      ? msg
      : `${msg.title || ""}${msg.description ? `: ${msg.description}` : ""}`;

  const handleCheckPinSuccess = async () => {
    setIsCheckPinOpen(false);

    if (currentModalType === "create") {
      setIsCreateModalOpen(true);
    } else if (currentModalType === "update") {
      setIsUpdateModalOpen(true);
    } else if (currentModalType === "show") {
      const response = await accountGet();
      if (response.success && response.data) {
        setAccount(response.data);
        setIsVisible(true);
        setHasCreated(true);
        toast.success(normalizeMessage(response.message));
      } else {
        toast.error(normalizeMessage(response.message));
      }
    }
  };

  const handleCreateSuccess = (newAccount: Account, message: string) => {
    setAccount(newAccount);
    setIsVisible(true);
    setHasCreated(true);
    setIsCreateModalOpen(false);
    toast.success(normalizeMessage(message));
  };

  const handleUpdateSuccess = (updatedAccount: Account, message: string) => {
    setAccount(updatedAccount);
    setIsVisible(true);
    setIsUpdateModalOpen(false);
    toast.success(normalizeMessage(message));
  };

  const displayValue = (value: string | undefined) =>
    isVisible && value ? value : "-";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full overflow-x-auto"
    >
      <Table className="min-w-[600px] md:min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Bank Name</TableHead>
            <TableHead>Account Number</TableHead>
            <TableHead>Account Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{displayValue(account?.bank_name)}</TableCell>
            <TableCell>{displayValue(account?.account_number)}</TableCell>
            <TableCell>{displayValue(account?.account_name)}</TableCell>
            <TableCell>
              <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                <Button
                  onClick={() => {
                    setCurrentModalType("create");
                    setIsCheckPinOpen(true);
                  }}
                  disabled={hasCreated}
                  className="w-full sm:w-auto"
                >
                  {hasCreated ? "Account Created" : "Create"}
                </Button>
                <Button
                  onClick={() => {
                    setCurrentModalType("update");
                    setIsCheckPinOpen(true);
                  }}
                  disabled={!hasCreated}
                  className="w-full sm:w-auto"
                >
                  Update
                </Button>
                <Button
                  onClick={() => {
                    if (isVisible) {
                      setIsVisible(false);
                    } else {
                      setCurrentModalType("show");
                      setIsCheckPinOpen(true);
                    }
                  }}
                  className="w-full sm:w-auto"
                >
                  {isVisible ? "Close" : "Show"}
                </Button>
              </div>
            </TableCell>
          </TableRow>
          {/* Empty rows for spacing */}
          <TableRow>
            <TableCell colSpan={4} className="h-12"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4} className="h-12"></TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <CheckPinModal
        isOpen={isCheckPinOpen}
        onClose={() => setIsCheckPinOpen(false)}
        onSuccess={handleCheckPinSuccess}
      />

      <CreateFormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />

      <UpdateFormModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSuccess={handleUpdateSuccess}
        initialData={currentAccountData}
      />
    </motion.div>
  );
};

export default AccountTable;

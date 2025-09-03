"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard-layout";
import DateFilter from "@/components/data-filter";
import TransactionsTable from "@/components/transactions-table";

interface Transaction {
  date: string; // format: dd/MM/yyyy
  time: string;
  type: string;
  status: string;
  amount: number;
}

// Mock data
const mockTransactions: Transaction[] = [
  {
    date: "01/09/2025",
    time: "10:00",
    type: "Deposit",
    status: "Completed",
    amount: 5000,
  },
  {
    date: "02/09/2025",
    time: "11:30",
    type: "Withdrawal",
    status: "Pending",
    amount: 2000,
  },
  {
    date: "03/09/2025",
    time: "14:45",
    type: "Deposit",
    status: "Completed",
    amount: 3000,
  },
  // Add more mock data as needed
];

const TransactionsPage = () => {
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [transactionType, setTransactionType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredTransactions = mockTransactions.filter((tx) => {
    let matchesDate = true;
    const txDate = (tx.date, "dd/MM/yyyy", new Date());

    if (fromDate) {
      matchesDate =
        (matchesDate && isAfter(txDate, fromDate)) ||
        txDate.getTime() === fromDate.getTime();
    }
    if (toDate) {
      matchesDate =
        (matchesDate && isBefore(txDate, toDate)) ||
        txDate.getTime() === toDate.getTime();
    }

    const matchesType =
      transactionType === "all" || tx.type.toLowerCase() === transactionType;

    return matchesDate && matchesType;
  });

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <h1 className="text-3xl font-bold mb-6">Transactions</h1>
        <DateFilter
          fromDate={fromDate}
          toDate={toDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
          transactionType={transactionType}
          setTransactionType={setTransactionType}
        />
        <TransactionsTable
          transactions={filteredTransactions}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
        />
      </motion.div>
    </DashboardLayout>
  );
};

export default TransactionsPage;

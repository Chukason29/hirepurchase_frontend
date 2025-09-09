"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Investment {
  id: string;
  name: string;
  code: string;
  status: string;
  amount: string;
  roi: string;
}

interface ActiveInvestmentsTableProps {
  data: Investment[];
  onWithdraw?: (id: string) => void;
}

const ActiveInvestmentsTable: React.FC<ActiveInvestmentsTableProps> = ({
  data,
  onWithdraw,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="overflow-x-auto w-full"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Investment Code</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>ROI</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell>{inv.name}</TableCell>
                <TableCell>{inv.code}</TableCell>
                <TableCell>{inv.status}</TableCell>
                <TableCell>{inv.amount}</TableCell>
                <TableCell>{inv.roi}</TableCell>
                <TableCell>
                  <Button
                    variant="default"
                    className="bg-yellow-400 text-black hover:bg-yellow-500 cursor-pointer"
                    onClick={() => onWithdraw?.(inv.id)}
                  >
                    Withdraw
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-gray-400">
                No active investments found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default ActiveInvestmentsTable;

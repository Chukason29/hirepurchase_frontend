"use client";

import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { withdrawInvestment } from "@/services/investments.service";

interface Investment {
  id: string;
  asset_name: string;
  investment_code: string;
  maturity: string;
  investment_amount: string;
  returns: string;
}

interface ActiveInvestmentsTableProps {
  data: Investment[];
  onWithdraw: (id: string) => void;
}

const ActiveInvestmentsTable: React.FC<ActiveInvestmentsTableProps> = ({
  data,
  onWithdraw,
}) => {
  const handleWithdraw = async (id: string) => {
    const result = await withdrawInvestment("id", 2, "89");
    if (result) {
      onWithdraw(id); // let parent update state
    }
  };

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
            <TableHead>Code</TableHead>
            <TableHead>Maturity</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>ROI</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell>{inv.asset_name}</TableCell>
                <TableCell>{inv.investment_code}</TableCell>
                <TableCell>{inv.maturity}</TableCell>
                <TableCell>₦{inv.investment_amount}</TableCell>
                <TableCell>₦{inv.returns}</TableCell>
                <TableCell>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleWithdraw(inv.id)}
                    className="px-4 py-2 rounded-lg bg-yellow-400 text-black hover:bg-yellow-500"
                  >
                    Withdraw
                  </motion.button>
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

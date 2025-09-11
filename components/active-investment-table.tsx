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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Investment {
  id: string;
  asset_name: string;
  investment_code: string;
  maturity: string; // e.g., "not due" or "due"
  investment_amount: string;
  returns: string;
}

interface ActiveInvestmentsTableProps {
  data: Investment[];
  onWithdraw: (id: string, returns: string) => void; // parent handles modal + API
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
            <TableHead>Code</TableHead>
            <TableHead>Maturity</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>ROI</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((inv) => {
              const isNotDue = inv.maturity.toLowerCase() === "not due";
              return (
                <TableRow key={inv.id}>
                  <TableCell>{inv.asset_name}</TableCell>
                  <TableCell>{inv.investment_code}</TableCell>
                  <TableCell>{inv.maturity}</TableCell>
                  <TableCell>₦{inv.investment_amount}</TableCell>
                  <TableCell>₦{inv.returns}</TableCell>
                  <TableCell>
                    {isNotDue ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.button
                              disabled
                              className="px-4 py-2 rounded-lg bg-gray-300 text-gray-600 cursor-not-allowed"
                            >
                              Withdraw
                            </motion.button>
                          </TooltipTrigger>
                          <TooltipContent className="z-50 bg-gray-300 text-gray-900 font-bold text-lg px-4 py-2 rounded shadow-lg">
                            Investment isn&apos;t mature yet
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onWithdraw(inv.id, inv.returns)}
                        className="px-4 py-2 rounded-lg bg-yellow-400 text-black hover:bg-yellow-500"
                      >
                        Withdraw
                      </motion.button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })
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

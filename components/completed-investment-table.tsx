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

interface Investment {
  id: string;
  asset_name: string;
  investment_amount: string;
  investment_code: string;
  returns: string;
  withdrawn_amount: string;
  roi_date: string;
  maturity: string;
  available_returns: number;
}

interface CompletedInvestmentsTableProps {
  data: Investment[];
}

const CompletedInvestmentsTable: React.FC<CompletedInvestmentsTableProps> = ({
  data,
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
            <TableHead>Asset Name</TableHead>
            <TableHead>Investment Code</TableHead>
            <TableHead>Maturity</TableHead>
            <TableHead>Investment Amount</TableHead>
            <TableHead>Returns</TableHead>
            <TableHead>ROI Date</TableHead>
            <TableHead>Withdrawn Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell>{inv.asset_name}</TableCell>
                <TableCell>{inv.investment_code}</TableCell>
                <TableCell>{inv.maturity}</TableCell>
                <TableCell>
                  ₦{Number(inv.investment_amount).toLocaleString()}
                </TableCell>
                <TableCell>₦{Number(inv.returns).toLocaleString()}</TableCell>
                <TableCell>{inv.roi_date}</TableCell>
                <TableCell>
                  ₦{Number(inv.withdrawn_amount).toLocaleString()}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-400">
                No completed investments found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default CompletedInvestmentsTable;

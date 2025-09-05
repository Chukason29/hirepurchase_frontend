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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Transaction {
  date: string;
  time: string;
  type: string;
  status: string;
  amount: number;
}

interface TransactionsTableProps {
  transactions: Transaction[];
  currentPage: number;
  rowsPerPage: number;
  setCurrentPage: (page: number) => void;
  setRowsPerPage: (rows: number) => void;
}

const TransactionsTable = ({
  transactions,
  currentPage,
  rowsPerPage,
  setCurrentPage,
  setRowsPerPage,
}: TransactionsTableProps) => {
  const totalPages = Math.ceil(transactions.length / rowsPerPage);
  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl shadow-2xl overflow-hidden"
    >
      {/* ✅ Scrollable wrapper for very small screens */}
      <div className="w-full overflow-x-auto rounded-t-xl">
        <Table className="text-white w-full">
          <TableHeader className="bg-cyan-900">
            <TableRow>
              <TableHead className="text-cyan-200 font-bold py-2 px-3 text-sm sm:text-base">
                Date
              </TableHead>
              <TableHead className="text-cyan-200 font-bold py-2 px-3 text-sm sm:text-base">
                Time
              </TableHead>
              {/* <TableHead className="text-cyan-200 font-bold py-2 px-3 text-sm sm:text-base">
                Type
              </TableHead> */}
              <TableHead className="text-cyan-200 font-bold py-2 px-3 text-sm sm:text-base">
                Status
              </TableHead>
              <TableHead className="text-cyan-200 font-bold py-2 px-3 text-sm sm:text-base">
                Amount (₦)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.map((tx, index) => (
              <TableRow
                key={index}
                className="hover:bg-gray-600 transition-colors duration-200"
              >
                <TableCell className="py-2 px-3 text-sm">{tx.date}</TableCell>
                <TableCell className="py-2 px-3 text-sm">{tx.time}</TableCell>
                {/* <TableCell className="py-2 px-3 text-sm">{tx.type}</TableCell> */}
                <TableCell className="py-2 px-3 text-sm">{tx.status}</TableCell>
                <TableCell className="py-2 px-3 text-sm">{tx.amount}</TableCell>
              </TableRow>
            ))}
            {paginatedTransactions.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-4 text-gray-400"
                >
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ✅ Pagination & controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 p-4 bg-gray-800 rounded-b-xl gap-4">
        <div className="flex items-center gap-3">
          <span className="text-gray-300 text-sm">Show</span>
          <Select
            value={rowsPerPage.toString()}
            onValueChange={(value) => setRowsPerPage(Number(value))}
          >
            <SelectTrigger className="w-[80px] bg-cyan-600 text-white border-none shadow-md hover:bg-cyan-700 transition-colors duration-300 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 text-white border border-gray-700">
              <SelectItem value="10" className="hover:bg-cyan-600">
                10
              </SelectItem>
              <SelectItem value="20" className="hover:bg-cyan-600">
                20
              </SelectItem>
              <SelectItem value="50" className="hover:bg-cyan-600">
                50
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
                className="text-cyan-400 hover:text-cyan-300"
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" className="text-cyan-200">
                {currentPage}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
                className="text-cyan-400 hover:text-cyan-300"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </motion.div>
  );
};

export default TransactionsTable;

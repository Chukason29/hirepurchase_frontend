"use client";
import { motion } from "framer-motion";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateFilterProps {
  fromDate: Date | undefined;
  toDate: Date | undefined;
  setFromDate: (date: Date | undefined) => void;
  setToDate: (date: Date | undefined) => void;
  transactionType: string;
  setTransactionType: (type: string) => void;
}

const DateFilter = ({
  fromDate,
  toDate,
  setFromDate,
  setToDate,
  transactionType,
  setTransactionType,
}: DateFilterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-6 mb-8 p-4 bg-gradient-to-r from-gray-600 via-gray-800 to-gray-600 rounded-xl shadow-lg"
    >
      {/* Transaction type select */}
      <Select value={transactionType} onValueChange={setTransactionType}>
        <SelectTrigger className="w-full md:w-[180px] bg-cyan-600 text-white hover:bg-cyan-500 transition-colors duration-300 border-none shadow-md">
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 text-white border border-gray-700">
          <SelectItem value="all" className="hover:bg-gray-600">
            All
          </SelectItem>
          <SelectItem value="deposit" className="hover:bg-gray-600">
            Deposit
          </SelectItem>
          <SelectItem value="withdrawal" className="hover:bg-gray-600">
            Withdrawal
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Date pickers */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full sm:w-[200px] h-12 justify-start text-left font-semibold text-gray-200 bg-gray-800 hover:bg-gray-700 border-gray-500 hover:border-gray-400 transition-all duration-300",
                !fromDate && "text-gray-500"
              )}
            >
              <CalendarIcon className="mr-2 h-5 w-5 text-cyan-400" />
              {fromDate ? (
                format(fromDate, "dd/MM/yyyy")
              ) : (
                <span>dd/mm/yyyy</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-gray-900 border border-gray-700 rounded-lg shadow-xl">
            <Calendar
              mode="single"
              selected={fromDate}
              onSelect={setFromDate}
              initialFocus
              className="text-white bg-gray-800"
            />
          </PopoverContent>
        </Popover>

        <span className="hidden sm:block text-gray-400 font-medium text-lg">
          to
        </span>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full sm:w-[200px] h-12 justify-start text-left font-semibold text-gray-200 bg-gray-800 hover:bg-gray-700 border-gray-500 hover:border-gray-400 transition-all duration-300",
                !toDate && "text-gray-500"
              )}
            >
              <CalendarIcon className="mr-2 h-5 w-5 text-cyan-400" />
              {toDate ? format(toDate, "dd/MM/yyyy") : <span>dd/mm/yyyy</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-gray-900 border border-gray-700 rounded-lg shadow-xl">
            <Calendar
              mode="single"
              selected={toDate}
              onSelect={setToDate}
              initialFocus
              className="text-white bg-gray-800"
            />
          </PopoverContent>
        </Popover>
      </div>
    </motion.div>
  );
};

export default DateFilter;

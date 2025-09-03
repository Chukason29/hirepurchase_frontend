"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/dashboard-layout";
import PromoBanner from "@/components/promo-banner";
import { getAssetById } from "@/services/assets.service";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Asset {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  status: string;
  assetValue: string;
  vat: string;
  serviceCharge: string;
  maintenanceFee: string;
  totalAssetValue: string;
  roi: string;
  profit: string;
  totalPayout: string;
  duration: string;
}

const AssetDetails = ({ id }: { id: string }) => {
  const router = useRouter();
  const [asset, setAsset] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState<string>("");
  const [open, setOpen] = useState(false);

  const profitRate = 15; // 15%

  const numericAmount = Number(amount) || 0;
  const profit = (numericAmount * profitRate) / 100;
  const totalWithProfit = numericAmount + profit;

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const data = await getAssetById(id);
        console.log("Asset API response:", data);
        setAsset(data);
      } catch (err) {
        console.error(err);
        setAsset(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAsset();
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8 text-center flex justify-center items-center h-64">
          <motion.div
            className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
            }}
          />
        </div>
      </DashboardLayout>
    );
  }

  if (!asset) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center text-red-400">
          Failed to load asset details
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-8 text-white"
      >
        <h2 className="text-3xl font-extrabold text-black mb-6">
          {asset.name}
        </h2>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/2"
          >
            <img
              src={asset.imagelink}
              alt={asset.name}
              className="w-full h-64 object-contain mb-4"
            />
          </motion.div>

          {/* Asset Details */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/2"
          >
            <Card className="bg-gray-800 border-cyan-500 rounded-lg p-6">
              <CardHeader>
                <CardTitle className="text-cyan-200 text-lg">
                  Asset Details:
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-400">Minimum Amount:</p>
                  <p className="text-green-300">
                    ₦{Number(asset.minimum_amount).toLocaleString()}
                  </p>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-400">Total Amount:</p>
                  <p className="text-green-300">
                    ₦{Number(asset.total_amount).toLocaleString()}
                  </p>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-400">VAT:</p>
                  <p className="text-green-300">{asset.vat_charge}%</p>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-400">Duration:</p>
                  <p className="text-green-300">{asset.duration} weeks</p>
                </div>
              </CardContent>
              {/* Investment Form */}
              <div className="mt-6">
                <label className="block text-gray-300 mb-2">
                  Enter Investment Amount
                </label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="bg-gray-700 text-white"
                />
              </div>
              <Button
                className="w-full mt-6 bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg transition-all duration-300 cursor-pointer"
                onClick={() => {
                  if (amount >= Number(asset.minimum_amount)) {
                    setOpen(true);
                  } else {
                    alert(
                      `Amount must be at least ₦${Number(
                        asset.minimum_amount
                      ).toLocaleString()}`
                    );
                  }
                }}
              >
                Confirm Investment
              </Button>
            </Card>
            {/* Investment Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className="bg-gray-900 text-white rounded-lg">
                <DialogHeader>
                  <DialogTitle className="text-lg text-cyan-300">
                    Investment Breakdown
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-3 text-gray-300">
                  <p>
                    <strong>Asset:</strong> {asset.name}
                  </p>
                  <p>
                    <strong>Amount Invested:</strong> ₦{amount.toLocaleString()}
                  </p>
                  <p>
                    <strong>Profit Rate:</strong> {profitRate}%
                  </p>
                  <p>
                    <strong>Expected Profit:</strong> ₦{profit.toLocaleString()}
                  </p>
                  <p>
                    <strong>Total after Profit:</strong> ₦
                    {totalWithProfit.toLocaleString()}
                  </p>
                  <p>
                    <strong>Duration:</strong> {asset.duration} weeks
                  </p>
                </div>

                <DialogFooter>
                  <Button
                    className="bg-green-600 hover:bg-green-500 cursor-ponter"
                    onClick={() => router.push("#")}
                  >
                    Proceed to Payment
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>

        {/* Promo */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 p-4 bg-brown-800 text-white rounded-lg flex items-center justify-between"
        >
          <PromoBanner />
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default AssetDetails;

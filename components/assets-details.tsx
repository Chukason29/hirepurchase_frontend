"use client";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/dashboard-layout";
import PromoBanner from "@/components/promo-banner";
import { type Asset, getAssetById } from "@/services/assets.service";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import InvestmentModal from "@/components/investment-modal";
import { toast } from "sonner";

const AssetDetails = ({ id }: { id: string }) => {
  // const router = useRouter();
  const [asset, setAsset] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState<string>("");
  const [open, setOpen] = useState(false);

  const numericAmount = Number(amount) || 0;
  // const profit = (numericAmount * profitRate) / 100;

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const data = await getAssetById(id);
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
            <Image
              src={asset.imagelink}
              alt={asset.name}
              className="w-full object-contain mb-4"
              width={100}
              height={254}
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
                  <p className="text-gray-400">Minimum Investment Amount:</p>
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
                  <p className="text-gray-400">ROI Percentage:</p>
                  <p className="text-green-300">{asset.percentage}%</p>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-400">Duration:</p>
                  <p className="text-green-300">{asset.duration} months</p>
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
                  if (numericAmount >= Number(asset.minimum_amount)) {
                    setOpen(true);
                  } else {
                    toast.error(
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
            {open && numericAmount >= Number(asset.minimum_amount) && (
              <InvestmentModal
                open={open}
                onOpenChange={setOpen}
                assetId={id}
                amount={numericAmount}
              />
            )}
           
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

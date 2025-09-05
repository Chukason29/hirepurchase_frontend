/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAssets } from "@/services/assets.service";
import Image from "next/image";
import { toast } from "react-toastify";
import ActionButton from "@/components/action-button";

interface Asset {
  id: string;
  name: string;
  description: string;
  amount: number;
  duration: number;
  percentage: number;
  vat_charge: number;
  min_amount: number;
  imageLink: string;
  slug?: string;
}

const VehicleCard = () => {
  const router = useRouter();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await getAssets(1, 2);

        if (response.status === "success") {
          const mappedAssets: Asset[] = response.data.map((asset: any) => ({
            id: asset.id,
            name: asset.name,
            description: asset.description,
            amount: parseFloat(asset.amount),
            duration: asset.duration,
            percentage: parseFloat(asset.percentage),
            vat_charge: parseFloat(asset.vat_charge),
            minimum_amount: parseFloat(asset.minimum_amount),
            imageLink: asset.imagelink,
            slug: asset.name.toLowerCase().replace(/\s+/g, "-"),
          }));

          setAssets(mappedAssets);
          toast.success("Fetched assets successfully!!");
        } else {
          toast.error((response as any).message || "Failed to load assets");
        }
      } catch (error) {
        console.error("Error loading assets:", error);
        toast.error("Error loading assets");
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  if (loading) {
    return (
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
    );
  }

  if (!loading && assets.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-lg text-red-500">No assets found</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-4 py-8"
    >
      <h2 className="text-3xl font-extrabold text-black mb-6 text-center">
        Assets
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.map((asset, index) => (
          <motion.div
            key={asset.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card
              className="bg-white shadow-2xl hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => router.push(`/assets/${asset.id}`)}
            >
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Image
                  src={asset.imageLink}
                  alt={asset.name}
                  className="object-contain mb-4"
                  width={150}
                  height={150}
                />
                <h3 className="text-xl font-semibold text-purple-600">
                  {asset.name}
                </h3>
                <p className="text-lg font-bold text-green-600">
                  <span className="text-lg font-bold text-gray-800">
                    {" "}
                    Minimum Investment Amount:
                  </span>{" "}
                  ₦{asset.minimum_amount.toLocaleString()}
                </p>
                <p className="text-lg font-bold text-green-600">
                  <span className="text-lg font-bold text-gray-800">
                    ROI Percentage:
                  </span>{" "}
                  {asset.percentage}%
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-end mt-10">
        <ActionButton
          text="View More"
          route="/assets"
          bgColor="bg-gray-700"
          textColor="text-white"
          className="bg-gray-700 hover:bg-yellow-400 text-white font-bold px-6 py-2 rounded-lg shadow"
        />
      </div>
    </motion.div>
  );
};

export default VehicleCard;

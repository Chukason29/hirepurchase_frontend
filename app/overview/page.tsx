import BalanceCard from "@/components/balance-card";
import DashboardLayout from "@/components/dashboard-layout";
import PromoBanner from "@/components/promo-banner";
import VehicleCard from "@/components/vehicle-card";
import React from "react";

const page = () => {
  return (
    <DashboardLayout>
      <div className="w-full">
        <BalanceCard />
        <VehicleCard />
        <PromoBanner />
      </div>
    </DashboardLayout>
  );
};

export default page;

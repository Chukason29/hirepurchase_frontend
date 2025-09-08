import BalanceCard from "@/components/balance-card";
import DashboardLayout from "@/components/dashboard-layout";
import PromoBanner from "@/components/promo-banner";
import VerticalPromoBanner from "@/components/vertical-promo-banner";
import ProtectedRoute from "@/components/protected-route";
import VehicleCard from "@/components/vehicle-card";
import React from "react";

const page = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="w-full space-y-6">
          <BalanceCard />

          {/* Row with VehicleCard + VerticalPromoBanner */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-3/4">
              <VehicleCard />
            </div>
            <div className="hidden lg:block w-1/4">
              <VerticalPromoBanner />
            </div>
          </div>

          {/* PromoBanner still in normal flow */}
          <PromoBanner />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default page;

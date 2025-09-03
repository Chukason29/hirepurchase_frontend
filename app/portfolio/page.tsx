import DashboardLayout from "@/components/dashboard-layout";
import PortfolioComponent from "@/components/portfolio-component";
import React from "react";

const page = () => {
  return (
    <DashboardLayout>
      <PortfolioComponent />
    </DashboardLayout>
  );
};

export default page;

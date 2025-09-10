import { hirePurchaseApi } from "@/api/API";
import Cookies from "js-cookie";
import { toast } from "sonner";

export interface Investment {
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

export const getAuthHeader = () => {
  const token = Cookies.get("token"); // ✅ cookie instead of localStorage
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

export const getOtpHeader = () => {
  const token = Cookies.get("token"); // ✅ cookie instead of localStorage
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

export const getInvestmentSummary = async (
  asset_id: string,
  amount: number
) => {
  try {
    const response = await hirePurchaseApi.post(
      "/api/invest/summary",
      {
        asset_id,
        amount,
      },
      getAuthHeader()
    );

    if (response.data.status === "success") {
      return response.data; // ✅ return data to use in modal
    } else {
      toast.error(response.data.message);
      return null;
    }
  } catch (error: any) {
    toast.error(error.message || "Something went wrong");
    return null;
  }
};

export const setInvestment = async (asset_id: string, amount: number) => {
  try {
    const response = await hirePurchaseApi.post(
      "/api/invest/set",
      { asset_id, amount },
      getAuthHeader()
    );

    // ✅ Backend handles the redirect, so no need to return data
    return response;
  } catch (error) {
    console.error("Error setting investment:", error);
    throw error;
  }
};

export const getActiveInvestments = async (
  page: number = 1,
  limit: number = 5
) => {
  try {
    const response = await hirePurchaseApi.get("/api/investments/active", {
      ...getAuthHeader(),
      params: { page, limit }, // 🔑 required by backend
    });

    if (response.data.status === "success") {
      return response.data.investments;
    } else {
      toast.error(response.data.message || "Unable to fetch investments");
      return [];
    }
  } catch (error: any) {
    toast.error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
    return [];
  }
};

export const getCompletedInvestments = async (
  page: number = 1,
  limit: number = 5
) => {
  try {
    const response = await hirePurchaseApi.get("/api/investments/completed", {
      ...getAuthHeader(),
      params: { page, limit },
    });

    if (response.data.status === "success") {
      return response.data.investments;
    } else {
      toast.error(
        response.data.message || "Unable to fetch completed investments"
      );
      return [];
    }
  } catch (error: any) {
    toast.error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
    return [];
  }
};

export const withdrawInvestment = async (
  otp: string,
  amount: number,
  investment_id: string
) => {
  try {
    const response = await hirePurchaseApi.post("/api/investments/withdrawal", {
      ...getAuthHeader(),
      params: { otp, amount, investment_id },
    });

    if (response.data.status === "success") {
      toast.success("Withdrawal successful!");
      return response.data;
    } else {
      toast.error(response.data.message || "Withdrawal failed");
      return null;
    }
  } catch (error: any) {
    toast.error(error.message || "Something went wrong during withdrawal");
    return null;
  }
};

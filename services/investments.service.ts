import { hirePurchaseApi } from "@/api/API";
import Cookies from "js-cookie";
import { toast } from "sonner";

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

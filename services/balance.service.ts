import { hirePurchaseApi } from "@/api/API";
import { getAuthHeader } from "@/services/investments.service";
import { toast } from "sonner";

export const totalAmountInvested = async () => {
  try {
    const response = await hirePurchaseApi.get(
      "/api/investments/amount/get",
      getAuthHeader()
    );

    toast.success(response.data.message || "Amount retrieved successfully");
    return response.data; // { amount, message }
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Error retrieving amount");
    return null;
  }
};

export const totalActiveInvestments = async () => {
  try {
    const response = await hirePurchaseApi.get(
      "/api/investments/all",
      getAuthHeader()
    );

    toast.success(
      response.data.message || "Active investments retrieved successfully"
    );
    return response.data; // { total, message }
  } catch (error: any) {
    toast.error(
      error.response?.data?.message || "Error retrieving active investments"
    );
    return null;
  }
};

export const returnOnActiveInvestments = async () => {
  try {
    const response = await hirePurchaseApi.get(
      "/api/investments/returns/get",
      getAuthHeader()
    );

    toast.success(response.data.message || "Return retrieved successfully");
    return response.data; // { amount, message }
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Error retrieving return");
    return null;
  }
};

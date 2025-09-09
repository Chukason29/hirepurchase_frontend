import { hirePurchaseApi } from "@/api/API";
import { getAuthHeader } from "@/services/investments.service";
import { toast } from "sonner";

export const totalAmountInvested = async () => {
  try {
    const response = await hirePurchaseApi.get(
      "/api/investments/amount/get",
      getAuthHeader()
    );
    return response.data;
    toast.success(response.data.message || "Amount retrieved successfully");
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
    return response.data;
    toast.success(
      response.data.message || "Active investments retrieved successfully"
    );
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
    return response.data;
    toast.success(response.data.message || "Return retrieved successfully");
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Error retrieving return");
    return null;
  }
};

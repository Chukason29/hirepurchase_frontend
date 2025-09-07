import { hirePurchaseApi } from "@/api/API";
import { getAuthHeader } from "@/services/investments.service";
import { toast } from "sonner";

export interface Asset {
  name: string;
  total_amount: number;
  percentage: number;
  duration: number;
  vat_charge: number;
  minimum_amount: number;
  imagelink: string;
}

interface ApiResponse {
  status: string;
  page: number;
  limit: number;
  total_records: number;
  total_pages: number;
  message?: string;
  data: Asset[];
}

export const getAssets = async (
  page: number,
  limit: number
): Promise<ApiResponse> => {
  try {
    const response = await hirePurchaseApi.post<ApiResponse>(
      "/api/assets/all",
      {
        page,
        limit,
      },
      getAuthHeader()
    );

    if (response.data.status === "success") {
      toast.success("Assets fetched successfully");
      return response.data;
    } else {
      toast.error(response.data?.message || "Failed to fetch assets");
      return {
        status: "error",
        page,
        limit,
        total_records: 0,
        total_pages: 0,
        message: "Failed to fetch assets",
        data: [],
      };
    }
  } catch (error) {
    console.error("Error fetching assets:", error);
    toast.error("Error fetching assets");
    return {
      status: "error",
      page,
      limit,
      total_records: 0,
      total_pages: 0,
      message: "Error fetching assets",
      data: [],
    };
  }
};

export const getAssetById = async (asset_id: string): Promise<Asset | null> => {
  try {
    const response = await hirePurchaseApi.post<Asset>(
      "/api/assets/get",
      { asset_id },
      getAuthHeader()
    );

    return response.data;
    toast.success("Asset fetched successfully");
  } catch (error) {
    console.error("Error fetching asset details:", error);
    toast.error("Error fetching asset details");
    return null;
  }
};

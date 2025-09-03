import { hirePurchaseApi } from "@/api/API";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for toast notifications

interface Asset {
  name: string;
  description: string;
  amount: number;
  duration: number;
  percentage: number;
  vat_charge: number;
  min_amount: number;
  imageLink: string;
}

interface AssetDetail {
  id: string;
  name: string;
  description: string;
  amount: number;
  minimum_amount: number;
  percentage: number;
  vat_charge: number;
  duration: number;
  status: string;
  imagelink: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  status: string;
  page: number;
  limit: number;
  total_records: number;
  total_pages: number;
  data: Asset[];
}

interface AssetApiResponse {
  status: string;
  message?: string;
  data?: AssetDetail;
}

export const getAssets = async (
  page: number = 1,
  limit: number = 2
): Promise<ApiResponse> => {
  try {
    const response = await hirePurchaseApi.post<ApiResponse>(
      "/api/assets/all",
      {
        page,
        limit,
      }
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
      data: [],
    };
  }
};

export const getAssetById = async (
  asset_id: string
): Promise<AssetApiResponse> => {
  try {
    const response = await hirePurchaseApi.post<ApiResponse>(
      "/api/assets/get",
      { asset_id } // ✅ must match backend
    );

    return response.data;
    toast.success("Asset fetched successfully")
   
  } catch (error) {
    console.error("Error fetching asset details:", error);
    toast.error("Error fetching asset details");
    return { status: "error", message: "Something went wrong" };
  }
};

import { hirePurchaseApi } from "@/api/API";
import { getAuthHeader } from "@/services/investments.service";
import { toast } from "sonner";

export interface SetAccountPayload {
  otp: string;
  account_name: string;
  account_number: string;
  bank_name: string;
}

interface SetAccountResponse {
  status: "success" | "error";
  message: string | { title: string; description: string };
}

export const accountSet = async (
  payload: SetAccountPayload
): Promise<SetAccountResponse> => {
  try {
    console.log("Payload being sent:", payload);

    const response = await hirePurchaseApi.post<SetAccountResponse>(
      "/api/account/set",
      payload,
      getAuthHeader()
    );

    console.log("API response:", response.data);

    return response.data; // return data to modal, no toasts here
  } catch (error: any) {
    console.error("Account set error:", error);

    let errorMessage = "An error occurred while setting the account details.";

    if (error.message === "Network Error") {
      errorMessage = "Network error: Unable to reach the server.";
    } else if (error.response?.data?.message) {
      // Handle both string and object messages safely
      const msg = error.response.data.message;
      errorMessage =
        typeof msg === "string"
          ? msg
          : `${msg.title || "Error"}: ${msg.description || ""}`;
    }

    throw new Error(errorMessage); // throw only, no toast
  }
};

export const accountUpdate = async (
  payload: SetAccountPayload
): Promise<SetAccountResponse> => {
  try {
    const { data } = await hirePurchaseApi.put<SetAccountResponse>(
      "/api/account/update",
      payload,
      getAuthHeader()
    );

    return data; // ⬅️ this ensures we return the response
  } catch (error: unknown) {
    let errorMessage = "An error occurred while updating the account details.";

    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      (error as any).response?.data?.message
    ) {
      errorMessage = (error as any).response.data.message;
    }

    throw new Error(errorMessage);
  }
};

export const accountGet = async () => {
  try {
    const response = await hirePurchaseApi.get(
      "/api/account/get",
      getAuthHeader()
    );

    // normalize response to { success, data, message }
    if (response.data.status === "success") {
      return {
        success: true,
        data: {
          account_number: response.data.account_number,
          bank_name: response.data.bank_name,
          account_name: response.data.account_name,
        },
        message: "Account details fetched successfully",
      };
    } else {
      return {
        success: false,
        data: null,
        message: response.data.message || "No account found",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      data: null,
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch account",
    };
  }
};

export const deleteAccount = async (): Promise<void> => {
  try {
    const response = await hirePurchaseApi.delete<SetAccountResponse>(
      "/api/account/delete"
    );
    toast.success("Account details deleted successfully");
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred while deleting the account details.";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

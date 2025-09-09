import { hirePurchaseApi } from "@/api/API";
import { getAuthHeader } from "@/services/investments.service";
import { ca } from "date-fns/locale";
import { toast } from "sonner";

interface PinCheckResponse {
  valid: boolean;
  message?: string;
}

interface PinCheckPayload {
  pin: string;
}

export const checkPin = async (payload: PinCheckPayload): Promise<void> => {
  try {
    const response = await hirePurchaseApi.post<PinCheckResponse>(
      "/api/pin/check",
      payload,
      getAuthHeader()
    );
    toast.success("PIN is valid");
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred while checking the PIN.";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

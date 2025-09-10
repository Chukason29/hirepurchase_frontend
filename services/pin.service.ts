import { hirePurchaseApi } from "@/api/API";
import { getAuthHeader } from "@/services/investments.service";
import { ca } from "date-fns/locale";
import { toast } from "sonner";

interface PinCheckResponse {
  valid: boolean;
  message?: string;
  status: "success" | "error";
}

interface PinCheckPayload {
  pin: string;
}

export const checkPin = async (payload: PinCheckPayload): Promise<void> => {
  try {
    const { data } = await hirePurchaseApi.post<PinCheckResponse>(
      "/api/pin/check",
      payload,
      getAuthHeader()
    );

    if (data.status === "error") {
      // Backend responded with error (e.g., wrong PIN)
      const errorMessage =
        typeof data.message === "string"
          ? data.message
          : "Incorrect PIN"; // fallback
      toast.error("Incorrect PIN");
      throw new Error(errorMessage);
    }

    // Only mark success when backend confirms it
    toast.success(
      typeof data.message === "string"
        ? data.message
        : "PIN is valid"
    );
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      "Incorrect PIN";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};


import { hirePurchaseApi } from "@/api/API";
import { RegisterSchema } from "@/utils/Validator";
import { toast } from "react-toastify";

export const registerUser = async (payload: RegisterSchema): Promise<void> => {
  try {
    await hirePurchaseApi.post("/register", payload);
  } catch (error: any) {
    const response = error?.response?.data;

    if (response?.errors && typeof response.errors === "object") {
      Object.values(response.errors).forEach((fieldErrors: any) => {
        if (Array.isArray(fieldErrors)) {
          fieldErrors.forEach((msg: string) => toast.error(msg));
        }
      });
    } else if (response?.message) {
      toast.error(response.message);
    } else {
      toast.error("Registration failed.");
    }

    throw error;
  }
};

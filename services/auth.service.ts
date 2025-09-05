import { hirePurchaseApi } from "@/api/API";
import { LoginSchema, RegisterSchema } from "@/utils/Validator";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { getAuthHeader } from "@/services/investments.service";

interface ResetPasswordData {
  password: string;
  confirm_password: string;
}

export const registerUser = async (payload: RegisterSchema): Promise<void> => {
  try {
    const response = await hirePurchaseApi.post("/api/register", payload);
    if (response.status === 200) {
      toast.success(
        response.data.message ||
          "Registration successful, otp sent to your email"
      );
    }
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

export const verifyOtp = async (otp: string): Promise<void> => {
  try {
    const response = await hirePurchaseApi.post("/api/verification", { otp });
    if (response.status === 200) {
      toast.success(response.data.message || "Email is verified successfully!");
    }
  } catch (error: any) {
    const response = error?.response?.data;
    if (response?.message) {
      toast.error(response.message);
    } else {
      toast.error("OTP verification failed.");
    }
    throw error;
  }
};

export const loginUser = async (payload: LoginSchema): Promise<void> => {
  try {
    const response = await hirePurchaseApi.post("/api/login", payload);

    if (response.status === 200) {
      const { access_token, user, message } = response.data;

      // ✅ use the correct property from backend
      Cookies.set("token", access_token, {
        expires: 7,
        path: "/",
        secure: process.env.NODE_ENV === "production",
      });

      localStorage.setItem("user", JSON.stringify(user));

      toast.success(message || "Login successful!");
    }
  } catch (error: any) {
    const response = error?.response?.data;
    if (response?.message) {
      toast.error(response.message);
    } else {
      toast.error("Login failed.");
    }
    throw error;
  }
};

export const forgotPassword = async (email: string): Promise<void> => {
  try {
    const response = await hirePurchaseApi.post("/api/forgot_password", {
      email,
    });
    if (response.status === 200) {
      toast.success(
        response.data.message || "Password reset link sent to your email."
      );
    }
  } catch (error: any) {
    const response = error?.response?.data;
    if (response?.message) {
      toast.error(response.message);
    } else {
      toast.error("Failed to send password reset link.");
    }
    throw error;
  }
};

export const forgotPasswordOtp = async (otp: string): Promise<void> => {
  try {
    const response = await hirePurchaseApi.post("/api/otp/confirmation", {
      otp,
    });
    if (response.status === 200) {
      toast.success(response.data.message || "OTP verified successfully!");
    }
  } catch (error: any) {
    const response = error?.response?.data;
    if (response?.message) {
      toast.error(response.message);
    } else {
      toast.error("OTP verification failed.");
    }
    throw error;
  }
};

export const resetPassword = async (data: ResetPasswordData): Promise<void> => {
  try {
    const response = await hirePurchaseApi.post("/api/passwords/reset", data);
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};

export async function logoutUser() {
  try {
    const response = await hirePurchaseApi.post("/api/logout");

    Cookies.remove("token");

    return response.data;
    toast.success(response.data.message);
  } catch (error: any) {
    console.error("Logout failed:", error.response?.data || error.message);
    throw error;
  }
}

export const createPin = async (pin: string) => {
  try {
    const response = await hirePurchaseApi.post(
      "/api/pin/set",
      { pin },
      getAuthHeader()
    );

    toast.success(response.data?.message || "PIN set successfully");
    return response.data;
  } catch (error: any) {
    console.error("Error setting PIN:", error.response?.data || error);
    toast.error(error.response?.data?.error || "Failed to set PIN");
    throw error;
  }
};

export const updatePin = async (old_pin: string, new_pin: string, confirm_new_pin: string) => {
  try {
    const response = await hirePurchaseApi.post(
      "/api/pin/update",
      { old_pin, new_pin, confirm_new_pin },
      getAuthHeader()
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Failed to update PIN:",
      error.response?.data || error.message
    );
    toast.error(error.response?.data?.error || "Failed to rese Pin")
    throw error;
  }
};

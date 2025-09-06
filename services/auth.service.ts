import { hirePurchaseApi } from "@/api/API";
import {
  ForgotPasswordSchema,
  LoginSchema,
  RegisterSchema,
} from "@/utils/Validator";
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

export const forgotPassword = async (email: string): Promise<string | null> => {
  try {
    const response = await hirePurchaseApi.post("/api/forgot_password", {
      email,
    });

    if (response.status === 200) {
      const { message, otp_token } = response.data;

      toast.success(message || "Password reset link sent to your email.");

      if (otp_token) {
        localStorage.setItem("otp_token", otp_token); // ✅ store for later use
      }

      return otp_token || null;
    }

    return null;
  } catch (error: any) {
    const response = error?.response?.data;
    toast.error(response?.message || "Failed to send password reset link.");
    throw error;
  }
};

export const forgotPasswordOtp = async (otp: string): Promise<void> => {
  try {
    const otpToken = localStorage.getItem("otp_token");
    if (!otpToken) {
      toast.error("OTP token not found. Please restart the process.");
      return;
    }

    const cleanedToken = otpToken.trim();

    console.log("Sending OTP verification:", {
      body: { otp },
      headers: { Authorization: `Bearer ${cleanedToken}` },
    });

    const response = await hirePurchaseApi.post(
      "/api/otp/confirmation",
      { otp },
      {
        headers: {
          Authorization: `Bearer ${cleanedToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      toast.success(response.data.message || "OTP verified successfully!");
    }
  } catch (error: any) {
    // console.error("OTP verification error:", error.response || error);
    const response = error?.response?.data;
    toast.error(response?.message || "OTP verification failed.");
    throw error;
  }
};

export const resetPassword = async (data: ResetPasswordData): Promise<void> => {
  try {
    const otpToken = localStorage.getItem("otp_token");
    if (!otpToken) {
      toast.error("OTP token not found. Please restart the process.");
      return;
    }

    const cleanedToken = otpToken.trim();

    const response = await hirePurchaseApi.post(
      "/api/passwords/reset",
      data, // ✅ only password data in body
      {
        headers: {
          Authorization: `Bearer ${cleanedToken}`, // ✅ token from localStorage
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      toast.success(response.data.message || "Password reset successful!");
      localStorage.removeItem("otp_token"); // ✅ delete token after success
    }

    return response.data;
  } catch (error: any) {
    const response = error?.response?.data;
    toast.error(response?.message || "Password reset failed.");
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

export const updatePin = async (
  password: string,
  pin: string,
  confirm_pin: string
) => {
  try {
    const response = await hirePurchaseApi.post(
      "/api/pin/update",
      { password, pin, confirm_pin },
      getAuthHeader()
    );

    // ✅ Toast backend success message if available
    if (response.data?.message) {
      toast.success(response.data.message);
    }

    return response.data;
  } catch (error: any) {
    const backendMessage =
      error.response?.data?.message || error.response?.data?.error;

    console.error("Failed to update PIN:", backendMessage || error.message);

    // ✅ Toast backend error message if available
    toast.error(backendMessage || "Failed to update PIN");

    throw error;
  }
};

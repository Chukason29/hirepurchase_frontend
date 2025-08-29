import { hirePurchaseApi } from "@/api/API";
import { LoginSchema, RegisterSchema } from "@/utils/Validator";
import { toast } from "react-toastify";

export const registerUser = async (payload: RegisterSchema): Promise<void> => {
  try {
    const response = await hirePurchaseApi.post("/api/register", payload);
    if (response.status === 200) {
      toast.success(
        response.message ||
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

export const loginUser = async (
  payload: LoginSchema
): Promise<void> => {
  try {
    const response = await hirePurchaseApi.post("/api/login", payload);
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success(response.message || "Login successful!");
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

// export const logoutUser = async (): Promise<void> => {
//   try {
//     await hirePurchaseApi.post("/logout");
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     toast.success("Logged out successfully!");
//   } catch (error: any) {
//     const response = error?.response?.data;
//     if (response?.message) {
//       toast.error(response.message);
//     } else {
//       toast.error("Logout failed.");
//     }
//     throw error;
//   }
// };

export const forgotPassword = async (email: string): Promise<void> => {
  try {
    const response = await hirePurchaseApi.post("/api/forgot-password", { email });
    if (response.status === 200) {
      toast.success(
        response.message || "Password reset link sent to your email."
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
    const response = await hirePurchaseApi.post("/api/otp/confirmation", { otp });
    if (response.status === 200) {
      toast.success(response.message || "OTP verified successfully!");
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

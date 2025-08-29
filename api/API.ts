import axios from "axios";

export const hirePurchaseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  timeout: 60000,
});

hirePurchaseApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

hirePurchaseApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message =
      status === 401
        ? error.response?.data?.message || "Invalid email or password"
        : status === 500
        ? "Server error. Please try again later."
        : status === 404
        ? "Requested resource not found."
        : "Something went wrong";

    if (status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    console.log(error);
    console.error(message);
    // toast.error(message);
    return Promise.reject(error);
  }
);

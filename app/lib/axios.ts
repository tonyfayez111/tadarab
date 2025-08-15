// lib/axios.ts
import axios from "axios";
// @ts-expect-error - AxiosError type import issue
import type { AxiosError } from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://your-api-domain.com/api";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (token) {
        // Works for both AxiosHeaders and plain objects
        if (
          config.headers &&
          typeof (config.headers as any).set === "function"
        ) {
          (config.headers as any).set("Authorization", `Bearer ${token}`);
        } else {
          config.headers = {
            ...(config.headers || {}),
            Authorization: `Bearer ${token}`,
          };
        }
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    } else if (status === 403) {
      console.error("Access denied");
    } else if (status === 404) {
      console.error("Resource not found");
    } else if (status === 500) {
      console.error("Internal server error");
    }

    return Promise.reject(error);
  }
);

export default api;

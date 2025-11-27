import axios, { AxiosInstance, AxiosError } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:6001/api/v1";

// Create axios instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add token to requests
apiClient.interceptors.request.use(
  (config: any) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
  (response: any) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.reload();
      }
    }
    return Promise.reject(error);
  }
);

// API Response type
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
  statusCode?: number;
}

// Helper function to handle API responses
export function handleApiResponse<T>(response: any): ApiResponse<T> {
  return {
    data: response.data,
    statusCode: response.status,
  };
}

export function handleApiError(error: any): ApiResponse {
  if (axios.isAxiosError(error)) {
    return {
      error: error.response?.data?.message || error.response?.data?.error || error.message,
      statusCode: error.response?.status,
      message: error.response?.data?.message,
    };
  }
  return {
    error: error.message || "An error occurred",
  };
}


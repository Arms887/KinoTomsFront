import { apiClient, handleApiResponse, handleApiError, ApiResponse } from "../index";

export interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  statusCode?: number;
  message?: string;
}

export const loginApi = {
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await apiClient.post<LoginResponse>("/auth/login", credentials);
      return handleApiResponse<LoginResponse>(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};


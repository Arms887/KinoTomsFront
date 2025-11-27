import { apiClient, handleApiResponse, handleApiError, ApiResponse } from "../index";

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  surname: string;
  phone: string;
}

export interface RegisterResponse {
  message: string;
  userId: string;
  step: string | number;
  status: string;
}

export const registerApi = {
  async register(data: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
    try {
      const response = await apiClient.post<RegisterResponse>("/auth/register", data);
      return handleApiResponse<RegisterResponse>(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};


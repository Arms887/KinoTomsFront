import { apiClient, handleApiResponse, handleApiError, ApiResponse } from "../index";

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export const forgotPasswordApi = {
  async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse<ForgotPasswordResponse>> {
    try {
      const response = await apiClient.post<ForgotPasswordResponse>("/auth/forgot-password", data);
      return handleApiResponse<ForgotPasswordResponse>(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};


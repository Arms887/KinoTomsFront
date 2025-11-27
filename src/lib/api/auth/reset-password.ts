import { apiClient, handleApiResponse, handleApiError, ApiResponse } from "../index";

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export const resetPasswordApi = {
  async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse> {
    try {
      const response = await apiClient.post("/auth/reset-password", data);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};


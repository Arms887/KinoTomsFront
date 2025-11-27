import { apiClient, handleApiResponse, handleApiError, ApiResponse } from "../index";

export const verifyEmailApi = {
  async verifyEmail(token: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.get(`/auth/verify-email?token=${encodeURIComponent(token)}`);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};


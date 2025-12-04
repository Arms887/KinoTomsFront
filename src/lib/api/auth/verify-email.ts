import { apiClient, handleApiResponse, handleApiError, ApiResponse } from "../index";

export interface VerifyEmailResponse {
  message: string;
  userId: string;
  isProfileComplete: boolean;
  nextStep: string;
}

export const verifyEmailApi = {
  async verifyEmail(token: string): Promise<ApiResponse<VerifyEmailResponse>> {
    try {
      const response = await apiClient.get(`/auth/verify-email?token=${encodeURIComponent(token)}`);
      return handleApiResponse<VerifyEmailResponse>(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};


import { apiClient, handleApiResponse, handleApiError, ApiResponse } from "../index";

export const logoutApi = {
  async logout(): Promise<ApiResponse> {
    try {
      const response = await apiClient.post("/auth/logout");
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};


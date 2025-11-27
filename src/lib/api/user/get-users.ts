import { apiClient, handleApiResponse, handleApiError, ApiResponse } from "../index";
import { UserProfile } from "./get-profile";

export const getUsersApi = {
  async getUsers(params?: Record<string, any>): Promise<ApiResponse<UserProfile[]>> {
    try {
      const response = await apiClient.get<UserProfile[]>("/user", { params });
      return handleApiResponse<UserProfile[]>(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};


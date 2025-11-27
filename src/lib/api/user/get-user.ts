import { apiClient, handleApiResponse, handleApiError, ApiResponse } from "../index";
import { UserProfile } from "./get-profile";

export const getUserApi = {
  async getUser(uuid: string): Promise<ApiResponse<UserProfile>> {
    try {
      const response = await apiClient.get<UserProfile>(`/user/${uuid}`);
      return handleApiResponse<UserProfile>(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};


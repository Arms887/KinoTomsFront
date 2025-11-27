import { apiClient, handleApiResponse, handleApiError, ApiResponse } from "../index";
import { UserProfile } from "./get-profile";

export interface UpdateUserRequest {
  name?: string;
  surname?: string;
  phone?: string;
  email?: string;
}

export const updateUserApi = {
  async updateUser(uuid: string, data: UpdateUserRequest): Promise<ApiResponse<UserProfile>> {
    try {
      const response = await apiClient.patch<UserProfile>(`/user/${uuid}`, data);
      return handleApiResponse<UserProfile>(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};


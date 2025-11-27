import { apiClient, handleApiResponse, handleApiError, ApiResponse } from "../index";

export const deleteUserApi = {
  async deleteUser(uuid: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.delete(`/user/${uuid}`);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};


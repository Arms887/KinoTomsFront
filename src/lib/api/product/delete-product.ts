import { apiClient, handleApiResponse, handleApiError, ApiResponse } from "../index";

export const deleteProductApi = {
  async deleteProduct(uuid: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.delete(`/product/${uuid}`);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};


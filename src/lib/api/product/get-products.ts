import { apiClient, handleApiResponse, handleApiError, ApiResponse } from "../index";
import { Product } from "./get-product";

export const getProductsApi = {
  async getProducts(params?: Record<string, any>): Promise<ApiResponse<Product[]>> {
    try {
      const response = await apiClient.get<Product[]>("/product", { params });
      return handleApiResponse<Product[]>(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};


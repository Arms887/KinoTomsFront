import { apiClient, handleApiResponse, handleApiError, ApiResponse } from "../index";

export interface Product {
  uuid: string;
  type?: string;
  price?: number;
  name?: string;
  tier?: string;
  img?: string[];
  userUuid: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  user?: {
    uuid: string;
    name?: string;
    surname?: string;
    email: string;
  };
}

export const getProductApi = {
  async getProduct(uuid: string): Promise<ApiResponse<Product>> {
    try {
      const response = await apiClient.get<Product>(`/product/${uuid}`);
      return handleApiResponse<Product>(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};


import { apiClient, handleApiResponse, handleApiError, ApiResponse } from "../index";
import { Product } from "./get-product";

export interface UpdateProductRequest {
  type?: string;
  price?: number;
  name?: string;
  tier?: string;
  img?: string[];
}

export const updateProductApi = {
  async updateProduct(uuid: string, data: UpdateProductRequest, files?: File[]): Promise<ApiResponse<Product>> {
    try {
      const formData = new FormData();
      
      // Add text fields
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          if (Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, String(value));
          }
        }
      });

      // Add files
      if (files && files.length > 0) {
        files.forEach((file) => {
          formData.append("img", file);
        });
      }

      const response = await apiClient.patch<Product>(`/product/${uuid}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return handleApiResponse<Product>(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};


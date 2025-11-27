import { apiClient, handleApiResponse, handleApiError, ApiResponse } from "../index";

// Types
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

export interface CreateProductRequest {
  type: string;
  price: number;
  name: string;
  tier: string;
  img?: string[];
}

export interface UpdateProductRequest {
  type?: string;
  price?: number;
  name?: string;
  tier?: string;
  img?: string[];
}

// Product API
export const productApi = {
  // Get all products
  async getProducts(params?: Record<string, any>): Promise<ApiResponse<Product[]>> {
    try {
      const response = await apiClient.get<Product[]>("/product", { params });
      return handleApiResponse<Product[]>(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get product by UUID
  async getProduct(uuid: string): Promise<ApiResponse<Product>> {
    try {
      const response = await apiClient.get<Product>(`/product/${uuid}`);
      return handleApiResponse<Product>(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Create product
  async createProduct(data: CreateProductRequest, files?: File[]): Promise<ApiResponse<Product>> {
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

      const response = await apiClient.post<Product>("/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return handleApiResponse<Product>(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Update product
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

  // Delete product
  async deleteProduct(uuid: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.delete(`/product/${uuid}`);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};


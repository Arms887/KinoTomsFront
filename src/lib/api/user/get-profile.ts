import { apiClient, handleApiResponse, handleApiError, ApiResponse } from "../index";

export interface UserProfile {
  uuid: string;
  email: string;
  name?: string;
  surname?: string;
  phone?: string;
  roles: string[];
  userId: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  resetToken?: string | null;
  resetTokenExpires?: string | null;
  verifyToken?: string | null;
  verifyTokenExpires?: string | null;
}

export const getProfileApi = {
  async getProfile(): Promise<ApiResponse<UserProfile>> {
    try {
      const response = await apiClient.get<UserProfile>("/user/profile");
      return handleApiResponse<UserProfile>(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};


// Main API export file - re-export all APIs
export * from "./api/index";
export * from "./api/auth";
export * from "./api/user";
export * from "./api/product";
export * from "./api/token";

// Re-export auth APIs for convenience
export { loginApi } from "./api/auth/login";
export { registerApi } from "./api/auth/register";
export { forgotPasswordApi } from "./api/auth/forgot-password";
export { resetPasswordApi } from "./api/auth/reset-password";
export { verifyEmailApi } from "./api/auth/verify-email";
export { logoutApi } from "./api/auth/logout";

// Re-export user APIs
export { getProfileApi } from "./api/user/get-profile";
export { getUserApi } from "./api/user/get-user";
export { getUsersApi } from "./api/user/get-users";
export { updateUserApi } from "./api/user/update-user";
export { deleteUserApi } from "./api/user/delete-user";

// Re-export product APIs
export { getProductsApi } from "./api/product/get-products";
export { getProductApi } from "./api/product/get-product";
export { createProductApi } from "./api/product/create-product";
export { updateProductApi } from "./api/product/update-product";
export { deleteProductApi } from "./api/product/delete-product";

// Re-export utilities
export { tokenManager } from "./api/token";
export { apiClient } from "./api/index";


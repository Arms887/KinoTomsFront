// Product API exports
export * from "./get-products";
export * from "./get-product";
export * from "./create-product";
export * from "./update-product";
export * from "./delete-product";

// Re-export for convenience
export { getProductsApi } from "./get-products";
export { getProductApi } from "./get-product";
export { createProductApi } from "./create-product";
export { updateProductApi } from "./update-product";
export { deleteProductApi } from "./delete-product";

// Re-export Product type
export type { Product } from "./get-product";


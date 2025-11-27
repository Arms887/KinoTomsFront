// User API exports
export * from "./get-profile";
export * from "./get-user";
export * from "./get-users";
export * from "./update-user";
export * from "./delete-user";

// Re-export for convenience
export { getProfileApi } from "./get-profile";
export { getUserApi } from "./get-user";
export { getUsersApi } from "./get-users";
export { updateUserApi } from "./update-user";
export { deleteUserApi } from "./delete-user";

// Re-export UserProfile type
export type { UserProfile } from "./get-profile";


"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserProfile } from "@/lib/api/user";
import { getProfileApi } from "@/lib/api/user";
import { tokenManager } from "@/lib/api/token";

interface UserContextType {
  user: UserProfile | null;
  isLoading: boolean;
  setUser: (user: UserProfile | null) => void;
  fetchUser: () => Promise<void>;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    if (!tokenManager.isAuthenticated()) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await getProfileApi.getProfile();
      if (response.data) {
        setUser(response.data);
      } else {
        setUser(null);
        tokenManager.clearTokens();
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUser(null);
      tokenManager.clearTokens();
    } finally {
      setIsLoading(false);
    }
  };

  const clearUser = () => {
    setUser(null);
    tokenManager.clearTokens();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        setUser,
        fetchUser,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}


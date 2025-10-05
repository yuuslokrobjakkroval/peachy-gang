"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { authClient } from "@/lib/auth-client";

interface User {
  id: string;
  name: string;
  email?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Session {
  user: User;
  session: {
    id: string;
    expiresAt: Date;
    token: string;
    userId: string;
  };
}

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refetch: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const {
    data,
    isPending,
    error,
    refetch: refreshSession,
  } = authClient.useSession();

  useEffect(() => {
    if (error) {
      console.error("Failed to resolve session:", error);
    }
  }, [error]);

  const refetch = useCallback(async () => {
    refreshSession();
  }, [refreshSession]);

  const signOut = useCallback(async () => {
    try {
      await authClient.signOut();
    } catch (err) {
      console.error("Sign out failed:", err);
    } finally {
      refreshSession();
      window.location.href = "/login";
    }
  }, [refreshSession]);

  const value = useMemo<AuthContextType>(() => ({
    session: data
      ? {
          ...data,
          user: { ...data.user, image: data.user.image ?? undefined },
        }
      : null,
    loading: isPending,
    signOut,
    refetch,
  }), [data, isPending, refetch, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

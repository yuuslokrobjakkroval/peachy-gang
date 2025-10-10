import { AUTH_CONFIG } from "@/lib/auth-config";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: AUTH_CONFIG.authApiBaseUrl,
  fetchOptions: {
    credentials: "include",
  },
});

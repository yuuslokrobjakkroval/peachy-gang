import { AUTH_CONFIG } from "@/lib/auth-config";
import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  baseURL: AUTH_CONFIG.baseUrl,
  fetchOptions: {
    credentials: "include",
  },
});

import { NODE_ENV } from "@/utils/auth/server";
import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  baseURL:
    NODE_ENV !== "dev" ? "http://peachyganggg.com" : "http://localhost:3000",
  fetchOptions: {
    onError(e) {
      if (e.error.status === 401) {
        console.log("Unauthorized, redirecting to login...");
        window.location.href = "/login";
      }
    },
  },
});

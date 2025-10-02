import { APP_URL, BETTER_AUTH_URL } from "@/utils/auth/server";
import { createAuthClient } from "better-auth/client";

// Get the base URL based on environment
function getBaseURL() {
  // In browser, use window.location.origin
  console.log("Start Determining base URL...");
  // In server-side, use environment variables
  if (BETTER_AUTH_URL) {
    return BETTER_AUTH_URL;
  }

  if (APP_URL) {
    return APP_URL;
  }

  console.log("No environment variable found for base URL.");
  // Fallback for development
  return "http://localhost:3000";
}

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  fetchOptions: {
    onError(e) {
      if (e.error.status === 401) {
        console.log("Unauthorized, redirecting to login...");
        window.location.href = "/login";
      }
    },
  },
});

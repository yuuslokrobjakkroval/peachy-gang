import { createAuthClient } from "better-auth/client";

// Get the base URL based on environment
function getBaseURL() {
  // In browser, use window.location.origin
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  // In server-side, use environment variables
  if (process.env.BETTER_AUTH_URL) {
    return process.env.BETTER_AUTH_URL;
  }

  if (process.env.APP_URL) {
    return process.env.APP_URL;
  }

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

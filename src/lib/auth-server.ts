import { auth } from "@/lib/auth";
import { NextRequest } from "next/server";
import { toNextJsHandler } from "better-auth/next-js";

// Server-side auth utilities
export async function getSession(request: NextRequest) {
  try {
    return await auth.api.getSession({
      headers: request.headers,
    });
  } catch (error) {
    console.error("Failed to get session:", error);
    return null;
  }
}

// Auth handler for API routes
export const authHandlers = toNextJsHandler(auth);

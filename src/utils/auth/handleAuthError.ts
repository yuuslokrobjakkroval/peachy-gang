type AuthErrorType = {
  message: string;
  code?: string;
  redirectTo?: string;
};

export class AuthError extends Error {
  code?: string;
  redirectTo?: string;

  constructor({ message, code, redirectTo }: AuthErrorType) {
    super(message);
    this.name = "AuthError";
    this.code = code;
    this.redirectTo = redirectTo;
  }
}

export const AUTH_ERROR_CODES = {
  INVALID_CREDENTIALS: "auth/invalid-credentials",
  SESSION_EXPIRED: "auth/session-expired",
  UNAUTHORIZED: "auth/unauthorized",
  TOKEN_EXPIRED: "auth/token-expired",
  INVALID_TOKEN: "auth/invalid-token",
  NOT_AUTHENTICATED: "auth/not-authenticated",
  UNKNOWN: "auth/unknown",
} as const;

export function handleAuthError(error: unknown): AuthError {
  // If it's already an AuthError instance, return it
  if (error instanceof AuthError) {
    return error;
  }

  // If it's a regular Error instance
  if (error instanceof Error) {
    // Check for specific error messages
    const errorMessage = error.message.toLowerCase();

    if (errorMessage.includes("token")) {
      return new AuthError({
        message: "Your session has expired. Please login again.",
        code: AUTH_ERROR_CODES.TOKEN_EXPIRED,
        redirectTo: "/login",
      });
    }

    if (errorMessage.includes("credentials")) {
      return new AuthError({
        message: "Invalid credentials provided.",
        code: AUTH_ERROR_CODES.INVALID_CREDENTIALS,
        redirectTo: "/login",
      });
    }

    if (errorMessage.includes("unauthorized")) {
      return new AuthError({
        message: "You are not authorized to access this resource.",
        code: AUTH_ERROR_CODES.UNAUTHORIZED,
        redirectTo: "/login",
      });
    }

    // If it's an Error but doesn't match specific cases
    return new AuthError({
      message: error.message || "An unexpected authentication error occurred.",
      code: AUTH_ERROR_CODES.UNKNOWN,
      redirectTo: "/login",
    });
  }

  // If it's a string
  if (typeof error === "string") {
    return new AuthError({
      message: error,
      code: AUTH_ERROR_CODES.UNKNOWN,
      redirectTo: "/login",
    });
  }

  // If it's an unknown type of error
  return new AuthError({
    message: "An unexpected authentication error occurred.",
    code: AUTH_ERROR_CODES.UNKNOWN,
    redirectTo: "/login",
  });
}

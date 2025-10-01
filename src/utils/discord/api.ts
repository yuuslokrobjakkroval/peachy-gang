/**
 * Discord API Helper Functions
 * Handles token validation and API calls with proper error handling
 */

const DISCORD_API_BASE = "https://discord.com/api/v10";

export interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar?: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner?: string;
  accent_color?: number;
  locale?: string;
  verified?: boolean;
  email?: string;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
}

export interface DiscordGuild {
  id: string;
  name: string;
  icon?: string;
  banner?: string;
  owner?: boolean;
  permissions?: string;
  features: string[];
}

export class DiscordAPIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = "DiscordAPIError";
  }
}

/**
 * Make a request to Discord API with proper error handling
 */
async function discordRequest<T>(
  endpoint: string,
  token: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${DISCORD_API_BASE}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    let errorMessage = `Discord API error: ${response.status} ${response.statusText}`;
    let errorCode = "UNKNOWN";

    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
      errorCode = errorData.code || errorCode;
    } catch {
      // If we can't parse the error response, use the default message
    }

    throw new DiscordAPIError(errorMessage, response.status, errorCode);
  }

  return response.json();
}

/**
 * Get current user information
 */
export async function getCurrentUser(token: string): Promise<DiscordUser> {
  if (!token) {
    throw new DiscordAPIError("No access token provided", 401, "NO_TOKEN");
  }

  try {
    return await discordRequest<DiscordUser>("/users/@me", token);
  } catch (error) {
    if (error instanceof DiscordAPIError) {
      throw error;
    }
    throw new DiscordAPIError("Failed to fetch user data", 500, "FETCH_ERROR");
  }
}

/**
 * Get current user's guilds
 */
export async function getCurrentUserGuilds(
  token: string
): Promise<DiscordGuild[]> {
  if (!token) {
    throw new DiscordAPIError("No access token provided", 401, "NO_TOKEN");
  }

  try {
    return await discordRequest<DiscordGuild[]>("/users/@me/guilds", token);
  } catch (error) {
    if (error instanceof DiscordAPIError) {
      throw error;
    }
    throw new DiscordAPIError("Failed to fetch guilds", 500, "FETCH_ERROR");
  }
}

/**
 * Validate if a Discord token is valid by attempting to fetch user data
 */
export async function validateDiscordToken(
  token: string
): Promise<{ valid: boolean; user?: DiscordUser; error?: string }> {
  try {
    const user = await getCurrentUser(token);
    return { valid: true, user };
  } catch (error) {
    if (error instanceof DiscordAPIError) {
      return {
        valid: false,
        error: `${error.message} (Status: ${error.status})`,
      };
    }
    return {
      valid: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Get token from localStorage with validation
 */
export function getStoredDiscordToken(): {
  token: string | null;
  error?: string;
} {
  if (typeof window === "undefined") {
    return { token: null, error: "Not in browser environment" };
  }

  try {
    const storedAccount = localStorage.getItem("account");
    if (!storedAccount) {
      return { token: null, error: "No account data in localStorage" };
    }

    const parsed = JSON.parse(storedAccount);
    const token = parsed?.accessToken;

    if (!token) {
      return { token: null, error: "No access token in account data" };
    }

    return { token };
  } catch (error) {
    return {
      token: null,
      error: `Failed to parse account data: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

/**
 * Test Discord API connectivity with current stored token
 */
export async function testStoredDiscordToken(): Promise<{
  success: boolean;
  user?: DiscordUser;
  error?: string;
  token?: string;
}> {
  const { token, error: tokenError } = getStoredDiscordToken();

  if (!token) {
    return { success: false, error: tokenError || "No token available" };
  }

  const validation = await validateDiscordToken(token);

  return {
    success: validation.valid,
    user: validation.user,
    error: validation.error,
    token: token.substring(0, 20) + "...",
  };
}

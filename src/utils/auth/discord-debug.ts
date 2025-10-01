/**
 * Discord Token Debugging Utility
 * Use this to diagnose Discord API authentication issues
 */

export interface DiscordTokenInfo {
  isValid: boolean;
  tokenType: "user" | "bot" | "unknown";
  error?: string;
  user?: any;
  scopes?: string[];
  expiresAt?: Date;
}

/**
 * Test a Discord token and provide detailed debugging information
 */
export async function debugDiscordToken(
  token: string
): Promise<DiscordTokenInfo> {
  console.log("🔍 Debugging Discord token...");
  console.log("Token preview:", token.substring(0, 20) + "...");

  // Test different API versions and formats
  const testCases = [
    {
      url: "https://discord.com/api/v10/users/@me",
      headers: { Authorization: `Bearer ${token}` },
      name: "v10 Bearer",
    },
    {
      url: "https://discord.com/api/v9/users/@me",
      headers: { Authorization: `Bearer ${token}` },
      name: "v9 Bearer",
    },
    {
      url: "https://discord.com/api/v10/users/@me",
      headers: { Authorization: `Bot ${token}` },
      name: "v10 Bot",
    },
  ];

  for (const testCase of testCases) {
    try {
      console.log(`\n🧪 Testing ${testCase.name}...`);

      const response = await fetch(testCase.url, {
        method: "GET",
        headers: testCase.headers,
      });

      console.log(`Status: ${response.status} ${response.statusText}`);

      if (response.ok) {
        const userData = await response.json();
        console.log("✅ Success! User data:", {
          id: userData.id,
          username: userData.username,
          discriminator: userData.discriminator,
        });

        return {
          isValid: true,
          tokenType: testCase.name.includes("Bot") ? "bot" : "user",
          user: userData,
        };
      } else {
        const errorText = await response.text();
        console.log(`❌ Failed: ${errorText}`);
      }
    } catch (error) {
      console.log(`💥 Network error:`, error);
    }
  }

  return {
    isValid: false,
    tokenType: "unknown",
    error: "All test cases failed",
  };
}

/**
 * Get token info from localStorage (for client-side debugging)
 */
export function getStoredTokenInfo(): any {
  if (typeof window === "undefined") return null;

  const account = localStorage.getItem("account");
  if (account) {
    try {
      const parsed = JSON.parse(account);
      console.log("📱 Stored account info:", {
        hasAccessToken: !!parsed.accessToken,
        tokenPreview: parsed.accessToken?.substring(0, 20) + "...",
        providerId: parsed.providerId,
        createdAt: parsed.createdAt,
      });
      return parsed;
    } catch (e) {
      console.log("❌ Failed to parse stored account:", e);
    }
  }

  return null;
}

/**
 * Test the current stored token
 */
export async function testStoredToken(): Promise<DiscordTokenInfo> {
  const accountInfo = getStoredTokenInfo();

  if (!accountInfo?.accessToken) {
    return {
      isValid: false,
      tokenType: "unknown",
      error: "No access token found in localStorage",
    };
  }

  return await debugDiscordToken(accountInfo.accessToken);
}

/**
 * Get Discord OAuth token info (detailed information about the token)
 */
export async function getDiscordTokenInfo(token: string): Promise<any> {
  try {
    const response = await fetch("https://discord.com/api/oauth2/@me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const tokenInfo = await response.json();
      console.log("🔑 Token info:", tokenInfo);
      return tokenInfo;
    } else {
      console.log(
        "❌ Failed to get token info:",
        response.status,
        response.statusText
      );
      return null;
    }
  } catch (error) {
    console.log("💥 Error getting token info:", error);
    return null;
  }
}

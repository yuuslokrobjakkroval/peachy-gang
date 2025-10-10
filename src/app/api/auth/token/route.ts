console.log("[/api/auth/token/route.ts] Server is loading this file. Auth import will be attempted next.");

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  extractDiscordTokenFromSession,
  normalizeDiscordToken,
  resolveDiscordUserId,
  type DiscordProviderToken,
} from "@/utils/auth/discord-session";

console.log("[/api/auth/token/route.ts] Auth imported successfully. Ready to handle requests.");

const DISCORD_PROVIDER_ID = "discord";

export async function GET(req: NextRequest) {
  console.log("[/api/auth/token] Received GET request.");

  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      console.warn("[/api/auth/token] No session found for this request. User is not authenticated.");
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    let discordToken: DiscordProviderToken | null = extractDiscordTokenFromSession(session);

    if (!discordToken) {
      console.info(
        "[/api/auth/token] Discord provider token not found in session. Attempting fallback via getAccessToken."
      );

      const userId = resolveDiscordUserId(session);
      if (userId) {
        try {
          const fallbackTokens = await auth.api.getAccessToken({
            headers: req.headers,
            body: {
              providerId: DISCORD_PROVIDER_ID,
              userId,
            },
          });

          discordToken = normalizeDiscordToken(fallbackTokens);
        } catch (fallbackError) {
          console.error(
            "[/api/auth/token] Fallback via auth.api.getAccessToken failed.",
            fallbackError
          );
        }
      } else {
        console.warn(
          "[/api/auth/token] Unable to resolve user id for fallback token retrieval."
        );
      }
    }

    if (!discordToken) {
      console.error("[/api/auth/token] Discord provider token not found after fallback attempts.");
      return NextResponse.json(
        { error: "Discord token not found in session." },
        { status: 404 }
      );
    }

    console.log("[/api/auth/token] Successfully extracted token. Sending response.", {
      hasRefreshToken: Boolean(discordToken.refreshToken),
      scopes: discordToken.scopes,
      expiresAt: discordToken.expiresAt,
    });

    return NextResponse.json(discordToken);
  } catch (error) {
    console.error("[/api/auth/token] An unexpected error occurred:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

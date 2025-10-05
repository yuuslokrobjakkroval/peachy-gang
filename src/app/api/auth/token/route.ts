console.log("[/api/auth/token/route.ts] Server is loading this file. Auth import will be attempted next.");

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  extractDiscordTokenFromSession,
  type DiscordProviderToken,
} from "@/utils/auth/discord-session";

console.log("[/api/auth/token/route.ts] Auth imported successfully. Ready to handle requests.");

const DISCORD_PROVIDER_ID = "discord";

function resolveUserId(session: unknown): string | null {
  if (!session || typeof session !== "object") {
    return null;
  }

  const candidates = [
    (session as any).user?.id,
    (session as any).session?.user?.id,
    (session as any).session?.userId,
    (session as any).session?.user?.userId,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.length > 0) {
      return candidate;
    }
  }

  return null;
}

function normalizeScopes(scopes: unknown): string[] {
  if (Array.isArray(scopes)) {
    return scopes.filter((scope): scope is string => typeof scope === "string" && scope.length > 0);
  }

  if (typeof scopes === "string" && scopes.length > 0) {
    return scopes.split(/[ ,]+/).filter(Boolean);
  }

  return [];
}

function normalizeTimestamp(value: unknown): string | undefined {
  if (!value) return undefined;

  if (typeof value === "number") {
    const millis = value > 1e12 ? value : value * 1000;
    return new Date(millis).toISOString();
  }

  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    if (!Number.isNaN(parsed)) {
      return normalizeTimestamp(parsed);
    }

    const date = new Date(value);
    if (!Number.isNaN(date.valueOf())) {
      return date.toISOString();
    }
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  return undefined;
}

function normalizeDiscordTokenFromResponse(tokens: unknown): DiscordProviderToken | null {
  if (!tokens || typeof tokens !== "object") {
    return null;
  }

  const accessToken =
    (tokens as any).accessToken ??
    (tokens as any).token ??
    (tokens as any).access_token;

  if (typeof accessToken !== "string" || accessToken.length === 0) {
    return null;
  }

  const refreshToken = (tokens as any).refreshToken ?? (tokens as any).refresh_token;

  return {
    accessToken,
    refreshToken:
      typeof refreshToken === "string" && refreshToken.length > 0 ? refreshToken : undefined,
    expiresAt: normalizeTimestamp(
      (tokens as any).accessTokenExpiresAt ??
        (tokens as any).expiresAt ??
        (tokens as any).expiry ??
        (tokens as any).expires_at
    ),
    scopes: normalizeScopes((tokens as any).scopes),
  };
}

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

    let discordToken = extractDiscordTokenFromSession(session);

    if (!discordToken) {
      console.info(
        "[/api/auth/token] Discord provider token not found in session. Attempting fallback via getAccessToken."
      );

      const userId = resolveUserId(session);
      if (userId) {
        try {
          const fallbackTokens = await auth.api.getAccessToken({
            headers: req.headers,
            body: {
              providerId: DISCORD_PROVIDER_ID,
              userId,
            },
          });

          discordToken = normalizeDiscordTokenFromResponse(fallbackTokens);
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

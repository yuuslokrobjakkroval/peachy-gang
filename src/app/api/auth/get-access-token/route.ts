import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  extractDiscordTokenFromSession,
  normalizeDiscordToken,
  resolveDiscordUserId,
  type DiscordProviderToken,
} from "@/utils/auth/discord-session";

const DEFAULT_PROVIDER_ID = "discord";

type TokenRequestOverrides = {
  providerId?: string | null;
  accountId?: string | null;
  userId?: string | null;
};

function parseQueryOverrides(url: string): TokenRequestOverrides {
  try {
    const { searchParams } = new URL(url);
    return {
      providerId: searchParams.get("providerId"),
      accountId: searchParams.get("accountId"),
      userId: searchParams.get("userId"),
    };
  } catch (error) {
    console.error("[/api/auth/get-access-token] Failed to parse request URL", error);
    return {};
  }
}

function resolveProviderId(overrides: TokenRequestOverrides): string {
  const providerId = overrides.providerId ?? DEFAULT_PROVIDER_ID;
  return typeof providerId === "string" && providerId.length > 0
    ? providerId.toLowerCase()
    : DEFAULT_PROVIDER_ID;
}

async function fetchProviderToken(
  req: Request,
  providerId: string,
  overrides: TokenRequestOverrides,
  resolvedUserId: string | null
): Promise<DiscordProviderToken | null> {
  try {
    const tokens = await auth.api.getAccessToken({
      headers: req.headers,
      body: {
        providerId,
        ...(overrides.accountId ? { accountId: overrides.accountId } : {}),
        ...(resolvedUserId ? { userId: resolvedUserId } : {}),
      },
    });

    return normalizeDiscordToken(tokens);
  } catch (error) {
    console.error(
      "[/api/auth/get-access-token] auth.api.getAccessToken failed",
      error
    );
    return null;
  }
}

async function handleRequest(
  req: Request,
  overrides: TokenRequestOverrides = {}
): Promise<NextResponse> {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) {
      return NextResponse.json({ error: "no session" }, { status: 401 });
    }

    const sessionToken = extractDiscordTokenFromSession(session);
    if (sessionToken) {
      return NextResponse.json(sessionToken);
    }

    const providerId = resolveProviderId(overrides);
    const resolvedUserId =
      overrides.userId && overrides.userId.length > 0
        ? overrides.userId
        : resolveDiscordUserId(session);

    if (providerId !== DEFAULT_PROVIDER_ID) {
      console.warn(
        "[/api/auth/get-access-token] Unsupported provider requested",
        providerId
      );
    }

    const providerToken = await fetchProviderToken(
      req,
      providerId,
      overrides,
      resolvedUserId ?? null
    );

    if (providerToken) {
      return NextResponse.json(providerToken);
    }

    return NextResponse.json({ error: "provider token not found" }, { status: 404 });
  } catch (error) {
    console.error("[/api/auth/get-access-token] Unexpected error", error);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const overrides = parseQueryOverrides(req.url);
  return handleRequest(req, overrides);
}

export async function POST(req: Request) {
  let overrides: TokenRequestOverrides = {};
  try {
    const body = await req.json();
    if (body && typeof body === "object") {
      overrides = {
        providerId: typeof body.providerId === "string" ? body.providerId : null,
        accountId: typeof body.accountId === "string" ? body.accountId : null,
        userId: typeof body.userId === "string" ? body.userId : null,
      };
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.warn(
        "[/api/auth/get-access-token] Failed to parse JSON body. Falling back to query params.",
        error
      );
      overrides = parseQueryOverrides(req.url);
    } else {
      console.error(
        "[/api/auth/get-access-token] Unexpected error parsing JSON body",
        error
      );
      return NextResponse.json({ error: "invalid request" }, { status: 400 });
    }
  }

  return handleRequest(req, overrides);
}

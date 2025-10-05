import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // The provider token is stored server-side. Let's find it.
    // Common locations are `session.provider` or `session.providerTokens`.
    const providerTokenData =
      (session as any).provider?.discord ??
      (session as any).providerTokens?.discord;

    if (!providerTokenData || !providerTokenData.access_token) {
      console.error("Discord provider token not found in session:", session);
      return NextResponse.json(
        { error: "Discord token not found in session." },
        { status: 404 }
      );
    }

    const response = {
      accessToken: providerTokenData.access_token,
      accessTokenExpiresAt: providerTokenData.expires_at
        ? new Date(providerTokenData.expires_at * 1000).toISOString()
        : undefined,
      scopes: providerTokenData.scope?.split(" ") ?? [],
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("[/api/auth/token] Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

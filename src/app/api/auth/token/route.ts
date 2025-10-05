import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  console.log("[/api/auth/token] Received request.");
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      console.error(
        "[/api/auth/token] Authentication failed: No session found."
      );
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Log the entire session object to see what we're getting on the server
    console.log(
      "[/api/auth/token] Full session object:",
      JSON.stringify(session, null, 2)
    );

    const providerTokenData =
      (session as any).provider?.discord ??
      (session as any).providerTokens?.discord;

    if (!providerTokenData || !providerTokenData.access_token) {
      console.error(
        "[/api/auth/token] Discord provider token not found in session."
      );
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

    console.log(
      "[/api/auth/token] Successfully found token. Sending response."
    );
    return NextResponse.json(response);
  } catch (error) {
    console.error("[/api/auth/token] An unexpected error occurred:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

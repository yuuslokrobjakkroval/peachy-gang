// This log is CRITICAL. If you see the 404 error on Vercel, check your deployment logs.
// If you DON'T see this message, it means the server crashed while trying to load this file.
// This is almost always caused by a missing environment variable that `../../../../lib/auth` depends on.
console.log(
  "✅ [/api/auth/token/route.ts] Server is loading this file. Auth import will be attempted next."
);

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// If the log above appeared but this one DOESN'T, it means the `import { auth }` line crashed the server.
console.log(
  "✅ [/api/auth/token/route.ts] Auth imported successfully. Ready to handle requests."
);

export async function GET(req: NextRequest) {
  console.log("➡️ [/api/auth/token] Received GET request.");

  try {
    // `auth.api.getSession` is the server-side method to get the full session.
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      console.warn(
        "⚠️ [/api/auth/token] No session found for this request. User is not authenticated."
      );
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    console.log(
      "✅ [/api/auth/token] Session found. Checking for provider token..."
    );

    // The full provider token is stored in the `providerTokens` object on the session.
    // Adjust the type assertion to inform TypeScript about the providerTokens property.
    const providerTokens =
      (session as any).providerTokens ??
      (session as any).session?.providerTokens;
    const discordToken = providerTokens?.discord;

    if (!discordToken?.access_token) {
      console.error(
        "❌ [/api/auth/token] Discord provider token not found in session!",
        {
          sessionExists: !!session,
          providerTokensExist: !!providerTokens,
          discordTokenExists: !!providerTokens?.discord,
        }
      );
      return NextResponse.json(
        { error: "Discord token not found in session." },
        { status: 404 }
      );
    }

    const response = {
      accessToken: discordToken.access_token,
      accessTokenExpiresAt: discordToken.expires_at
        ? new Date(discordToken.expires_at * 1000).toISOString()
        : undefined,
      scopes: discordToken.scope?.split(" ") ?? [],
    };

    console.log(
      "✅ [/api/auth/token] Successfully extracted token. Sending response."
    );
    return NextResponse.json(response);
  } catch (error) {
    console.error("❌ [/api/auth/token] An unexpected error occurred:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

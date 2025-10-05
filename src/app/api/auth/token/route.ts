// This log is CRITICAL. If you see the 404 error on Vercel, check your deployment logs.
// If you DON'T see this message, it means the server crashed while trying to load this file.
// This is almost always caused by a missing environment variable that `../../../../lib/auth` depends on.
console.log(
  "✅ [/api/auth/token/route.ts] Server is loading this file. Auth import will be attempted next."
);

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { extractDiscordTokenFromSession } from "@/utils/auth/discord-session";

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

    const discordToken = extractDiscordTokenFromSession(session);

    if (!discordToken) {
      console.error("❌ [/api/auth/token] Discord provider token not found in session!");
      return NextResponse.json(
        { error: "Discord token not found in session." },
        { status: 404 }
      );
    }

    console.log(
      "✅ [/api/auth/token] Successfully extracted token. Sending response.",
      {
        hasRefreshToken: Boolean(discordToken.refreshToken),
        scopes: discordToken.scopes,
        expiresAt: discordToken.expiresAt,
      }
    );
    return NextResponse.json(discordToken);
  } catch (error) {
    console.error("❌ [/api/auth/token] An unexpected error occurred:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

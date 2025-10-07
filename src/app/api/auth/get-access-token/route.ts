// src/app/api/session/get-access-token/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth"; // server better-auth instance

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session)
      return NextResponse.json({ error: "no session" }, { status: 401 });

    // Only access properties that exist on the session object
    const providerAccessToken = session.session?.token || null;
    const expiresAt = session.session?.expiresAt
      ? new Date(session.session.expiresAt).toISOString()
      : null;
    // No scopes property exists, so return empty array or string
    const scopes: string[] | string = "";

    return NextResponse.json({
      accessToken: providerAccessToken,
      accessTokenExpiresAt: expiresAt
        ? new Date(expiresAt).toISOString()
        : null,
      scopes: Array.isArray(scopes)
        ? scopes
        : typeof scopes === "string"
          ? scopes.split(/[ ,]+/)
          : [],
    });
  } catch (err) {
    console.error("get-access-token error:", err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  return GET(req);
}

// src/app/api/auth/get-access-token/route.ts
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

    if (!providerAccessToken) {
      return NextResponse.json(
        { error: "access token not found in session" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      accessToken: providerAccessToken,
      expiresAt: expiresAt,
    });
  } catch (err) {
    console.error("get-access-token error:", err);
    return NextResponse.json(
      { error: "failed to get access token" },
      { status: 500 }
    );
  }
}

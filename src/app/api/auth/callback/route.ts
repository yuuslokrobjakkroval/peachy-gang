import { NextRequest, NextResponse } from "next/server";
import {
  API_ENDPOINT,
  CLIENT_ID,
  CLIENT_SECRET,
  type AccessToken,
} from "@/utils/auth/server";
import { getAbsoluteUrl } from "@/utils/get-absolute-url";

const TokenCookie = "ts-token";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.redirect("/login?error=no_code");
    }

    // Exchange the code for an access token
    const tokenResponse = await fetch(`${API_ENDPOINT}/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: `${getAbsoluteUrl()}/api/auth/callback`,
      }),
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      console.error("Token exchange failed:", error);
      return NextResponse.redirect("/login?error=token_exchange");
    }

    const tokenData = (await tokenResponse.json()) as AccessToken;

    // Create a response with the redirect
    const response = NextResponse.redirect(
      `${getAbsoluteUrl()}/peachy/dashboard`
    );

    // Set the session cookie
    response.cookies.set(TokenCookie, JSON.stringify(tokenData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (error) {
    console.error("Auth callback error:", error);
    return NextResponse.redirect("/login?error=unknown");
  }
}

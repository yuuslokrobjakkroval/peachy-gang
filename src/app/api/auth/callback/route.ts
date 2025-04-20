import { NextRequest, NextResponse } from "next/server";
import { setCookie } from "cookies-next";
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
    const error = searchParams.get("error");

    if (error) {
      return NextResponse.redirect(`${getAbsoluteUrl()}/login`);
    }

    if (!code) {
      return NextResponse.redirect("/login?error=no_code");
    }

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

    const response = NextResponse.redirect(
      `${getAbsoluteUrl()}/dashboard`
    );

    setCookie(TokenCookie, JSON.stringify(tokenData), {
      req: request,
      res: response,
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Auth callback error:", error);
    return NextResponse.redirect(
      `${getAbsoluteUrl()}/login?error=server_error`
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { API_ENDPOINT, CLIENT_ID, CLIENT_SECRET } from "@/utils/auth/server";
import { getAbsoluteUrl } from "@/utils/get-absolute-url";

const TokenCookie = "ts-token";

async function revokeToken(token: string) {
  try {
    const response = await fetch(`${API_ENDPOINT}/oauth2/token/revoke`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        token: token,
      }),
    });

    if (!response.ok) {
      console.error("Failed to revoke token:", await response.text());
    }
  } catch (error) {
    console.error("Error revoking token:", error);
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get the current token from cookies
    const tokenCookie = request.cookies.get(TokenCookie);
    if (tokenCookie) {
      try {
        const tokenData = JSON.parse(tokenCookie.value);
        // Revoke the Discord token
        await revokeToken(tokenData.access_token);
      } catch (e) {
        console.error("Error parsing token data:", e);
      }
    }

    // Create response with redirect
    const response = NextResponse.redirect(`${getAbsoluteUrl()}/login`);
    
    // Delete the token cookie
    response.cookies.delete(TokenCookie);

    return response;
  } catch (error) {
    console.error("Signout error:", error);
    // Even if there's an error, try to clear cookies and redirect
    const response = NextResponse.redirect(`${getAbsoluteUrl()}/login`);
    response.cookies.delete(TokenCookie);
    return response;
  }
} 
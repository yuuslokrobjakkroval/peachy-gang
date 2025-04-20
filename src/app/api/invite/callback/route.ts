import { NextRequest, NextResponse } from "next/server";
import { getAbsoluteUrl } from "@/utils/get-absolute-url";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const error = searchParams.get("error");
    const state = searchParams.get("state");

    // If there's an error query parameter (unlikely for bot invite cancellations)
    if (error) {
      // Decode the state to get the original redirect URL, or fallback to a default
      const redirectUrl = state
        ? decodeURIComponent(state)
        : `${getAbsoluteUrl()}/guilds`;
      return NextResponse.redirect(`${redirectUrl}`);
    }

    // For bot invites, Discord doesn't return a code for token exchange
    // It simply redirects to the redirect_uri on success
    // Ensure state is present to redirect to the original URL
    if (!state) {
      return NextResponse.redirect(`${getAbsoluteUrl()}/guilds?error=no_state`);
    }

    // Decode the state to get the original redirect URL
    const redirectUrl = decodeURIComponent(state);

    // Redirect to the original URL with a success indicator
    return NextResponse.redirect(`${redirectUrl}`);
  } catch (error) {
    console.error("Invite callback error:", error);
    return NextResponse.redirect(
      `${getAbsoluteUrl()}/guilds?error=server_error`
    );
  }
}

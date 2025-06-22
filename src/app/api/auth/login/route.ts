import { NextResponse } from "next/server";
import { CLIENT_ID } from "@/utils/auth/server";
import { getAbsoluteUrl } from "@/utils/get-absolute-url";

export async function GET() {
  const url =
    "https://discord.com/api/oauth2/authorize?" +
    new URLSearchParams({
      client_id: CLIENT_ID,
      redirect_uri: `${getAbsoluteUrl()}/api/auth/callback`,
      response_type: "code",
      scope: "identify guilds",
    });

  return NextResponse.redirect(url);
}

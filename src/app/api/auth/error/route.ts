// File: app/api/auth/error/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");
  const locale = req.cookies.get("NEXT_LOCALE")?.value || "en";
  const redirectURL = new URL(`/${locale}/auth/error`, req.url);
  if (error) redirectURL.searchParams.set("error", error);
  if (errorDescription)
    redirectURL.searchParams.set("error_description", errorDescription);

  return NextResponse.redirect(redirectURL.toString(), 302);
}

// app/api/verify-turnstile/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = await req.json();

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: '0x4AAAAAAB1e78cwuKR0lZ2eCfx8T4Y4kX0',
        response: token,
      }),
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}

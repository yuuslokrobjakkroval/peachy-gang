import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const handler = toNextJsHandler(auth);

// Add CORS headers for production
const addCorsHeaders = (response: NextResponse) => {
  // Use custom domain if we're on Vercel or have production URLs set
  const origin =
    process.env.VERCEL_URL ||
    (process.env.APP_URL && !process.env.APP_URL.includes("localhost"))
      ? "https://peachyganggg.com"
      : process.env.APP_URL || "http://localhost:3000";

  response.headers.set("Access-Control-Allow-Origin", origin);
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );

  return response;
};

export async function GET(request: NextRequest) {
  try {
    const response = await handler.GET(request);
    return addCorsHeaders(response as NextResponse);
  } catch (error) {
    console.error("Auth GET error:", error);
    const errorResponse = NextResponse.json(
      { error: "Authentication error" },
      { status: 500 }
    );
    return addCorsHeaders(errorResponse);
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = await handler.POST(request);
    return addCorsHeaders(response as NextResponse);
  } catch (error) {
    console.error("Auth POST error:", error);
    const errorResponse = NextResponse.json(
      { error: "Authentication error" },
      { status: 500 }
    );
    return addCorsHeaders(errorResponse);
  }
}

export async function OPTIONS(request: NextRequest) {
  const response = new NextResponse(null, { status: 200 });
  return addCorsHeaders(response);
}

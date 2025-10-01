import { NextRequest, NextResponse } from "next/server";
import {
  cleanupExpiredVerifications,
  getVerificationStats,
} from "@/utils/auth/cleanup";

export async function POST(req: NextRequest) {
  try {
    // Optional: Add authentication/authorization here
    // const session = await auth.api.getSession({ headers: req.headers });
    // if (!session?.user) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const cleanedCount = await cleanupExpiredVerifications();
    const stats = await getVerificationStats();

    return NextResponse.json({
      success: true,
      cleanedCount,
      stats,
      message: `Cleaned up ${cleanedCount} expired verification tokens`,
    });
  } catch (error) {
    console.error("Cleanup API error:", error);
    return NextResponse.json(
      {
        error: "Failed to cleanup verification tokens",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const stats = await getVerificationStats();

    return NextResponse.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error("Stats API error:", error);
    return NextResponse.json(
      {
        error: "Failed to get verification stats",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

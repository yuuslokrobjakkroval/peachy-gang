"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ProductionDebug() {
  const [envInfo, setEnvInfo] = useState<any>({});

  useEffect(() => {
    // Get environment info that's safe to display
    setEnvInfo({
      nodeEnv: process.env.NODE_ENV,
      hasAuthUrl: !!process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
      hasApiEndpoint: !!process.env.NEXT_PUBLIC_API_ENDPOINT,
      currentUrl:
        typeof window !== "undefined" ? window.location.origin : "N/A",
      userAgent:
        typeof window !== "undefined"
          ? navigator.userAgent.substring(0, 50)
          : "N/A",
    });
  }, []);

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>🔍 Production Debug Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertDescription>
            <strong>Environment:</strong> {envInfo.nodeEnv || "Unknown"}
          </AlertDescription>
        </Alert>

        <Alert>
          <AlertDescription>
            <strong>Current URL:</strong> {envInfo.currentUrl}
          </AlertDescription>
        </Alert>

        <Alert variant={envInfo.hasAuthUrl ? "primary" : "destructive"}>
          <AlertDescription>
            <strong>Auth URL Configured:</strong>{" "}
            {envInfo.hasAuthUrl ? "✅ Yes" : "❌ No"}
          </AlertDescription>
        </Alert>

        <Alert variant={envInfo.hasApiEndpoint ? "primary" : "destructive"}>
          <AlertDescription>
            <strong>API Endpoint Configured:</strong>{" "}
            {envInfo.hasApiEndpoint ? "✅ Yes" : "❌ No"}
          </AlertDescription>
        </Alert>

        <details className="text-sm">
          <summary className="font-medium cursor-pointer">
            Raw Environment Info
          </summary>
          <pre className="p-2 mt-2 overflow-x-auto rounded bg-muted">
            {JSON.stringify(envInfo, null, 2)}
          </pre>
        </details>
      </CardContent>
    </Card>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  testStoredDiscordToken,
  getCurrentUser,
  getStoredDiscordToken,
} from "@/utils/discord/api";

export default function TokenTestComponent() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testToken = async () => {
    setLoading(true);
    setResult(null);

    try {
      const testResult = await testStoredDiscordToken();
      setResult(testResult);
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  };

  const manualTest = async () => {
    setLoading(true);

    try {
      // Get token manually
      const { token, error: tokenError } = getStoredDiscordToken();

      if (!token) {
        setResult({ success: false, error: tokenError });
        return;
      }

      const response = await fetch("https://discord.com/api/v10/users/@me", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setResult({
          success: true,
          user: userData,
          method: "Manual fetch",
          token: token.substring(0, 20) + "...",
        });
      } else {
        const errorText = await response.text();
        setResult({
          success: false,
          error: `HTTP ${response.status}: ${errorText}`,
          method: "Manual fetch",
        });
      }
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        method: "Manual fetch",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Discord Token Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={testToken} disabled={loading}>
              {loading ? "Testing..." : "Test Stored Token"}
            </Button>
            <Button onClick={manualTest} disabled={loading} variant="outline">
              Manual API Test
            </Button>
          </div>

          {result && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant={result.success ? "default" : "destructive"}>
                  {result.success ? "✅ Success" : "❌ Failed"}
                </Badge>
                {result.method && (
                  <Badge variant="outline">Method: {result.method}</Badge>
                )}
              </div>

              {result.error && (
                <Alert variant="destructive">
                  <AlertDescription>{result.error}</AlertDescription>
                </Alert>
              )}

              {result.user && (
                <Alert>
                  <AlertDescription>
                    Successfully authenticated as:{" "}
                    <strong>{result.user.username}</strong> (ID:{" "}
                    {result.user.id})
                  </AlertDescription>
                </Alert>
              )}

              {result.token && (
                <p className="text-sm text-muted-foreground">
                  Token preview: {result.token}
                </p>
              )}

              <details className="text-sm">
                <summary className="font-medium cursor-pointer">
                  Raw Result
                </summary>
                <pre className="p-2 mt-2 overflow-x-auto rounded bg-muted">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

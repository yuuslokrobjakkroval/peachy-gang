"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import {
  debugDiscordToken,
  testStoredToken,
  getStoredTokenInfo,
  getDiscordTokenInfo,
  type DiscordTokenInfo,
} from "@/utils/auth/discord-debug";

export default function DiscordTokenDebugPage() {
  const [tokenInfo, setTokenInfo] = useState<DiscordTokenInfo | null>(null);
  const [customToken, setCustomToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [storedAccount, setStoredAccount] = useState<any>(null);
  const [oauthInfo, setOauthInfo] = useState<any>(null);

  useEffect(() => {
    // Load stored account info on mount
    const account = getStoredTokenInfo();
    setStoredAccount(account);
  }, []);

  const testStored = async () => {
    setLoading(true);
    try {
      const result = await testStoredToken();
      setTokenInfo(result);

      if (result.isValid && storedAccount?.accessToken) {
        const oauth = await getDiscordTokenInfo(storedAccount.accessToken);
        setOauthInfo(oauth);
      }
    } catch (error) {
      console.error("Error testing stored token:", error);
    } finally {
      setLoading(false);
    }
  };

  const testCustom = async () => {
    if (!customToken.trim()) return;

    setLoading(true);
    try {
      const result = await debugDiscordToken(customToken.trim());
      setTokenInfo(result);

      if (result.isValid) {
        const oauth = await getDiscordTokenInfo(customToken.trim());
        setOauthInfo(oauth);
      }
    } catch (error) {
      console.error("Error testing custom token:", error);
    } finally {
      setLoading(false);
    }
  };

  const callDiscordAPI = async () => {
    const token = customToken.trim() || storedAccount?.accessToken;
    if (!token) return;

    try {
      const response = await fetch("https://discord.com/api/v10/users/@me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Direct API call result:", {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("User data:", userData);
      } else {
        const errorText = await response.text();
        console.log("Error response:", errorText);
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Discord Token Debug Tool</h1>

      {/* Stored Account Info */}
      <Card>
        <CardHeader>
          <CardTitle>Stored Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {storedAccount ? (
            <div className="space-y-2">
              <p>
                <strong>Provider ID:</strong>{" "}
                {storedAccount.providerId || "N/A"}
              </p>
              <p>
                <strong>Account ID:</strong> {storedAccount.accountId || "N/A"}
              </p>
              <p>
                <strong>Has Access Token:</strong>{" "}
                {storedAccount.accessToken ? "✅ Yes" : "❌ No"}
              </p>
              {storedAccount.accessToken && (
                <p>
                  <strong>Token Preview:</strong>{" "}
                  {storedAccount.accessToken.substring(0, 30)}...
                </p>
              )}
              <p>
                <strong>Created At:</strong> {storedAccount.createdAt || "N/A"}
              </p>
            </div>
          ) : (
            <p className="text-muted-foreground">No stored account found</p>
          )}

          <Button
            onClick={testStored}
            disabled={loading || !storedAccount?.accessToken}
          >
            {loading ? "Testing..." : "Test Stored Token"}
          </Button>
        </CardContent>
      </Card>

      {/* Custom Token Test */}
      <Card>
        <CardHeader>
          <CardTitle>Test Custom Token</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your Discord access token here..."
            value={customToken}
            onChange={(e) => setCustomToken(e.target.value)}
            rows={3}
          />
          <div className="flex gap-2">
            <Button
              onClick={testCustom}
              disabled={loading || !customToken.trim()}
            >
              {loading ? "Testing..." : "Test Custom Token"}
            </Button>
            <Button
              onClick={callDiscordAPI}
              variant="outline"
              disabled={!customToken.trim() && !storedAccount?.accessToken}
            >
              Direct API Call
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Test Results */}
      {tokenInfo && (
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant={tokenInfo.isValid ? "default" : "destructive"}>
                {tokenInfo.isValid ? "✅ Valid" : "❌ Invalid"}
              </Badge>
              <Badge variant="outline">Type: {tokenInfo.tokenType}</Badge>
            </div>

            {tokenInfo.error && (
              <Alert variant="destructive">
                <AlertDescription>{tokenInfo.error}</AlertDescription>
              </Alert>
            )}

            {tokenInfo.user && (
              <div className="space-y-2">
                <h4 className="font-semibold">User Information:</h4>
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                  {JSON.stringify(tokenInfo.user, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* OAuth Token Info */}
      {oauthInfo && (
        <Card>
          <CardHeader>
            <CardTitle>OAuth Token Information</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
              {JSON.stringify(oauthInfo, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}

      {/* Common Issues & Solutions */}
      <Card>
        <CardHeader>
          <CardTitle>Common Issues & Solutions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <strong>401 Unauthorized:</strong>
            <ul className="list-disc ml-5">
              <li>Token is expired or invalid</li>
              <li>Wrong token type (user vs bot token)</li>
              <li>Incorrect Authorization header format</li>
              <li>API version mismatch</li>
            </ul>
          </div>

          <div>
            <strong>Token Types:</strong>
            <ul className="list-disc ml-5">
              <li>
                <code>Bearer [token]</code> - For user OAuth tokens
              </li>
              <li>
                <code>Bot [token]</code> - For bot tokens
              </li>
            </ul>
          </div>

          <div>
            <strong>API Versions:</strong>
            <ul className="list-disc ml-5">
              <li>
                <code>v10</code> - Latest recommended version
              </li>
              <li>
                <code>v9</code> - Previous version (being phased out)
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

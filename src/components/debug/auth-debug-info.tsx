"use client";

import { useEffect, useState } from "react";

interface DebugInfo {
  baseURL: string;
  currentURL: string;
  isVercel: boolean;
  environment: string;
  domain: string;
  protocol: string;
  vercelUrl?: string;
  hasClientId: boolean;
  hasClientSecret: boolean;
}

export function AuthDebugInfo() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    const info: DebugInfo = {
      baseURL: window.location.origin,
      currentURL: window.location.href,
      isVercel: window.location.hostname.includes("vercel.app"),
      environment: process.env.NODE_ENV || "unknown",
      domain: window.location.hostname,
      protocol: window.location.protocol,
      vercelUrl: process.env.VERCEL_URL,
      hasClientId:
        !!process.env.BOT_CLIENT_ID || !!process.env.NEXT_PUBLIC_BOT_CLIENT_ID,
      hasClientSecret: !!process.env.BOT_CLIENT_SECRET,
    };
    setDebugInfo(info);

    // Log to console for debugging
    console.log("Auth Debug Info:", info);
  }, []);

  if (!debugInfo) return null;

  return (
    <div className="fixed z-50 bottom-4 right-4">
      <button
        onClick={() => setShowDebug(!showDebug)}
        className="px-3 py-1 text-xs text-white bg-gray-800 rounded hover:bg-gray-700"
      >
        Debug Auth
      </button>

      {showDebug && (
        <div className="absolute right-0 p-4 text-xs bg-white border border-gray-300 rounded-lg shadow-lg bottom-8 w-80">
          <h3 className="mb-2 font-bold">Auth Debug Information</h3>
          <div className="space-y-1">
            <div>
              <strong>Base URL:</strong> {debugInfo.baseURL}
            </div>
            <div>
              <strong>Current URL:</strong> {debugInfo.currentURL}
            </div>
            <div>
              <strong>Domain:</strong> {debugInfo.domain}
            </div>
            <div>
              <strong>Protocol:</strong> {debugInfo.protocol}
            </div>
            <div>
              <strong>Is Vercel:</strong> {debugInfo.isVercel ? "Yes" : "No"}
            </div>
            <div>
              <strong>Environment:</strong> {debugInfo.environment}
            </div>
            {debugInfo.vercelUrl && (
              <div>
                <strong>Vercel URL:</strong> {debugInfo.vercelUrl}
              </div>
            )}
            <div>
              <strong>Has Client ID:</strong>{" "}
              {debugInfo.hasClientId ? "Yes" : "No"}
            </div>
            <div>
              <strong>Has Client Secret:</strong>{" "}
              {debugInfo.hasClientSecret ? "Yes" : "No"}
            </div>
          </div>

          <div className="pt-2 mt-3 border-t">
            <h4 className="mb-1 font-semibold">
              Expected Discord Redirect URI:
            </h4>
            <code className="p-1 text-xs break-all bg-gray-100 rounded">
              {debugInfo.baseURL}/api/auth/callback/discord
            </code>
          </div>

          <div className="mt-2">
            <h4 className="mb-1 font-semibold">
              Environment Variables to Check:
            </h4>
            <ul className="text-xs">
              <li>• APP_URL</li>
              <li>• BETTER_AUTH_URL</li>
              <li>• BOT_CLIENT_ID</li>
              <li>• BOT_CLIENT_SECRET</li>
              <li>• DATABASE_URL</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

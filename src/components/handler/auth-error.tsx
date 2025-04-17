"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle } from "lucide-react";

interface AuthErrorProps {
  error: string;
  code?: string;
  redirectTo?: string;
}

export default function AuthError({
  error,
  code,
  redirectTo = "/login",
}: AuthErrorProps) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (typeof window !== "undefined") {
      const errorInfo = {
        message: error || "Unknown authentication error",
        code: code || "UNKNOWN",
        timestamp: new Date().toISOString(),
        url: window.location.href,
      };

      console.error("Authentication error:", errorInfo);
    }
  }, [error, code]);

  const handleRedirect = () => {
    if (redirectTo) {
      router.push(redirectTo);
    } else {
      router.push("/login");
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="p-6 rounded-lg max-w-md w-full text-center">
          <div className="flex justify-center">
            <Shield className="h-12 w-12 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold text-destructive mt-4">
            Verifying authentication...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="p-6 rounded-lg max-w-md w-full text-center space-y-4">
        <div className="flex justify-center">
          <div className="relative">
            <Shield className="h-12 w-12 text-destructive" />
            {/* <AlertTriangle className="h-6 w-6 text-destructive absolute -top-2 -right-2 animate-pulse" /> */}
          </div>
        </div>

        <h1 className="text-2xl font-bold text-destructive">
          Authentication Error
        </h1>

        <p className="text-muted-foreground">
          {error || "An authentication error occurred."}
        </p>

        {code && (
          <p className="text-sm text-muted-foreground">Error Code: {code}</p>
        )}

        <div className="flex justify-center gap-4">
          <Button variant="default" onClick={handleRedirect} className="mt-4">
            Back to Login
          </Button>

          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}

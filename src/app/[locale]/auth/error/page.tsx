"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function AuthErrorPage() {
  const router = useRouter();
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background text-foreground font-handwritten p-6 text-center">
      {/* Optional Ghibli texture overlay */}
      <div className="texture pointer-events-none absolute inset-0 z-0" />

      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center brightness-75"
        style={{ backgroundImage: 'url("/images/endlessgreentrails.PNG")' }}
      />

      <Card className="flex flex-col items-center justify-center rounded-lg shadow-lg transition-shadow z-10 mx-auto">
        <CardContent className="p-6">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-bold text-destructive mb-4 animate-twinkle">
              Authentication Failed
            </h1>

            <p className="text-muted-foreground text-base">
              Something went wrong during the login process.
            </p>

            <div className="flex flex-col items-center justify-center">
              <Button
                onClick={() => router.push("/login")}
                className="w-[168px] bg-primary text-primary-foreground font-ghibi-bold px-6 rounded-md hover:bg-primary/90 transition-transform transform hover:scale-105"
                aria-label="Go Back Home"
              >
                ⟵ Go Back Home
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function AuthErrorPage() {
  const router = useRouter();
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 text-center bg-background text-foreground font-handwritten">
      {/* Optional Ghibli texture overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none texture" />

      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-center bg-cover brightness-75"
        style={{ backgroundImage: 'url("/images/endlessgreentrails.PNG")' }}
      />

      <Card className="z-10 flex flex-col items-center justify-center mx-auto transition-shadow rounded-lg shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col gap-3">
            <h1 className="mb-4 text-4xl font-bold text-destructive animate-twinkle">
              Authentication Failed
            </h1>

            <p className="text-base text-muted-foreground">
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

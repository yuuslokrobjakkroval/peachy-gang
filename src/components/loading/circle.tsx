"use client";

import { Loader2 } from "lucide-react";

export function LoadingPage() {
  return (
    <div className="flex flex-col justify-center min-h-svh w-full items-center gap-2">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      <p className="text-sm text-muted-foreground">Loading</p>
    </div>
  );
}

"use client";

import { Loader } from "lucide-react";

export function LoadingPage() {
  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-2">
      <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
      <p className="text-sm text-muted-foreground">Loading</p>
    </div>
  );
}

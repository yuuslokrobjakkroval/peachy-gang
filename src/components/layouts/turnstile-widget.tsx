// components/layouts/turnstile-widget.tsx
"use client";

import { useEffect, useRef, useState } from "react";

export default function TurnstileWidget() {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (!widgetRef.current || typeof window === "undefined") return;

    // @ts-ignore
    if (window.turnstile) {
      // Render Turnstile in the div
      // @ts-ignore
      window.turnstile.render(widgetRef.current, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
        callback: (token: string) => setToken(token),
        theme: "auto",
      });
    }
  }, []);

  return <div ref={widgetRef} />;
}

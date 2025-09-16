"use client";
import { useEffect } from "react";

export default function TurnstileWidget() {
  useEffect(() => {
    (window as any).onSuccess = (token: string) => {
      console.log("Turnstile success, token:", token);
    };
  }, []);

  return (
    <div
      className="cf-turnstile"
      data-sitekey="0x4AAAAAAB1e77hsMiUJDHZb"
      data-theme="dark"
      data-size="normal"
      data-callback="onSuccess"
    ></div>
  );
}

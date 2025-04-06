/** @format */

import React from "react";
import { LoginForm } from "@/components/login-form";
import { DiscordLoginButton } from "@/components/discord-login-button";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome to Peachy</h1>
          <p className="text-muted-foreground mt-2">
            Choose your preferred login method
          </p>
        </div>
        <DiscordLoginButton />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

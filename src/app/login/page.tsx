"use client";

import * as React from "react";
import Image from "next/image";
import { DiscordLoginButton } from "@/components/form/discord-login-button";
import { useTheme } from "next-themes";
import ThemeChanger from "@/components/home/DarkSwitch";

export default function LoginPage() {
  const { setTheme } = useTheme();
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-between gap-2">
          <a href={"/"} className="flex items-center gap-2 font-medium">
            PEACHY
          </a>
          <ThemeChanger />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <DiscordLoginButton />
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          className="object-cover"
          src="/images/house.webp"
          alt="Image"
          fill
        />
      </div>
    </div>
  );
}

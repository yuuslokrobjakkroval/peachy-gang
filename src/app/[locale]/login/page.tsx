"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { DiscordLoginButton } from "@/components/form/discord-login-button";
import ThemeChanger from "@/components/theme.switch";

export default function LoginPage() {
  const t = useTranslations();

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
          <div className="w-full max-w-xs">
            <div className="flex flex-col gap-6">
              <DiscordLoginButton />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          className="object-cover"
          src="/images/house.webp"
          alt="banner"
          fill
        />
      </div>
    </div>
  );
}

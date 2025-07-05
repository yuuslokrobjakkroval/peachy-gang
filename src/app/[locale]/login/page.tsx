"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { DiscordLoginButton } from "@/components/form/discord-login-button";
import ThemeChanger from "@/components/theme.switch";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const t = useTranslations();

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-between gap-2">
          {/* Logo */}
          <Link href="/">
            <span className="relative inline-block">
              {/* Badge positioned top-right */}
              <Badge className="absolute -top-5 -right-8 text-xs px-2 z-10">
                BETA
              </Badge>
              <div
                className={cn(
                  "inline-flex items-center space-x-3 rounded-full px-4 transition-all ease-in hover:cursor-pointer"
                )}
              >
                {/* Logo with text */}
                <span className="flex items-center space-x-3 text-2xl font-ghibi-bold text-primary dark:text-foreground transition-transform hover:scale-105">
                  <Image
                    className="w-10 mb-1"
                    src="/images/favicon.ico"
                    alt="Peachy Logo"
                    width={48}
                    height={48}
                  />
                  <span>PEACHY</span>
                </span>
              </div>
            </span>
          </Link>
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

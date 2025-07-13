"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePeachy } from "@/contexts/peachy";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  avatarUrl,
  decorationUrl,
  getRandomEmoji,
  languages,
  toCapitalCase,
  UserInfo,
} from "@/utils/common";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ThemeChanger from "../theme.switch";
import LanguageChanger from "../language.switch";
import { useLocale, useTranslations } from "next-intl";
import { authClient } from "@/lib/auth-client";
import { AnimateIcon } from "../animate-ui/icons/icon";
import { LogOut, Settings, User } from "lucide-react";

const RTLNavbar = (props: {
  user: UserInfo;
  onOpenSidenav?: () => void;
  brandText?: string;
  secondary?: boolean | string;
}) => {
  const t = useTranslations("RTLNavbar");
  const locale = useLocale();
  const { user } = props;
  const { setUserInfoByDiscord, setAccount } = usePeachy();
  const router = useRouter();
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [language, setLanguage] = useState(locale);

  const handleProfileClick = () => {
    setUserInfoByDiscord(user);
    router.push("/profile");
  };

  const handleProfileSettingClick = () => {
    setUserInfoByDiscord(user);
    router.push("/profile/setting");
  };

  const handleLogoutClick = async () => {
    router.push("/login");
    setTimeout(() => {
      setAccount(null);
    }, 3000);
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setHasBeenOpened(true);
    } else {
      setHasBeenOpened(false);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <nav className="flex items-center justify-end gap-3 py-1 transition-all duration-300 rounded-xl font-handwritten">
      {/* Dark Mode Toggle */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <ThemeChanger />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t("themeTooltip")}</p>
        </TooltipContent>
      </Tooltip>

      {/* Language Toggle */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <LanguageChanger setLanguage={setLanguage} />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {t(
              languages.find((l) => l.code === language)?.nameKey ||
                "languageTooltip"
            )}
          </p>
        </TooltipContent>
      </Tooltip>

      {/* Profile Dropdown */}
      {user ? (
        <DropdownMenu onOpenChange={handleOpenChange}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="p-1 transition-colors duration-200 hover:bg-muted"
                >
                  {/* Decoration and Avatar Wrapper */}
                  <div className="relative flex items-center justify-center">
                    {/* Avatar */}
                    <div className="relative rounded-full">
                      <Avatar>
                        <AvatarImage
                          src={avatarUrl(user)}
                          alt={toCapitalCase(user.username)}
                        />
                        <AvatarFallback className="bg-muted text-foreground font-ghibi-bold">
                          {toCapitalCase(user.global_name?.[0])}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    {/* Avatar Decoration */}
                    {user.avatar_decoration_data?.asset && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                          src={decorationUrl(user.avatar_decoration_data)}
                          alt={t("avatarDecorationAlt")}
                          width={96}
                          height={96}
                          unoptimized
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("userTooltip")}</p>
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent
            className="w-[220px] rounded-xl bg-card p-2 border-border shadow-lg transition-all duration-200"
            align="end"
          >
            <DropdownMenuLabel className="px-2 py-1 text-sm text-foreground font-ghibi-bold">
              {t("greeting", { name: user.global_name })}{" "}
              {hasBeenOpened && getRandomEmoji()}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1 bg-border" />
            <DropdownMenuItem
              className="px-2 py-1 text-sm transition-colors duration-200 text-foreground hover:bg-muted"
              onClick={handleProfileClick}
            >
              <AnimateIcon animateOnHover>
                <User />
              </AnimateIcon>
              {t("profile")}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="px-2 py-1 text-sm transition-colors duration-200 text-foreground hover:bg-muted"
              onClick={handleProfileSettingClick}
            >
              <AnimateIcon animateOnHover>
                <Settings />
              </AnimateIcon>
              {t("settings")}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="px-2 py-1 text-sm transition-colors duration-200 text-destructive hover:bg-muted"
              onClick={handleLogoutClick}
            >
              <AnimateIcon animateOnHover>
                <LogOut />
              </AnimateIcon>
              {t("logOut")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <div></div>
          </TooltipTrigger>
          <TooltipContent>{t("logOut")}</TooltipContent>
        </Tooltip>
      )}
    </nav>
  );
};

export default RTLNavbar;

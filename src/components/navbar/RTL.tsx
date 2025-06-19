"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePeachy } from "@/contexts/peachy";
import { IoMdNotifications } from "react-icons/io";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AllNotification } from "./Notification/All";
import { UnreadNotification } from "./Notification/Unread";
import { ArchiveNotification } from "./Notification/Archive";
import ThemeChanger from "../theme.switch";
import LanguageChanger from "../language.switch";
import { useLocale, useTranslations } from "next-intl";

const RTLNavbar = (props: {
  user: UserInfo;
  onOpenSidenav?: () => void;
  brandText?: string;
  secondary?: boolean | string;
}) => {
  const t = useTranslations("RTLNavbar");
  const locale = useLocale();
  const { user } = props;
  const { setUserInfoByDiscord } = usePeachy();
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

  const handleLogoutClick = () => {
    router.push("/login");
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
    <nav className="flex justify-end items-center gap-3 rounded-xl py-1 transition-all duration-300 font-handwritten">
      {/* Dark Mode Toggle */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <ThemeChanger />
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-popover text-popover-foreground">
          <p className="text-sm">{t("themeTooltip")}</p>
        </TooltipContent>
      </Tooltip>

      {/* Language Toggle */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <LanguageChanger setLanguage={setLanguage} />
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-popover text-popover-foreground">
          <p className="text-sm">
            {t(
              languages.find((l) => l.code === language)?.nameKey ||
                "languageTooltip"
            )}
          </p>
        </TooltipContent>
      </Tooltip>

      {/* Notification Dropdown */}
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="hover:bg-muted transition-colors duration-200"
                aria-label={t("notificationsTooltip")}
              >
                <IoMdNotifications className="h-6 w-6 text-foreground animate-twinkle" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent className="bg-popover text-popover-foreground">
            <p className="text-sm">{t("notificationsTooltip")}</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent
          className="w-[340px] max-h-[80vh] overflow-auto rounded-2xl bg-card p-6 border-border shadow-lg transition-all duration-200"
          align="end"
        >
          <div className="flex items-center justify-between mb-4">
            <DropdownMenuLabel className="text-xl font-ghibi-bold text-foreground">
              {t("notifications")}
            </DropdownMenuLabel>
            <Button
              variant="ghost"
              className="text-sm text-primary hover:text-primary-foreground"
            >
              {t("markAllRead")}
            </Button>
          </div>
          <Tabs defaultValue="all" aria-label={t("notificationFilters")}>
            <TabsList className="grid w-full grid-cols-3 bg-muted/50 rounded-lg">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-background data-[state=active]:text-foreground rounded-md text-sm font-ghibi-bold"
              >
                {t("allTab")}
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className="data-[state=active]:bg-background data-[state=active]:text-foreground rounded-md py-2 text-sm font-ghibi-bold"
              >
                {t("unreadTab")}
              </TabsTrigger>
              <TabsTrigger
                value="archive"
                className="data-[state=active]:bg-background data-[state=active]:text-foreground rounded-md py-2 text-sm font-ghibi-bold"
              >
                {t("archiveTab")}
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="all"
              className="space-y-4 pt-2 max-h-[450px] overflow-auto rounded-2xl bg-card scrollbar-thin scrollbar-thumb-primary scrollbar-track-muted"
            >
              <AllNotification />
            </TabsContent>
            <TabsContent
              value="unread"
              className="space-y-4 pt-2 max-h-[450px] overflow-auto rounded-2xl bg-card scrollbar-thin scrollbar-thumb-primary scrollbar-track-muted"
            >
              <UnreadNotification />
            </TabsContent>
            <TabsContent
              value="archive"
              className="space-y-4 pt-2 max-h-[450px] overflow-auto rounded-2xl bg-card scrollbar-thin scrollbar-thumb-primary scrollbar-track-muted"
            >
              <ArchiveNotification />
            </TabsContent>
          </Tabs>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Profile Dropdown */}
      {user && (
        <DropdownMenu onOpenChange={handleOpenChange}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="p-1 hover:bg-muted transition-colors duration-200"
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
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent className="bg-popover text-popover-foreground">
              <p className="text-sm">{t("userTooltip")}</p>
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
              className="px-2 py-1 text-sm text-foreground hover:bg-muted transition-colors duration-200"
              onClick={handleProfileClick}
            >
              {t("profile")}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="px-2 py-1 text-sm text-foreground hover:bg-muted transition-colors duration-200"
              onClick={handleProfileSettingClick}
            >
              {t("settings")}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="px-2 py-1 text-sm text-destructive hover:bg-muted transition-colors duration-200"
              onClick={handleLogoutClick}
            >
              {t("logOut")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </nav>
  );
};

export default RTLNavbar;

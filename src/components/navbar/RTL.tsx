"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { usePeachy } from "@/context/peachy";
import { IoMdNotifications } from "react-icons/io";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
  avatarUrl,
  decorationUrl,
  getRandomElement,
  getRandomEmoji,
  toCapitalCase,
  UserInfo,
} from "@/utils/common";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import { getRandom } from "@tsparticles/engine";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const RTLNavbar = (props: {
  user: UserInfo;
  onOpenSidenav?: () => void;
  brandText?: string;
  secondary?: boolean | string;
}) => {
  const { user, onOpenSidenav, brandText } = props;
  const { setPeachyInfo } = usePeachy();

  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [hasBeenOpened, setHasBeenOpened] = useState(false);

  const handleProfileClick = () => {
    setPeachyInfo(user);
    router.push("/peachy/profile");
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setHasBeenOpened(true);
    } else {
      setHasBeenOpened(false);
    }
  };

  return (
    <nav className="flex items-center gap-3 rounded-xl p-2 transition-all duration-300 mt-3">
      <div className="flex items-center gap-4">
        {/* Brand Text */}
        {brandText && (
          <span className="hidden text-lg font-semibold text-primary xl:block transition-colors duration-300">
            {brandText}
          </span>
        )}
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Dark Mode Toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="hover:bg-muted transition-colors duration-200"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <RiSunFill className="h-6 w-6 text-foreground" />
              ) : (
                <RiMoonFill className="h-6 w-6 text-foreground" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="text-sm text-secondary">
            <p>Theme</p>
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
                  aria-label="Notifications"
                >
                  <IoMdNotifications className="h-6 w-6 text-foreground" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm text-secondary">Notifications</p>
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent
            className="w-[320px] rounded-xl bg-card p-4 border border-border shadow-lg transition-all duration-200"
            align="end"
          >
            <div className="flex items-center justify-between">
              <DropdownMenuLabel className="text-lg font-semibold text-primary">
                Notifications
              </DropdownMenuLabel>
              <Button
                variant="ghost"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Mark all read
              </Button>
            </div>
            <DropdownMenuSeparator className="my-2 bg-border" />
            <DropdownMenuItem className="flex w-full gap-3 p-2 transition-colors duration-200">
              {/* <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  New Update: Horizon UI
                </p>
                <p className="text-xs font-normal text-muted-foreground">
                  A new update is available!
                </p>
              </div> */}
            </DropdownMenuItem>
            <DropdownMenuItem className="flex w-full gap-3 p-2 transition-colors duration-200"></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile Dropdown */}
        <DropdownMenu onOpenChange={handleOpenChange}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="p-1 hover:bg-muted transition-colors duration-200 relative"
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
                        <AvatarFallback className="bg-muted text-foreground">
                          {toCapitalCase(user.username)}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    {/* Avatar Decoration */}
                    {user.avatar_decoration_data?.asset && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                          src={decorationUrl(user.avatar_decoration_data)}
                          alt="Avatar Decoration"
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
            <TooltipContent>
              <p className="text-sm text-secondary">User</p>
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent
            className="w-[220px] rounded-xl bg-card p-2 border border-border shadow-lg transition-all duration-200"
            align="end"
          >
            <DropdownMenuLabel className="px-2 py-1 text-sm text-foreground font-semibold">
              Hey, {user.global_name} {hasBeenOpened && getRandomEmoji()}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1 bg-border" />
            <DropdownMenuItem
              className="px-2 py-1 text-sm text-foreground hover:bg-muted transition-colors duration-200"
              onClick={handleProfileClick}
            >
              Profile
            </DropdownMenuItem>
            {/* <DropdownMenuItem className="px-2 py-1 text-sm text-foreground hover:bg-muted transition-colors duration-200">
              Newsletter Settings
            </DropdownMenuItem> */}
            <DropdownMenuItem
              className="px-2 py-1 text-sm text-destructive hover:bg-muted transition-colors duration-200"
              onClick={() => router.push("/login")}
            >
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default RTLNavbar;

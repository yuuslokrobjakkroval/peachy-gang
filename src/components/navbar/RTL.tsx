import React from "react";
import { BsArrowBarUp } from "react-icons/bs";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import {
  IoMdNotificationsOutline,
  IoMdInformationCircleOutline,
} from "react-icons/io";
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
import { avatarUrl, toCapitalCase, UserInfo } from "@/utils/common";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useRouter } from "next/navigation";

const RTLNavbar = (props: {
  user: UserInfo;
  onOpenSidenav?: () => void;
  brandText?: string;
  secondary?: boolean | string;
}) => {
  const { user, onOpenSidenav, brandText } = props;

  const { theme, setTheme } = useTheme();
  const router = useRouter();

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
        {/* Notification Dropdown */}
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative p-2 hover:bg-muted transition-colors duration-200"
              aria-label="Notifications"
            >
              <IoMdNotificationsOutline className="h-6 w-6 text-foreground" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
            </Button>
          </DropdownMenuTrigger>
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
            <DropdownMenuItem className="flex w-full gap-3 p-2 hover:bg-muted transition-colors duration-200">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <BsArrowBarUp className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  New Update: Horizon UI Dashboard PRO
                </p>
                <p className="text-xs text-muted-foreground">
                  A new update is available!
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex w-full gap-3 p-2 hover:bg-muted transition-colors duration-200">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <BsArrowBarUp className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  New Update: Horizon UI Dashboard PRO
                </p>
                <p className="text-xs text-muted-foreground">
                  A new update is available!
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}

        {/* Info Dropdown */}
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="p-2 hover:bg-muted transition-colors duration-200"
              aria-label="Information"
            >
              <IoMdInformationCircleOutline className="h-6 w-6 text-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[300px] rounded-xl bg-card p-4 border border-border shadow-lg transition-all duration-200"
            align="end"
          >
            <div className="mb-3 h-24 w-full rounded-lg bg-muted" />
            <Button
              asChild
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
            >
              <a
                href="https://horizon-ui.com/pro"
                target="_blank"
                rel="noopener noreferrer"
              >
                Buy Horizon UI PRO
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="mt-2 w-full text-foreground border-border hover:bg-muted transition-colors duration-200"
            >
              <a
                href="https://horizon-ui.com/docs-tailwind/docs/react/installation"
                target="_blank"
                rel="noopener noreferrer"
              >
                See Documentation
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="mt-2 w-full text-foreground hover:bg-muted transition-colors duration-200"
            >
              <a
                href="https://horizon-ui.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Try Horizon Free
              </a>
            </Button>
          </DropdownMenuContent>
        </DropdownMenu> */}

        {/* Dark Mode Toggle */}
        <Button
          variant="ghost"
          className="p-2 hover:bg-muted transition-colors duration-200"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? (
            <RiSunFill className="h-6 w-6 text-foreground" />
          ) : (
            <RiMoonFill className="h-6 w-6 text-foreground" />
          )}
        </Button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="p-1 hover:bg-muted transition-colors duration-200"
            >
              <Avatar>
                <AvatarImage
                  src={avatarUrl(user)}
                  alt={toCapitalCase(user.username)}
                />
                <AvatarFallback className="bg-muted text-foreground">
                  {toCapitalCase(user.username)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[220px] rounded-xl bg-card p-2 border border-border shadow-lg transition-all duration-200"
            align="end"
          >
            <DropdownMenuLabel className="px-2 py-1 text-sm text-foreground font-semibold">
              👋 Hey, {user.global_name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1 bg-border" />
            <DropdownMenuItem
              className="px-2 py-1 text-sm text-foreground hover:bg-muted transition-colors duration-200"
              onClick={() => router.push("/peachy/profile")}
            >
              Profile Settings
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

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
    <nav className="flex items-center gap-3 rounded-xl p-2 backdrop-blur-md dark:bg-navy-800/80">
      <div className="flex items-center gap-4">
        {/* Brand Text */}
        {brandText && (
          <span className="hidden text-lg font-semibold text-navy-700 dark:text-white xl:block">
            {brandText}
          </span>
        )}
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3">
        {/* Notification Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative p-2"
              aria-label="Notifications"
            >
              <IoMdNotificationsOutline className="h-6 w-6 text-gray-600 dark:text-white" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[320px] rounded-xl bg-white p-4 shadow-lg dark:bg-navy-700 dark:text-white"
            align="end"
          >
            <div className="flex items-center justify-between">
              <DropdownMenuLabel className="text-lg font-semibold text-navy-700 dark:text-white">
                Notifications
              </DropdownMenuLabel>
              <Button
                variant="ghost"
                className="text-sm text-navy-700 dark:text-white"
              >
                Mark all read
              </Button>
            </div>
            <DropdownMenuSeparator className="my-2 bg-gray-200 dark:bg-white/10" />
            <DropdownMenuItem className="flex w-full gap-3 p-2 hover:bg-gray-100 dark:hover:bg-navy-600">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 text-white">
                <BsArrowBarUp className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  New Update: Horizon UI Dashboard PRO
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  A new update is available!
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex w-full gap-3 p-2 hover:bg-gray-100 dark:hover:bg-navy-600">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 text-white">
                <BsArrowBarUp className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  New Update: Horizon UI Dashboard PRO
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  A new update is available!
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Info Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-2" aria-label="Information">
              <IoMdInformationCircleOutline className="h-6 w-6 text-gray-600 dark:text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[300px] rounded-xl bg-white p-4 shadow-lg dark:bg-navy-700 dark:text-white"
            align="end"
          >
            <div className="mb-3 h-24 w-full rounded-lg bg-gray-200 dark:bg-navy-600" />
            <Button
              asChild
              className="w-full bg-brand-500 text-white hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300"
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
              className="mt-2 w-full text-navy-700 dark:text-white dark:border-white/20 dark:hover:bg-navy-600"
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
              className="mt-2 w-full text-navy-700 dark:text-white dark:hover:bg-navy-600"
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
        </DropdownMenu>

        {/* Dark Mode Toggle */}
        <Button
          variant="ghost"
          className="p-2"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? (
            <RiSunFill className="h-6 w-6 text-gray-600 dark:text-white" />
          ) : (
            <RiMoonFill className="h-6 w-6 text-gray-600 dark:text-white" />
          )}
        </Button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-1">
              <Avatar>
                <AvatarImage
                  src={avatarUrl(user)}
                  alt={toCapitalCase(user.username)}
                />
                <AvatarFallback>{toCapitalCase(user.username)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[220px] rounded-xl bg-white p-2 shadow-lg dark:bg-navy-700 dark:text-white"
            align="end"
          >
            <DropdownMenuLabel className="px-2 py-1 text-sm font-semibold text-navy-700 dark:text-white">
              👋 Hey, {user.global_name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1 bg-gray-200 dark:bg-white/10" />
            <DropdownMenuItem
              className="px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-navy-600"
              onClick={() => router.push("/peachy/profile")}
            >
              Profile Settings
            </DropdownMenuItem>
            {/* <DropdownMenuItem className="px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-navy-600">
              Newsletter Settings
            </DropdownMenuItem> */}
            <DropdownMenuItem
              className="px-2 py-1 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-navy-600"
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

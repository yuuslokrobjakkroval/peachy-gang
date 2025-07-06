"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronsUpDown,
  HelpCircle,
  Settings,
  Donut,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import packageInfo from "../../../package.json";
import { avatarUrl, toUpperCase, UserInfo } from "@/utils/common";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const APP_NAME = packageInfo.name || "Peachy";
const APP_VERSION = packageInfo.version || "1.0";

export function NavFooter({ user }: { user: UserInfo }) {
  const router = useRouter();
  const { isMobile: sidebarIsMobile } = useSidebar();
  const [isMobile, setIsMobile] = useState(sidebarIsMobile);

  const navMain = [
    {
      title: "Sponsor",
      url: "/sponsor",
      icon: Donut,
    },
    {
      title: "Support",
      url: "/support",
      icon: HelpCircle,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "Logout",
      url: "/",
      icon: LogOut,
      separator: true,
    },
  ];

  // Handle navigation click
  const handleNavClick = (url: string) => {
    router.push(url);
  };

  // Sync isMobile with sidebarIsMobile
  useEffect(() => {
    setIsMobile(sidebarIsMobile);
  }, [sidebarIsMobile]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src="/images/favicon.ico" alt={"peachy"} />
                <AvatarFallback className="rounded-lg">
                  {user.global_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {toUpperCase(APP_NAME)}
                </span>
                <span className="truncate text-xs">{`${toUpperCase("version")} ${APP_VERSION}`}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-48 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              {navMain.map((item, index) => (
                <React.Fragment key={index}>
                  {item.separator && <DropdownMenuSeparator />}
                  <DropdownMenuItem onClick={() => handleNavClick(item.url)}>
                    <item.icon className="mr-2 h-4 w-4" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </DropdownMenuItem>
                </React.Fragment>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default NavFooter;

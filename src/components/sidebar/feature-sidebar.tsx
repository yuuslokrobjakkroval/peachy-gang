"use client";

import * as React from "react";
import {
  Cat,
  LayoutDashboard,
  FeatherIcon,
  Hand,
  Rocket,
  UserPlus,
  Waypoints,
  Gift,
  UserMinus,
  Bot,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/navbar/nav-main";
import { NavUser } from "@/components/navbar/nav-user";
import { Guild, UserInfo } from "@/utils/common";
import { NavGuild } from "../navbar/nav-guild";

const data = {
  navMain: [
    {
      title: "Peachy",
      url: "/peachy",
      icon: Cat,
      isActive: true,
      items: [],
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      items: [],
    },
    {
      title: "Feature",
      url: "#",
      icon: FeatherIcon,
      isActive: true,
      items: [
        {
          title: "Welcome Message",
          url: `/features/welcome-message`,
          icon: Hand,
        },
        {
          title: "Auto Response",
          url: `/features/auto-response`,
          icon: Bot,
        },
        {
          title: "Booster Message",
          url: "/features/booster-message",
          icon: Rocket,
        },
        {
          title: "Invite Message",
          url: "/features/invite-tracker-message",
          icon: UserPlus,
        },
        {
          title: "Join Roles",
          url: "/features/join-roles",
          icon: Waypoints,
        },
        {
          title: "Giveaway Schedule",
          url: "/features/giveaway-schedule",
          icon: Gift,
        },
        {
          title: "GoodBye Message",
          url: "/features/goodbye-message",
          icon: UserMinus,
        },
      ],
    },
  ],
};

export function FeatureSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavGuild />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

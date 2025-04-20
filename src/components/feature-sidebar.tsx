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
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { Guild, UserInfo } from "@/utils/common";
import { NavGuild } from "./nav-guild";

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
          url: "/peachy/feature/welcome",
          icon: Hand,
        },
        {
          title: "Booster Message",
          url: "/peachy/feature/booster",
          icon: Rocket,
        },
        {
          title: "Invite Message",
          url: "/peachy/feature/invite",
          icon: UserPlus,
        },
        {
          title: "Join Roles",
          url: "/peachy/feature/join-roles",
          icon: Waypoints,
        },
        {
          title: "Giveaway",
          url: "/peachy/feature/giveaway",
          icon: Gift,
        },
        {
          title: "Good Bye Message",
          url: "/peachy/feature/good-bye",
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

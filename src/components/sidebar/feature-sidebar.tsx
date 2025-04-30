"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { usePeachy } from "@/contexts/peachy";
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
import { NavGuild } from "../navbar/nav-guild";

export function FeatureSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { guilds } = usePeachy();

  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        isActive: true,
        items: [],
      },
      {
        title: "Peachy",
        url: "/peachy",
        icon: Cat,
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
            url: "/features/welcome-message",
            icon: Hand,
          },
          {
            title: "Auto Response",
            url: "/features/auto-response",
            icon: Bot,
          },
          {
            title: "Booster Message",
            url: "/features/booster-message",
            icon: Rocket,
          },
          {
            title: "Invite Tracker Message",
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

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavGuild guilds={guilds} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

"use client";

import * as React from "react";
import { usePeachy } from "@/contexts/peachy";
import {
  LayoutDashboard,
  Cat,
  Castle,
  Eye,
  Settings,
  Send,
  HandCoins,
  TreePalm,
  Hand,
  Rocket,
  UserPlus,
  Waypoints,
  ArrowUpNarrowWide,
  Gift,
  UserMinus,
  Bot,
  RollerCoaster,
  Dna,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  // SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/navbar/nav-main";
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
        title: "Guilds",
        url: "/guilds",
        icon: Castle,
        isActive: true,
        items: [],
      },
      {
        title: "General",
        url: "#",
        icon: Dna,
        isActive: true,
        items: [
          {
            title: "Overview",
            url: "/features/overview",
            icon: Eye,
          },
          {
            title: "Server Settings",
            url: "/features/server-settings",
            icon: Settings,
          },
          {
            title: "Embed Messages",
            url: "/features/embed-message",
            icon: Send,
          },
          {
            title: "Get Premium",
            url: "/features/premium",
            icon: HandCoins,
          },
        ],
      },
      {
        title: "Feature",
        url: "#",
        icon: TreePalm,
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
            title: "Reaction Roles",
            url: "/features/reaction-roles",
            icon: RollerCoaster,
          },
          {
            title: "Join Roles",
            url: "/features/join-roles",
            icon: Waypoints,
          },
          {
            title: "Leveling System",
            url: "/features/leveling-system",
            icon: ArrowUpNarrowWide,
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
      {/* <SidebarFooter>
        <NavUser />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}

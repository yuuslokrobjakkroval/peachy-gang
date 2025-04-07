"use client";

import * as React from "react";
import { FeatherIcon, LayoutDashboard } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/peachy/dashboard",
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
        },
        {
          title: "Booster Message",
          url: "/peachy/feature/booster",
        },
        {
          title: "Invite Message",
          url: "/peachy/feature/invite",
        },
        {
          title: "Join Roles",
          url: "/peachy/feature/join-roles",
        },
        {
          title: "Giveaway",
          url: "/peachy/feature/giveaway",
        },
        {
          title: "Good Bye Message",
          url: "/peachy/feature/good-bye",
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
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

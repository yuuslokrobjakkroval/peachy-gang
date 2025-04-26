"use client";

import * as React from "react";
import {
  Cat,
  LayoutDashboard,
  GraduationCap,
  Castle,
  Library,
} from "lucide-react";

import { NavMain } from "@/components/navbar/nav-main";
import { NavGuild } from "@/components/navbar/nav-guild";
import { NavUser } from "@/components/navbar/nav-user";
// import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { UserInfo, Guild } from "@/utils/common";

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
      title: "Rank",
      url: "/rank",
      icon: GraduationCap,
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
    // {
    //   title: "Documentation",
    //   url: "#",
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "#",
    //     },
    //     {
    //       title: "Get Started",
    //       url: "#",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#",
    //     },
    //     {
    //       title: "Changelog",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Commands",
    //   url: "#",
    //   icon: CommandIcon,
    //   isActive: true,
    //   items: [
    //     {
    //       title: "Moderator",
    //       url: "#",
    //     },
    //     {
    //       title: "Giveway",
    //       url: "#",
    //     },
    //     {
    //       title: "Utility",
    //       url: "#",
    //     },
    //   ],
    // },
    {
      title: "Information",
      url: "#",
      icon: Library,
      isActive: true,
      items: [
        {
          title: "About",
          url: "/peachy/about",
        },
        {
          title: "Contact",
          url: "/peachy/contact",
        },
        {
          title: "Privacy Policy",
          url: "/peachy/privacy",
        },
        {
          title: "Terms & Conditions",
          url: "/peachy/terms-conditions",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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

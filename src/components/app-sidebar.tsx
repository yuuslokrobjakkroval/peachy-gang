"use client";

import * as React from "react";
import {
  BookOpen,
  CommandIcon,
  FeatherIcon,
  LayoutDashboard,
  Library,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavGuild } from "@/components/nav-guild";
import { NavUser } from "@/components/nav-user";
// import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
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
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Commands",
      url: "#",
      icon: CommandIcon,
      isActive: true,
      items: [
        {
          title: "Moderator",
          url: "#",
        },
        {
          title: "Giveway",
          url: "#",
        },
        {
          title: "Utility",
          url: "#",
        },
      ],
    },
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

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
      title: "Feature",
      url: "#",
      icon: FeatherIcon,
      isActive: true,
      items: [
        {
          title: "Welcome Message",
          url: "#",
        },
        {
          title: "Booster Message",
          url: "#",
        },
        {
          title: "Invite Message",
          url: "#",
        },
        {
          title: "Join Roles",
          url: "#",
        },
        {
          title: "Giveaway",
          url: "#",
        },
        {
          title: "Good Bye Message",
          url: "#",
        },
      ],
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
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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

"use client";

import * as React from "react";
import { useFetchUserInfoQuery, useGetGuildsQuery } from "@/redux/api/discord";
import {
  Cat,
  LayoutDashboard,
  GraduationCap,
  Castle,
  Gamepad,
  BookHeart,
  Gift,
  Banknote,
  Store,
  User,
  Wallpaper,
  CreditCard,
  Coins,
  ClipboardList,
  Brain,
  Puzzle,
} from "lucide-react";

import { NavMain } from "@/components/navbar/nav-main";
import { NavGuild } from "@/components/navbar/nav-guild";
import { NavUser } from "@/components/navbar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePeachy } from "@/contexts/peachy";

const navigation = {
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
      title: "Rank",
      url: "/rank",
      icon: ClipboardList,
      isActive: true,
      items: [
        {
          title: "Credits",
          url: "/rank/credit",
          icon: Banknote,
        },
        {
          title: "Coins",
          url: "/rank/coin",
          icon: Coins,
        },
        {
          title: "Level",
          url: "/rank/level",
          icon: GraduationCap,
        },
      ],
    },
    {
      title: "Store",
      url: "/store",
      icon: Store,
      isActive: true,
      items: [
        {
          title: "Profile",
          url: "/store/profile",
          icon: User,
        },
        {
          title: "Background",
          url: "/store/background",
          icon: Wallpaper,
        },
      ],
    },
    {
      title: "Games",
      url: "/games",
      icon: Gamepad,
      isActive: true,
      items: [
        {
          title: "Memory",
          url: "/games/memory",
          icon: Brain,
        },
        {
          title: "2048",
          url: "/games/2048",
          icon: Puzzle,
        },
      ],
    },
    {
      title: "Other",
      url: "/other",
      icon: BookHeart,
      isActive: true,
      items: [
        {
          title: "Daily Rewards",
          url: "/other/daily",
          icon: Gift,
        },
        {
          title: "Credits Transactions",
          url: "/other/transactions",
          icon: Banknote,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { setUserInfoByDiscord, setGuilds } = usePeachy();
  const { data: user, isSuccess: userSuccess } = useFetchUserInfoQuery(null);
  const { data: guilds, isSuccess: guildSuccess } = useGetGuildsQuery(null);

  React.useEffect(() => {
    if (userSuccess && guildSuccess) {
      setUserInfoByDiscord(user);
      setGuilds(guilds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, guilds, setUserInfoByDiscord, setGuilds]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={navigation.navMain} />
        <NavGuild guilds={guilds} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

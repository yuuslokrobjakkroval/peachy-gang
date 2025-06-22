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
  Coins,
  ClipboardList,
  Brain,
  Puzzle,
  Code,
  Popcorn,
  Clapperboard,
  ShoppingBag,
  PanelTopOpen,
} from "lucide-react";

import { NavMain } from "@/components/navbar/nav-main";
import { NavGuild } from "@/components/navbar/nav-guild";
import { NavGlobalSetting } from "../navbar/nav-global-setting";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePeachy } from "@/contexts/peachy";
import { UserInfo } from "@/utils/common";

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
          title: "Discord Shop",
          url: "/store/discord",
          icon: ShoppingBag,
        },
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
          title: "Movies",
          url: "/other/movies",
          icon: Popcorn,
        },
        {
          title: "Tutorial",
          url: "/other/tutorials",
          icon: Clapperboard,
        },
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
        {
          title: "Http Status Code",
          url: "/other/http",
          icon: Code,
        },
      ],
    },
  ],
  navGlobalSetting: [
    {
      title: "User Managemnet",
      url: "/users",
      icon: User,
      isActive: true,
      items: [],
    },
    {
      title: "Role Management",
      url: "/roles",
      icon: PanelTopOpen,
      isActive: true,
      items: [],
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

  console.log(process.env.OWNER_IDS?.includes(user?.id));

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={navigation.navMain} />
        <NavGuild guilds={guilds} />
        {process.env.OWNER_IDS?.includes(user?.id) && (
          <NavGlobalSetting items={navigation.navGlobalSetting} />
        )}
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}

"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { usePeachy } from "@/contexts/peachy";
import { useFetchUserInfoQuery, useGetGuildsQuery } from "@/redux/api/discord";
import { authClient } from "@/lib/auth-client";
import { ownerId } from "@/utils/config";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/navbar/nav-main";
import { NavGuild } from "@/components/navbar/nav-guild";
import { NavGlobalSetting } from "@/components/navbar/nav-global-setting";
import { NavFooter } from "@/components/navbar/nav-footer";
import {
  Cat,
  LayoutDashboard,
  GraduationCap,
  Castle,
  Gamepad,
  BookHeart,
  Banknote,
  Store,
  User,
  Wallpaper,
  Coins,
  ClipboardList,
  Brain,
  Puzzle,
  Popcorn,
  Clapperboard,
  Settings2,
  Sticker,
  Squirrel,
  Sparkle,
  Smile,
  Terminal,
} from "lucide-react";

const navigation = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      items: [],
    },
    { title: "Peachy", url: "/peachy", icon: Cat, isActive: true, items: [] },
    {
      title: "Guilds",
      url: "/guilds",
      icon: Castle,
      isActive: true,
      items: [],
    },
    {
      title: "Emojis",
      url: "/emojigg",
      icon: Smile,
      isActive: true,
      items: [],
    },
    {
      title: "Rank",
      url: "/rank",
      icon: ClipboardList,
      isActive: true,
      items: [
        { title: "Credits", url: "/rank/credit", icon: Banknote },
        { title: "Coins", url: "/rank/coin", icon: Coins },
        { title: "Level", url: "/rank/level", icon: GraduationCap },
      ],
    },
    {
      title: "Store",
      url: "/store",
      icon: Store,
      isActive: true,
      items: [
        { title: "Profile", url: "/store/profile", icon: User },
        { title: "Decoration", url: "/store/decoration", icon: Squirrel },
        { title: "Effect", url: "/store/effect", icon: Sparkle },
        { title: "Background", url: "/store/background", icon: Wallpaper },
      ],
    },
    {
      title: "Games",
      url: "/games",
      icon: Gamepad,
      isActive: true,
      items: [
        { title: "Memory", url: "/games/memory", icon: Brain },
        { title: "2048", url: "/games/2048", icon: Puzzle },
      ],
    },
    {
      title: "Other",
      url: "/other",
      icon: BookHeart,
      isActive: true,
      items: [
        {
          title: "Emojis",
          url: "/other/emoji",
          icon: BookHeart,
          isActive: true,
          items: [],
        },
        {
          title: "Sticker",
          url: "/other/sticker",
          icon: Sticker,
          isActive: true,
          items: [],
        },
        { title: "Movies", url: "/other/movies", icon: Popcorn },
        { title: "Tutorial", url: "/other/tutorials", icon: Clapperboard },
      ],
    },
  ],
  navGlobalSetting: [
    {
      title: "General Settings",
      url: "/general",
      icon: Settings2,
      isActive: true,
      items: [
        {
          title: "Env Management",
          url: "/general/envs",
          icon: Terminal,
          isActive: true,
          items: [],
        },
      ],
    },
  ],
};

type StoredAccount = {
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpiresAt?: string;
  [key: string]: unknown;
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { setUserInfoByDiscord, setGuilds, account } = usePeachy();
  const { data: user, isSuccess: userSuccess } = useFetchUserInfoQuery(null);
  const { data: guilds, isSuccess: guildSuccess } = useGetGuildsQuery(null);
  const [isOwner, setIsOwner] = useState(false);
  const router = useRouter();
  console.log("account:", account);

  useEffect(() => {
    if (userSuccess && guildSuccess) {
      setUserInfoByDiscord(user);
      setGuilds(guilds);
    }
  }, [
    user,
    guilds,
    userSuccess,
    guildSuccess,
    setUserInfoByDiscord,
    setGuilds,
  ]);

  useEffect(() => {
    setIsOwner(ownerId?.includes(user?.id));
  }, [user]);

  const sidebarProps = useMemo(() => props, [props]);

  useEffect(() => {
    if (!account) {
      toast.error("Oopsie! You're not logged in yet.", {
        description: (
          <>
            <p>Hang tight!</p>
            <p>We'll take you to the login page in 3 seconds.</p>
          </>
        ),
      });

      setTimeout(() => router.push("/login"), 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <Sidebar collapsible="icon" {...sidebarProps}>
      <SidebarContent>
        <NavMain items={navigation.navMain} />
        <NavGuild guilds={guilds} />
        {isOwner && <NavGlobalSetting items={navigation.navGlobalSetting} />}
      </SidebarContent>
      <SidebarFooter>
        <NavFooter user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

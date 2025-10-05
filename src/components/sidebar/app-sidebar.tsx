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
  const router = useRouter();
  const { setUserInfoByDiscord, setGuilds, setAccount, account } = usePeachy();
  const { data: user, isSuccess: userSuccess } = useFetchUserInfoQuery(null);
  const { data: guilds, isSuccess: guildSuccess } = useGetGuildsQuery(null);
  const [isOwner, setIsOwner] = useState(false);

  const isBrowser = typeof window !== "undefined";

  // Restore cached account on first render
  useEffect(() => {
    if (!isBrowser || account) return;
    const storedAccount = localStorage.getItem("account");
    if (storedAccount) {
      try {
        const parsed = JSON.parse(storedAccount) as StoredAccount;
        setAccount(parsed);
      } catch {
        localStorage.removeItem("account");
      }
    }
  }, [account, isBrowser, setAccount]);

  const maybePersistAccount = useCallback(
    (value: StoredAccount | null) => {
      if (!isBrowser) return;
      if (value) {
        localStorage.setItem("account", JSON.stringify(value));
      } else {
        localStorage.removeItem("account");
      }
    },
    [isBrowser]
  );

  const hydrateAccount = useCallback(
    (payload: StoredAccount | null) => {
      setAccount(payload);
      maybePersistAccount(payload);
    },
    [maybePersistAccount, setAccount]
  );

  const fetchAccount = useCallback(async () => {
    try {
      const { data: accounts, error: accountsError } =
        await authClient.listAccounts();
      if (accountsError) throw accountsError;

      if (!accounts?.length) {
        toast.error("Oopsie! You're not logged in yet.", {
          description: (
            <>
              <p>Hang tight!</p>
              <p>We'll take you to the login page in 3 seconds.</p>
            </>
          ),
        });
        setTimeout(() => router.push("/login"), 3000);
        return;
      }

      const primaryAccount =
        accounts.find((entry) => entry.provider === "discord") ?? accounts[0];

      if (!primaryAccount.accountId) {
        throw new Error("Discord account is missing an accountId");
      }

      const fetchToken = async () =>
        authClient.getAccessToken({
          providerId: primaryAccount.provider,
          accountId: primaryAccount.accountId,
        });

      let { data: tokenData, error } = await fetchToken();

      if ((!tokenData || !tokenData.accessToken) && !error) {
        const refresh = await authClient.refreshToken({
          providerId: primaryAccount.provider,
          accountId: primaryAccount.accountId,
        });
        tokenData = refresh.data
          ? {
              accessToken: refresh.data.accessToken ?? undefined,
              accessTokenExpiresAt:
                refresh.data.accessTokenExpiresAt ?? undefined,
              scopes: refresh.data.scopes ?? [],
              idToken: refresh.data.idToken ?? undefined,
            }
          : tokenData;
        error = refresh.error ?? error;
      }

      if (!tokenData?.accessToken || error) {
        throw error ?? new Error("Unable to obtain a Discord access token");
      }

      hydrateAccount(tokenData as StoredAccount);
    } catch (err) {
      console.error("Error fetching account:", err);
      toast.error("We couldn't refresh your Discord session.", {
        description: "Please try signing in again.",
      });
      hydrateAccount(null);
    }
  }, [hydrateAccount, router]);

  useEffect(() => {
    if (!account) {
      void fetchAccount();
    }
  }, [account, fetchAccount]);

  useEffect(() => {
    if (!account) return;

    const maybeExpired = (() => {
      if (!account?.accessTokenExpiresAt) return false;
      const expiry = new Date(account.accessTokenExpiresAt).getTime();
      return Number.isFinite(expiry) && expiry <= Date.now() + 60_000;
    })();

    if (maybeExpired) {
      void fetchAccount();
    }
  }, [account, fetchAccount]);

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

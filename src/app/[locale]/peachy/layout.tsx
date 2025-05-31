"use client";

import React, { useEffect } from "react";
import { usePeachy } from "@/contexts/peachy";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useFetchUserInfoQuery, useGetGuildsQuery } from "@/redux/api/discord";
import RTLNavbar from "@/components/navbar/RTL";
import Loading from "@/components/loading/circle";

const toTitleCase = (str: string) =>
  str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );

export default function PeachyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentPath = pathname.split("/").filter(Boolean);
  const guildIdIndex = currentPath.indexOf("guilds") + 1;
  const guildId =
    guildIdIndex > 0 && guildIdIndex < currentPath.length
      ? currentPath[guildIdIndex]
      : undefined;

  const { setUserInfoByDiscord, setGuilds } = usePeachy();
  const {
    data: user,
    isLoading: userLoading,
    isSuccess: userSuccess,
    error: userError,
  } = useFetchUserInfoQuery(null);
  const {
    data: guilds,
    isLoading: guildLoading,
    isSuccess: guildSuccess,
    error: guildError,
  } = useGetGuildsQuery(null);

  useEffect(() => {
    if (userSuccess && guildSuccess) {
      setUserInfoByDiscord(user);
      setGuilds(guilds);
    }
  }, [user, guilds, setUserInfoByDiscord, setGuilds]);

  if (userLoading || guildLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[var(--peach-bg)]">
        <Loading />
      </div>
    );
  }

  if (userError || guildError) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[var(--peach-bg)] text-[var(--peach-foreground)]">
        Oops, something went wrong. Please try again!
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar className="bg-[var(--peach-sidebar-bg)] text-[var(--peach-foreground)] transition-all duration-300" />
      <SidebarInset className="transition-all duration-300">
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 mx-8">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="mt-3 -ml-1" />
          </div>
          <div className="ml-auto">
            <RTLNavbar user={user} />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 px-3 sm:px-6 pt-2">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

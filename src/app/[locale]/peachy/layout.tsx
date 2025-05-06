"use client";

import React, { useEffect, useMemo } from "react";
import { usePeachy } from "@/contexts/peachy";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ChevronRight } from "lucide-react";
import { useFetchUserInfoQuery, useGetGuildsQuery } from "@/redux/api/discord";
import { Guild } from "@/utils/common";
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

  const guild = guilds?.find((g: Guild) => g.id === guildId);

  const breadcrumbPath = useMemo(() => {
    return currentPath.map((segment, index) => {
      if (index === guildIdIndex && guild?.name) {
        return guild.name;
      }
      return segment;
    });
  }, [currentPath, guildIdIndex, guild]);

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
            <ChevronRight className="mt-3 h-4 w-4 text-[var(--peach-muted)]" />
            <Breadcrumb className="mt-3">
              <BreadcrumbList className="text-[var(--peach-text)] font-[var(--ghibli-font)]">
                {breadcrumbPath.map((segment, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem className="text-sm">
                      {index < breadcrumbPath.length - 1 ? (
                        <BreadcrumbLink
                          href={`/${breadcrumbPath.slice(0, index + 1).join("/")}`}
                          className="hover:text-[var(--peach-pink)] transition-colors"
                        >
                          {toTitleCase(segment)}
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage className="font-medium text-[var(--peach-foreground)]">
                          {toTitleCase(segment)}
                        </BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbPath.length - 1 && (
                      <BreadcrumbSeparator className="mx-1 text-[var(--peach-muted)]" />
                    )}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto">
            <RTLNavbar user={user} />
          </div>
        </header>
        <main
          className="flex flex-1 flex-col gap-4 px-3 sm:px-6 pt-2"
          style={{
            margin: 15,
            background: `url(/images/house.webp)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: "0.8rem",
          }}
        >
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

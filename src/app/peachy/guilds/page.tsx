"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useGetGuildQuery } from "@/redux/api/guild";
import { LoadingPage } from "@/components/loading/circle";
import { Guild, iconUrl, toCapitalCase } from "@/utils/common";
import { config, configPeach, configGoma } from "@/utils/config";
import { AppConfig } from "@/utils/types";
import BannerPage from "@/components/applications/banner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function GuildPage() {
  const pathname = usePathname();
  const { data: guilds, isLoading } = useGetGuildQuery(null);
  console.log(guilds);

  if (isLoading) return <LoadingPage />;

  return (
    <SidebarProvider>
      <SidebarInset>
        <div className="flex flex-col gap-4 py-4 md:gap-8 md:p-6">
          <div className="w-full">
            <div className="relative mt-6 mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm uppercase">
                <span className="bg-background px-3 text-muted-foreground">
                  <h4 className="text-2xl font-semibold tracking-tight text-primary"></h4>
                </span>
              </div>
            </div>
            <div className="w-ful mt-3 mb-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
              <div className="col-span-12 lg:!mb-0">
                <BannerPage item={config} />
              </div>

              {[configPeach, configGoma].map(
                (config: AppConfig, index: number) => (
                  <div key={index} className="col-span-6 lg:!mb-0">
                    <BannerPage item={config} />
                  </div>
                )
              )}
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm uppercase">
                <span className="bg-background px-3 text-muted-foreground">
                  <h4 className="text-2xl font-semibold tracking-tight text-primary">
                    GUILDS
                  </h4>
                </span>
              </div>
            </div>

            {guilds?.map((guild: Guild, index: number) => (
              <div key={index} className="flex gap-3">
                <Avatar className="mt-0.5 ml-1">
                  <AvatarImage
                    src={iconUrl(guild)}
                    alt={toCapitalCase(guild.name)}
                  />
                  <AvatarFallback className="bg-muted text-foreground">
                    {toCapitalCase(guild.name)}
                  </AvatarFallback>
                </Avatar>
                <h4 className="text-2xl font-semibold tracking-tight text-primary">
                  {toCapitalCase(guild.name)}
                  <span className="w-full border-t border-border" />
                </h4>
              </div>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

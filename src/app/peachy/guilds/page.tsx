"use client";

import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getOwnerGuild, Guild, iconUrl } from "@/utils/common";
import { config, configPeach, configGoma } from "@/utils/config";
import { AppConfig } from "@/utils/types";
import BannerPage from "@/components/applications/banner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Castle } from "lucide-react";
import { usePeachy } from "@/context/peachy";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

export default function GuildPage() {
  const { guilds } = usePeachy();
  const router = useRouter();

  return (
    <SidebarProvider>
      <SidebarInset>
        <div className="flex flex-col gap-4 py-4 md:gap-8 md:p-6">
          <div className="w-full">
            <div className="mb-6">
              <div className="flex items-center justify-center text-xs sm:text-sm uppercase">
                <Separator className="flex-1" />
                <span className="px-4 py-1 text-muted-foreground rounded-md">
                  <h4 className="flex text-2xl font-semibold tracking-tight text-primary gap-2">
                    <Bot className="mt-1" /> BOTS
                  </h4>
                </span>
                <Separator className="flex-1" />
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

            <div className="mb-6">
              <div className="flex items-center justify-center text-xs sm:text-sm uppercase">
                <Separator className="flex-1" />
                <span className="px-4 py-1 text-muted-foreground rounded-md">
                  <h4 className="flex text-2xl font-semibold tracking-tight text-primary gap-2">
                    <Castle className="mt-1" /> GUILDS
                  </h4>
                </span>
                <Separator className="flex-1" />
              </div>
            </div>

            <div className="grid grid-cols-1  md:grid-cols-3 gap-4 mt-3">
              {getOwnerGuild(guilds ?? [])?.map((guild: Guild) => (
                <Card
                  key={guild.id}
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground md:p-2 cursor-pointer hover:border-primary transition-all duration-300 overflow-hidden"
                  onClick={() => router.push(`/peachy/guilds/${guild.id}`)}
                >
                  <CardHeader className="p-4">
                    <CardTitle className="flex items-start gap-3">
                      <Avatar className="h-12 w-12 rounded-lg border-2 border-white dark:border-gray-600 shadow-sm">
                        <AvatarImage
                          src={iconUrl(guild)}
                          alt={guild.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="rounded-lg bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 text-sm font-semibold">
                          {guild.name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start">
                        <span className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
                          {guild.name}
                        </span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

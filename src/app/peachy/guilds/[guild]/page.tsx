"use client";

import { usePathname, useRouter } from "next/navigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useGetGuildQuery } from "@/redux/api/guild";
import { LoadingPage } from "@/components/loading/circle";
import { avatarUrl, getFeatures, iconUrl, toCapitalCase } from "@/utils/common";
import { CustomGuildInfo } from "@/utils/types";
import Features from "@/components/features";
import { Button } from "@/components/ui/button";
import { config, configPeach, configGoma } from "@/utils/config";
import React from "react";
import BannerPage from "@/components/applications/banner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function FeaturePage() {
  const pathname = usePathname();
  const currentPath = pathname.split("/").filter(Boolean);
  const guildIdIndex = currentPath.indexOf("guilds") + 1;
  const guildId =
    guildIdIndex > 0 && guildIdIndex < currentPath.length
      ? currentPath[guildIdIndex]
      : "";
  const { data: guild, isLoading, refetch } = useGetGuildQuery(guildId);
  console.log(guild);

  if (isLoading) return <LoadingPage />;

  return (
    <SidebarProvider>
      {/* <FeatureSidebar /> */}
      <SidebarInset>
        {!!guild ? (
          <GuildPanel guild={guildId} info={guild} refetch={refetch} />
        ) : (
          <NotJoined guild={guildId} />
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}

function GuildPanel({
  guild: id,
  info,
  refetch,
}: {
  guild: string;
  info: any;
  refetch: () => void;
}) {
  const features = getFeatures();
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-8 md:p-6">
      <div className="w-full">
        <div className="flex gap-3">
          <Avatar className="mt-0.5 ml-1">
            <AvatarImage src={iconUrl(info)} alt={toCapitalCase(info.name)} />
            <AvatarFallback className="bg-muted text-foreground">
              {toCapitalCase(info.name)}
            </AvatarFallback>
          </Avatar>
          <h4 className="text-2xl font-semibold tracking-tight text-primary">
            {toCapitalCase(info.name)}
            <span className="w-full border-t border-border" />
          </h4>
        </div>

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

          <div className="col-span-6 lg:!mb-0">
            <BannerPage item={configPeach} />
          </div>

          <div className="col-span-6 lg:!mb-0">
            <BannerPage item={configGoma} />
          </div>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs sm:text-sm uppercase">
            <span className="bg-background px-3 text-muted-foreground">
              <h4 className="text-2xl font-semibold tracking-tight text-primary">
                FEATURES
              </h4>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          {features.map((feature) => (
            <Features
              key={feature.id}
              guild={id}
              feature={feature}
              enabled={info.enabledFeatures.includes(feature.id)}
              refetch={refetch}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function NotJoined({ guild }: { guild: string }) {
  const router = useRouter();
  return (
    <div className="flex min-h-svh w-full items-center justify-center">
      <section className="rounded-2xl p-6 mb-8">
        <Button
          size="lg"
          onClick={() => router.push(`${config.inviteUrl}&guild_id=${guild}`)}
        >
          Invite Bot
        </Button>
      </section>
    </div>
  );
}

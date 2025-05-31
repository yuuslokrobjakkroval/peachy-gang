"use client";

import React, { useEffect, useState } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getOwnerGuild, Guild } from "@/utils/common";
import { CARD } from "@/utils/config";
import { AppConfig } from "@/utils/types";
import { Bot, Castle } from "lucide-react";
import { usePeachy } from "@/contexts/peachy";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { AppdGlowingEffect } from "@/components/app-glowing-effect";
import { GuildGlowingEffect } from "@/components/guild-glowing-effect";

export default function GuildPage() {
  const { guilds } = usePeachy();
  const [hydratedGuilds, setHydratedGuilds] = useState<Guild[]>([]);

  useEffect(() => {
    setHydratedGuilds(guilds ?? []);
  }, [guilds]);

  const botCard = CARD.map((config: AppConfig, index: number) => ({
    area: `area-${index + 1}`,
    icon: config.icon,
    title: config.name,
    description: config.description,
    url: config.url,
    banner: config.banner,
    inviteUrl: config.inviteUrl,
  }));

  const guildCard = getOwnerGuild(hydratedGuilds ?? []);

  return (
    <SidebarProvider>
      <SidebarInset>
        <div className="flex flex-col gap-4 py-4 md:gap-8 md:p-6">
          <div className="w-full">
            <div className="mb-6">
              <div className="flex justify-start text-xs sm:text-sm uppercase">
                <span className="text-muted-foreground rounded-md">
                  <h2 className="flex text-2xl font-semibold tracking-tight text-primary gap-2">
                    BOTS <Bot />
                  </h2>
                </span>
              </div>
              <Separator className="text-card-foreground" />
            </div>

            <div className="w-ful mt-3 mb-3 flex h-fit flex-col gap-2 lg:grid lg:grid-cols-12">
              <div className="col-span-12 lg:!mb-0">
                <AppdGlowingEffect items={botCard} />
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-start text-xs sm:text-sm uppercase">
                <span className="text-muted-foreground rounded-md">
                  <h2 className="flex text-2xl font-semibold tracking-tight text-primary gap-2">
                    GUILDS <Castle />
                  </h2>
                </span>
              </div>
              <Separator className="text-card-foreground" />
            </div>

            {hydratedGuilds?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
                <div className="col-span-12 lg:!mb-0">
                  <GuildGlowingEffect items={guildCard} />
                </div>
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getOwnerGuild, Guild, iconUrl } from "@/utils/common";
import { Castle } from "lucide-react";

export function NavGuild({ guilds }: { guilds: Guild[] }) {
  const router = useRouter();
  return (
    <SidebarGroup className="py-0">
      <SidebarGroupLabel>
        <Castle className="mr-1" /> GUILDS <Castle className="ml-1" />
      </SidebarGroupLabel>
      <SidebarMenu>
        {guilds?.length > 0 ? (
          getOwnerGuild(guilds)?.map((guild: any) => (
            <SidebarMenuItem key={guild.id} className="gap-3">
              <SidebarMenuButton
                tooltip={guild.name}
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground md:h-12 md:p-2 cursor-pointer"
                onClick={() => router.push(`/guilds/${guild.id}`)}
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={iconUrl(guild)} alt={guild.name} />
                  <AvatarFallback className="rounded-lg bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 text-sm font-semibold">
                    {guild?.name?.[0] ?? "G"}
                  </AvatarFallback>
                </Avatar>
                <span>{guild.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))
        ) : (
          <SidebarMenuItem className="gap-3">
            <SidebarMenuButton>
              <span className="text-gray-500 dark:text-gray-400 text-sm italic">
                No guilds found
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}

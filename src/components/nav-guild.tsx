"use client";

import { Search } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarInput,
} from "@/components/ui/sidebar";
import { Label } from "@/components/ui/label";
import { useGetGuildsQuery } from "@/redux/api/discord";
import { LoadingPage } from "./loading/circle";
import { getOwnerGuild, iconUrl } from "@/utils/common";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function NavGuild() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const { data: guilds, isLoading } = useGetGuildsQuery(null);

  const searchGuild = (servers: any) => {
    return getOwnerGuild(servers).filter((server: any) => {
      const normalizedName = server.name
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "");
      const normalizedSearch = search
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "");
      return normalizedName.toLowerCase().includes(normalizedSearch);
    });
  };

  if (isLoading || !guilds) return <LoadingPage />;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>🏠 GUILDS 🏠</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem className="m-1 gap-3">
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground md:h-8 md:p-0 "
          >
            <Label htmlFor="search" className="sr-only">
              Search
            </Label>
            <SidebarInput
              id="search"
              placeholder="Search the docs..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
          </SidebarMenuButton>
        </SidebarMenuItem>
        {searchGuild(guilds)?.length === 0 ? (
          <SidebarMenuItem className="gap-3">
            <SidebarMenuButton>
              <span className="text-gray-500 dark:text-gray-400 text-sm italic">
                No guilds found
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ) : (
          searchGuild(guilds)?.map((guild: any) => (
            <SidebarMenuItem key={guild.id} className="gap-3">
              <SidebarMenuButton
                tooltip={guild.name}
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground md:h-12 md:p-2 cursor-pointer"
                onClick={() => router.push(`/peachy/guilds/${guild.id}`)}
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={iconUrl(guild)} alt={guild.name} />
                  <AvatarFallback className="rounded-lg bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 text-sm font-semibold">
                    {guild.name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <span>{guild.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}

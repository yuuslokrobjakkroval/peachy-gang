"use client";

import { usePathname } from "next/navigation";
import { GuildSidebar } from "@/components/guild-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useGetGuildByIdQuery } from "@/redux/api/discord";
import { LoadingPage } from "@/components/loading-page";

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
  const { data: guild, isLoading } = useGetGuildByIdQuery(guildId);
  console.log(guild);

  if (isLoading) <LoadingPage />;
  return (
    <SidebarProvider>
      <GuildSidebar />
      <SidebarInset>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

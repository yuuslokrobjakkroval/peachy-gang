"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import { useFetchUserInfoQuery } from "@/redux/api/discord";
import { useGetGuildsQuery } from "@/redux/api/discord";
import { Guild, toUpperCase } from "@/utils/common";
import RTLNavbar from "@/components/navbar/RTL";
import Loading from "@/components/loading/circle";

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

  const { data: user, isLoading: userLoading } = useFetchUserInfoQuery(null);
  const { data: guilds, isLoading: guildLoading } = useGetGuildsQuery({});

  const guild = guilds?.find((g: Guild) => g.id === guildId);

  const breadcrumbPath = currentPath.map((segment, index) => {
    if (index === guildIdIndex && guild?.name) {
      return guild.name;
    }
    return segment;
  });

  if (userLoading || guildLoading) {
    return (
      <div className="w-full">
        <Loading />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 ml-8 mr-8">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList className="flex-wrap break-words sm:gap-2.5 flex items-center gap-1 text-sm text-foreground">
                {breadcrumbPath.map((segment, index) => (
                  <div key={index}>
                    <BreadcrumbItem>
                      {index < breadcrumbPath.length - 1 ? (
                        <BreadcrumbLink
                          href={`/${breadcrumbPath
                            .slice(0, index + 1)
                            .join("/")}`}
                          className="hover:text-primary transition-colors"
                        >
                          {toUpperCase(segment)}
                          <ChevronRight className="w-6 h-6 hover:text-primary inline-block" />
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage className="font-semibold text-foreground">
                          {toUpperCase(segment)}
                        </BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center">
            <RTLNavbar user={user} />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

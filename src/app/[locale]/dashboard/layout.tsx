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
        <header className="flex sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 px-4 sm:px-8 py-2 sm:h-16 shrink-0 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 mx-3">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-3 mt-3" />
            <Separator orientation="vertical" />
            <Breadcrumb>
              <BreadcrumbList className="flex flex-wrap items-center gap-x-2 gap-y-1 px-0 sm:px-4 w-full sm:w-auto mt-3">
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

          <div className="w-full sm:w-auto flex justify-end sm:justify-start">
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

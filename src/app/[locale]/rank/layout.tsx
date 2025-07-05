"use client";

import React from "react";
import { usePeachy } from "@/contexts/peachy";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

import RTLNavbar from "@/components/navbar/RTL";

export default function PeachyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userInfoByDiscord } = usePeachy();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 ml-8 mr-8">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-3 mt-3" />
            <Separator orientation="vertical" />
          </div>

          <div className="flex items-center">
            <RTLNavbar user={userInfoByDiscord} />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

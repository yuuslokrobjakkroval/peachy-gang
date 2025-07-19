"use client";

import React, { useEffect } from "react";
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
        <header className="flex sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 px-4 sm:px-8 py-2 sm:h-16 shrink-0 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 mx-3">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="mt-3 -ml-3" />
            <Separator orientation="vertical" />
          </div>

          <div className="flex justify-end w-full sm:w-auto sm:justify-start">
            <RTLNavbar user={userInfoByDiscord} />
          </div>
        </header>
        <main className="flex flex-col flex-1 gap-4 px-3 pt-2 sm:px-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

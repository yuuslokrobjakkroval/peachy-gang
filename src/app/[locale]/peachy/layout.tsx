"use client";

import React from "react";
import { usePeachy } from "@/contexts/peachy";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import RTLNavbar from "@/components/navbar/RTL";

export default function PeachyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userInfoByDiscord } = usePeachy();
  return (
    <SidebarProvider>
      <AppSidebar className="bg-[var(--peach-sidebar-bg)] text-[var(--peach-foreground)] transition-all duration-300" />
      <SidebarInset className="transition-all duration-300">
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 mx-8">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="mt-3 -ml-1" />
          </div>
          <div className="ml-auto">
            <RTLNavbar user={userInfoByDiscord} />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 px-3 sm:px-6 pt-2">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

"use client";

import React from "react";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useFetchUserInfoQuery } from "@/redux/api/discord";
import RTLNavbar from "@/components/navbar/RTL";
import Loading from "@/components/loading/circle";

export default function PeachyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, isLoading: userLoading } = useFetchUserInfoQuery(null);

  if (userLoading) {
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
          </div>

          <div className="w-full sm:w-auto flex justify-end sm:justify-start">
            <RTLNavbar user={user} />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 px-3 sm:px-6 pt-2">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

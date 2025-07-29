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
    <div className="w-full">
      <Loading />
    </div>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 ml-8 mr-8">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="mt-3 -ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
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

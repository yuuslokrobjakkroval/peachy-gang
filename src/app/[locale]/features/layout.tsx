"use client";

import React from "react";
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
import { usePathname } from "next/navigation";
import { usePeachy } from "@/contexts/peachy";
import { FeatureSidebar } from "@/components/sidebar/feature-sidebar";
import RTLNavbar from "@/components/navbar/RTL";
import { toUpperCase } from "@/utils/common";

import { useGetGuildInfoQuery } from "@/redux/api/guild";

export default function PeachyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentPath = pathname.split("/").filter(Boolean);
  const { userInfoByDiscord } = usePeachy();

  const breadcrumbPath = currentPath.map((segment, index) => {
    return segment;
  });

  return (
    <SidebarProvider>
      <FeatureSidebar />
      <SidebarInset>
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 ml-8 mr-8">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4 mr-2" />
          </div>

          <div className="flex items-center">
            <RTLNavbar user={userInfoByDiscord} />
          </div>
        </header>
        <main className="flex flex-col flex-1 gap-4 p-4 pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

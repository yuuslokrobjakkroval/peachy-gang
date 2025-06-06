"use client";

import React from "react";
import { useGetUsersQuery } from "@/redux/api/users";
import { usePeachy } from "@/contexts/peachy";
import { SectionCards } from "@/components/applications/dashboard/section-cards";
import { ChartAreaInteractive } from "@/components/applications/dashboard/chart-area-interactive";
import Loading from "@/components/loading/circle";

export default function DashboardPage() {
  const { userInfoByDiscord }: { userInfoByDiscord: any } = usePeachy();
  const getParams = () => {
    return {
      order: -1,
      orderBy: "coin",
    };
  };

  const {
    data: { items: users = [], meta } = { items: [], meta: {} },
    isLoading,
  } = useGetUsersQuery(getParams());

  if (isLoading) {
    return (
      <div className="w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-1 flex-col rounded-lg">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards users={users} meta={meta} />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive users={users} />
          </div>
        </div>
      </div>
    </div>
  );
}

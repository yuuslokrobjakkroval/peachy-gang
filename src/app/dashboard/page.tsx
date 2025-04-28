"use client";

import React from "react";
import { useGetUsersQuery } from "@/redux/api/users";
import { SectionCards } from "@/components/applications/dashboard/section-cards";
import { ChartAreaInteractive } from "@/components/applications/dashboard/chart-area-interactive";
import Loading from "@/components/loading/circle";

export default function DashboardPage() {
  const getParams = () => {
    return {
      // search: search || null,
      order: -1,
      orderBy: "coin",
      // page: page,
      // limit: rowsPerPage,
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
    <div
      className="w-full h-full flex flex-1 flex-col rounded-lg"
      style={{
        backgroundImage: "url('/images/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "multiply",
      }}
    >
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

"use client";

import React from "react";
import { useGetUsersQuery } from "@/redux/api/users";
import { SectionCards } from "@/components/section-cards";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { UsersTable } from "@/components/table";
import { LoadingPage } from "@/components/loading/circle";

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
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards users={users} meta={meta} />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive users={users} />
          </div>
          <UsersTable data={users} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

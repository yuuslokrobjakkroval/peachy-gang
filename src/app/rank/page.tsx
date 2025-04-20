"use client";

import React from "react";
import { useGetUsersQuery } from "@/redux/api/users";
import { LoadingPage } from "@/components/loading/circle";
import { RankTable } from "@/components/rank-table";

export default function RankPage() {
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
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex min-h-screen w-full flex-col items-center p-6 md:p-10">
          <div className="w-full">
            {/* Header Section */}
            <h1 className="text-3xl md:text-4xl font-bold text-primary text-center mb-6">
              LEADERBOARD
            </h1>
            <RankTable data={users} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}

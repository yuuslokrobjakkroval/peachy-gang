"use client";

import type React from "react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Loading from "@/components/loading/circle";
import { decorationUrl, toCapitalCase, toNumber } from "@/utils/common";
import {
  HextaTable,
  HextaTableColumn,
} from "@/components/ui/Animations/hexta/Table/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Image from "next/image";
import UserDiscordDailog from "@/components/contents/user-discord-dialog";
import { useGetTopLevelQuery } from "@/redux/api/users";

interface User {
  id: string;
  no: number;
  username: string;
  balance: Record<string, number>;
}

export default function RankPage() {
  const t = useTranslations();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const getParams = () => ({
    limit: 50,
  });

  const {
    data: { items: topLevelUsers = [], meta } = { items: [], meta: {} },
    isLoading,
  } = useGetTopLevelQuery(getParams());

  if (isLoading) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <Loading />
          <p className="mt-4 text-sm text-muted-foreground">
            {t("dashboard.loading")}
          </p>
        </div>
      </div>
    );
  }

  const columns: HextaTableColumn<User>[] = [
    {
      key: "rank",
      searchKey: "rank",
      header: t("rank.columns.rank"),
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-3">
          <div className="font-medium">{value}</div>
        </div>
      ),
    },
    {
      key: "discord",
      searchKey: "discord.displayName",
      header: t("rank.columns.user"),
      sortable: true,
      // filterable: true,
      render: (value) => (
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            {/* Avatar */}
            <div className="relative rounded-full">
              <Avatar
                className="w-8 h-8 cursor-pointer"
                aria-label={`Avatar for ${value.displayName}`}
                onClick={() => {
                  setSelectedUser(value);
                  setOpenDialog(true);
                }}
              >
                <AvatarImage
                  src={value.avatar}
                  alt={toCapitalCase(value.displayName)}
                />
                <AvatarFallback className="bg-muted text-foreground font-ghibi-bold">
                  {toCapitalCase(value.displayName?.[0])}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Avatar Decoration */}
            {value.avatar_decoration_data?.asset && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={decorationUrl(value.avatar_decoration_data)}
                  alt={t("avatarDecorationAlt")}
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>
            )}
          </div>
          <div>
            <div className="font-medium">{value.displayName}</div>
          </div>
        </div>
      ),
    },
    {
      key: `profile.level`,
      header: t(`rank.columns.levelChat`),
      sortable: true,
      align: "center",
      render: (value) => (
        <div className="flex items-center justify-center gap-1">
          <span className="font-medium">{toNumber(value) ?? 0}</span>
        </div>
      ),
    },
    {
      key: `profile.voiceLevel`,
      header: t(`rank.columns.levelVoice`),
      sortable: true,
      align: "center",
      render: (value) => (
        <div className="flex items-center justify-center gap-1">
          <span className="font-medium">{toNumber(value) ?? 0}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col flex-1">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col items-center w-full min-h-screen p-6 md:p-10">
          <div className="w-full">
            <div className="mb-6 text-center">
              <h1 className="mb-2 text-3xl font-bold md:text-4xl text-primary">
                {t("rank.title")}
              </h1>
              <p className="text-muted-foreground">{t("rank.description")}</p>
            </div>
            <HextaTable
              data={topLevelUsers}
              columns={columns}
              searchPlaceholder={t("rank.searchPlaceholder")}
              hoverable
              // searchable={false}
            />
          </div>
        </div>
      </div>

      {selectedUser && (
        <UserDiscordDailog
          user={selectedUser}
          open={openDialog}
          onCancel={() => {
            setOpenDialog(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}

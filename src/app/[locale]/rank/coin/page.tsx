"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useGetUsersQuery } from "@/redux/api/users";
import Loading from "@/components/loading/circle";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import {
  decorationUrl,
  expandableRankTabs,
  toCapitalCase,
  toNumber,
} from "@/utils/common";
import {
  HextaTable,
  HextaTableColumn,
} from "@/components/ui/Animations/hexta/Table/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type React from "react";

import Image from "next/image";
import UserDiscordDailog from "@/components/contents/user-discord-dialog";

type BalanceType =
  | "coin"
  | "bank"
  | "slots"
  | "sponsor"
  | "blackjack"
  | "coinflip"
  | "klaklouk";

interface User {
  id: string;
  no: number;
  username: string;
  balance: Record<BalanceType, number>;
}

export default function RankPage() {
  const t = useTranslations();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [balanceType, setBalanceType] = useState<BalanceType>("coin");
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const getParams = () => ({
    order: -1,
    orderBy: `balance.${balanceType}`,
  });

  const {
    data: { items: users = [], meta } = { items: [], meta: {} },
    isLoading,
    refetch,
  } = useGetUsersQuery(getParams());

  useEffect(() => {
    if (balanceType) {
      refetch();
    }
  }, [balanceType]);

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
      key: `balance.${balanceType}`,
      header: t(`rank.columns.${balanceType}`),
      sortable: true,
      align: "center",
      render: (value) => (
        <div className="flex items-center gap-1 justify-center">
          <span className="font-medium">{toNumber(value) ?? 0}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="mx-auto flex flex-col justify-start gap-4 p-6 md:p-10">
          <ExpandableTabs
            className="bg-card backdrop-blur-sm rounded-2xl shadow-md"
            tabs={expandableRankTabs}
            initialIndex={selectedIndex}
            onChange={(index: number) => {
              const tab = expandableRankTabs[index];
              if (tab?.title && tab.title !== "All") {
                const newBalance = tab.title.toLowerCase() as BalanceType;
                setSelectedIndex(index);
                setBalanceType(newBalance);
              }
            }}
          />
        </div>
        <div className="flex min-h-screen w-full flex-col items-center p-6 md:p-10">
          <div className="w-full">
            <div className="text-center mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {t("rank.title")}
              </h1>
              <p className="text-muted-foreground">{t("rank.description")}</p>
            </div>
            <HextaTable
              data={users}
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

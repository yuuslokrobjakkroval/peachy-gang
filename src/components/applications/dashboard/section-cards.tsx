"use client";

import { useTranslations } from "next-intl";
import {
  AwardIcon,
  TrendingUpIcon,
  UserIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CountUp from "@/components/ui/Animations/CountUp";

interface SectionCardsProps {
  users: any;
  meta: any;
}

export function SectionCards({ users, meta }: SectionCardsProps) {
  const t = useTranslations("dashboard");
  const usersArray = Array.isArray(users) ? users : [users];
  const totalCoin = usersArray.reduce(
    (sum, user) => sum + (user?.balance?.coin || 0),
    0
  );
  const totalCoinInBank = usersArray.reduce(
    (sum, user) => sum + (user?.balance?.bank || 0),
    0
  );
  const averageLevel =
    usersArray.reduce((sum, user) => sum + (user?.profile?.level || 0), 0) /
      usersArray.length || 0;
  const activeUsers = usersArray.filter((user) => {
    const lastLogin = new Date(user?.activity?.lastLogin);
    const now = new Date();
    const diffInDays =
      (now.getTime() - lastLogin.getTime()) / (1000 * 3600 * 24);
    return diffInDays <= 7;
  }).length;

  return (
    <div className="grid grid-cols-1 gap-4 px-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 lg:px-6">
      {/* Card 1: Total Users */}
      <Card className="@container/card min-w-[250px] bg-gradient-to-t from-primary/5 to-card dark:bg-card">
        <CardHeader className="relative">
          <CardDescription className="flex items-center gap-2 text-sm">
            <UserIcon className="h-4 w-4 text-muted-foreground" />
            {t("total_users")}
          </CardDescription>
          <CardTitle className="text-2xl font-bold tabular-nums text-primary @[250px]/card:text-3xl">
            <CountUp
              from={0}
              to={meta?.itemCount ?? usersArray?.length ?? 0}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text"
            />
          </CardTitle>
          <div className="absolute right-3 top-3">
            <Badge
              variant="secondary"
              className="flex gap-1 rounded-full bg-green-100 px-2 py-1 text-xs text-green-800 dark:bg-green-900 dark:text-green-200"
            >
              <TrendingUpIcon className="h-3 w-3" />
              {t("growth_percentage", {
                percentage: usersArray.length > 1 ? 5 : 0,
              })}
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-xs">
          <div className="flex gap-2 font-medium text-green-600 dark:text-green-400">
            {t("active_this_week", { count: activeUsers })}
          </div>
          <div className="text-muted-foreground">
            {t("based_on_last_login")}
          </div>
        </CardFooter>
      </Card>

      {/* Card 2: Total Coin */}
      <Card className="@container/card min-w-[250px] bg-gradient-to-t from-primary/5 to-card dark:bg-card">
        <CardHeader className="relative">
          <CardDescription className="flex items-center gap-2 text-sm">
            <svg
              className="h-4 w-4 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {t("total_coin")}
          </CardDescription>
          <CardTitle className="text-2xl font-bold tabular-nums text-yellow-600 dark:text-yellow-400 @[250px]/card:text-3xl">
            <CountUp
              from={0}
              to={totalCoin ?? 0}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text"
            />
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-xs">
          <div className="flex gap-2 font-medium text-yellow-600 dark:text-yellow-400">
            {t("across_wallets", { count: usersArray.length })}
          </div>
          <div className="text-muted-foreground">{t("sum_of_balances")}</div>
        </CardFooter>
      </Card>

      {/* Card 3: Bank Reserves */}
      <Card className="@container/card min-w-[250px] bg-gradient-to-t from-primary/5 to-card dark:bg-card">
        <CardHeader className="relative">
          <CardDescription className="flex items-center gap-2 text-sm">
            <svg
              className="h-4 w-4 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
              />
            </svg>
            {t("bank_reserves")}
          </CardDescription>
          <CardTitle className="text-2xl font-bold tabular-nums text-blue-600 dark:text-blue-400 @[250px]/card:text-3xl">
            <CountUp
              from={0}
              to={totalCoinInBank ?? 0}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text"
            />
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-xs">
          <div className="flex gap-2 font-medium text-blue-600 dark:text-blue-400">
            {t("stored_securely")}
          </div>
          <div className="text-muted-foreground">{t("total_banked_coins")}</div>
        </CardFooter>
      </Card>

      {/* Card 4: Average Level & Engagement */}
      <Card className="@container/card min-w-[250px] bg-gradient-to-t from-primary/5 to-card dark:bg-card">
        <CardHeader className="relative">
          <CardDescription className="flex items-center gap-2 text-sm">
            <AwardIcon className="h-4 w-4 text-muted-foreground" />
            {t("user_engagement")}
          </CardDescription>
          <CardTitle className="text-2xl font-bold tabular-nums text-purple-600 dark:text-purple-400 @[250px]/card:text-3xl">
            <CountUp
              from={0}
              to={averageLevel ?? 1}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text"
            />
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-xs">
          <div className="flex gap-2 font-medium text-purple-600 dark:text-purple-400">
            {t("average_level")}
          </div>
          <div className="text-muted-foreground">{t("based_on_xp")}</div>
        </CardFooter>
      </Card>
    </div>
  );
}

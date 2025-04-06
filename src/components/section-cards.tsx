import {
  AwardIcon,
  TrendingDownIcon,
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

export function SectionCards({ users, meta }: { users: any; meta: any }) {
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
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      {/* Card 1: Total Users */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription className="flex items-center gap-2">
            <UserIcon className="size-4 text-muted-foreground" />
            Total Users
          </CardDescription>
          <CardTitle className="@[250px]/card:text-4xl text-3xl font-bold tabular-nums text-primary">
            {(meta?.itemCount ?? usersArray.length)?.toLocaleString()}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge
              variant="secondary"
              className="flex gap-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            >
              <TrendingUpIcon className="size-3" />+
              {usersArray.length > 1 ? "5" : "0"}%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="flex gap-2 font-medium text-green-600 dark:text-green-400">
            {activeUsers} active this week
          </div>
          <div className="text-muted-foreground">
            Based on last login activity
          </div>
        </CardFooter>
      </Card>

      {/* Card 2: Total Coin */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription className="flex items-center gap-2">
            <svg
              className="size-4 text-muted-foreground"
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
            Total Coin
          </CardDescription>
          <CardTitle className="@[250px]/card:text-4xl text-3xl font-bold tabular-nums text-yellow-600 dark:text-yellow-400">
            {totalCoin.toLocaleString()}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge
              variant="secondary"
              className="flex gap-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
            >
              <TrendingUpIcon className="size-3" />
              +12.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="flex gap-2 font-medium text-yellow-600 dark:text-yellow-400">
            Across {usersArray.length} wallets
          </div>
          <div className="text-muted-foreground">Sum of all user balances</div>
        </CardFooter>
      </Card>

      {/* Card 3: Bank Reserves */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription className="flex items-center gap-2">
            <svg
              className="size-4 text-muted-foreground"
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
            Bank Reserves
          </CardDescription>
          <CardTitle className="@[250px]/card:text-4xl text-3xl font-bold tabular-nums text-blue-600 dark:text-blue-400">
            {totalCoinInBank.toLocaleString()}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge
              variant="secondary"
              className="flex gap-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              <TrendingUpIcon className="size-3" />
              +8.2%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="flex gap-2 font-medium text-blue-600 dark:text-blue-400">
            Stored securely
          </div>
          <div className="text-muted-foreground">Total banked coins</div>
        </CardFooter>
      </Card>

      {/* Card 4: Average Level & Engagement */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription className="flex items-center gap-2">
            <AwardIcon className="size-4 text-muted-foreground" />
            User Engagement
          </CardDescription>
          <CardTitle className="@[250px]/card:text-4xl text-3xl font-bold tabular-nums text-purple-600 dark:text-purple-400">
            {averageLevel.toFixed(1)}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge
              variant="secondary"
              className="flex gap-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
            >
              <TrendingUpIcon className="size-3" />
              +15%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="flex gap-2 font-medium text-purple-600 dark:text-purple-400">
            Average Level
          </div>
          <div className="text-muted-foreground">Based on XP and activity</div>
        </CardFooter>
      </Card>
    </div>
  );
}

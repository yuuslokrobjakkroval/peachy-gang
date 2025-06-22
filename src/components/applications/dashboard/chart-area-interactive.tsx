"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Fallback data if no valid user data is provided
const fallbackChartData = [
  {
    date: "2025-04-05",
    coin: 0,
    bank: 0,
    slots: 0,
    blackjack: 0,
    coinflip: 0,
    klaklouk: 0,
    sponsor: 0,
  },
];

// Function to generate chart data from user data
const generateChartData = (users: any) => {
  // Check if users is valid
  if (!users || (Array.isArray(users) && users.length === 0)) {
    console.warn("No valid user data provided, using fallback data.");
    return fallbackChartData;
  }

  const usersArray = Array.isArray(users) ? users : [users];

  // Filter users with required fields
  const validUsers = usersArray.filter(
    (user) => user?.createdAt && user?.updatedAt && user?.balance,
  );

  if (validUsers.length === 0) {
    console.warn("No users have required fields, using fallback data.");
    return fallbackChartData;
  }

  // Aggregate balances
  const totalBalance = validUsers.reduce(
    (acc, user) => ({
      coin: acc.coin + (user.balance.coin || 0),
      bank: acc.bank + (user.balance.bank || 0),
      slots: acc.slots + (user.balance.slots || 0),
      blackjack: acc.blackjack + (user.balance.blackjack || 0),
      coinflip: acc.coinflip + (user.balance.coinflip || 0),
      klaklouk: acc.klaklouk + (user.balance.klaklouk || 0),
      sponsor: acc.sponsor + (user.balance.sponsor || 0),
    }),
    {
      coin: 0,
      bank: 0,
      slots: 0,
      blackjack: 0,
      coinflip: 0,
      klaklouk: 0,
      sponsor: 0,
    },
  );

  // Find earliest createdAt and latest updatedAt
  const startDate = new Date(
    Math.min(...validUsers.map((user) => new Date(user.createdAt).getTime())),
  );
  const endDate = new Date(
    Math.max(...validUsers.map((user) => new Date(user.updatedAt).getTime())),
  );
  const daysDiff =
    Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) ||
    1;

  // Simulate daily accumulation for each balance type
  const chartData = [];
  const balanceTypes = [
    "coin",
    "bank",
    "slots",
    "blackjack",
    "coinflip",
    "klaklouk",
    "sponsor",
  ];

  for (let i = 0; i <= daysDiff; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const formattedDate = date.toISOString().split("T")[0];
    const dailyData: any = { date: formattedDate };

    balanceTypes.forEach((type) => {
      const total = totalBalance[type as keyof typeof totalBalance];
      const dailyIncrement = total / daysDiff;
      dailyData[type] = Math.floor(dailyIncrement * i);
    });

    chartData.push(dailyData);
  }

  return chartData;
};

const chartConfig = {
  coin: {
    label: "Coin", // Will be translated via t()
    color: "#ff6384", // Vibrant red-pink
  },
  bank: {
    label: "Bank", // Will be translated via t()
    color: "#36a2eb", // Bright blue
  },
  slots: {
    label: "Slots", // Will be translated via t()
    color: "#ffce56", // Warm yellow
  },
  blackjack: {
    label: "Blackjack", // Will be translated via t()
    color: "#4bc0c0", // Teal
  },
  coinflip: {
    label: "Coinflip", // Will be translated via t()
    color: "#9966ff", // Purple
  },
  klaklouk: {
    label: "Klaklouk", // Will be translated via t()
    color: "#ff9f40", // Orange
  },
  sponsor: {
    label: "Sponsor", // Will be translated via t()
    color: "#c9cbcf", // Light gray
  },
} satisfies ChartConfig;

export function ChartAreaInteractive({ users }: { users: any }) {
  const g = useTranslations();
  const t = useTranslations("dashboard");
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const chartData = React.useMemo(() => generateChartData(users), [users]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date(chartData[chartData.length - 1].date); // Latest date
    let daysToSubtract = 90; // Default to 3 months
    if (timeRange === "180d") daysToSubtract = 180;
    else if (timeRange === "90d") daysToSubtract = 90;
    else if (timeRange === "30d") daysToSubtract = 30;
    else if (timeRange === "7d") daysToSubtract = 7;
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  // Update chartConfig labels with translations
  const translatedChartConfig = Object.keys(chartConfig).reduce(
    (acc, key) => ({
      ...acc,
      [key]: {
        ...chartConfig[key as keyof typeof chartConfig],
        label: t(`information.${key}`), // Translate labels using dashboard.information
      },
    }),
    {} as ChartConfig,
  );

  return (
    <Card className="@container/card font-ghibi">
      <CardHeader className="relative">
        <CardTitle>{t("title")}</CardTitle> {/* "Dashboard" */}
        <CardDescription>
          {chartData === fallbackChartData ? (
            t("no_data") // Use a generic no_data key if available, or fallback
          ) : (
            <>
              <span className="@[540px]/card:block hidden">
                {t("description")}{" "}
                {/* "Overview of your PEACHY GANG community statistics and analytics." */}
              </span>
              <span className="@[540px]/card:hidden">
                {t("analytics_title")} {/* "Community Analytics" */}
              </span>
            </>
          )}
        </CardDescription>
        <div className="absolute right-4 top-4 mt-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="w-40 border-2 shadow-primary"
              aria-label={g("common.select")} // "Select"
            >
              <SelectValue placeholder={g("common.select")} />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-2">
              <SelectItem value="180d" className="rounded-lg">
                {t("last_six_months", { defaultMessage: "Last 6 months" })}
              </SelectItem>
              <SelectItem value="90d" className="rounded-lg">
                {t("last_three_months", { defaultMessage: "Last 3 months" })}
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                {t("last_thirty_days", { defaultMessage: "Last 30 days" })}
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                {t("last_seven_days", { defaultMessage: "Last 7 days" })}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {chartData === fallbackChartData ? (
          <div className="flex h-[250px] items-center justify-center text-muted-foreground font-ghibi">
            {t("no_data", {
              defaultMessage: "No user data available to display",
            })}
          </div>
        ) : (
          <ChartContainer
            config={translatedChartConfig}
            className="aspect-auto h-[250px] w-full px-2"
          >
            <AreaChart data={filteredData}>
              <defs>
                {Object.keys(translatedChartConfig).map((key) => (
                  <linearGradient
                    key={key}
                    id={`fill${key.charAt(0).toUpperCase() + key.slice(1)}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={
                        translatedChartConfig[key as keyof typeof chartConfig]
                          .color
                      }
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={
                        translatedChartConfig[key as keyof typeof chartConfig]
                          .color
                      }
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid vertical={false} strokeOpacity={0.3} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                    }}
                    indicator="dot"
                  />
                }
              />
              {Object.keys(translatedChartConfig).map((key) => (
                <Area
                  key={key}
                  dataKey={key}
                  type="natural"
                  fill={`url(#fill${
                    key.charAt(0).toUpperCase() + key.slice(1)
                  })`}
                  stroke={
                    translatedChartConfig[key as keyof typeof chartConfig].color
                  }
                  stackId="a"
                  fillOpacity={0.4}
                />
              ))}
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

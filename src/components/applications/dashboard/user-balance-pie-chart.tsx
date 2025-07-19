"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
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
import { usePeachy } from "@/contexts/peachy";
import { useGetUserBalanceChartQuery } from "@/redux/api/users";

// Fallback data if no valid user data is provided
const fallbackChartData = [
  { name: "Coin", value: 0 },
  { name: "Bank", value: 0 },
  { name: "Slots", value: 0 },
  { name: "Blackjack", value: 0 },
  { name: "Coinflip", value: 0 },
  { name: "Klaklouk", value: 0 },
  { name: "Sponsor", value: 0 },
  { name: "Credit", value: 0 },
];

// Function to generate chart data from user data
const generateChartData = (user: any) => {
  // Check if user data is valid
  if (!user || !user.labels || !user.datasets || !user.datasets[0]?.data) {
    console.warn("No valid user data provided, using fallback data.");
    return fallbackChartData;
  }

  const { labels, datasets } = user;
  if (datasets[0].data.length === 0) {
    console.warn("No valid data in dataset, using fallback data.");
    return fallbackChartData;
  }

  return labels.map((label: string, index: number) => ({
    name: label,
    value: datasets[0].data[index] || 0,
  }));
};

const chartConfig = {
  coin: {
    label: "Coin",
    color: "#ff6384", // Vibrant red-pink
  },
  bank: {
    label: "Bank",
    color: "#36a2eb", // Bright blue
  },
  slots: {
    label: "Slots",
    color: "#ffce56", // Warm yellow
  },
  blackjack: {
    label: "Blackjack",
    color: "#4bc0c0", // Teal
  },
  coinflip: {
    label: "Coinflip",
    color: "#9966ff", // Purple
  },
  klaklouk: {
    label: "Klaklouk",
    color: "#ff9f40", // Orange
  },
  sponsor: {
    label: "Sponsor",
    color: "#c9cbcf", // Light gray
  },
  credit: {
    label: "Credit",
    color: "#66cc99", // Green for Credit
  },
} satisfies ChartConfig;

export function UserBalancePieChart() {
  const { userInfoByDiscord } = usePeachy();
  const t = useTranslations("dashboard");
  const isMobile = useIsMobile();

  const { data: user } = useGetUserBalanceChartQuery(userInfoByDiscord?.id);

  const chartData = React.useMemo(() => generateChartData(user), [user]);

  const translatedChartConfig = Object.keys(chartConfig).reduce(
    (acc, key) => ({
      ...acc,
      [key]: {
        ...chartConfig[key as keyof typeof chartConfig],
        label: t(`information.${key.toLowerCase()}`, {
          defaultMessage: chartConfig[key as keyof typeof chartConfig].label,
        }),
      },
    }),
    {} as ChartConfig
  );

  return (
    <Card className="@container/card font-ghibi">
      <CardHeader className="relative">
        <CardTitle>{t("user_title")}</CardTitle>
        <CardDescription>
          {chartData === fallbackChartData ? (
            t("no_data")
          ) : (
            <>
              <span className="@[540px]/card:block hidden">
                {t("user_info_description")}
              </span>
              <span className="@[540px]/card:hidden">
                {t("user_info_description")}
              </span>
            </>
          )}
        </CardDescription>
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
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {chartData.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      translatedChartConfig[
                        entry?.name?.toLowerCase() as keyof typeof chartConfig
                      ]?.color || "#8884d8"
                    }
                  />
                ))}
              </Pie>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    nameKey="name"
                    labelFormatter={(label) =>
                      translatedChartConfig[
                        label?.toLowerCase() as keyof typeof chartConfig
                      ]?.label || label
                    }
                  />
                }
              />
              <Legend
                layout={isMobile ? "horizontal" : "vertical"}
                align={isMobile ? "center" : "right"}
                verticalAlign={isMobile ? "bottom" : "middle"}
                formatter={(value) =>
                  translatedChartConfig[
                    value?.toLowerCase() as keyof typeof chartConfig
                  ]?.label || value
                }
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

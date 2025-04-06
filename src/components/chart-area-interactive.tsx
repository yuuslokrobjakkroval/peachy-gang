"use client";

import * as React from "react";
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// Fallback data if no valid user data is provided
const fallbackChartData = [
  { date: "2025-04-05", coin: 0, bank: 0 }, // Current date as fallback
];

// Function to generate chart data from user data
const generateChartData = (users: any) => {
  // Check if users is valid
  if (!users || (Array.isArray(users) && users.length === 0)) {
    console.warn("No valid user data provided, using fallback data.");
    return fallbackChartData;
  }

  const usersArray = Array.isArray(users) ? users : [users];
  const user = usersArray[0]; // Work with the first user

  // Ensure user has required fields
  if (!user?.createdAt || !user?.updatedAt || !user?.balance?.coin) {
    console.warn("User data is missing required fields, using fallback data.");
    return fallbackChartData;
  }

  const startDate = new Date(user.createdAt);
  const endDate = new Date(user.updatedAt);
  const totalCoin = user.balance.coin;
  const daysDiff =
    Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) ||
    1; // Avoid division by 0

  // Simulate daily coin accumulation
  const dailyIncrement = totalCoin / daysDiff;
  const chartData = [];

  for (let i = 0; i <= daysDiff; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const formattedDate = date.toISOString().split("T")[0];
    const coinBalance = Math.floor(dailyIncrement * i);

    chartData.push({
      date: formattedDate,
      coin: coinBalance,
      bank: user.balance.bank || 0, // Default to 0 if undefined
    });
  }

  return chartData;
};

const chartConfig = {
  coin: {
    label: "Coin Balance",
    color: "hsl(var(--chart-1))",
  },
  bank: {
    label: "Bank Balance",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive({ users }: { users: any }) {
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
    let daysToSubtract = 90;
    if (timeRange === "30d") daysToSubtract = 30;
    else if (timeRange === "7d") daysToSubtract = 7;
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardTitle>Coin Balance Trend</CardTitle>
        <CardDescription>
          {chartData === fallbackChartData ? (
            "No data available"
          ) : (
            <>
              <span className="@[540px]/card:block hidden">
                Coin accumulation over time
              </span>
              <span className="@[540px]/card:hidden">Coin Trend</span>
            </>
          )}
        </CardDescription>
        <div className="absolute right-4 top-4">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="@[767px]/card:flex hidden"
          >
            <ToggleGroupItem value="90d" className="h-8 px-2.5">
              Last 3 months
            </ToggleGroupItem>
            <ToggleGroupItem value="30d" className="h-8 px-2.5">
              Last 30 days
            </ToggleGroupItem>
            <ToggleGroupItem value="7d" className="h-8 px-2.5">
              Last 7 days
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="@[767px]/card:hidden flex w-40"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {chartData === fallbackChartData ? (
          <div className="flex h-[250px] items-center justify-center text-muted-foreground">
            No user data available to display
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="fillCoin" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-coin)"
                    stopOpacity={1.0}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-coin)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillBank" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-bank)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-bank)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
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
                      });
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="coin"
                type="natural"
                fill="url(#fillCoin)"
                stroke="var(--color-coin)"
                stackId="a"
              />
              <Area
                dataKey="bank"
                type="natural"
                fill="url(#fillBank)"
                stroke="var(--color-bank)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
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
  ChartLegend,
  ChartLegendContent,
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
import { useGetTotalUsersBalanceChartQuery } from "@/redux/api/users";

// Get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0]; // e.g., "2025-07-19"
};

// Fallback data for all balance types with current date
const fallbackChartData = [
  {
    date: getCurrentDate(),
    coin: 0,
    bank: 0,
    sponsor: 0,
    slots: 0,
    blackjack: 0,
    coinflip: 0,
    klaklouk: 0,
  },
];

// All possible balance types
const balanceTypes = [
  "coin",
  "bank",
  "sponsor",
  "slots",
  "blackjack",
  "coinflip",
  "klaklouk",
];

// Function to transform API data to chart format
const transformChartData = (apiData: any) => {
  if (
    !apiData ||
    !Array.isArray(apiData.labels) ||
    !Array.isArray(apiData.datasets) ||
    apiData.datasets.length === 0
  ) {
    console.warn("Invalid or empty API data:", apiData);
    return fallbackChartData;
  }

  try {
    const { labels, datasets } = apiData;
    return labels.map((date: string, index: number) => {
      const dataPoint: { [key: string]: any } = { date };
      balanceTypes.forEach((type) => {
        const dataset = datasets.find(
          (d: any) => d.label?.toLowerCase() === type
        );
        dataPoint[type] = Number(dataset?.data[index]) || 0;
      });
      return dataPoint;
    });
  } catch (error) {
    console.error("Error transforming chart data:", error);
    return fallbackChartData;
  }
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
  sponsor: {
    label: "Sponsor",
    color: "#c9cbcf", // Light gray
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
} satisfies ChartConfig;

// Error Boundary Component
const ErrorBoundary: React.FC<{
  children: React.ReactNode;
  fallback: React.ReactNode;
}> = ({ children, fallback }) => {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error("Uncaught error in TotalBalanceAreaChart:", error);
      setHasError(true);
    };
    window.addEventListener("error", errorHandler);
    return () => window.removeEventListener("error", errorHandler);
  }, []);

  if (hasError) return <>{fallback}</>;
  return <>{children}</>;
};

export function TotalBalanceAreaChart() {
  const t = useTranslations("dashboard");
  const g = useTranslations();
  const [timeRange, setTimeRange] = React.useState("90");

  const getParams = () => {
    const days = parseInt(timeRange, 10);
    if (isNaN(days)) {
      console.warn("Invalid timeRange value:", timeRange);
      return { days: 90 }; // Default to 90 days
    }
    return { days };
  };

  const {
    data: apiData,
    isLoading,
    isError,
  } = useGetTotalUsersBalanceChartQuery(getParams());

  const chartData = React.useMemo(() => {
    if (!apiData) {
      console.log("No API data, using fallback");
      return fallbackChartData;
    }
    const transformed = transformChartData(apiData);
    console.log("Transformed chart data:", transformed);
    return transformed;
  }, [apiData]);

  const filteredData = React.useMemo(() => {
    if (!chartData || chartData.length === 0) {
      console.log("No chart data, using fallback");
      return fallbackChartData;
    }

    try {
      const referenceDate = new Date(chartData[chartData.length - 1].date);
      if (isNaN(referenceDate.getTime())) {
        console.warn(
          "Invalid reference date:",
          chartData[chartData.length - 1].date
        );
        return fallbackChartData;
      }

      const daysToSubtract = parseInt(timeRange, 10);
      if (isNaN(daysToSubtract)) {
        console.warn("Invalid daysToSubtract:", timeRange);
        return chartData;
      }

      const startDate = new Date(referenceDate);
      startDate.setDate(startDate.getDate() - daysToSubtract);

      const filtered = chartData.filter((item: any) => {
        const itemDate = new Date(item.date);
        return !isNaN(itemDate.getTime()) && itemDate >= startDate;
      });
      console.log("Filtered data:", filtered);
      return filtered.length > 0 ? filtered : fallbackChartData;
    } catch (error) {
      console.error("Error filtering chart data:", error);
      return fallbackChartData;
    }
  }, [chartData, timeRange]);

  // Update chartConfig with translations
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

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-[250px] sm:h-[300px] md:h-[350px]">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">{t("loading")}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError || chartData === fallbackChartData) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-[250px] sm:h-[300px] md:h-[350px]">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {t("no_data", { defaultMessage: "No data available to display" })}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 px-2 py-4 space-y-0 border-b sm:py-5 sm:px-4 md:px-6 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-lg sm:text-xl">
            {t("total_balance_title", { defaultMessage: "Total Balance" })}
          </CardTitle>
          <CardDescription className="text-sm">
            {t("total_balance_description", {
              defaultMessage: "Showing total balance for all users over time",
            })}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[140px] sm:w-[160px] rounded-lg sm:ml-auto"
            aria-label={g("common.select", { defaultMessage: "Select" })}
          >
            <SelectValue
              placeholder={t("last_three_months", {
                defaultMessage: "Last 3 months",
              })}
            />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90" className="rounded-lg">
              {t("last_three_months", { defaultMessage: "Last 3 months" })}
            </SelectItem>
            <SelectItem value="30" className="rounded-lg">
              {t("last_thirty_days", { defaultMessage: "Last 30 days" })}
            </SelectItem>
            <SelectItem value="7" className="rounded-lg">
              {t("last_seven_days", { defaultMessage: "Last 7 days" })}
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-4 md:px-6 sm:pt-6">
        <ChartContainer
          config={translatedChartConfig}
          className="aspect-auto w-full h-[250px] sm:h-[300px] md:h-[350px]"
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
              minTickGap={16}
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
            {Object.keys(translatedChartConfig).map((key) => (
              <Area
                key={key}
                dataKey={key}
                type="natural"
                fill={`url(#fill${key.charAt(0).toUpperCase() + key.slice(1)})`}
                stroke={
                  translatedChartConfig[key as keyof typeof chartConfig].color
                }
                stackId="a"
              />
            ))}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

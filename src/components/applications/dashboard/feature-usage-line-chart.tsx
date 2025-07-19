"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
import { useGetFeatureUsageChartQuery } from "@/redux/api/users";

const fallbackChartData = [
  {
    feature: "autoresponse",
    value: 0,
  },
  {
    feature: "boostermessage",
    value: 0,
  },
  {
    feature: "giveawayschedule",
    value: 0,
  },
  {
    feature: "goodbyemessage",
    value: 0,
  },
  {
    feature: "invitetrackermessage",
    value: 0,
  },
  {
    feature: "joinroles",
    value: 0,
  },
  {
    feature: "leveling",
    value: 0,
  },
  {
    feature: "reactionroles",
    value: 0,
  },
  {
    feature: "welcomemessage",
    value: 0,
  },
];

const transformChartData = (apiData: any) => {
  if (!apiData || !Array.isArray(apiData)) {
    console.warn("Invalid or empty API data:", apiData);
    return fallbackChartData;
  }

  try {
    return apiData.map((item: any) => ({
      feature: item.name.toLowerCase(),
      value: Number(item.value) || 0,
    }));
  } catch (error) {
    console.error("Error transforming chart data:", error);
    return fallbackChartData;
  }
};

const chartConfig = {
  value: {
    label: "Usage",
    color: "#ff6384",
  },
} satisfies ChartConfig;

const ErrorBoundary: React.FC<{
  children: React.ReactNode;
  fallback: React.ReactNode;
}> = ({ children, fallback }) => {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error("Uncaught error in FeatureUsageLineChart:", error);
      setHasError(true);
    };
    window.addEventListener("error", errorHandler);
    return () => window.removeEventListener("error", errorHandler);
  }, []);

  if (hasError) return <>{fallback}</>;
  return <>{children}</>;
};

export function FeatureUsageLineChart() {
  const t = useTranslations("dashboard");
  const {
    data: apiData,
    isLoading,
    isError,
  } = useGetFeatureUsageChartQuery(null);

  const chartData = React.useMemo(() => {
    if (!apiData) {
      console.log("No API data, using fallback");
      return fallbackChartData;
    }
    const transformed = transformChartData(apiData);
    console.log("Transformed chart data:", transformed);
    return transformed;
  }, [apiData]);

  const translatedChartConfig = {
    value: {
      ...chartConfig.value,
      label: t("features.usage", {
        defaultMessage: chartConfig.value.label,
      }),
    },
  } satisfies ChartConfig;

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
    <ErrorBoundary
      fallback={
        <Card>
          <CardContent className="flex items-center justify-center h-[250px] sm:h-[300px] md:h-[350px]">
            <div className="text-center">
              <p className="text-sm text-red-500">
                {t("error", {
                  defaultMessage: "An error occurred while rendering the chart",
                })}
              </p>
            </div>
          </CardContent>
        </Card>
      }
    >
      <Card className="pt-0">
        <CardHeader className="flex items-center gap-2 px-2 py-4 space-y-0 border-b sm:py-5 sm:px-4 md:px-6 sm:flex-row">
          <div className="grid flex-1 gap-1">
            <CardTitle className="text-lg sm:text-xl">
              {t("feature_usage_title", { defaultMessage: "Feature Usage" })}
            </CardTitle>
            <CardDescription className="text-sm">
              {t("feature_usage_description", {
                defaultMessage: "Showing feature usage statistics",
              })}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-4 md:px-6 sm:pt-6">
          <ChartContainer
            config={translatedChartConfig}
            className="aspect-auto w-full h-[250px] sm:h-[300px] md:h-[350px]"
          >
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid vertical={false} strokeOpacity={0.3} />
              <XAxis
                dataKey="feature"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={16}
                tickFormatter={(value) =>
                  t(`features.${value}`, { defaultMessage: value })
                }
              />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) =>
                      t(`features.${value}`, { defaultMessage: value })
                    }
                    indicator="dot"
                  />
                }
              />
              <Line
                dataKey="value"
                type="monotone"
                stroke={translatedChartConfig.value.color}
                activeDot={{ r: 8 }}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </ErrorBoundary>
  );
}

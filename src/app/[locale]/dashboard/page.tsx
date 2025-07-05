"use client";
import { useTranslations } from "next-intl";
import { useGetUsersQuery } from "@/redux/api/users";
import { usePeachy } from "@/contexts/peachy";
import { SectionCards } from "@/components/applications/dashboard/section-cards";
import { ChartAreaInteractive } from "@/components/applications/dashboard/chart-area-interactive";
import Loading from "@/components/loading/circle";
import { Meteors } from "@/components/ui/Animations/magic/meteors";

export default function DashboardPage() {
  const t = useTranslations();

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
    return (
      <div className="w-full flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loading />
          <p className="mt-4 text-sm text-muted-foreground">
            {t("dashboard.loading")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full items-center justify-center overflow-hidden rounded-lg">
      <Meteors />
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4">
          {/* Page Header */}
          <div className="px-4 lg:px-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold tracking-tight">
                {t("dashboard.title")}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t("dashboard.description")}
              </p>
            </div>
          </div>

          {/* Statistics Cards */}
          <SectionCards users={users} meta={meta} />

          {/* Chart Section */}
          <div className="px-4 lg:px-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-medium">
                  {t("dashboard.analytics_title")}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {t("dashboard.analytics_description")}
                </p>
              </div>
              <ChartAreaInteractive users={users} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

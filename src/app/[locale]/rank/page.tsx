"use client";
import { useTranslations } from "next-intl";
import { useGetUsersQuery } from "@/redux/api/users";
import { RankTable } from "@/components/table/rank-table";
import Loading from "@/components/loading/circle";

export default function RankPage() {
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
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex min-h-screen w-full flex-col items-center p-6 md:p-10">
          <div className="w-full">
            <div className="text-center mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {t("rank.title")}
              </h1>
              <p className="text-muted-foreground">{t("rank.description")}</p>
            </div>
            <RankTable data={users} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}

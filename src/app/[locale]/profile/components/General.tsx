"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { toCapitalCase, toNumber } from "@/utils/common";
import type { User } from "@/utils/types";

const General = ({
  userInfoByDiscord,
  userInfo,
}: {
  userInfoByDiscord: any;
  userInfo: User;
}) => {
  const t = useTranslations();

  return (
    <Card className="w-full p-6 h-full bg-card text-card-foreground shadow-md">
      {/* Header */}
      <div className="w-full">
        <h4 className="text-2xl font-semibold tracking-tight text-primary">
          {t("profile.general.title")}
        </h4>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col rounded-lg bg-card p-4 border border-border hover:shadow-md transition-shadow duration-200">
          <p className="text-lg font-semibold text-primary">
            {t("profile.general.bio")}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {userInfo?.profile?.bio ?? t("common.not_set")}
          </p>
        </div>

        <div className="flex flex-col rounded-lg bg-card p-4 border border-border hover:shadow-md transition-shadow duration-200">
          <p className="text-lg font-semibold text-primary">
            {t("profile.general.gender")}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {toCapitalCase(userInfo?.profile?.gender ?? t("common.not_set"))}
          </p>
        </div>

        <div className="flex flex-col rounded-lg bg-card p-4 border border-border hover:shadow-md transition-shadow duration-200">
          <p className="text-lg font-semibold text-primary">
            {t("profile.general.birthday")}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {toCapitalCase(userInfo?.profile?.birthday ?? t("common.not_set"))}
          </p>
        </div>

        <div className="flex flex-col rounded-lg bg-card p-4 border border-border hover:shadow-md transition-shadow duration-200">
          <p className="text-lg font-semibold text-primary">
            {t("profile.general.zodiac_sign")}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {toCapitalCase(
              userInfo?.profile?.zodiacSign ?? t("common.not_set"),
            )}
          </p>
        </div>

        <div className="flex flex-col rounded-lg bg-card p-4 border border-border hover:shadow-md transition-shadow duration-200">
          <p className="text-lg font-semibold text-primary">
            {t("profile.general.level")}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {toNumber(userInfo?.profile?.level)}
          </p>
        </div>

        <div className="flex flex-col rounded-lg bg-card p-4 border border-border hover:shadow-md transition-shadow duration-200">
          <p className="text-lg font-semibold text-primary">
            {t("profile.general.exp")}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {t("profile.general.exp_format", {
              current: toNumber(userInfo?.profile?.xp),
              total: toNumber(userInfo?.profile?.levelXp),
            })}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default General;

"use client";
import { useTranslations } from "next-intl";

export default function DailyRewardPage() {
  const t = useTranslations();

  return (
    <div className="flex min-h-screen w-full flex-col items-center p-6 md:p-10">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            {t("other.daily.title")}
          </h1>
          <p className="text-muted-foreground">
            {t("other.daily.description")}
          </p>
        </div>

        <div className="bg-card rounded-lg p-8 shadow-md text-center">
          <div className="mb-6">
            <div className="text-4xl mb-4">🎁</div>
            <h2 className="text-2xl font-semibold mb-2">
              {t("other.daily.claim")}
            </h2>
            <p className="text-muted-foreground">
              {t("other.daily.streak")}: 5
            </p>
          </div>

          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
            {t("other.daily.claim")}
          </button>
        </div>
      </div>
    </div>
  );
}

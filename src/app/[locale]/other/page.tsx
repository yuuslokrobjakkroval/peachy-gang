"use client";
import { useTranslations } from "next-intl";

export default function OtherPage() {
  const t = useTranslations();

  return (
    <div className="w-full h-full flex flex-1 flex-col rounded-lg">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex min-h-screen w-full flex-col items-center p-6 md:p-10">
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {t("other.title")}
            </h1>
            <p className="text-muted-foreground mb-8">
              {t("other.description")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg p-6 shadow-md">
                <h2 className="text-xl font-semibold mb-2">
                  {t("other.daily_reward")}
                </h2>
                <p className="text-muted-foreground">
                  {t("other.daily.description")}
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 shadow-md">
                <h2 className="text-xl font-semibold mb-2">
                  {t("other.transaction")}
                </h2>
                <p className="text-muted-foreground">
                  {t("other.transaction.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useTranslations } from "next-intl";

export default function CreditTransactionPage() {
  const t = useTranslations();

  return (
    <div className="flex min-h-screen w-full flex-col items-center p-6 md:p-10">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            {t("other.transaction.title")}
          </h1>
          <p className="text-muted-foreground">
            {t("other.transaction.description")}
          </p>
        </div>

        <div className="bg-card rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-4 gap-4 font-semibold text-sm text-muted-foreground border-b pb-2">
              <div>{t("other.transaction.date")}</div>
              <div>{t("other.transaction.type")}</div>
              <div>{t("other.transaction.amount")}</div>
              <div>{t("other.transaction.description")}</div>
            </div>

            <div className="py-8 text-center text-muted-foreground">
              {t("rank.no_data")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

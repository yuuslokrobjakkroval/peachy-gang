"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function StorePage() {
  const t = useTranslations();

  return (
    <div className="w-full h-full flex flex-1 flex-col rounded-lg">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex min-h-screen w-full flex-col items-center p-6 md:p-10">
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {t("store.title")}
            </h1>
            <p className="text-muted-foreground mb-8">
              {t("store.description")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg p-6 shadow-md">
                <h2 className="text-xl font-semibold mb-2">
                  {t("store.profiles")}
                </h2>
                <p className="text-muted-foreground mb-4">
                  Enhance your profile with special items
                </p>
                <Link
                  href="/store/profile"
                  className="text-primary hover:underline"
                >
                  {t("common.view")} →
                </Link>
              </div>

              <div className="bg-card rounded-lg p-6 shadow-md">
                <h2 className="text-xl font-semibold mb-2">
                  {t("store.backgrounds")}
                </h2>
                <p className="text-muted-foreground mb-4">
                  Customize your profile with beautiful backgrounds
                </p>
                <Link
                  href="/store/background"
                  className="text-primary hover:underline"
                >
                  {t("common.view")} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

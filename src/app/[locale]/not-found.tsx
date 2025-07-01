"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function NotFoundAuthPage() {
  const t = useTranslations("NotFound");
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-6 md:p-10 bg-background font-handwritten">
      <div className="absolute top-1/2 left-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
        <span className="from-foreground bg-linear-to-b to-transparent bg-clip-text text-[10rem] leading-none font-ghibi-bold text-transparent animate-twinkle">
          404
        </span>
        <h2 className="my-2 text-2xl font-ghibi-bold text-foreground">
          {t("title")}
        </h2>
        <p className="text-muted-foreground">{t("description")}</p>
        <div className="mt-8 flex justify-center gap-2">
          <Button
            onClick={() => router.back()}
            variant="secondary"
            size="lg"
            className="shadow-primary border-2"
          >
            {t("goBack")}
          </Button>
          <Button
            onClick={() => router.push("/")}
            variant="default"
            size="lg"
            className="shadow-primary border-2"
          >
            {t("backToHome")}
          </Button>
        </div>
      </div>
    </div>
  );
}

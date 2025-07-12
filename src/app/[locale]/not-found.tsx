"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");
  const router = useRouter();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-8 text-center"
      style={{
        backgroundImage: "url(/images/house.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="mb-4 text-5xl font-bold">{t("title")}</h1>
      <p className="mb-6 text-lg">{t("description")}</p>
      <Button
        onClick={() => router.push("/")}
        className="px-6 py-3 text-white transition"
      >
        {t("backHome")}
      </Button>
    </div>
  );
}

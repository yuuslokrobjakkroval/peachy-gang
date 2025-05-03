"use client";

import React, { useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Language {
  code: string;
  nameKey: string;
  flag: string;
}

interface LanguageChangerProps {
  className?: string;
  width?: string;
}

const languages: Language[] = [
  { code: "en", nameKey: "language.english", flag: "/flags/en.png" },
  { code: "km", nameKey: "language.khmer", flag: "/flags/km.png" },
  { code: "zh", nameKey: "language.china", flag: "/flags/cn.png" },
];

const LanguageChanger: React.FC<LanguageChangerProps> = ({
  className = "",
  width = "w-10",
}) => {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  const handleLanguageChange = useCallback(() => {
    const currentIndex = languages.findIndex((lang) => lang.code === locale);
    const nextIndex = (currentIndex + 1) % languages.length;
    const newLocale = languages[nextIndex].code;
    const currentPath = pathname.replace(`/${locale}`, "");
    const newPath = `/${newLocale}${currentPath}`;
    router.push(newPath);
  }, [router, locale, pathname]);

  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];

  return (
    <Button
      variant="ghost"
      className="hover:bg-muted transition-colors duration-200"
      onClick={handleLanguageChange}
      aria-label={t(currentLanguage.nameKey)}
    >
      <Image
        src={currentLanguage.flag}
        alt={`${t(currentLanguage.nameKey)} flag`}
        width={24}
        height={24}
        quality={100}
        className="h-6 w-6 text-foreground"
      />
    </Button>
  );
};

export default LanguageChanger;

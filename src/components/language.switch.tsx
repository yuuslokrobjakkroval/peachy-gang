"use client";

import React, { useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { languages } from "@/utils/common";

interface LanguageChangerProps {
  className?: string;
  setLanguage?: any;
}

const LanguageChanger: React.FC<LanguageChangerProps> = ({ setLanguage }) => {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  const handleLanguageChange = useCallback(() => {
    const currentIndex = languages.findIndex((lang) => lang.code === locale);
    const nextIndex = (currentIndex + 1) % languages.length;
    const newLocale = languages[nextIndex].code;
    setLanguage(newLocale);
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
      {/* <Image
        src={currentLanguage.flag}
        alt={`${t(currentLanguage.nameKey)} flag`}
        width={72}
        height={72}
        quality={100}
        className="w-full h-full text-foreground"
      /> */}
      <Languages className="h-6 w-6 text-foreground" />
    </Button>
  );
};

export default LanguageChanger;

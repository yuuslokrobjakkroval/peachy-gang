"use client";

import React, { useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
];

const LanguageChanger: React.FC<LanguageChangerProps> = ({
  className = "",
  width = "w-[136px]",
}) => {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  const handleLanguageChange = useCallback(
    (newLocale: string) => {
      const currentPath = pathname.replace(`/${locale}`, "");
      const newPath = `/${newLocale}${currentPath}`;
      router.push(newPath);
    },
    [router, locale, pathname]
  );

  return (
    <Select value={locale} onValueChange={handleLanguageChange}>
      <SelectTrigger
        className={`text-foreground dark:text-white ${width} ${className}`}
        aria-label={t("language.placeholder")}
      >
        <SelectValue placeholder={t("language.placeholder")} />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem
            key={lang.code}
            value={lang.code}
            aria-label={`${t(lang.nameKey)} (flag)`}
          >
            <div className="flex items-center gap-2">
              <Image
                src={lang.flag}
                alt={`${t(lang.nameKey)} flag`}
                width={24}
                height={24}
                quality={100}
                className="object-contain rounded-sm"
              />
              <span>{t(lang.nameKey)}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageChanger;

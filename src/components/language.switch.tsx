"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { languages } from "@/utils/common";

interface LanguageChangerProps {
  className?: string;
  setLanguage?: any;
}

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 };

const LanguageChanger: React.FC<LanguageChangerProps> = () => {
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
    <motion.button
      variants={buttonVariants}
      initial={false}
      animate="animate"
      onClick={handleLanguageChange}
      transition={transition}
      className="relative flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-300 text-muted-foreground hover:bg-muted hover:text-foreground"
      aria-label={t(currentLanguage.nameKey)}
    >
      <Image
        src={currentLanguage.flag}
        alt={`${t(currentLanguage.nameKey)} flag`}
        width={30}
        height={30}
        className="h-[30px] w-[30px] text-foreground"
      />
      {/* <Languages className="h-6 w-6 text-foreground" /> */}
    </motion.button>
  );
};

export default LanguageChanger;

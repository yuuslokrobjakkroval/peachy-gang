"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import {
  avatarUrl,
  bannerUrl,
  clanUrl,
  decorationUrl,
  formatCoinCompact,
  toCapitalCase,
} from "@/utils/common";
import { MdVerified } from "react-icons/md";
import type { User } from "@/utils/types";
import { Badge } from "@/components/ui/badge";

const Information = ({
  userInfoByDiscord,
  userInfo,
}: {
  userInfoByDiscord: any;
  userInfo: User;
}) => {
  const t = useTranslations();

  const backgroundStyle = userInfoByDiscord.banner
    ? {
        background: `url(${bannerUrl(userInfoByDiscord.id, userInfoByDiscord.banner)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : { backgroundColor: userInfoByDiscord.banner_color };

  return (
    <Card className="items-center w-full h-full p-3 sm:p-4 lg:p-[16px] bg-cover">
      {/* Background and profile */}
      <div
        className="relative w-full h-32 xs:h-36 sm:h-40 md:h-48 lg:h-56 xl:h-64 2xl:h-[320px] bg-center bg-cover rounded-lg sm:rounded-xl overflow-visible"
        style={backgroundStyle}
      >
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

        {/* Clan Badge */}
        {userInfoByDiscord.clan?.tag && (
          <Badge className="absolute z-30 flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1 text-xs font-medium transition-colors rounded-full shadow-sm top-2 right-2 sm:top-3 sm:right-3 bg-primary/90 text-primary-foreground hover:bg-primary/80 backdrop-blur-sm">
            <Image
              className="object-cover rounded-xs"
              src={clanUrl(userInfoByDiscord)}
              alt={toCapitalCase(userInfoByDiscord.clan.tag)}
              width={24}
              height={24}
              priority
              sizes="(max-width: 640px) 24px, 32px"
            />
            <span className="mt-0.5 sm:mt-1 text-sm sm:text-lg md:text-xl font-bold">
              {toCapitalCase(userInfoByDiscord.clan.tag)}
            </span>
          </Badge>
        )}

        {/* Avatar positioned at the bottom center, overlapping the banner */}
        <div className="absolute left-1/2 bottom-0 z-20 -translate-x-1/2 translate-y-1/2 transform">
          {/* Decoration and Avatar Wrapper */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32">
            {/* Avatar */}
            <div className="relative w-full h-full rounded-full border-2 sm:border-3 md:border-4 lg:border-[5px] border-[var(--background)] bg-[var(--accent)] dark:!border-[var(--sidebar)] shadow-2xl overflow-hidden">
              <Image
                src={avatarUrl(userInfoByDiscord)}
                alt="Profile Avatar"
                width={128}
                height={128}
                className="object-cover rounded-full w-full h-full"
                priority
              />
            </div>

            {/* Avatar Decoration */}
            {userInfoByDiscord.avatar_decoration_data?.asset && (
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <Image
                  src={
                    decorationUrl(userInfoByDiscord.avatar_decoration_data) ||
                    "/placeholder.svg"
                  }
                  alt="Avatar Decoration"
                  width={140}
                  height={140}
                  className="object-contain w-full h-full"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add top margin to content below to avoid overlapping */}
      <div className="flex flex-col items-center mt-12 sm:mt-14">
        <h4 className="flex items-center gap-1 text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-navy-700 text-center">
          {userInfoByDiscord?.global_name}
          {userInfoByDiscord?.verified && (
            <MdVerified className="mt-0.5 text-blue-500 flex-shrink-0" />
          )}
        </h4>
        <p className="text-sm sm:text-base font-normal text-muted-foreground text-center">
          @{userInfoByDiscord?.username}
        </p>
      </div>

      {/* Balance Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mt-4 sm:mt-6 mb-3 sm:mb-4 w-full max-w-4xl">
        <div className="flex flex-col items-center justify-center p-2 sm:p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
          <p className="text-sm sm:text-base md:text-lg font-bold text-navy-700 truncate">
            {formatCoinCompact(userInfo?.balance?.coin ?? 0)}
          </p>
          <p className="text-xs sm:text-sm font-normal text-muted-foreground text-center">
            {t("profile.information.coin")}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-2 sm:p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
          <p className="text-sm sm:text-base md:text-lg font-bold text-navy-700 truncate">
            {formatCoinCompact(userInfo?.balance?.bank ?? 0)}
          </p>
          <p className="text-xs sm:text-sm font-normal text-muted-foreground text-center">
            {t("profile.information.bank")}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-2 sm:p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
          <p className="text-sm sm:text-base md:text-lg font-bold text-navy-700 truncate">
            {formatCoinCompact(userInfo?.balance?.slots ?? 0)}
          </p>
          <p className="text-xs sm:text-sm font-normal text-muted-foreground text-center">
            {t("profile.information.slot")}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-2 sm:p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
          <p className="text-sm sm:text-base md:text-lg font-bold text-navy-700 truncate">
            {formatCoinCompact(userInfo?.balance?.blackjack ?? 0)}
          </p>
          <p className="text-xs sm:text-sm font-normal text-muted-foreground text-center">
            {t("profile.information.blackjack")}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-2 sm:p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors col-span-2 sm:col-span-1">
          <p className="text-sm sm:text-base md:text-lg font-bold text-navy-700 truncate">
            {formatCoinCompact(userInfo?.balance?.coinflip ?? 0)}
          </p>
          <p className="text-xs sm:text-sm font-normal text-muted-foreground text-center">
            {t("profile.information.coin_flip")}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Information;

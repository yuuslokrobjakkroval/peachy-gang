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
    <Card className="items-center w-full h-full p-[16px] bg-cover">
      {/* Background and profile */}
      <div
        className="relative w-full h-64 bg-center bg-cover rounded-lg sm:h-32 md:h-56 lg:h-64 xl:h-[480px]"
        style={backgroundStyle}
      >
        <div className="absolute -translate-x-1/2 -bottom-12 left-1/2">
          {/* Decoration and Avatar Wrapper */}
          <div className="relative w-[96px] h-[96px] flex items-center justify-center">
            {/* Avatar */}
            <div className="relative w-[87px] h-[87px] rounded-full border-[4px] overflow-hidden">
              <Image
                src={avatarUrl(userInfoByDiscord) || "/placeholder.svg"}
                alt="Profile Avatar"
                width={88}
                height={88}
                className="object-cover rounded-full"
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
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </div>

        {/* Clan Badge */}
        {userInfoByDiscord.clan.tag && (
          <Badge className="absolute z-10 flex items-center gap-2 px-3 py-1 text-xs font-medium transition-colors rounded-full shadow-sm top-1 right-1 bg-primary/90 text-primary-foreground hover:bg-primary/80 sm:top-2 sm:right-2">
            <Image
              className="object-cover rounded-xs"
              src={clanUrl(userInfoByDiscord)}
              alt={toCapitalCase(userInfoByDiscord.clan.tag)}
              width={32}
              height={32}
              priority
              sizes="(max-width: 32px) 50vw, 32px"
            />
            <span className="mt-1 text-xl font-bold">
              {toCapitalCase(userInfoByDiscord.clan.tag)}
            </span>
          </Badge>
        )}
      </div>

      {/* Global Name and Username */}
      <div className="flex flex-col items-center mt-12">
        <h4 className="flex items-center gap-1 text-xl font-bold text-navy-700">
          {userInfoByDiscord?.global_name}
          {userInfoByDiscord?.verified && <MdVerified className="mt-0.5" />}
        </h4>
        <p className="text-base font-normal text-muted-foreground">
          {userInfoByDiscord?.username}
        </p>
      </div>

      {/* Post followers */}
      <div className="flex flex-wrap justify-center gap-4 mt-3 mb-3 md:gap-14">
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg font-bold text-navy-700">
            {formatCoinCompact(userInfo?.balance?.coin ?? 0)}
          </p>
          <p className="text-sm font-normal text-muted-foreground">
            {t("profile.information.coin")}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg font-bold text-navy-700">
            {formatCoinCompact(userInfo?.balance?.bank ?? 0)}
          </p>
          <p className="text-sm font-normal text-muted-foreground">
            {t("profile.information.bank")}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg font-bold text-navy-700">
            {formatCoinCompact(userInfo?.balance?.slots ?? 0)}
          </p>
          <p className="text-sm font-normal text-muted-foreground">
            {t("profile.information.slot")}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg font-bold text-navy-700">
            {formatCoinCompact(userInfo?.balance?.blackjack ?? 0)}
          </p>
          <p className="text-sm font-normal text-muted-foreground">
            {t("profile.information.blackjack")}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg font-bold text-navy-700">
            {formatCoinCompact(userInfo?.balance?.coinflip ?? 0)}
          </p>
          <p className="text-sm font-normal text-muted-foreground">
            {t("profile.information.coin_flip")}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Information;

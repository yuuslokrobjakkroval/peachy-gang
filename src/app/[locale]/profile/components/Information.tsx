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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
        className="relative w-full h-48 sm:h-32 md:h-40 lg:h-56 rounded-lg bg-cover bg-center"
        style={backgroundStyle}
      >
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
          {/* Decoration and Avatar Wrapper */}
          <div className="relative w-[96px] h-[96px] flex items-center justify-center">
            {/* Avatar */}
            <div className="relative w-[87px] h-[87px] rounded-full border-[4px] overflow-hidden">
              <Image
                src={avatarUrl(userInfoByDiscord) || "/placeholder.svg"}
                alt="Profile Avatar"
                width={88}
                height={88}
                className="rounded-full object-cover"
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
          <Badge className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 text-xs font-medium bg-primary/90 text-primary-foreground rounded-full shadow-sm hover:bg-primary/80 transition-colors z-10 sm:top-2 sm:right-2">
            <Avatar className="h-6 w-6">
              <AvatarImage
                className="rounded-full"
                src={clanUrl(userInfoByDiscord)}
                alt={toCapitalCase(userInfoByDiscord.clan.tag)}
              />
              <AvatarFallback className="bg-muted text-foreground font-ghibi-bold text-xs">
                {toCapitalCase(userInfoByDiscord.clan.tag?.[0])}
              </AvatarFallback>
            </Avatar>
            <span>{toCapitalCase(userInfoByDiscord.clan.tag)}</span>
          </Badge>
        )}
      </div>

      {/* Global Name and Username */}
      <div className="mt-12 flex flex-col items-center">
        <h4 className="flex items-center text-xl font-bold text-navy-700 gap-1">
          {userInfoByDiscord?.global_name}
          {userInfoByDiscord?.verified && <MdVerified className="mt-0.5" />}
        </h4>
        <p className="text-base font-normal text-muted-foreground">
          {userInfoByDiscord?.username}
        </p>
      </div>

      {/* Post followers */}
      <div className="mt-3 mb-3 flex flex-wrap justify-center gap-4 md:gap-14">
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

"use client";

import React, { useState, useEffect } from "react";
import moment from "moment";
import Image from "@/components/image";
import { usePeachy } from "@/contexts/peachy";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { iconUrl, bannerUrl } from "@/utils/common";
import { useGetGuildInfoQuery } from "@/redux/api/guild";
import { useGetUserByIdQuery } from "@/redux/api/users";

export default function ServerOverview({ guild }: { guild: string }) {
  const { userInfoByDiscord }: { userInfoByDiscord: any } = usePeachy();
  const { data: guildInfo, isLoading } = useGetGuildInfoQuery(guild);
  const [ownerId, setOwnerId] = useState<string>("");
  console.log("ownerId", ownerId);

  const { data: userInfo } = useGetUserByIdQuery(ownerId, {
    skip: !ownerId,
  });

  useEffect(() => {
    if (!!guildInfo) {
      console.log("hi");

      setOwnerId(guildInfo.ownerId);
    }
  }, [guildInfo]);

  const backgroundStyle =
    guildInfo?.id && guildInfo?.banner
      ? {
          background: `url(${bannerUrl(guildInfo?.id, guildInfo?.banner)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          aspectRatio: "16 / 9",
        }
      : {
          backgroundColor: `${userInfoByDiscord.banner_color}`,
        };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-background">
        <span className="text-muted-foreground">Loading server info...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 px-2 py-3 sm:gap-4 sm:py-4 md:gap-6 md:py-6 lg:gap-8 lg:p-6 font-ghibi sm:px-4 lg:px-6">
      <div className="w-full">
        <div className="relative mb-15">
          {/* Background and profile */}
          <Card className="p-2 sm:p-3 md:p-4">
            <div
              className="flex w-full bg-cover h-32 xs:h-36 sm:h-40 md:h-48 lg:h-56 xl:h-64 2xl:h-[320px] rounded-lg sm:rounded-xl overflow-hidden"
              style={backgroundStyle}
            >
              {/* Overlay for better text readability if needed */}
              <div className="absolute inset-0 pointer-events-none" />

              <div className="absolute -translate-x-1/2 -bottom-8 sm:-bottom-10 md:-bottom-12 left-12 sm:left-16 md:left-18">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[96px] lg:h-[96px]">
                  {/* Avatar */}
                  <div className="relative w-full h-full rounded-full border-2 sm:border-3 md:border-[4px] border-[var(--background)] bg-[var(--accent)] dark:!border-[var(--sidebar)] overflow-hidden">
                    <Image
                      src={iconUrl(guildInfo)}
                      alt="Server Icon"
                      width={128}
                      height={128}
                      className="object-cover w-full h-full rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="flex flex-col my-6">
          <h1 className="mb-1 text-2xl font-bold text-primary drop-shadow-sm">
            {guildInfo?.name}
          </h1>
          <span className="text-sm text-muted-foreground">
            {guildInfo?.description}
          </span>
        </div>
        <div className="grid w-full grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col items-center">
            <span className="font-semibold text-foreground">ID</span>
            <Badge variant="secondary">{guildInfo?.id}</Badge>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-semibold text-foreground">Region</span>
            <span className="text-sm text-muted-foreground">
              {guildInfo?.region || "Global"}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-semibold text-foreground">Owner</span>
            <span className="text-sm text-muted-foreground">
              {userInfo?.username || "Unknown User"}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-semibold text-foreground">Members</span>
            <span className="text-sm text-muted-foreground">
              {guildInfo?.memberCount}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-semibold text-foreground">Premium Tier</span>
            <span className="text-sm text-muted-foreground">
              {`${guildInfo?.premiumTier || 1} Level`}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-semibold text-foreground">
              Premium Subscription
            </span>
            <span className="text-sm text-muted-foreground">
              {`${guildInfo?.premiumSubscriptionCount || 0} boosts`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

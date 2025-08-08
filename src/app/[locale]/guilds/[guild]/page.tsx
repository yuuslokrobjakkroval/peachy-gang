"use client";

import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useGetGuildInfoQuery } from "@/redux/api/guild";
import { bannerUrl, getFeatures, iconUrl, toCapitalCase } from "@/utils/common";
import Features from "@/components/features";
import { Button } from "@/components/ui/button";
import { config } from "@/utils/config";
import { CircleArrowLeft, Mailbox } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Loading from "@/components/loading/circle";
import { usePeachy } from "@/contexts/peachy";
import { Card } from "@/components/ui/card";

export default function FeaturesPage() {
  const t = useTranslations("guilds");
  const { setGuild } = usePeachy();
  const pathname = usePathname();
  const currentPath = pathname.split("/").filter(Boolean);
  const guildIdIndex = currentPath.indexOf("guilds") + 1;
  const guildId =
    guildIdIndex > 0 && guildIdIndex < currentPath.length
      ? currentPath[guildIdIndex]
      : "";
  const {
    data: guild,
    isLoading,
    isError,
    refetch,
  } = useGetGuildInfoQuery(guildId);

  useEffect(() => {
    if (guild) {
      setGuild(guild);
    }
  }, [guild]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[var(--background)] text-[var(--foreground)] font-ghibi">
        {t("error_message", {
          defaultMessage: "Oops, something went wrong. Please try again!",
        })}
      </div>
    );
  }

  return (
    <SidebarProvider>
      <SidebarInset>
        {guild ? (
          <GuildPanel guild={guildId} info={guild} refetch={refetch} />
        ) : (
          <NotJoined guildId={guildId} />
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}

function GuildPanel({
  guild: id,
  info,
  refetch,
}: {
  guild: string;
  info: any;
  refetch: () => void;
}) {
  const t = useTranslations("guilds");
  const { userInfoByDiscord }: { userInfoByDiscord: any } = usePeachy();
  const router = useRouter();

  const features = getFeatures();

  const backgroundStyle = info.banner
    ? {
        background: `url(${bannerUrl(info.id, info.banner)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        aspectRatio: "16 / 9",
      }
    : {
        backgroundColor: `${userInfoByDiscord.banner_color}`,
      };

  return (
    <div className="flex flex-col gap-3 px-2 py-3 sm:gap-4 sm:py-4 md:gap-6 md:py-6 lg:gap-8 lg:p-6 font-ghibi sm:px-4 lg:px-6">
      <div className="w-full">
        <div className="flex items-center gap-2">
          <CircleArrowLeft
            className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--primary)] cursor-pointer hover:text-[var(--primary)]/80 transition-colors"
            onClick={() => router.back()}
          />
          <h4 className="text-lg sm:text-xl md:text-2xl font-ghibi-bold tracking-tight text-[var(--primary)]">
            {toCapitalCase(info.name)}
          </h4>
        </div>

        <div className="mt-2 mb-4 sm:mt-3 sm:mb-6">
          <Separator className="text-[var(--card-foreground)]" />
        </div>

        <div className="relative mb-6">
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
                      src={iconUrl(info)}
                      alt={t("server_icon_alt", {
                        defaultMessage: "Server Icon",
                      })}
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

        <div className="mt-8 mb-3 sm:mt-10 md:mt-12 lg:mt-14">
          {info?.description && (
            <p className="text-[var(--muted-foreground)] mt-2 sm:mt-3 text-sm sm:text-base">
              {info.description}
            </p>
          )}
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-[var(--border)]" />
          </div>
          <div className="relative flex justify-center text-xs uppercase sm:text-sm">
            <span className="bg-[var(--background)] px-3 text-[var(--muted-foreground)]">
              <h4 className="text-2xl font-ghibi-bold tracking-tight text-[var(--primary)]">
                {t("features_title", { defaultMessage: "Features" })}
              </h4>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 mt-2 sm:gap-4 sm:mt-3 md:grid-cols-2 lg:grid-cols-3 xl:gap-6">
          {features.map((feature: any) => (
            <Features
              key={feature.id}
              guild={id}
              feature={feature}
              enabled={info.enabledFeatures.includes(feature.id)}
              refetch={refetch}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function NotJoined({ guildId }: { guildId: string }) {
  const t = useTranslations("guilds");
  const g = useTranslations("common");
  const router = useRouter();
  const inviteUrl = `${config.inviteUrl}&guild_id=${guildId}&disable_guild_select=true`;

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-[var(--background)] font-ghibi">
      <section className="rounded-[var(--radius)] p-6 mb-8 border-2">
        <div className="flex flex-col items-center justify-center w-full gap-3">
          <div className="text-center text-2xl font-ghibi-bold text-[var(--primary)]">
            <Mailbox width={72} height={72} />
          </div>
          <h1 className="text-center text-2xl font-ghibi-bold text-[var(--primary)]">
            {t("bot_not_in_server", { defaultMessage: "Where is it?" })}
          </h1>
          <p className="text-sm text-[var(--muted-foreground)]">
            {t("bot_not_in_server_description", {
              defaultMessage:
                "The bot can't access the server, let's invite him!",
            })}
          </p>
          <div className="flex justify-between gap-3">
            <Button
              variant="outline"
              className="border-2 "
              onClick={() => router.back()}
            >
              {t("go_back", {
                defaultMessage: g("back", { defaultMessage: "Back" }),
              })}
            </Button>
            <Button
              className="border-2"
              onClick={() => {
                window.open(inviteUrl, "_blank");
              }}
            >
              {t("invite_bot", { defaultMessage: "Invite Bot" })}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

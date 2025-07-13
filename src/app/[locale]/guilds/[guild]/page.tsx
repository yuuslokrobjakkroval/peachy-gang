"use client";

import React from "react";
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
    <div className="flex flex-col gap-4 py-4 md:gap-8 md:p-6 font-ghibi">
      <div className="w-full">
        <div className="flex gap-2">
          <CircleArrowLeft
            className="text-2xl font-semibold tracking-tight text-[var(--primary)] mt-2 cursor-pointer"
            onClick={() => router.back()}
          />
          <h4 className="text-2xl font-ghibi-bold tracking-tight text-[var(--primary)] mt-1.5">
            {toCapitalCase(info.name)}
            <span className="w-full border-t border-[var(--border)]" />
          </h4>
        </div>

        <div className="mt-3 mb-6">
          <Separator className="text-[var(--card-foreground)]" />
        </div>

        <div className="relative mb-6">
          {/* Background and profile */}
          <Card className="p-4">
            <div
              className="flex w-full bg-cover h-48 sm:h-32 md:h-56 lg:h-64 xl:h-[480px] rounded-xl"
              style={backgroundStyle}
            >
              <div className="absolute -translate-x-1/2 -bottom-12 left-18">
                <div className="relative w-[96px] h-[96px]">
                  {/* Avatar */}
                  <div className="relative w-[87px] h-[87px] rounded-full border-[4px] border-[var(--background)] bg-[var(--accent)] dark:!border-[var(--sidebar)] overflow-hidden ml-3">
                    <Image
                      src={iconUrl(info)}
                      alt={t("server_icon_alt", {
                        defaultMessage: "Server Icon",
                      })}
                      width={128}
                      height={128}
                      className="object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-12 mb-3">
          {info?.description && (
            <p className="text-[var(--muted-foreground)] mt-3">
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

        <div className="grid grid-cols-1 gap-4 mt-3 md:grid-cols-3">
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
      <section className="rounded-[var(--radius)] p-6 mb-8 border-2 shadow-primary">
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
              className="border-2 shadow-primary"
              onClick={() => router.back()}
            >
              {t("go_back", {
                defaultMessage: g("back", { defaultMessage: "Back" }),
              })}
            </Button>
            <Button
              className="border-2 shadow-primary"
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

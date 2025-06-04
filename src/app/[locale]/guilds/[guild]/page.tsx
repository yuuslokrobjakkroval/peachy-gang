"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useGetGuildInfoQuery } from "@/redux/api/guild";
import {
  bannerUrl,
  getFeatures,
  iconUrl,
  toCapitalCase,
  UserInfo,
} from "@/utils/common";
import Features from "@/components/features";
import { Button } from "@/components/ui/button";
import { config } from "@/utils/config";
import { CircleArrowLeft, Mailbox } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getAbsoluteUrl } from "@/utils/get-absolute-url";
import Image from "next/image";
import Loading from "@/components/loading/circle";
import { BackgroundMask } from "@tsparticles/engine";
import { usePeachy } from "@/contexts/peachy";

export default function FeaturesPage() {
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
      <div className="w-full h-screen flex items-center justify-center bg-[var(--peach-bg)] text-[var(--peach-foreground)]">
        Oops, something went wrong. Please try again!
      </div>
    );
  }

  return (
    <SidebarProvider>
      {/* <FeatureSidebar /> */}
      <SidebarInset>
        {guild ? (
          <GuildPanel guild={guildId} info={guild} refetch={refetch} />
        ) : (
          <NotJoined guild={guildId} />
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
  const { userInfoByDiscord }: { userInfoByDiscord: any } = usePeachy();
  const router = useRouter();
  const features = getFeatures();

  const backgroundStyle = info.banner
    ? {
        background: `url(${bannerUrl(info.id, info.banner)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {
        backgroundColor: `${userInfoByDiscord.banner_color}`,
      };

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-8 md:p-6">
      <div className="w-full">
        <div className="flex gap-2">
          <CircleArrowLeft
            className="text-2xl font-semibold tracking-tight text-primary mt-2 cursor-pointer"
            onClick={() => router.back()}
          />
          <h4 className="text-2xl font-semibold tracking-tight text-primary mt-1.5">
            {toCapitalCase(info.name)}
            <span className="w-full border-t border-border" />
          </h4>
        </div>

        <div className="mt-3 mb-6">
          <Separator className="text-card-foreground" />
        </div>

        <div className="relative mb-6">
          {/* Background and profile */}
          <div
            className="relative mt-1 flex w-full rounded-xl bg-cover h-[clamp(160px,20vw,300px)]"
            style={backgroundStyle}
          >
            <div className="absolute -bottom-12 left-18 -translate-x-1/2">
              <div className="relative w-[96px] h-[96px]">
                {/* Avatar */}
                <div className="relative w-[87px] h-[87px] rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700 overflow-hidden">
                  <Image
                    src={iconUrl(info)}
                    alt="Profile Avatar"
                    width={128}
                    height={128}
                    className="rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 mb-3">
          {info?.description && (
            <p className="text-muted-foreground mt-3">{info.description}</p>
          )}
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs sm:text-sm uppercase">
            <span className="bg-background px-3 text-muted-foreground">
              <h4 className="text-2xl font-semibold tracking-tight text-primary">
                FEATURES
              </h4>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          {features.map((feature) => (
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

function NotJoined({ guild }: { guild: string }) {
  const router = useRouter();
  const inviteUrl = config.inviteUrl;

  return (
    <div className="flex min-h-svh w-full items-center justify-center">
      <section className="rounded-2xl p-6 mb-8">
        <div className="w-full items-center flex flex-col justify-center gap-3">
          <div className="text-center text-2xl font-semibold text-primary">
            <Mailbox width={72} height={72} />
          </div>
          <h1 className="text-center text-2xl font-semibold text-primary">
            Where is it?
          </h1>
          <p className="text-sm text-muted-foreground">
            The bot can't access the server, let's invite him!
          </p>
          <div className="flex justify-between gap-3">
            <Button variant="outline" onClick={() => router.back()}>
              Go Back
            </Button>
            <Button
              onClick={() => {
                // Redirect to the Discord invite URL
                window.location.href = inviteUrl;
              }}
            >
              Invite Bot
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

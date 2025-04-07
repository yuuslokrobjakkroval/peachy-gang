"use client";

import { usePathname, useRouter } from "next/navigation";
// import { FeatureSidebar } from "@/components/feature-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useGetGuildQuery } from "@/redux/api/guild";
import { LoadingPage } from "@/components/loading-page";
import { getFeatures } from "@/utils/common";
import { CustomGuildInfo } from "@/utils/types";
import Features from "@/components/features";
import { Button } from "@/components/ui/button";
import { config } from "@/utils/config";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function FeaturePage() {
  const pathname = usePathname();
  const currentPath = pathname.split("/").filter(Boolean);
  const guildIdIndex = currentPath.indexOf("guilds") + 1;
  const guildId =
    guildIdIndex > 0 && guildIdIndex < currentPath.length
      ? currentPath[guildIdIndex]
      : "";
  const { data: guild, isLoading, refetch } = useGetGuildQuery(guildId);
  console.log(guild);

  if (isLoading) <LoadingPage />;
  return (
    <SidebarProvider>
      {/* <FeatureSidebar /> */}
      <SidebarInset>
        {!!guild ? (
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
  info: CustomGuildInfo;
  refetch: () => void;
}) {
  const features = getFeatures();
  return (
    <div className="flex min-h-screen w-full flex-col items-center md:p-10">
      <div className="w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-600">
          FEATURES
        </h1>
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
  return (
    <div className="flex min-h-svh w-full items-center justify-center">
      <section className="rounded-2xl p-6 mb-8">
        {/* <Icon as={BsMailbox} className="w-12 h-12" />
          <Text className="text-xl font-semibold text-center">
            Guild not found
          </Text>
          <Text className="text-center text-gray-500">
            The guild you are looking for could not be found. Please check the
            invite link or try again.
          </Text>
          */}
        <Button
          size="lg"
          onClick={() => router.push(`${config.inviteUrl}&guild_id=${guild}`)}
        >
          Invite Bot
        </Button>
      </section>
    </div>
  );
}

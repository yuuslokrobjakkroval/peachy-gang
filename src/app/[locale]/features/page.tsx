"use client";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useGetGuildQuery } from "@/redux/api/guild";
import { getFeatures, iconUrl, toCapitalCase } from "@/utils/common";
import Features from "@/components/features";
import { Button } from "@/components/ui/button";
import { config } from "@/utils/config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleArrowLeft, Mailbox } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getAbsoluteUrl } from "@/utils/get-absolute-url";
import { usePeachy } from "@/contexts/peachy";
import Loading from "@/components/loading/circle";

export default function FeaturesPage() {
  const t = useTranslations();
  const { guildId } = usePeachy();
  const { data: guild, isLoading, refetch } = useGetGuildQuery(guildId);

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loading />
          <p className="mt-4 text-sm text-muted-foreground">
            {t("common.loading")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
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
  info: any;
  refetch: () => void;
}) {
  const t = useTranslations();
  const router = useRouter();
  const features = getFeatures();

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-8 md:p-6">
      <div className="w-full">
        <div className="flex gap-2">
          <CircleArrowLeft
            className="mt-2 text-2xl font-semibold tracking-tight cursor-pointer text-primary"
            onClick={() => router.back()}
          />
          <Avatar className="mt-0.5 ml-1">
            <AvatarImage
              src={iconUrl(info) || "/placeholder.svg"}
              alt={toCapitalCase(info.name)}
            />
            <AvatarFallback className="bg-muted text-foreground">
              {toCapitalCase(info.name)}
            </AvatarFallback>
          </Avatar>
          <h4 className="mt-1 text-2xl font-semibold tracking-tight text-primary">
            {toCapitalCase(info.name)}
            <span className="w-full border-t border-border" />
          </h4>
        </div>

        <div className="mt-3 mb-3">
          {info?.description && (
            <p className="flex flex-col text-muted-foreground">
              {info.description}
            </p>
          )}
        </div>

        <div className="mt-3 mb-6">
          <Separator className="text-card-foreground" />
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase sm:text-sm">
            <span className="px-3 bg-background text-muted-foreground">
              <h4 className="text-2xl font-semibold tracking-tight text-primary">
                {t("features.title")}
              </h4>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mt-3 md:grid-cols-3">
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
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const redirectUrl = `${getAbsoluteUrl()}${pathname}`;
  const inviteUrl = `${config.inviteUrl}&scope=bot&guild_id=${guild}&permissions=8&redirect_uri=${encodeURIComponent(
    `${getAbsoluteUrl()}/api/invite/callback`
  )}&response_type=code&state=${encodeURIComponent(redirectUrl)}`;

  return (
    <div className="flex items-center justify-center w-full min-h-svh">
      <section className="p-6 mb-8 rounded-2xl">
        <div className="flex flex-col items-center justify-center w-full gap-3">
          <div className="text-2xl font-semibold text-center text-primary">
            <Mailbox width={72} height={72} />
          </div>
          <h1 className="text-2xl font-semibold text-center text-primary">
            {t("guilds.bot_not_in_server")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("guilds.bot_not_in_server_description")}
          </p>
          <div className="flex justify-between gap-3">
            <Button variant="outline" onClick={() => router.back()}>
              {t("guilds.go_back")}
            </Button>
            <Button onClick={() => (window.location.href = inviteUrl)}>
              {t("guilds.invite_bot")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

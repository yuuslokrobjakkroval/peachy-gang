"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { config } from "@/utils/config";
import { Mailbox } from "lucide-react";

export default function NotJoined({ guildId }: { guildId: string | null }) {
  const t = useTranslations("guilds");
  const g = useTranslations("common");
  const router = useRouter();
  const inviteUrl = `${config.inviteUrl}&guild_id=${guildId}&disable_guild_select=true`;

  return (
    <section className="rounded-[var(--radius)] p-6 mb-8">
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
  );
}

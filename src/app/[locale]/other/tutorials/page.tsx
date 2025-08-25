"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { YouTubePlayer } from "@/components/ui/youtube-video-player";

export default function TutorialVideo() {
  const t = useTranslations("tutorial_video");

  return (
    <div className="relative w-full px-2 overflow-hidden rounded-lg sm:px-4 md:px-6">
      <div className="@container/main flex flex-1 flex-col gap-4 sm:gap-6">
        <div className="flex flex-col gap-4 py-4">
          <div className="px-2 sm:px-4 lg:px-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl tracking-tight sm:text-4xl font-ghibi-bold text-foreground">
                {t("title")}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                {t("title_description")}
              </p>
            </div>

            {/* Bot Setup */}
            <section className="mt-4 space-y-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  Server Setup
                </h2>
                <p className="text-muted-foreground">
                  Setting up a Discord server with Peachy Bot is a breeze!
                </p>
                <p className="text-muted-foreground">
                  Follow these simple steps to get started and enjoy the full
                  range of features Peachy Bot has to offer.
                </p>
              </div>
              <div className="max-w-2xl">
                <YouTubePlayer
                  videoId="xWim3QiZmgA"
                  title="How TO SETUP DISCORD SERVER WITH PEACHY BOT"
                  customThumbnail="https://i.imgur.com/gGf68yF.jpg"
                />
              </div>
            </section>

            {/* Completed Quest */}
            <section className="mt-4 space-y-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  Completed Quest
                </h2>
                <p className="text-muted-foreground">
                  Learn how to complete Discord quests without playing or owning
                  the game
                </p>
                <p className="text-muted-foreground">
                  This tutorial covers both client and browser methods,
                  providing step-by-step instructions to help you earn rewards
                  easily.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <YouTubePlayer
                  videoId="PfiqI9FqCq0"
                  title="How to Complete Discord Quests With Client - PART 1"
                  customThumbnail="https://i.imgur.com/TapywM7.jpg"
                />
                <YouTubePlayer
                  videoId="WXL7H9YEV7o"
                  title="How to Complete Discord Quests With Browser - PART 2"
                  customThumbnail="https://i.imgur.com/v7hWbyh.jpg"
                />
              </div>
            </section>

            {/* Discord Orb */}
            <section className="mt-4 space-y-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  Discord Orb
                </h2>
                <p className="text-muted-foreground">
                  Discover how to use Discord Orb to enhance your server
                  experience.
                </p>
                <p className="text-muted-foreground">
                  This tutorial provides a comprehensive guide on setting up and
                  utilizing Discord Orb's features effectively.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <YouTubePlayer
                  videoId="YlSMDABhaRA"
                  title="FINALLY DISCORD RELEASE IT !!!"
                  customThumbnail="https://i.imgur.com/WeS9970.jpg"
                />
                <YouTubePlayer
                  videoId="Y06QQ0puJVs"
                  title="HOW TO GET ORB BADGE IN DISCORD"
                  customThumbnail="https://i.imgur.com/kHugvre.jpg"
                />
              </div>
            </section>

            {/* DNitro iscord */}
            <section className="mt-4 space-y-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  Claim Nitro Free
                </h2>
                <p className="text-muted-foreground">
                  Nitro is a premium subscription service offered by Discord
                  that
                </p>
                <p className="text-muted-foreground">
                  provides users with enhanced features and perks to elevate
                  their Discord experience.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <YouTubePlayer
                  videoId="vmpQRnUAAYo"
                  title="របៀប CLAIM FREE 1 MONTH NITRO | EPIC GAMES X DISCORD COLLAB"
                  customThumbnail="https://i.imgur.com/pCOA6ZR.jpg"
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

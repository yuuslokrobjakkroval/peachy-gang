"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { youtubeVideo } from "@/utils/config";
import { HeroVideoDialog } from "@/components/ui/Animations/magic/hero-video-dialog";

export default function Movies() {
  const t = useTranslations("movies");

  return (
    <div className="w-full max-w-5xl flex flex-1 flex-col py-8 px-4 sm:px-6 lg:px-8 relative font-handwritten">
      <div className="texture"></div>

      <div className="flex flex-1 flex-col gap-6 relative z-10">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl sm:text-4xl font-ghibi-bold tracking-tight text-foreground">
            {t("title")}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            {t("title_description")}
          </p>
        </div>

        {youtubeVideo?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {youtubeVideo.map((video: any) => (
              <div key={video.videoSrc} className="relative">
                <HeroVideoDialog
                  className="w-full h-[240px] sm:h-[280px]"
                  animationStyle="from-center"
                  videoSrc={video.videoSrc}
                  thumbnailSrc={video.thumbnailSrc}
                  thumbnailAlt={video.thumbnailAlt}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-base">
            {t("no_videos")}
          </p>
        )}
      </div>
    </div>
  );
}

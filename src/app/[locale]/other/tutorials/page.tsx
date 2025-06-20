"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { youtubeVideo } from "@/utils/config";
import { HeroVideoDialog } from "@/components/animations/magicui/hero-video-dialog";

export default function TutorialVideo() {
  const t = useTranslations("tutorial_video");

  return (
    <div className="w-full flex flex-1 flex-col py-8 px-4 sm:px-6 lg:px-8 relative font-handwritten">
      {/* Texture Background */}
      <div className="texture"></div>

      <div className="flex flex-1 flex-col gap-6 relative z-10">
        {/* Page Header */}
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl sm:text-4xl font-ghibi-bold tracking-tight text-foreground">
            {t("title")}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            {t("title_description")}
          </p>
        </div>

        {/* Video Section */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {youtubeVideo?.map((video: any) => (
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
      </div>
    </div>
  );
}

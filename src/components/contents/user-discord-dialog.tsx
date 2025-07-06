"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  ExternalLink,
  Youtube,
  Github,
  Calendar,
  MapPin,
  Star,
  Trophy,
  Code,
  Gamepad2,
  Globe,
  Facebook,
  Edit,
  MoreHorizontal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetUserInfoQuery } from "@/redux/api/users";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Loading from "../loading/circle";
import {
  avatarUrl,
  bannerUrl,
  decorationUrl,
  clanUrl,
  toCapitalCase,
  nameplateUrl,
} from "@/utils/common";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa6";

export default function UserDiscordDailog({ user, open, onCancel }: any) {
  const t = useTranslations();
  const { data: userInfo, isLoading } = useGetUserInfoQuery(
    {
      id: user?.discordId,
    },
    {
      skip: !user?.discordId,
    }
  );

  const backgroundStyle = userInfo?.banner
    ? {
        background: `url(${bannerUrl(userInfo?.id, userInfo?.banner)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : { backgroundColor: userInfo?.banner_color };

  if (isLoading) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <Loading />
          <p className="mt-4 text-sm text-muted-foreground">
            {t("dashboard.loading")}
          </p>
        </div>
      </div>
    );
  }
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="max-w-md h-[800px]">
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>
              {userInfo?.global_name || userInfo?.username}
            </DialogTitle>
          </VisuallyHidden>
        </DialogHeader>
        {/* Avatar with decoration */}
        <div
          className="relative w-full h-36 rounded-lg bg-cover bg-center"
          style={backgroundStyle}
        >
          <div className="absolute -bottom-12 ml-3">
            {/* Decoration and Avatar Wrapper */}
            <div className="relative w-[96px] h-[96px] flex items-center justify-center">
              {/* Avatar */}
              <div className="relative w-[87px] h-[87px] rounded-full border-[4px] overflow-hidden">
                <Image
                  src={avatarUrl(userInfo) || "/placeholder.svg"}
                  alt="Profile Avatar"
                  width={88}
                  height={88}
                  className="rounded-full object-cover"
                />
              </div>

              {/* Avatar Decoration */}
              {userInfo?.avatar_decoration_data?.asset && (
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <Image
                    src={
                      decorationUrl(userInfo?.avatar_decoration_data) ||
                      "/placeholder.svg"
                    }
                    alt="Avatar Decoration"
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>
              )}
            </div>

            {/* Status message */}
            {/* <div className="absolute rounded-lg p-3 mb-4 max-w-xs ml-16">
              <p className="text-sm text-center">
                🌸 People come and go in our life but memories...
              </p>
            </div> */}
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="flex items-center mt-3">
              {userInfo?.collectibles?.nameplate && (
                <div
                  className="relative w-full h-14 rounded-md overflow-hidden flex items-center px-4 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${nameplateUrl(userInfo?.collectibles?.nameplate)})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              )}

              {/* Username & Display Name */}
              <h2 className="text-2xl font-extrabold text-white drop-shadow-sm">
                {userInfo?.global_name || userInfo?.username}
              </h2>
            </div>
            <p className="text-sm">
              @{userInfo?.username} • He/Him •{" "}
              {userInfo?.clan?.tag && (
                <Badge className="bg-purple-600/80 text-white border-purple-400">
                  <Image
                    className="rounded-xs object-cover"
                    src={clanUrl(userInfo)}
                    alt={toCapitalCase(userInfo.clan.tag)}
                    width={12}
                    height={12}
                    priority
                    sizes="(max-width: 12px) 50vw, 12px"
                  />
                  <span className="mt-0.5">{userInfo.clan.tag}</span>
                </Badge>
              )}
            </p>

            {/* Edit Profile button */}
          </div>
          <div>
            <Button className="rounded-lg px-4 mb-4 ml-auto">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>

        <div>
          {/* Tabs */}
          <Tabs defaultValue="about" className="mt-[-15px]">
            <TabsList className="bg-transparent border-b border-white/20 rounded-none p-0 h-auto w-full justify-start">
              <TabsTrigger
                value="about"
                className="bg-transparent text-white/70 data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-white rounded-none pb-2"
              >
                About Me
              </TabsTrigger>
              {/* <TabsTrigger
                value="activity"
                className="bg-transparent text-white/70 data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-white rounded-none pb-2"
              >
                Activity
              </TabsTrigger> */}
            </TabsList>

            <TabsContent value="about" className="mt-2 space-y-2">
              {/* Social Links */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FaDiscord className="w-4 h-4 mt-0.5 text-white/80" />
                  <div>
                    <p className="text-white/90 text-sm font-medium">Discord</p>
                    <p className="text-white/60 text-xs">
                      https://link.to/peachy.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Facebook className="w-4 h-4 mt-0.5 text-white/80" />
                  <div>
                    <p className="text-white/90 text-sm font-medium">
                      Facebook
                    </p>
                    <p className="text-white/60 text-xs">
                      https://link.to/fb.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Youtube className="w-4 h-4 mt-0.5 text-white/80" />
                  <div>
                    <p className="text-white/90 text-sm font-medium">YouTube</p>
                    <p className="text-white/60 text-xs">
                      https://link.to/yt.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 mt-0.5 text-white/80" />
                  <div>
                    <p className="text-white/90 text-sm font-medium">Website</p>
                    <p className="text-white/60 text-xs">
                      https://peachygang.xyz/en
                    </p>
                  </div>
                </div>
              </div>

              {/* Member Since */}
              {/* <div className="pt-2">
                <h3 className="text-white font-medium mb-2">Member Since</h3>
                <p className="text-white/70">21 Apr 2022</p>
              </div> */}

              {/* Connections */}
              {/* <div className="flex pt-2">
                <h3 className="text-white font-medium mb-3">Connections</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-black/20 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <Github className="w-5 h-5 text-white" />
                      <div>
                        <p className="text-white text-sm font-medium">
                          yuusloukrobjakkroval
                        </p>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="text-white/70 text-xs">✓</span>
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-white/70" />
                  </div>

                  <div className="flex items-center justify-between bg-black/20 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <Youtube className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="text-white text-sm font-medium">
                          PEACHYGANG
                        </p>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="text-white/70 text-xs">✓</span>
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-white/70" />
                  </div>
                </div>
              </div> */}

              {/* Note section */}
              <div className="pt-4">
                <h3 className="text-white/70 text-sm font-medium mb-2">
                  Note (only visible to you)
                </h3>
                <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-white/50 text-sm">Click to add a note</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-4">
              <div className="text-center py-8">
                <p className="text-white/70">No recent activity</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}

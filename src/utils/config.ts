import { AppConfig } from "./types";
import { PermissionFlags } from "@/utils/common";
import {
  CLIENT_ID,
  FIRST_SUB_CLIENT_ID,
  SECOND_SUB_CLIENT_ID,
} from "@/utils/auth/server";
import { Gamepad, Music } from "lucide-react";

export const ownerId: string[] = process.env.OWNER_IDS?.split(",").map((id) =>
  id.trim(),
) || ["966688007493140591", "946079190971732041"];

export const staffId: string[] = process.env.STAFF_IDS?.split(",").map((id) =>
  id.trim(),
) || ["765216076430180384", "1206564732388118558", "982564593039736842"];

// AppConfig definitions remain the same
export const config: AppConfig = {
  id: 0,
  name: "PEACHY",
  description: "Feeling lucky, hun?\nLet’s spin those reels! 🎰🍑",
  quote:
    "Get ready to strike it lucky with PEACHY! 🎰🍑 Spin those reels and watch the wins roll in—admin-approved excitement awaits! 🌸",

  icon: Gamepad,
  url: "https://i.imgur.com/b75yC08.jpg",
  banner: "https://i.imgur.com/kYXE4No.gif",
  inviteUrl: `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}`,
  guild: {
    filter: (guild) =>
      (Number(guild.permissions) & PermissionFlags.ADMINISTRATOR) !== 0,
  },
};

export const configPeach: AppConfig = {
  id: 1,
  name: "PEACH",
  description:
    "A vibrant music bot girl,\nbringing your favorite tunes to life!",
  quote:
    "Let PEACH serenade your server with vibrant tunes! 🎶 A music bot girl bringing your favorite melodies to life, one beat at a time. 🌺",
  icon: Music,
  url: "https://i.imgur.com/VoqnP9y.jpg",
  banner: "https://i.imgur.com/nDocQCG.gif",
  inviteUrl: `https://discord.com/oauth2/authorize?client_id=${FIRST_SUB_CLIENT_ID}`,
  guild: {
    filter: (guild) =>
      (Number(guild.permissions) & PermissionFlags.ADMINISTRATOR) !== 0,
  },
};

export const configGoma: AppConfig = {
  id: 2,
  name: "GOMA",
  description: "A cool music bot boy,\nrocking your server with epic beats!",
  quote:
    "Turn up the volume with GOMA! 🎸 This cool music bot boy delivers epic beats to rock your server—admin-powered grooves guaranteed! 🔥",
  icon: Music,
  url: "https://i.imgur.com/dzqPppx.jpg",
  banner: "https://i.imgur.com/eIdHzUJ.gif",
  inviteUrl: `https://discord.com/oauth2/authorize?client_id=${SECOND_SUB_CLIENT_ID}`,
  guild: {
    filter: (guild) =>
      (Number(guild.permissions) & PermissionFlags.ADMINISTRATOR) !== 0,
  },
};

export const CARD: AppConfig[] = [config, configPeach, configGoma];

export const youtubeVideo: any[] = [
  {
    videoSrc: "https://www.youtube.com/embed/PfiqI9FqCq0",
    thumbnailSrc:
      "https://i.ytimg.com/vi/PfiqI9FqCq0/hqdefault.jpg?sqp=-oaymwEnCPYBEIoBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLB09wJC3Jg0RJ2Bk2vb2FHuRjaUfA",
    thumbnailAlt:
      "How to Complete Discord Quests WITHOUT Playing or Owning The Game (Client) [UPDATED 2025] - PART 1",
  },
  {
    videoSrc: "https://www.youtube.com/embed/WXL7H9YEV7o",
    thumbnailSrc:
      "https://i.ytimg.com/vi/WXL7H9YEV7o/hqdefault.jpg?sqp=-oaymwEnCPYBEIoBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLC0pawJfMBX9iAT1pU8EZIaQdh23w",
    thumbnailAlt:
      "How to Complete Discord Quests WITHOUT Playing or Owning The Game (Browser) [UPDATED 2025] - PART 2",
  },
];

import { AppConfig } from "./types";
import { PermissionFlags } from "@/utils/common";
import {
  CLIENT_ID,
  FIRST_SUB_CLIENT_ID,
  SECOND_SUB_CLIENT_ID,
} from "@/utils/auth/server";
import { Gamepad, Music } from "lucide-react";

// AppConfig definitions remain the same
export const config: AppConfig = {
  id: 0,
  name: "PEACHY",
  description: "Feeling lucky, hun?\nLet’s spin those reels! 🎰🍑",
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

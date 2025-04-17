import { AppConfig } from "./types";
import { PermissionFlags } from "@/utils/common";
import {
  CLIENT_ID,
  FIRST_SUB_CLIENT_ID,
  SECOND_SUB_CLIENT_ID,
} from "@/utils/auth/server";
import { Gamepad, Music } from "lucide-react";

export const config: AppConfig = {
  id: 0,
  name: "𝐏𝐄𝐀𝐂𝐇𝐘",
  icon: Gamepad,
  url: "https://i.imgur.com/b75yC08.jpg",
  banner: "https://i.imgur.com/kYXE4No.gif",
  inviteUrl: `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}`,
  guild: {
    //filter guilds that user has no permissions to manage it
    filter: (guild) =>
      (Number(guild.permissions) & PermissionFlags.ADMINISTRATOR) !== 0,
  },
  categories: [
    "Actions",
    "Animals",
    "Bank",
    "Economy",
    "Emotes",
    "Fun",
    "Gambling",
    "Games",
    "Giveaways",
    "Information",
    "Inventory",
    "Profile",
    "Rank",
    "Socials",
    "Relationship",
    "Utility",
    "Work",
  ],
};

export const configPeach: AppConfig = {
  id: 1,
  name: "𝐏𝐄𝐀𝐂𝐇",
  icon: Music,
  url: "https://i.imgur.com/VoqnP9y.jpg",
  banner: "https://i.imgur.com/nDocQCG.gif",
  inviteUrl: `https://discord.com/oauth2/authorize?client_id=${FIRST_SUB_CLIENT_ID}`,
  guild: {
    //filter guilds that user has no permissions to manage it
    filter: (guild) =>
      (Number(guild.permissions) & PermissionFlags.ADMINISTRATOR) !== 0,
  },
  categories: ["Config", "Filters", "Info", "Music", "Playlist"],
};

export const configGoma: AppConfig = {
  id: 2,
  name: "𝐆𝐎𝐌𝐀",
  icon: Music,
  url: "https://i.imgur.com/dzqPppx.jpg",
  banner: "https://i.imgur.com/eIdHzUJ.gif",
  inviteUrl: `https://discord.com/oauth2/authorize?client_id=${SECOND_SUB_CLIENT_ID}`,
  guild: {
    //filter guilds that user has no permissions to manage it
    filter: (guild) =>
      (Number(guild.permissions) & PermissionFlags.ADMINISTRATOR) !== 0,
  },
  categories: ["Config", "Filters", "Info", "Music", "Playlist"],
};

export const CARD: any = [config, configGoma, configPeach];

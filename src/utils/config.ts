import { AppConfig } from "./types";
import { PermissionFlags } from "@/utils/common";
import {
  CLIENT_ID,
  FIRST_SUB_CLIENT_ID,
  SECOND_SUB_CLIENT_ID,
} from "@/utils/auth/server";

export const config: AppConfig = {
  id: 0,
  name: "𝐏𝐄𝐀𝐂𝐇𝐘",
  url: "https://i.imgur.com/b75yC08.jpg",
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
  name: "𝐏𝐄𝐀𝐂𝐇 𝐌𝐔𝐒𝐈𝐂",
  url: "https://i.imgur.com/VoqnP9y.jpg",
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
  name: "𝐆𝐎𝐌𝐀 𝐌𝐔𝐒𝐈𝐂",
  url: "https://i.imgur.com/dzqPppx.jpg",
  inviteUrl: `https://discord.com/oauth2/authorize?client_id=${SECOND_SUB_CLIENT_ID}`,
  guild: {
    //filter guilds that user has no permissions to manage it
    filter: (guild) =>
      (Number(guild.permissions) & PermissionFlags.ADMINISTRATOR) !== 0,
  },
  categories: ["Config", "Filters", "Info", "Music", "Playlist"],
};

export const CARD: any = [config, configGoma, configPeach];

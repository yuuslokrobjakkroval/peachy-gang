import { config } from "./config";
import { CustomFeatures, FeatureConfig } from "@/utils/types";
import { UseFeaturesConfig } from "@/utils/features";

export type IdFeature<K extends keyof CustomFeatures = keyof CustomFeatures> =
  FeatureConfig<K> & {
    id: K;
  };

export function getFeatures(): IdFeature<any>[] {
  const features = UseFeaturesConfig();
  return Object.entries(features).map(([k, v]) => {
    return {
      id: k,
      ...v,
    };
  });
}

export type UserInfo = {
  id: string;
  username: string;
  global_name: string;
  discriminator: string;
  avatar: string;
  email: string;
  mfa_enabled?: boolean;
  banner?: string;
  accent_color?: number;
  locale?: string;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
  avatar_decoration_data?: any;
};

export type Decoration = {
  sku_id: string;
  asset: string;
  expires_at: Date;
};

export type Guild = {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: string;
};

export type IconHash = string;

export enum PermissionFlags {
  CREATE_INSTANT_INVITE = 1 << 0,
  KICK_MEMBERS = 1 << 1,
  BAN_MEMBERS = 1 << 2,
  ADMINISTRATOR = 1 << 3,
  MANAGE_CHANNELS = 1 << 4,
  MANAGE_GUILD = 1 << 5,
  ADD_REACTIONS = 1 << 6,
  VIEW_AUDIT_LOG = 1 << 7,
  PRIORITY_SPEAKER = 1 << 8,
  STREAM = 1 << 9,
  VIEW_CHANNEL = 1 << 10,
  SEND_MESSAGES = 1 << 11,
  SEND_TTS_MESSAGES = 1 << 12,
  MANAGE_MESSAGES = 1 << 13,
  EMBED_LINKS = 1 << 14,
  ATTACH_FILES = 1 << 15,
  READ_MESSAGE_HISTORY = 1 << 16,
  MENTION_EVERYONE = 1 << 17,
  USE_EXTERNAL_EMOJIS = 1 << 18,
  VIEW_GUILD_INSIGHTS = 1 << 19,
  CONNECT = 1 << 20,
  SPEAK = 1 << 21,
  MUTE_MEMBERS = 1 << 22,
  DEAFEN_MEMBERS = 1 << 23,
  MOVE_MEMBERS = 1 << 24,
  USE_VAD = 1 << 25,
  CHANGE_NICKNAME = 1 << 26,
  MANAGE_NICKNAMES = 1 << 27,
  MANAGE_ROLES = 1 << 28,
  MANAGE_WEBHOOKS = 1 << 29,
  MANAGE_EMOJIS_AND_STICKERS = 1 << 30,
  USE_APPLICATION_COMMANDS = 1 << 31,
  // REQUEST_TO_SPEAK = 1 << 32,
  // MANAGE_EVENTS = 1 << 33,
  // MANAGE_THREADS = 1 << 34,
  // CREATE_PUBLIC_THREADS = 1 << 35,
  // CREATE_PRIVATE_THREADS = 1 << 36,
  // USE_EXTERNAL_STICKERS = 1 << 37,
  // SEND_MESSAGES_IN_THREADS = 1 << 38,
  // USE_EMBEDDED_ACTIVITIES = 1 << 39,
  // MODERATE_MEMBERS = 1 << 40,
}

export enum ChannelTypes {
  GUILD_TEXT = 0,
  DM = 1,
  GUILD_VOICE = 2,
  GROUP_DM = 3,
  GUILD_CATEGORY = 4,
  GUILD_ANNOUNCEMENT = 5,
  ANNOUNCEMENT_THREAD = 10,
  PUBLIC_THREAD = 11,
  PRIVATE_THREAD = 12,
  GUILD_STAGE_VOICE = 13,
  GUILD_DIRECTORY = 14,
  GUILD_FORUM = 15,
}

export type BotApplicationInfo = {
  id: string;
  name: string;
  icon: string;
  description: string;
  bot_public: boolean;
  bot_require_code_grant: boolean;
  verify_key: string;
  owner: {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
  };
  flags: number;
};

export function getOwnerGuild(guilds: Guild[]) {
  return guilds?.filter((guild) => config.guild.filter(guild));
}

export function toNumber(num: number): string {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function toCapitalCase(text: string): string {
  return text
    .split(/[\s-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function toUpperCase(text: string): string {
  return text
    .split(/[\s-_]+/)
    .map((word) => word.toUpperCase())
    .join(" ");
}

export function toRGB(num: number) {
  num >>>= 0;
  const b = num & 0xff,
    g = (num & 0xff00) >>> 8,
    r = (num & 0xff0000) >>> 16;
  return "rgb(" + [r, g, b].join(",") + ")";
}

export const convertHexToRGBA = (hexCode: string, opacity = 1) => {
  let hex = hexCode.replace("#", "");
  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  if (opacity > 1 && opacity <= 100) {
    opacity = opacity / 100;
  }

  return `rgba(${r},${g},${b},${opacity})`;
};

export function durationToMs(duration: string): number | string {
  const timeUnits: { [key: string]: number } = {
    ms: 1,
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  const match = duration.toString().match(/^(\d+)(ms|s|m|h|d)$/i);
  if (match) {
    const value = parseInt(match[1], 10);
    const unit = match[2].toLowerCase();
    return value * timeUnits[unit];
  }

  const partialMatch = duration.match(/^(\d+)([a-zA-Z]*)$/);
  if (partialMatch) {
    return parseInt(partialMatch[1], 10);
  }

  return duration;
}

export function emojiToImage(emoji: string): string | null {
  const emojiRegex = /<(a)?:[a-zA-Z0-9_]+:(\d+)>/;
  const match = emoji.match(emojiRegex);
  if (match) {
    const emojiId = match[2];
    const isAnimated = match[1] === "a";
    return `https://cdn.discordapp.com/emojis/${emojiId}.${
      isAnimated ? "gif" : "png"
    }`;
  } else {
    return null;
  }
}

export function msToDuration(ms: number): string {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  ms %= 24 * 60 * 60 * 1000;
  const hours = Math.floor(ms / (60 * 60 * 1000));
  ms %= 60 * 60 * 1000;
  const minutes = Math.floor(ms / (60 * 1000));
  ms %= 60 * 1000;
  const seconds = Math.floor(ms / 1000);

  const parts = [];
  if (days) parts.push(`${days > 1 ? `${days} days` : `${days} day`}`);
  if (hours) parts.push(`${hours > 1 ? `${hours} hours` : `${hours} hour`}`);
  if (minutes)
    parts.push(`${minutes > 1 ? `${minutes} mins` : `${minutes} min`}`);
  if (seconds)
    parts.push(`${seconds > 1 ? `${seconds} seconds` : `${seconds} second`}`);
  if (!parts.length) parts.push(`${ms}ms`);

  return parts.join(" ");
}

export function parsePrize(prize: number | string): number {
  const multiplier: { [key: string]: number } = {
    k: 1000,
    m: 1000000,
    b: 1000000000,
    t: 1000000000000,
    q: 1000000000000000,
  };
  if (typeof prize === "string" && prize.match(/^\d+(\.\d+)?[kmbtq]$/i)) {
    const unit: string = prize.slice(-1).toLowerCase();
    const number = parseFloat(prize.slice(0, -1));
    return number * (multiplier[unit] || 1);
  }
  return typeof prize === "string" ? Number(prize) : prize;
}

export function formatCoin(num: number | string): string {
  if (typeof num === "string" && num.match(/\d+[kmbtq]/i)) {
    const multiplier: { [key: string]: number } = {
      k: 1000,
      m: 1000000,
      b: 1000000000,
      t: 1000000000000,
      q: 1000000000000000,
    };
    const unit: string = num.slice(-1).toLowerCase();
    const number = parseFloat(num.slice(0, -1));
    const val = number * (multiplier[unit] || 1);
    return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function formatCoinCompact(num: number | string): string {
  // Convert input to number if it's a string
  const value = typeof num === "string" ? parseFloat(num) : num;

  // Return original string if conversion fails or number is invalid
  if (isNaN(value)) return num.toString();

  if (value === 0) return "0";

  // Define thresholds and their corresponding suffixes
  const suffixes: { threshold: number; suffix: string }[] = [
    { threshold: 1000000000000, suffix: "T" }, // Trillion
    { threshold: 1000000000, suffix: "B" }, // Billion
    { threshold: 1000000, suffix: "M" }, // Million
    { threshold: 1000, suffix: "K" }, // Thousand
    { threshold: 0, suffix: "" }, // Less than thousand
  ];

  // Find the appropriate suffix
  for (const { threshold, suffix } of suffixes) {
    if (value >= threshold) {
      const formattedNum = value / threshold;

      // Handle decimal places
      if (formattedNum >= 10) {
        return Math.round(formattedNum) + suffix;
      } else {
        return formattedNum.toFixed(2).replace(/\.?0+$/, "") + suffix;
      }
    }
  }

  return value.toString();
}

export function getRandomElement(arr: any): any {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function iconUrl(guild: Guild) {
  if (guild?.icon?.startsWith("a")) {
    return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.gif`;
  } else {
    return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`;
  }
}

export function avatarUrl(user: UserInfo) {
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}?size=512`;
}

export function bannerUrl(id: string, banner: string): string {
  if (banner?.startsWith("a")) {
    return `https://cdn.discordapp.com/banners/${id}/${banner}.gif?size=1024`;
  } else {
    return `https://cdn.discordapp.com/banners/${id}/${banner}.png?size=1024`;
  }
}

export function decorationUrl(decoration: Decoration) {
  return `https://cdn.discordapp.com/avatar-decoration-presets/${decoration.asset}.png?size=128`;
}

export function emojiUrl(emoji: any): string {
  if (emoji?.identifier?.startsWith("a")) {
    return `https://cdn.discordapp.com/emojis/${emoji.id}.gif?size=128`;
  } else {
    return `https://cdn.discordapp.com/emojis/${emoji.id}.png?size=128`;
  }
}

export const getRandomEmoji = (): string => {
  const emojis: string[] = [
    "😊", // Smiling face
    "👍", // Thumbs up
    "✨", // Sparkles
    "🚀", // Rocket
    "🌟", // Glowing star
    "😎", // Cool face
    "🎉", // Party popper
    "❤️", // Red heart
    "😂", // Laughing face
    "🐾", // Paw prints
    "🌈", // Rainbow
    "🍕", // Pizza
    "🎸", // Guitar
    "☀️", // Sun
    "🌙", // Crescent moon
    "✈️", // Airplane
    "🎁", // Gift
    "🤓", // Nerd face
    "🍦", // Ice cream
    "🏆", // Trophy
    "🤗", // Hugging face
    "👾", // Alien monster
    "🍉", // Watermelon
    "🏝️", // Desert island
    "🐳", // Whale
    "🎨", // Artist palette
    "🦄", // Unicorn
    "🍔", // Hamburger
    "🔔", // Bell
    "🌸", // Cherry blossom
    "👻", // Ghost
    "🎤", // Microphone
    "🐼", // Panda
    "🍓", // Strawberry
    "⛄", // Snowman
    "🦋", // Butterfly
    "🎮", // Video game controller
    "🌮", // Taco
    "🧩", // Puzzle piece
    "⚡", // Lightning bolt
  ];
  return getRandomElement(emojis);
};

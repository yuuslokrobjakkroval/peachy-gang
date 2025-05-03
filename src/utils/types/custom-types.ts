/***
 * Custom types that should be configured by developer
 ***/

import { GuildInfo } from "./types";

export type CustomGuildInfo = GuildInfo & {};

/**
 * EmbedMessage type to match Discord EmbedBuilder structure
 */
export type EmbedMessage = {
  author?: {
    name: string;
    iconURL?: string;
    url?: string;
  };
  url?: string;
  color?: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  fields?: Array<{
    name: string;
    value: string;
    inline?: boolean;
  }>;
  image?: string;
  footer?: {
    text: string;
    iconURL?: string;
  };
};

export type ImageMessage = {
  layout?: string;
  feature?: string;
  avatarShape?: string;
  circleColor?: string;
  featureColor?: string;
  usernameColor?: string;
  messageColor?: string;
  backgroundImage?: string;
  message?: string;
};

/**
 * Define feature ids and their option types
 */
export type CustomFeatures = {
  "welcome-message": WelcomeMessageFeature;
  "auto-response": AutoResponseFeature;
  "booster-message": BoosterMessageFeature;
  "invite-tracker-message": InviteTrackerMessageFeature;
  "join-roles": JoinRolesFeature;
  "leveling-system": LevelingSystemFeature;
  "giveaway-schedule": GiveawayScheduleFeature;
  "goodbye-message": GoodByeMessageFeature;
};

/** Updated types using EmbedMessage */
export type WelcomeMessageFeature = {
  channel?: string;
  isActive?: boolean;
  isEmbed?: boolean;
  content?: string;
  message?: EmbedMessage;
  image?: ImageMessage;
};

export type AutoResponseFeature = {
  isActive?: boolean;
  autoresponse: {
    trigger?: string;
    response?: string;
  }[];
};

export type BoosterMessageFeature = {
  channel?: string;
  isActive?: boolean;
  isEmbed?: boolean;
  content?: string;
  message?: EmbedMessage;
  image?: ImageMessage;
};

export type InviteTrackerMessageFeature = {
  channel?: string;
  isActive?: boolean;
  isEmbed?: boolean;
  content?: string;
  message?: EmbedMessage;
  image?: ImageMessage;
};

export type JoinRolesFeature = {
  isActive?: boolean;
  userRoles: string[];
  botRoles: string[];
};

export type LevelingSystemFeature = {
  channel?: string;
  isActive?: boolean;
  content?: string;
};

export type GiveawayScheduleFeature = {
  channel?: string;
  date?: any;
  duration?: string;
  winner?: number;
  prize?: string;
  description?: string;
  isActive?: boolean;
};

export type GoodByeMessageFeature = {
  channel?: string;
  isActive?: boolean;
  isEmbed?: boolean;
  content?: string;
  message?: EmbedMessage;
  image?: ImageMessage;
};

export interface User {
  userId: string;
  username?: string;
  isDailyClaim?: boolean;
  balance?: {
    coin?: number;
    bank?: number;
    sponsor?: number;
    slots?: number;
    blackjack?: number;
    coinflip?: number;
    klaklouk?: number;
  };
  validation?: {
    isMultiTransfer?: boolean;
    isKlaKlouk?: boolean;
    [key: string]: any;
  };
  peachy?: {
    streak?: number;
    [key: string]: any;
  };
  goma?: {
    streak?: number;
    [key: string]: any;
  };
  profile?: Record<string, any>;
  relationship?: Record<string, any>;
  inventory?: Record<string, any>[];
  equip?: Record<string, any>[];
  consumedItems?: Record<string, any>[];
  cooldowns?: Record<string, any>[];
  social?: Record<string, any>;
  preferences?: Record<string, any>;
  activity?: Record<string, any>;
  achievements?: Record<string, any>[];
  createdAt?: Date;
  updatedAt?: Date;
}

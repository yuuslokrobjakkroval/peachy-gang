"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { UserInfo, Guild } from "@/utils/common";
import { User } from "@/utils/types";

// Define the context value type
interface PeachyContextType<T = any> {
  // USER
  userInfoByDiscord: UserInfo;
  setUserInfoByDiscord: (data: UserInfo) => void;

  userInfoByBot: User;
  setUserInfoByBot: (data: User) => void;

  // GUILD
  guilds: Guild[];
  setGuilds: (guilds: Guild[]) => void;

  guild: Guild;
  setGuild: (guild: Guild) => void;

  guildId: string;
  setGuildId: (guildId: string) => void;

  // FEATURE
  feature: string;
  setFeature: (feature: string) => void;

  // ACCOUNT
  account: any; // You might want to define a more specific type
  setAccount: (account: any) => void;
}

const PeachyContext = createContext<PeachyContextType<any> | undefined>(
  undefined,
);

// Props type for PeachyProvider
interface PeachyProviderProps {
  children: ReactNode;
}

export function PeachyProvider<T>({ children }: PeachyProviderProps) {
  // State for user info by discord
  const [userInfoByDiscord, setUserInfoByDiscord] = useState<UserInfo>(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("userInfoByDiscord");
      return storedData ? JSON.parse(storedData) : null;
    }
    return null;
  });

  // State for user info from bot
  const [userInfoByBot, setUserInfoByBot] = useState<User>(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("userInfoByBot");
      return storedData ? JSON.parse(storedData) : null;
    }
    return null;
  });

  // State for all guilds
  const [guilds, setGuilds] = useState<Guild[]>(() => {
    if (typeof window !== "undefined") {
      const storedGuilds = localStorage.getItem("guilds");
      return storedGuilds ? JSON.parse(storedGuilds) : [];
    }
    return [];
  });

  // State for guild info
  const [guild, setGuild] = useState<Guild>(() => {
    if (typeof window !== "undefined") {
      const storedGuild = localStorage.getItem("guild");
      return storedGuild ? JSON.parse(storedGuild) : null;
    }
    return null;
  });

  // State for guild id
  const [guildId, setGuildId] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const storedGuild = localStorage.getItem("guildId");
      return storedGuild ? JSON.parse(storedGuild) : null;
    }
    return null;
  });

  // State for feature name
  const [feature, setFeature] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const storedGuild = localStorage.getItem("feature");
      return storedGuild ? JSON.parse(storedGuild) : null;
    }
    return null;
  });

  // State for account
  const [account, setAccount] = useState<any>(() => {
    if (typeof window !== "undefined") {
      const storedAccount = localStorage.getItem("account");
      return storedAccount ? JSON.parse(storedAccount) : null;
    }
    return null;
  });

  // Sync user info by discord to localStorage
  useEffect(() => {
    if (userInfoByDiscord !== null) {
      localStorage.setItem(
        "userInfoByDiscord",
        JSON.stringify(userInfoByDiscord),
      );
    } else {
      localStorage.removeItem("userInfoByDiscord");
    }
  }, [userInfoByDiscord]);

  // Sync user info by bot to localStorage
  useEffect(() => {
    if (userInfoByBot !== null) {
      localStorage.setItem("userInfoByBot", JSON.stringify(userInfoByBot));
    } else {
      localStorage.removeItem("userInfoByBot");
    }
  }, [userInfoByBot]);

  // Sync all guilds to localStorage
  useEffect(() => {
    if (guilds.length > 0) {
      localStorage.setItem("guilds", JSON.stringify(guilds));
    } else {
      localStorage.removeItem("guilds");
    }
  }, [guilds]);

  // Sync guild info to localStorage
  useEffect(() => {
    if (!!guild) {
      localStorage.setItem("guild", JSON.stringify(guild));
    } else {
      localStorage.removeItem("guild");
    }
  }, [guild]);

  // Sync guild id to localStorage
  useEffect(() => {
    if (!!guildId) {
      localStorage.setItem("guildId", JSON.stringify(guildId));
    } else {
      localStorage.removeItem("guildId");
    }
  }, [guildId]);

  // Sync guild id to localStorage
  useEffect(() => {
    if (!!feature) {
      localStorage.setItem("feature", JSON.stringify(feature));
    } else {
      localStorage.removeItem("feature");
    }
  }, [feature]);

  // Sync account to localStorage
  useEffect(() => {
    if (account) {
      localStorage.setItem("account", JSON.stringify(account));
    } else {
      localStorage.removeItem("account");
    }
  }, [account]);

  return (
    <PeachyContext.Provider
      value={{
        // USER
        userInfoByDiscord,
        setUserInfoByDiscord,

        // USER BY BOT
        userInfoByBot,
        setUserInfoByBot,

        // ALL GUILD
        guilds,
        setGuilds,

        // GUILD INFO
        guild,
        setGuild,

        // GUILD ID
        guildId,
        setGuildId,

        // FEATURE
        feature,
        setFeature,

        // ACCOUNT
        account,
        setAccount,
      }}
    >
      {children}
    </PeachyContext.Provider>
  );
}

export function usePeachy<T>(): PeachyContextType<T> {
  const context = useContext(PeachyContext);
  if (!context) {
    throw new Error("usePeachy must be used within a PeachyProvider");
  }
  return context as PeachyContextType<T>;
}

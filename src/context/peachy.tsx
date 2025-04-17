// context/PeachyContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Guild } from "@/utils/common"; // Assuming you have a Guild type defined

// Define the context value type
interface PeachyContextType<T = any> {
  peachyInfo: T | null;
  setPeachyInfo: (data: T | null) => void;
  guilds: Guild[] | null; // Add guilds to the context
  setGuilds: (guilds: Guild[] | null) => void; // Add setGuilds function
}

// Create the context with a generic type, defaulting to undefined
const PeachyContext = createContext<PeachyContextType<any> | undefined>(
  undefined
);

// Props type for PeachyProvider
interface PeachyProviderProps {
  children: ReactNode;
}

export function PeachyProvider<T>({ children }: PeachyProviderProps) {
  // State for peachyInfo
  const [peachyInfo, setPeachyInfo] = useState<T | null>(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("peachyData");
      return storedData ? JSON.parse(storedData) : null;
    }
    return null;
  });

  // State for guilds
  const [guilds, setGuilds] = useState<Guild[] | []>(() => {
    if (typeof window !== "undefined") {
      const storedGuilds = localStorage.getItem("guildsData");
      return storedGuilds ? JSON.parse(storedGuilds) : [];
    }
    return [];
  });

  // Sync peachyInfo to localStorage
  useEffect(() => {
    if (peachyInfo !== null) {
      localStorage.setItem("peachyData", JSON.stringify(peachyInfo));
    } else {
      localStorage.removeItem("peachyData");
    }
  }, [peachyInfo]);

  // Sync guilds to localStorage
  useEffect(() => {
    if (guilds.length > 0) {
      localStorage.setItem("guildsData", JSON.stringify(guilds));
    } else {
      localStorage.removeItem("guildsData");
    }
  }, [guilds]);

  // Optional: Fetch guilds on mount (if you want to fetch them automatically)
  useEffect(() => {
    async function fetchGuilds() {
      try {
        const response = await fetch("YOUR_API_ENDPOINT/guilds");
        const data: Guild[] = await response.json();
        setGuilds(data);
      } catch (error) {
        console.error("Failed to fetch guilds:", error);
        setGuilds([]); // Handle error case
      }
    }

    // Only fetch if guilds haven't been set yet
    if (guilds === null && typeof window !== "undefined") {
      fetchGuilds();
    }
  }, [guilds]);

  return (
    <PeachyContext.Provider
      value={{
        peachyInfo,
        setPeachyInfo,
        guilds: guilds as Guild[],
        setGuilds: (newGuilds: Guild[] | null) => setGuilds(newGuilds ?? []),
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

"use client";
// context/PeachyContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define a generic type for the context value
interface PeachyContextType<T = any> {
  peachyInfo: T | null;
  setPeachyInfo: (data: T | null) => void;
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
  const [peachyInfo, setPeachyInfo] = useState<T | null>(() => {
    // On initial load, try to retrieve data from localStorage
    if (typeof window !== "undefined") {
      // Ensure this runs only on client-side
      const storedData = localStorage.getItem("peachyData");
      return storedData ? JSON.parse(storedData) : null;
    }
    return null;
  });

  // Sync data to localStorage whenever it changes
  useEffect(() => {
    if (peachyInfo !== null) {
      localStorage.setItem("peachyData", JSON.stringify(peachyInfo));
    } else {
      localStorage.removeItem("peachyData"); // Clear storage if data is null
    }
  }, [peachyInfo]);

  return (
    <PeachyContext.Provider value={{ peachyInfo, setPeachyInfo }}>
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

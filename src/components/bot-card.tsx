"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

let interval: any;

type Card = {
  id: number;
  name: string;
  designation: string;
  url?: string;
  categories?: string[];
  content: React.ReactNode;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    startFlipping();
    return () => clearInterval(interval);
  }, []);

  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop()!);
        return newArray;
      });
    }, 3000);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-3">
      {/* Card Stack */}
      <div className="relative w-full aspect-[16/9] min-h-[400px] md:min-h-[600px] lg:min-h-[800px]">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className={cn(
              "absolute w-full h-full rounded-xl p-4 sm:p-6 shadow-lg border border-[var(--border)]",
              "bg-[var(--card)] text-[var(--card-foreground)] overflow-hidden",
              "flex flex-col justify-between"
            )}
            style={{
              transformOrigin: "top center",
              backgroundImage: card.url ? `url(${card.url})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
          ></motion.div>
        ))}
      </div>

      {/* Categories Section */}
      {cards[0]?.categories && (
        <div className="mt-6 w-full max-w-md mx-auto">
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[var(--border)]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[var(--background)] px-2 text-[var(--muted-foreground)]">
                Command Categories
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
            {cards[0].categories.map((category, index) => (
              <div
                key={index}
                className={cn(
                  "bg-[var(--card)] bg-opacity-80 border border-[var(--border)]",
                  "rounded-[var(--radius)] p-2 sm:p-3 text-center text-xs sm:text-sm",
                  "font-medium text-[var(--card-foreground)]",
                  "hover:bg-opacity-100 transition-all duration-200"
                )}
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

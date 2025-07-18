"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Heart,
  Star,
  Sun,
  Moon,
  Cloud,
  Flower2,
  LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import confetti from "canvas-confetti";

type MemoryCard = {
  id: number;
  icon: LucideIcon;
  isMatched: boolean;
  color: string;
};

const createCards = () => {
  const iconConfigs = [
    { icon: Heart, color: "text-[var(--chart-1)]" },
    { icon: Star, color: "text-[var(--chart-2)]" },
    { icon: Sun, color: "text-[var(--chart-3)]" },
    { icon: Moon, color: "text-[var(--chart-4)]" },
    { icon: Cloud, color: "text-[var(--chart-5)]" },
    { icon: Flower2, color: "text-[var(--primary)]" },
  ];

  const cards: MemoryCard[] = [];

  iconConfigs.forEach(({ icon, color }, index) => {
    cards.push(
      { id: index * 2, icon, color, isMatched: false },
      { id: index * 2 + 1, icon, color, isMatched: false },
    );
  });

  return cards.sort(() => Math.random() - 0.5);
};

export default function MemoryGame() {
  const [cards, setCards] = useState<MemoryCard[]>(createCards());
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  const handleCardClick = (clickedIndex: number) => {
    if (isChecking || cards[clickedIndex].isMatched) return;
    if (flippedIndexes.includes(clickedIndex)) return;
    if (flippedIndexes.length === 2) return;

    const newFlipped = [...flippedIndexes, clickedIndex];
    setFlippedIndexes(newFlipped);

    if (newFlipped.length === 2) {
      setIsChecking(true);
      const [firstIndex, secondIndex] = newFlipped;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.icon === secondCard.icon) {
        setTimeout(() => {
          setCards(
            cards.map((card, index) =>
              index === firstIndex || index === secondIndex
                ? { ...card, isMatched: true }
                : card,
            ),
          );
          setFlippedIndexes([]);
          setMatches((m) => m + 1);
          setIsChecking(false);

          if (matches === cards.length / 2 - 1) {
            const end = Date.now() + 3 * 1000; // 3 seconds
            const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

            const frame = () => {
              if (Date.now() > end) return;

              confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                startVelocity: 60,
                origin: { x: 0, y: 0.5 },
                colors: colors,
              });
              confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                startVelocity: 60,
                origin: { x: 1, y: 0.5 },
                colors: colors,
              });

              requestAnimationFrame(frame);
            };

            frame();
            toast("🎉 Congratulations! You've found all the matches! 🎈", {
              position: "top-center",
              className:
                "bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary-border)]",
            });
          }
        }, 500);
      } else {
        setTimeout(() => {
          setFlippedIndexes([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setCards(createCards());
    setFlippedIndexes([]);
    setMatches(0);
    setIsChecking(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-8 bg-[var(--background)] text-[var(--foreground)] font-handwritten mt-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold text-[var(--primary)] animate-twinkle">
          Memory Match Game
        </h1>
        <p className="text-[var(--muted-foreground)]">
          Matches found: {matches} of {cards.length / 2}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 md:gap-6 rounded-[var(--radius)]">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ rotateY: 0 }}
            animate={{
              rotateY:
                card.isMatched || flippedIndexes.includes(index) ? 180 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="perspective-1000"
          >
            <Card
              className={`relative w-24 h-24 md:w-32 md:h-32 cursor-pointer transform-style-3d transition-all duration-300 border-2 ${
                card.isMatched
                  ? "bg-[var(--card)]/50 border-[var(--primary-border)] shadow-primary"
                  : flippedIndexes.includes(index)
                    ? "bg-[var(--secondary)]/50 border-[var(--secondary-border)] shadow-sm"
                    : "bg-[var(--card)] border-[var(--border)] hover:border-[var(--primary-border)] hover:bg-[var(--muted)] shadow-xs"
              }`}
              onClick={() => handleCardClick(index)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[var(--accent)]/10 to-[var(--foreground)]/5" />
              <AnimatePresence>
                {(card.isMatched || flippedIndexes.includes(index)) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div
                      className={`absolute inset-0 flex items-center justify-center backface-hidden border-${card.color}`}
                    >
                      <card.icon className={`w-12 h-12 ${card.color}`} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </div>

      <Button onClick={resetGame} variant="outline" size="lg">
        Start New Game
      </Button>
    </div>
  );
}

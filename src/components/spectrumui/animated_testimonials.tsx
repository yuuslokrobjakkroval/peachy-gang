"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { AppConfig } from "@/utils/types";

const AnimatedTestimonials = ({ cards }: { cards: AppConfig[] }) => {
  const [active, setActive] = useState(cards[0]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePrev = () => {
    const currentIndex = cards.indexOf(active);
    const length = cards.length;
    const prevIndex = (currentIndex - 1 + length) % length;
    setActive(cards[prevIndex]);
  };

  const handleNext = () => {
    const currentIndex = cards.indexOf(active);
    const length = cards.length;
    const nextIndex = (currentIndex + 1) % length;
    setActive(cards[nextIndex]);
  };

  const isActive = (index: number) => {
    return cards[index] === active;
  };

  const randomRotateY = () => {
    // Return 0 on the server, random value on the client
    return isClient ? Math.floor(Math.random() * 21) - 10 : 0;
  };

  return (
    <div className="flex flex-col grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto py-8">
      <div className="relative h-80 w-full">
        <AnimatePresence>
          {cards.map((card, index) => (
            <motion.div
              key={card.id || index}
              className="absolute inset-0 origin-bottom"
              initial={{
                opacity: 0,
                scale: 0.9,
                z: -100,
                rotateY: randomRotateY(),
              }}
              animate={{
                opacity: isActive(index) ? 1 : 0.7,
                scale: isActive(index) ? 1 : 0.95,
                z: isActive(index) ? 0 : -100,
                rotateY: isActive(index) ? 0 : randomRotateY(),
                zIndex: isActive(index) ? 999 : cards.length + 2 - index,
                y: isActive(index) ? [0, -80, 0] : 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                z: 100,
                rotateY: randomRotateY(),
              }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
            >
              <Image
                src={card.url}
                alt={card.name}
                width={1080}
                height={1080}
                draggable={false}
                className="rounded-3xl h-full w-full object-cover object-center"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div>
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active.id || active.name}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl text-primary font-bold">{active.name}</h3>
            <p className="text-md text-muted-foreground">
              {active.description}
            </p>
            <motion.p className="text-xl text-dark mt-8">
              {active.quote?.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word} 
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
        </div>
        <div className="flex gap-6 pt-5">
          <motion.div
            whileHover={{ scale: 1.1, transition: { duration: 0.6 } }}
            whileTap={{ scale: 0.95, transition: { duration: 0.5 } }}
            className="h-8"
          >
            <Button className="rounded h-full w-full" onClick={handlePrev}>
              <ArrowLeft />
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
            className="h-8"
          >
            <Button className="rounded h-full w-full" onClick={handleNext}>
              <ArrowRight />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedTestimonials;

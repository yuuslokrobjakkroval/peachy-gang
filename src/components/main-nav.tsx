"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = {
  delay: 0.1,
  bounce: 0,
  duration: 0.6,
};

export function MainNav() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-2">
      <motion.button
        variants={buttonVariants}
        initial={false}
        animate="animate"
        onClick={() => {
          router.push("/");
        }}
        transition={transition}
        className="relative flex items-center px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <div className="px-2">
          <Image
            src="/favicon.ico"
            alt="Peachy Logo"
            width={48}
            height={48}
            className="w-6 h-6 text-foreground"
          />
        </div>
        <AnimatePresence initial={false}>
          <motion.span
            variants={spanVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className="overflow-hidden"
          >
            PEACHY
          </motion.span>
        </AnimatePresence>
      </motion.button>
      <motion.button
        variants={buttonVariants}
        initial={false}
        animate="animate"
        onClick={() => {
          router.push("/admin/user-management");
        }}
        transition={transition}
        className="relative flex items-center px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <AnimatePresence initial={false}>
          <motion.span
            variants={spanVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className="overflow-hidden"
          >
            User Management
          </motion.span>
        </AnimatePresence>
      </motion.button>
      <motion.button
        variants={buttonVariants}
        initial={false}
        animate="animate"
        onClick={() => {
          router.push("/roles");
        }}
        transition={transition}
        className="relative flex items-center px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <AnimatePresence initial={false}>
          <motion.span
            variants={spanVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className="overflow-hidden"
          >
            Role Management
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

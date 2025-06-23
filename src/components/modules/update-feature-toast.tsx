"use client";

import React from "react";
import { Check, InfoIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Spinner } from "../loading/spinner";
import { Button } from "../ui/button";

interface ToastProps {
  state: "initial" | "loading" | "success";
  onReset?: () => void;
  onSave?: () => void;
}

const springConfig = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 1,
};

export function UpdateFeatureToast({ state = "initial", onReset, onSave }: ToastProps) {
  const commonClasses =
    "mt-6 h-12 bg-[var(--card)] rounded-[var(--radius)] shadow-sm border border-[var(--border)] justify-center items-center inline-flex overflow-hidden font-handwritten relative";

  return (
    <motion.div
      className={commonClasses}
      initial={false}
      animate={{ width: "auto" }}
      transition={springConfig}
    >
      <div className="absolute inset-0 opacity-0.12 mix-blend-multiply z-10" />
      <div className="flex items-center justify-between h-full px-3 relative z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={state}
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
          >
            {state === "loading" && (
              <>
                <Spinner variant="pinwheel" className="text-[var(--primary)]" />
                <div className="text-[var(--foreground)] text-[13px] font-normal leading-tight whitespace-nowrap">
                  Saving
                </div>
              </>
            )}
            {state === "success" && (
              <>
                <div className="p-0.5 bg-[var(--muted)] rounded-[var(--radius-sm)] shadow-sm border border-[var(--border)] justify-center items-center gap-1.5 flex overflow-hidden">
                  <Check className="w-3.5 h-3.5 text-[var(--primary)]" />
                </div>
                <div className="text-[var(--foreground)] text-[13px] font-normal leading-tight whitespace-nowrap">
                  Changes Saved
                </div>
              </>
            )}
            {state === "initial" && (
              <>
                <InfoIcon className="h-4 w-4" />
                <div className="text-[var(--foreground)] text-[13px] font-normal leading-tight whitespace-nowrap">
                  Unsaved changes
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          {state === "initial" && (
            <motion.div
              className="flex items-center h-12 gap-2 ml-2"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ ...springConfig, opacity: { duration: 0 } }}
            >
              <Button
                variant="ghost"
                onClick={onReset}
                className="h-7 px-3 rounded-[var(--radius)] justify-center items-center inline-flex overflow-hidden cursor-pointer transition-all duration-200"
              >
                Reset
              </Button>
              <Button
                onClick={onSave}
                className="h-7 px-3 rounded-[var(--radius)] justify-center items-center inline-flex overflow-hidden cursor-pointer transition-all duration-200"
              >
                Save
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

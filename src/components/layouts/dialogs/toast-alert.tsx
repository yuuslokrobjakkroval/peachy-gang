"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  Trophy,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { useEffect, useState } from "react";

interface ToastProps {
  variant?: "success" | "error" | "warning" | "information" | "winner" | "lose";
  message: string;
  className?: string;
  duration?: number; // Duration in milliseconds
}

export default function Toast({
  variant = "information",
  message,
  className,
  duration = 3000,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const variantStyles = {
    success: {
      icon: CheckCircle2,
      bg: "from-green-50 to-white dark:from-green-950/20 dark:to-zinc-950",
      iconBg: "from-green-500 via-emerald-500 to-teal-500",
      text: "text-green-900 dark:text-green-100",
      subText: "text-green-600 dark:text-green-300",
      badge: "from-green-500/10 via-emerald-500/10 to-teal-500/10",
      ring: "ring-green-500/20 dark:ring-green-400/20",
    },
    error: {
      icon: XCircle,
      bg: "from-red-50 to-white dark:from-red-950/20 dark:to-zinc-950",
      iconBg: "from-red-500 via-rose-500 to-pink-500",
      text: "text-red-900 dark:text-red-100",
      subText: "text-red-600 dark:text-red-300",
      badge: "from-red-500/10 via-rose-500/10 to-pink-500/10",
      ring: "ring-red-500/20 dark:ring-red-400/20",
    },
    warning: {
      icon: AlertTriangle,
      bg: "from-yellow-50 to-white dark:from-yellow-950/20 dark:to-zinc-950",
      iconBg: "from-yellow-500 via-amber-500 to-orange-500",
      text: "text-yellow-900 dark:text-yellow-100",
      subText: "text-yellow-600 dark:text-yellow-300",
      badge: "from-yellow-500/10 via-amber-500/10 to-orange-500/10",
      ring: "ring-yellow-500/20 dark:ring-yellow-400/20",
    },
    information: {
      icon: Info,
      bg: "from-blue-50 to-white dark:from-blue-950/20 dark:to-zinc-950",
      iconBg: "from-blue-500 via-indigo-500 to-purple-500",
      text: "text-blue-900 dark:text-blue-100",
      subText: "text-blue-600 dark:text-blue-300",
      badge: "from-blue-500/10 via-indigo-500/10 to-purple-500/10",
      ring: "ring-blue-500/20 dark:ring-blue-400/20",
    },
    winner: {
      icon: Trophy,
      bg: "from-violet-50 to-white dark:from-violet-950/20 dark:to-zinc-950",
      iconBg: "from-fuchsia-500 via-violet-500 to-indigo-500",
      text: "text-violet-900 dark:text-violet-100",
      subText: "text-violet-600 dark:text-violet-300",
      badge: "from-fuchsia-500/10 via-violet-500/10 to-indigo-500/10",
      ring: "ring-violet-500/20 dark:ring-violet-400/20",
    },
    lose: {
      icon: XCircle,
      bg: "from-gray-50 to-white dark:from-gray-950/20 dark:to-zinc-950",
      iconBg: "from-gray-500 via-slate-500 to-zinc-500",
      text: "text-gray-900 dark:text-gray-100",
      subText: "text-gray-600 dark:text-gray-300",
      badge: "from-gray-500/10 via-slate-500/10 to-zinc-500/10",
      ring: "ring-gray-500/20 dark:ring-gray-400/20",
    },
  };

  const Icon = variantStyles[variant].icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className={cn("w-full max-w-sm fixed top-4 right-4 z-50", className)}
        >
          <div
            className={cn(
              "relative overflow-hidden",
              variantStyles[variant].bg,
              "border border-violet-100 dark:border-violet-900/50",
              "shadow-[0_1px_6px_0_rgba(139,92,246,0.06)]",
              "rounded-xl p-4",
            )}
          >
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ rotate: -15, scale: 0.5 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <div
                  className={cn(
                    "p-2.5 rounded-xl",
                    variantStyles[variant].iconBg,
                    "dark:from-fuchsia-600 dark:via-violet-600 dark:to-indigo-600",
                  )}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>
              </motion.div>

              <div className="space-y-1">
                <motion.h3
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className={cn("font-medium", variantStyles[variant].text)}
                >
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className={cn("text-sm", variantStyles[variant].subText)}
                >
                  {message}
                </motion.p>
              </div>
            </div>

            {/* Confetti effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -left-2 -top-2 h-16 w-16 rounded-full bg-fuchsia-400 dark:bg-fuchsia-600/30 blur-2xl opacity-20" />
              <div className="absolute top-2 right-8 h-12 w-12 rounded-full bg-violet-400 dark:bg-violet-600/30 blur-2xl opacity-20" />
              <div className="absolute -right-2 -bottom-2 h-16 w-16 rounded-full bg-indigo-400 dark:bg-indigo-600/30 blur-2xl opacity-20" />
            </div>

            {/* Variant badge */}
            <div className="absolute top-4 right-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.3,
                }}
                className={cn(
                  "text-[11px] font-medium",
                  "px-2.5 py-0.5 rounded-full",
                  variantStyles[variant].badge,
                  variantStyles[variant].ring,
                  variantStyles[variant].text,
                )}
              >
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

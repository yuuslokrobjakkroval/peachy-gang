"use client";

import { CardStack } from "@/components/bot-card";
import { cn } from "@/lib/utils";
import { CARD } from "@/utils/config";

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

export default function FeaturePage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center">
      {/* <CardStack items={CARD} /> */}
      FEATURE PAGES
    </div>
  );
}

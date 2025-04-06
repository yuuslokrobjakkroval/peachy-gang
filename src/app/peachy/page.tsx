"use client";

import { CardStack } from "@/components/bot-card";
import { CARD } from "@/utils/config";

export default function PeachyPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center">
      <CardStack items={CARD} />
    </div>
  );
}

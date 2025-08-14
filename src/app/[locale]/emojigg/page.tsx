import React from "react";
import EmojiGgClient from "./components/EmojiGgClient";

interface Emoji {
  id: number;
  title: string;
  image: string;
}

interface Pack {
  id: number;
  name: string;
  description: string;
  emojis: string[];
  amount: number;
  slug: string;
  tags: string[];
}

export default async function EmojiGgPage() {
  // Fetch emojis and packs data server-side
  const [emojisRes, packsRes] = await Promise.all([
    fetch("https://emoji.gg/api", { cache: "no-store" }),
    fetch("https://emoji.gg/api/packs", { cache: "no-store" }),
  ]);

  if (!emojisRes.ok || !packsRes.ok) {
    throw new Error("Failed to fetch data");
  }

  const emojis: Emoji[] = await emojisRes.json();
  const packs: Pack[] = await packsRes.json();

  return <EmojiGgClient emojis={emojis} packs={packs} />;
}

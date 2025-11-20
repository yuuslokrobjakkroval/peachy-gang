"use client";

import {
  Terminal,
  TypingAnimation,
} from "@/components/ui/Animations/magic/terminal";
import React, { useState } from "react";

// Dummy env data for demonstration
const envData = {
  production: {
    "PEACHY BOT": `BOT_TOKEN=prod-xxx\nBOT_URL=https://prod.bot.com`,
    "PEACHY GANG": `GANG_KEY=prod-yyy\nGANG_URL=https://prod.gang.com`,
    "PEACHY GANG BACKEND": `BACKEND_SECRET=prod-zzz\nBACKEND_URL=https://prod.backend.com`,
  },
  local: {
    "PEACHY BOT": {
      TOKEN:
        "",
      PREFIX: "P",
      OWNER_IDS: "",
      STAFF_IDS: "",
      BANKACCOUNT_ID: "",
      CLIENT_ID: "",
      CLIENT_SECRET: "",
      GUILD_ID: "",
      PRODUCTION: "true",
      DATABASE_URL: "",
      GEMINI_API_KEY: "",
    },
    "PEACHY GANG": {
      APP_URL: "http://localhost:3000",
      OWNER_IDS: "",
      STAFF_IDS: "",
      NEXT_PUBLIC_API_ENDPOINT: "http://localhost:8080",
      BOT_CLIENT_ID: "",
      BOT_CLIENT_SECRET: "",
      FIRST_SUB_BOT_CLIENT_ID: "",
      SECOND_SUB_BOT_CLIENT_ID: "",
      DATABASE_URL: "",
      NODE_ENV: "dev",
      BETTER_AUTH_SECRET: "",
      BETTER_AUTH_URL: "http://localhost:3000",
      GITHUB_TOKEN: "",

      // optional, but useful for testing OAuth locally
      GOOGLE_CLIENT_ID: "",
      GOOGLE_CLIENT_SECRET: "",
      GITHUB_CLIENT_ID: "",
      GITHUB_CLIENT_SECRET: "",
      DISCORD_CLIENT_ID: "",
      DISCORD_CLIENT_SECRET: "",
    },
    "PEACHY GANG BACKEND": {
      BOT_TOKEN:
        "",
      BOT_CLIENT_ID: "",
      BOT_CLIENT_SECRET: "",
      MONGODB_URI: "",
      PORT: "8080",
      PRODUCTION: "true",
      WEB_URL: "http://localhost:3000",
      API_ENDPOINT: "https://discord.com/api/v10",
      GEMINI_API_KEY: "AIzaSyBj_YF3CLn-Zmd8V3yoFJohDfLlNvbvF24",
    },
  },
};

const tabs = ["PEACHY BOT", "PEACHY GANG", "PEACHY GANG BACKEND"];

// Helper to stringify env object to .env format
function envToString(env: string | Record<string, any>): string {
  if (typeof env === "string") return env;
  // If it's an object, join key=value pairs
  return Object.entries(env)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");
}

function EnvSection({
  title,
  envs,
}: {
  title: string;
  envs: Record<string, string | Record<string, string>>;
}) {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return (
    <section className="p-6 mb-10 border shadow bg-card border-border rounded-2xl">
      <h2 className="mb-4 text-xl drop-shadow-sm">{title}</h2>
      <div className="flex mb-4 space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-1 font-ghibi-bold rounded-md border-b-2 transition-colors duration-150 focus:outline-none ${
              activeTab === tab
                ? "bg-primary text-primary-foreground border-primary shadow-primary"
                : "bg-muted text-muted-foreground border-transparent hover:bg-accent hover:text-accent-foreground"
            }`}
            onClick={() => setActiveTab(tab)}
            style={{ minWidth: 120 }}
          >
            {tab}
          </button>
        ))}
      </div>
      <Terminal className="mt-2" copyValue={envToString(envs[activeTab])}>
        {envToString(envs[activeTab])
          .split("\n")
          .map((line, idx) => (
            <TypingAnimation key={idx} duration={20}>
              {line}
            </TypingAnimation>
          ))}
      </Terminal>
    </section>
  );
}

export default function EnvManagmentPage() {
  return (
    <main className="container mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl tracking-tight drop-shadow">Env Management</h1>
      </div>
      <EnvSection title="Production" envs={envData.production} />
      <EnvSection title="Local" envs={envData.local} />
    </main>
  );
}

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
        "MTM0MjMxNzk0NzU3MzYzMzA3Nw.GFE6aZ.LRxtKghyfkJzSDv3Zzd_QLdqDfvSjTfvN3hgFM",
      PREFIX: "P",
      OWNER_IDS:
        "966688007493140591,946079190971732041,1039056239390367836,765216076430180384,656745358243921972",
      STAFF_IDS: "1206564732388118558",
      BANKACCOUNT_ID: "966688007493140591",
      CLIENT_ID: "1342317947573633077",
      CLIENT_SECRET: "U4tRAzv47CaZTv1u3F9jyRlDd87k_aja",
      GUILD_ID: "1369956599720054847",
      PRODUCTION: "true",
      DATABASE_URL:
        "mongodb+srv://peachygang:ch9JEfUHrCCtd9Pi@peachygang.dwi9v4v.mongodb.net/PEACHY?retryWrites=true&w=majority&appName=PEACHYGANG",
      GEMINI_API_KEY: "AIzaSyDJPyyLzfZW8ilnXUv8wOjO3cnE1xDDzd0",
    },
    "PEACHY GANG": {
      APP_URL: "http://localhost:3000",
      OWNER_IDS:
        "966688007493140591,946079190971732041,1039056239390367836,765216076430180384,656745358243921972",
      STAFF_IDS: "765216076430180384,1206564732388118558,982564593039736842",
      NEXT_PUBLIC_API_ENDPOINT: "http://localhost:8080",
      BOT_CLIENT_ID: "1342317947573633077",
      BOT_CLIENT_SECRET: "U4tRAzv47CaZTv1u3F9jyRlDd87k_aja",
      FIRST_SUB_BOT_CLIENT_ID: "1304244002987446383",
      SECOND_SUB_BOT_CLIENT_ID: "1304247206290915399",
      DATABASE_URL:
        "mongodb+srv://peachygang:ch9JEfUHrCCtd9Pi@peachygang.dwi9v4v.mongodb.net/PEACHY?retryWrites=true&w=majority&appName=PEACHYGANG",
      NODE_ENV: "dev",
      BETTER_AUTH_SECRET: "bjSbucX6VI3BlQaiNDfh8NCBjXePX36d",
      BETTER_AUTH_URL: "http://localhost:3000",
      GITHUB_TOKEN: "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",

      // optional, but useful for testing OAuth locally
      GOOGLE_CLIENT_ID:
        "1093836081224-t1riqfpg7t9fl9rqtc3ombnv9fu3sdoo.apps.googleusercontent.com",
      GOOGLE_CLIENT_SECRET: "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",
      GITHUB_CLIENT_ID: "Ov23lix02ArprXLd7rSb",
      GITHUB_CLIENT_SECRET: "f0f5fdba5f6abcedaab48b2a1ba3ed18e6a8c62d",
      DISCORD_CLIENT_ID: "1342317947573633077",
      DISCORD_CLIENT_SECRET: "U4tRAzv47CaZTv1u3F9jyRlDd87k_aja",
    },
    "PEACHY GANG BACKEND": {
      BOT_TOKEN:
        "MTM0MjMxNzk0NzU3MzYzMzA3Nw.GFE6aZ.LRxtKghyfkJzSDv3Zzd_QLdqDfvSjTfvN3hgFM",
      BOT_CLIENT_ID: "1342317947573633077",
      BOT_CLIENT_SECRET: "U4tRAzv47CaZTv1u3F9jyRlDd87k_aja",
      MONGODB_URI: "mongodb://localhost:27017/PEACHYBETA",
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

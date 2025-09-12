import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaCheckCircle } from "react-icons/fa";

const monthlyPlans = [
  {
    title: "Premium Tier 1",
    price: "5$",
    period: "/ Monthly",
    description:
      "For decent sized servers where member interaction is the key.",
    features: [
      "Advanced Protection",
      "More Variables",
      "Executioner in logs",
      "Unban everyone",
    ],
  },
  {
    title: "Premium Tier 2",
    price: "10$",
    period: "/ Monthly",
    description: "For big servers where ProBot Anti-Raid is important.",
    features: [
      "Advanced Protection",
      "More Variables",
      "Custom Bot",
      "Transfer Bot Ownership",
    ],
  },
];

const yearlyPlans = [
  {
    title: "Premium Tier 1",
    price: "49$",
    period: "/ Yearly",
    description:
      "For decent sized servers where member interaction is the key.",
    features: [
      "Advanced Protection",
      "More Variables",
      "Executioner in logs",
      "Unban everyone",
    ],
  },
  {
    title: "Premium Tier 2",
    price: "99$",
    period: "/ Yearly",
    description: "For big servers where ProBot Anti-Raid is important.",
    features: [
      "Advanced Protection",
      "More Variables",
      "Custom Bot",
      "Transfer Bot Ownership",
    ],
  },
];

export default function PremiumPlans() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const plans = billing === "monthly" ? monthlyPlans : yearlyPlans;
  return (
    <div className="flex flex-col items-center justify-center w-full px-4 bg-background">
      <h2 className="mb-2 text-3xl font-bold text-center md:text-4xl text-primary">
        Take Peachy to a New Adventure{" "}
        <span role="img" aria-label="wink">
          😉
        </span>
      </h2>
      <p className="max-w-xl mb-8 text-center text-muted-foreground">
        Imagine your current Discord server, just 10 times clearer and easier
        for members to interact, socialize and play.
      </p>
      <div className="flex justify-center gap-2 mb-10">
        <button
          className={`px-6 py-2 rounded-full font-semibold text-base transition-colors ${
            billing === "monthly"
              ? "bg-primary text-white"
              : "bg-muted text-muted-foreground"
          }`}
          onClick={() => setBilling("monthly")}
        >
          MONTHLY
        </button>
        <button
          className={`px-6 py-2 rounded-full font-semibold text-base transition-colors ${
            billing === "yearly"
              ? "bg-primary text-white"
              : "bg-muted text-muted-foreground"
          }`}
          onClick={() => setBilling("yearly")}
        >
          YEARLY
        </button>
      </div>
      <div className="flex flex-col justify-center w-full max-w-3xl gap-8 md:flex-row">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`flex-1 rounded-xl shadow-lg bg-card p-8 flex flex-col items-center border ${
              idx === 1 ? "border-primary" : "border-muted"
            } transition-all duration-200`}
          >
            <h3 className="mb-2 text-lg font-bold text-white">{plan.title}</h3>
            <div className="flex items-end mb-2">
              <span className="mr-2 text-4xl font-extrabold text-primary">
                {plan.price}
              </span>
              <span className="text-base text-muted-foreground">
                {plan.period}
              </span>
            </div>
            <p className="mb-4 text-sm text-center text-muted-foreground">
              {plan.description}
            </p>
            <ul className="w-full mb-6 space-y-2 text-left">
              {plan.features.map((f, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-base text-white"
                >
                  <FaCheckCircle className="text-primary" size={18} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button
              className={`w-full py-2 text-lg font-semibold ${
                idx === 1
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              Subscribe
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

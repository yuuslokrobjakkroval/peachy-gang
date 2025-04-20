"use client";

import React from "react";
import { usePeachy } from "@/context/peachy";
import { CustomFeatures } from "@/utils/types";
import { useGetFeatureQuery } from "@/redux/api/guild";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";

export type UpdateFeatureValue<K extends keyof CustomFeatures> = Partial<
  CustomFeatures[K]
>;

export default function FeaturePage() {
  const { guildId, feature } = usePeachy();
  const { data: row } = useGetFeatureQuery({ guild: guildId, feature });
  console.log(row);

  return (
    <div className="flex min-h-screen w-full flex-col p-6 md:p-10 gap-3"></div>
  );
}

function EnabledPage() {
  return (
    <div className="flex min-h-screen w-full flex-col p-6 md:p-10 gap-3">
      <div className="w-full max-w-3xl">
        {/* Header Section */}
        <h1 className="text-primary text-3xl md:text-4xl font-bold">
          Welcome Message
        </h1>

        <p className="text-muted-foreground">
          Send message when user joined the server
        </p>
      </div>

      <Card className="w-full bg-card text-card-foreground border-2 shadow-md transition-all duration-300 ease-in-out p-3">
        <div className="flex flex-col bg-card gap-6 flex-1">
          <div className="flex items-center justify-between gap-4">
            <div>
              <label
                htmlFor="dark-mode"
                className="text-lg font-medium text-primary cursor-pointer transition-colors duration-300"
              >
                Active
              </label>
              <p className="text-sm text-muted-foreground transition-colors duration-300">
                Enable or Disable this feature
              </p>
            </div>

            <Switch
              id="dark-mode"
              // checked={theme === "dark"}
              // onClick={handleThemeToggle}
            />
          </div>
        </div>
      </Card>

      <Card className="w-full bg-card text-card-foreground border-2 shadow-md transition-all duration-300 ease-in-out p-3">
        <div className="flex flex-col bg-card gap-6 flex-1">
          <div className="flex items-center justify-between gap-4">
            <div>
              <label
                htmlFor="dark-mode"
                className="text-lg font-medium text-primary cursor-pointer transition-colors duration-300"
              >
                Channel
              </label>
              <p className="text-sm text-muted-foreground transition-colors duration-300">
                Where to send the welcome message
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

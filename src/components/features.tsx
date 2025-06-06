import React from "react";
import { Button } from "@/components/ui/button";

interface FeatureProps {
  guild: string;
  feature: { id: string; name: string };
  enabled: boolean;
  refetch: () => void;
  translations: (key: string, options?: any) => string;
}

export default function Features({
  guild,
  feature,
  enabled,
  refetch,
  translations: t,
}: FeatureProps) {
  return (
    <div className="border-2 shadow-primary rounded-[var(--radius)] p-4 font-ghibi">
      <h5 className="text-lg font-ghibi-bold text-[var(--primary)]">
        {t(feature.id, { defaultMessage: feature.name })}
      </h5>
      <p className="text-[var(--muted-foreground)]">
        {t(`${feature.id}_description`, {
          defaultMessage: `Description for ${feature.name}`,
        })}
      </p>
      <Button
        className="mt-2 border-2 shadow-primary"
        onClick={refetch}
        disabled={!enabled}
      >
        {t(enabled ? "configure" : "enable", {
          defaultMessage: enabled ? "Configure" : "Enable",
        })}
      </Button>
    </div>
  );
}

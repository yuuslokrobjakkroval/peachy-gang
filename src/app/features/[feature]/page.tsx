// app/feature/page.tsx
"use client";
import React from "react";
import { usePeachy } from "@/context/peachy";
import {
  useGetFeatureQuery,
  useEnableFeatureMutation,
  useDisableFeatureMutation,
  useUpdateFeatureMutation,
} from "@/redux/api/guild";
import { Spinner } from "@/components/loading/spinner";
import { toast } from "sonner";
import { toCapitalCase } from "@/utils/common";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WelcomeMessageFeature } from "@/components/modules/features/welcome-feture";

export default function FeaturePage() {
  const { guildId, feature } = usePeachy();
  const {
    data: featureInfo,
    isLoading,
    refetch,
  } = useGetFeatureQuery({ guild: guildId, feature });

  if (isLoading) {
    return <Spinner variant="circle" />;
  }

  return (
    <div className="w-full flex flex-col p-6 md:p-10 gap-6">
      {featureInfo?.isActive ? (
        <IsEnabledPage
          featureInfo={featureInfo}
          guild={guildId}
          feature={feature}
          refetch={refetch}
        />
      ) : (
        <IsDisabledPage guild={guildId} feature={feature} refetch={refetch} />
      )}
    </div>
  );
}

export function IsEnabledPage({ featureInfo, guild, feature, refetch }: any) {
  function handleFeature({ featureInfo, guild, feature, refetch }: any) {
    switch (feature) {
      case "welcome-message":
        return (
          <WelcomeMessageFeature
            featureInfo={featureInfo}
            guild={guild}
            feature={feature}
            refetch={refetch}
          />
        );
      default:
        return "hello";
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {handleFeature({ featureInfo, guild, feature, refetch })}
    </motion.div>
  );
}

export function IsDisabledPage({ guild, feature, refetch }: any) {
  const [enableFeature, { isLoading }] = useEnableFeatureMutation();

  const handleEnableClick = async () => {
    try {
      await enableFeature({ enabled: true, guild, feature }).unwrap();
      toast.success(`Enabled ${toCapitalCase(feature)}`, {
        description: "You have successfully enabled this feature.",
        duration: 1000,
        className: "bg-gradient-to-r from-pink-500 to-purple-500 text-white",
      });
      refetch();
    } catch (error) {
      toast.error(`Failed to enable ${toCapitalCase(feature)}`, {
        duration: 1000,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-center justify-center min-h-svh"
    >
      <h1 className="text-3xl font-bold text-primary mb-4">
        Feature is Disabled
      </h1>
      <p className="text-muted-foreground mb-6">
        This feature is currently disabled. Enable it to configure settings.
      </p>
      <Button
        aria-label={`Enable ${feature}`}
        disabled={isLoading}
        onClick={handleEnableClick}
        className="w-full sm:w-auto"
      >
        {isLoading ? "Enabling..." : "Enable Feature"}
      </Button>
    </motion.div>
  );
}

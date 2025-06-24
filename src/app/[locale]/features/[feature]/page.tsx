// app/feature/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { usePeachy } from "@/contexts/peachy";
import {
  useGetFeatureQuery,
  useEnableFeatureMutation,
} from "@/redux/api/guild";
import { Spinner } from "@/components/loading/spinner";
import { toast } from "sonner";
import { toCapitalCase } from "@/utils/common";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { UseFeaturesConfig } from "@/utils/features";
import { WelcomeMessageFeature } from "@/components/modules/features/welcome-feture";
import { AutoResponseFeature } from "@/components/modules/features/auto-response-feature";
import { BoosterMessageFeature } from "@/components/modules/features/booster-feture";
import { InviteTrackerFeature } from "@/components/modules/features/inviter-tracker-feture";
import { ReactionRolesFeature } from "@/components/modules/features/reaction-roles";
import { JoinRoleFeature } from "@/components/modules/features/join-roles";
import { LevelingSystemFeature } from "@/components/modules/features/leveling-system";
import { GiveawayScheduleFeature } from "@/components/modules/features/giveaway-shedule";
import { GoodByeMessageFeature } from "@/components/modules/features/goodbye-feture";
import { Card, CardFooter } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import Loading from "@/components/loading/circle";

export default function FeaturePage() {
  const t = useTranslations("common");
  const f = useTranslations("features");
  const { guildId, feature } = usePeachy();

  const {
    data: featureInfo,
    isLoading,
    refetch,
  } = useGetFeatureQuery({ guild: guildId, feature });

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col p-6 md:p-10 gap-6">
      {featureInfo?.isActive ? (
        <IsEnabledPage
          featureInfo={featureInfo}
          guild={guildId}
          feature={feature}
          refetch={refetch}
          t={t}
          f={f}
        />
      ) : (
        <IsDisabledPage
          guild={guildId}
          feature={feature}
          refetch={refetch}
          t={t}
          f={f}
        />
      )}
    </div>
  );
}

export function IsEnabledPage({
  featureInfo,
  guild,
  feature,
  refetch,
  t,
  f,
}: any) {
  const router = useRouter();
  const features = UseFeaturesConfig();
  const { feature: featureParam } = useParams();
  const featureConfig =
    typeof featureParam === "string" && featureParam in features
      ? features[featureParam as keyof typeof features]
      : undefined;

  function handleFeature({ featureInfo, guild, feature, refetch }: any) {
    switch (featureParam) {
      case "welcome-message":
        return (
          <WelcomeMessageFeature
            featureConfig={featureConfig}
            featureInfo={featureInfo}
            guild={guild}
            feature={feature}
            refetch={refetch}
          />
        );

      case "auto-response":
        return (
          <AutoResponseFeature
            featureConfig={featureConfig}
            featureInfo={featureInfo}
            guild={guild}
            feature={feature}
            refetch={refetch}
          />
        );

      case "booster-message":
        return (
          <BoosterMessageFeature
            featureConfig={featureConfig}
            featureInfo={featureInfo}
            guild={guild}
            feature={feature}
            refetch={refetch}
          />
        );

      case "invite-tracker-message":
        return (
          <InviteTrackerFeature
            featureConfig={featureConfig}
            featureInfo={featureInfo}
            guild={guild}
            feature={feature}
            refetch={refetch}
          />
        );

      case "reactions-roles":
        return (
          <ReactionRolesFeature
            featureConfig={featureConfig}
            featureInfo={featureInfo}
            guild={guild}
            feature={feature}
            refetch={refetch}
          />
        );

      case "join-roles":
        return (
          <JoinRoleFeature
            featureConfig={featureConfig}
            featureInfo={featureInfo}
            guild={guild}
            feature={feature}
            refetch={refetch}
          />
        );

      case "leveling-system":
        return (
          <LevelingSystemFeature
            featureConfig={featureConfig}
            featureInfo={featureInfo}
            guild={guild}
            feature={feature}
            refetch={refetch}
          />
        );

      case "giveaway-schedule":
        return (
          <GiveawayScheduleFeature
            featureConfig={featureConfig}
            featureInfo={featureInfo}
            guild={guild}
            feature={feature}
            refetch={refetch}
          />
        );

      case "goodbye-message":
        return (
          <GoodByeMessageFeature
            featureConfig={featureConfig}
            featureInfo={featureInfo}
            guild={guild}
            feature={feature}
            refetch={refetch}
          />
        );

      default:
        return (
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="flex flex-col p-6">
              <h1 className="text-2xl font-bold text-primary">
                {f("featureNotFoundTitle")}
              </h1>
              <p className="text-muted-foreground">
                {f("featureNotFoundDescription", { feature })}
              </p>

              <CardFooter className="flex justify-end items-start gap-3">
                <Button variant="outline" onClick={() => router.back()}>
                  {t("back")}
                </Button>
                <Button
                  onClick={() => {
                    refetch();
                  }}
                >
                  {f("refreshPage")}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        );
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

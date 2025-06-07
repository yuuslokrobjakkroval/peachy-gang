"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  useDisableFeatureMutation,
  useEnableFeatureMutation,
} from "@/redux/api/guild";
import { toast } from "sonner";
import { X } from "lucide-react";
import { usePeachy } from "@/contexts/peachy";
import { GlowingEffect } from "./ui/glowing-effect";
import { IdFeature } from "@/utils/common";

const Features = ({
  guild,
  feature,
  enabled,
  refetch,
}: {
  guild: string;
  feature: IdFeature;
  enabled: boolean;
  refetch: () => void;
}) => {
  const t = useTranslations("features");
  const router = useRouter();
  const [enableFeature, { isLoading: enableLoading }] =
    useEnableFeatureMutation();
  const [disableFeature, { isLoading: disableLoading }] =
    useDisableFeatureMutation();
  const { setGuildId, setFeature } = usePeachy();

  const featureName = t(feature.nameKey, { defaultMessage: "Unknown Feature" });
  const featureDescription = t(feature.descriptionKey, {
    defaultMessage: "No description available",
  });

  const handleEnableClick = async () => {
    if (enabled) {
      setGuildId(guild);
      setFeature(feature.id);
      router.push(`/features/${feature.id}`);
    } else {
      try {
        await enableFeature({
          enabled: true,
          guild,
          feature: feature.id,
        }).unwrap();
        refetch();

        toast.success(t("enable_success", { name: featureName }), {
          description: t("enable_success_description"),
          action: {
            label: <X className="w-4 h-4" />,
            onClick: async () => {
              try {
                await disableFeature({
                  enabled: false,
                  guild,
                  feature: feature.id,
                }).unwrap();
                refetch();
                toast.success(t("disable_success", { name: featureName }), {
                  description: t("undo_enable"),
                });
              } catch (error) {
                toast.error(t("disable_error", { name: featureName }));
              }
            },
          },
          duration: 1000,
        });
      } catch (error) {
        toast.error(t("enable_error", { name: featureName }));
      }
    }
  };

  const handleDisableClick = async () => {
    try {
      await disableFeature({
        enabled: false,
        guild,
        feature: feature.id,
      }).unwrap();
      refetch();
      toast.success(t("disable_success", { name: featureName }), {
        description: t("disable_success_description"),
        action: {
          label: <X className="w-4 h-4" />,
          onClick: async () => {
            try {
              await enableFeature({
                enabled: true,
                guild,
                feature: feature.id,
              }).unwrap();
              refetch();
              toast.success(t("enable_success", { name: featureName }), {
                description: t("undo_disable"),
              });
            } catch (error) {
              toast.error(t("enable_error", { name: featureName }));
            }
          },
        },
        duration: 1000,
      });
    } catch (error) {
      toast.error(t("disable_error", { name: featureName }));
    }
  };

  return (
    <div className="bg-card relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={3}
      />
      <Card className="@container/card border border-border">
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-2 @[250px]/card:text-4xl text-3xl font-bold tabular-nums text-primary">
            <Avatar className="size-10 sm:size-12 lg:size-14">
              <AvatarFallback className="flex items-center justify-center text-xl sm:text-xl lg:text-3xl transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </AvatarFallback>
            </Avatar>
            <span>{featureName}</span>
          </CardTitle>
          <CardDescription className="flex items-center text-lg sm:text-lg lg:text-xl transition-transform duration-300 group-hover:scale-110 mt-2 ml-2">
            {featureDescription}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between items-start gap-1 text-sm">
          <Button
            className="cursor-pointer"
            variant={enabled ? "default" : "outline"}
            aria-label={
              enabled
                ? t("configureButtonLabel", { name: featureName })
                : t("enableButtonLabel", { name: featureName })
            }
            disabled={enableLoading}
            onClick={handleEnableClick}
          >
            {enableLoading
              ? t("enabling")
              : enabled
                ? t("config_button")
                : t("enable_button")}
          </Button>
          {enabled && (
            <Button
              className="cursor-pointer"
              variant="destructive"
              aria-label={t("disable_button", { name: featureName })}
              disabled={disableLoading}
              onClick={handleDisableClick}
            >
              {disableLoading ? t("disabling") : t("disable_button")}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Features;

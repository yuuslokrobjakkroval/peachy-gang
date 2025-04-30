import { IdFeature } from "@/utils/common";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  useDisableFeatureMutation,
  useEnableFeatureMutation,
} from "@/redux/api/guild";
import { toast } from "sonner";
import { X } from "lucide-react";
import { usePeachy } from "@/contexts/peachy";

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
  const router = useRouter();
  const [enableFeature, { isLoading: enableLoading }] =
    useEnableFeatureMutation();
  const [disableFeature, { isLoading: disableLoading }] =
    useDisableFeatureMutation();

  const { setGuildId, setFeature } = usePeachy();

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

        toast.success(`Enabled ${feature.name}`, {
          description:
            "You have successfully enabled this feature. Configure it now?",
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
                toast.success(`Disabled ${feature.name}`, {
                  description:
                    "You have successfully undone the enable action.",
                });
              } catch (error) {
                toast.error(`Failed to disable ${feature.name}`);
              }
            },
          },
          duration: 1000,
        });
      } catch (error) {
        toast.error(`Failed to enable ${feature.name}`, {
          duration: 1000,
        });
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
      toast.success(`Disabled ${feature.name}`, {
        description: "You have successfully disabled this feature.",
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
              toast.success(`Enabled ${feature.name}`, {
                description: "You have successfully undone the disable action.",
              });
            } catch (error) {
              toast.error(`Failed to enable ${feature.name}`);
            }
          },
        },
        duration: 1000,
      });
    } catch (error) {
      toast.error(`Failed to disable ${feature.name}`, {
        duration: 1000,
      });
    }
  };

  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-2 @[250px]/card:text-4xl text-3xl font-bold tabular-nums text-primary">
          <Avatar className="size-10 sm:size-12 lg:size-14">
            <AvatarFallback className="flex items-center justify-center text-xl sm:text-xl lg:text-3xl">
              {feature.icon}
            </AvatarFallback>
          </Avatar>
          <span>{feature.name}</span>
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          {feature.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between items-start gap-1 text-sm">
        <Button
          className="cursor-pointer"
          variant={enabled ? "default" : "outline"}
          aria-label={
            enabled ? `Configure ${feature.name}` : `Enable ${feature.name}`
          }
          disabled={enableLoading}
          onClick={handleEnableClick}
        >
          {enableLoading ? "Enabling..." : enabled ? "Config" : "Enable"}
        </Button>
        {enabled && (
          <Button
            className="cursor-pointer"
            variant="destructive"
            aria-label={`Disable ${feature.name}`}
            disabled={disableLoading}
            onClick={handleDisableClick}
          >
            {disableLoading ? "Disabling..." : "Disable"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default Features;

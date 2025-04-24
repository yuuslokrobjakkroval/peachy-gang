// app/feature/page.tsx
"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { usePeachy } from "@/context/peachy";
import {
  useGetFeatureQuery,
  useEnableFeatureMutation,
  useDisableFeatureMutation,
  useUpdateFeatureMutation,
} from "@/redux/api/guild";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/loading/spinner";
import { toast } from "sonner";
import { toCapitalCase } from "@/utils/common";
import { motion } from "framer-motion";
import { ChannelSelect } from "@/components/form/channel-select";

const validationSchema = Yup.object({
  isActive: Yup.boolean(),
  channel: Yup.string().required("Please select a channel"),
  isCustomImage: Yup.boolean(),
  content: Yup.string().optional(),
});

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

function IsEnabledPage({ featureInfo, guild, feature, refetch }: any) {
  const [enableFeature] = useEnableFeatureMutation();
  const [disableFeature, { isLoading: disableLoading }] =
    useDisableFeatureMutation();
  const [updateFeature, { isLoading: updateLoading }] =
    useUpdateFeatureMutation();

  const formik = useFormik({
    initialValues: {
      isActive: featureInfo?.isActive ?? false,
      channel: featureInfo?.channel ?? "",
      isCustomImage: featureInfo?.isCustomImage ?? false,
      content: featureInfo?.content ?? "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await updateFeature({
          guild,
          feature,
          ...values,
        }).unwrap();
        toast.success(`Updated ${toCapitalCase(feature)}`, {
          description: "Feature settings saved successfully.",
          className: "bg-gradient-to-r from-pink-500 to-purple-500 text-white",
        });
        refetch();
      } catch (error) {
        toast.error(`Failed to update ${toCapitalCase(feature)}`, {
          duration: 1000,
        });
      }
    },
  });

  const handleDisableClick = async () => {
    try {
      await disableFeature({ enabled: false, guild, feature }).unwrap();
      toast.success(`Disabled ${toCapitalCase(feature)}`, {
        description: "You have successfully disabled this feature.",
        duration: 1000,
        className: "bg-gradient-to-r from-pink-500 to-purple-500 text-white",
      });
      refetch();
    } catch (error) {
      toast.error(`Failed to disable ${toCapitalCase(feature)}`, {
        duration: 1000,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex flex-col">
          <h1 className="text-primary text-3xl md:text-4xl font-bold">
            Welcome Message
          </h1>
          <p className="text-muted-foreground">
            Send message when user joined the server
          </p>
        </div>
        <Button
          variant="destructive"
          aria-label={`Disable ${feature}`}
          disabled={disableLoading}
          onClick={handleDisableClick}
          className="w-full sm:w-auto"
        >
          {disableLoading ? "Disabling..." : "Disable"}
        </Button>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="col-span-12">
            <Card className="bg-card text-card-foreground border-2 shadow-md hover:shadow-lg transition-all duration-300 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Label className="text-xl font-medium text-primary cursor-pointer transition-colors duration-300">
                    Active
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Enable or Disable this feature
                  </p>
                </div>
                <Switch
                  checked={formik.values.isActive}
                  onCheckedChange={(checked) =>
                    formik.setFieldValue("isActive", checked)
                  }
                  aria-label="Toggle feature active state"
                />
              </div>
            </Card>
          </div>

          <div className="col-span-12">
            <Card className="bg-card text-card-foreground border-2 shadow-md hover:shadow-lg transition-all duration-300 p-6">
              <ChannelSelect
                className="w-full"
                label="Channel"
                description="Where to send the welcome message"
                guild={guild}
                value={formik.values.channel}
                onChange={(value) => formik.setFieldValue("channel", value)}
                error={formik.errors.channel}
                touched={formik.touched.channel}
                type={0}
              />
            </Card>
          </div>

          <div className="col-span-12">
            <Card className="bg-card text-card-foreground border-2 shadow-md hover:shadow-lg transition-all duration-300 p-6">
              <Label className="text-xl font-medium text-primary cursor-pointer transition-colors duration-300">
                Message Content
              </Label>
              <textarea
                className="w-full mt-2 p-2 border rounded-md"
                placeholder="Type the main content of the message"
                value={formik.values.content}
                onChange={(e) =>
                  formik.setFieldValue("content", e.target.value)
                }
              />
            </Card>
          </div>

          <div className="flex col-span-12 justify-end  items-center gap-4">
            <Button type="submit" disabled={updateLoading}>
              {updateLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}

function IsDisabledPage({ guild, feature, refetch }: any) {
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

"use client";

import React, { useEffect } from "react";

import { usePeachy } from "@/contexts/peachy";
import {
  useSendMessageFeatureMutation,
  useDisableFeatureMutation,
  useUpdateFeatureMutation,
} from "@/redux/api/guild";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { ChannelSelectForm } from "@/components/form/channel-select-form";
import { toast } from "sonner";
import { TextAreaForm } from "@/components/form/textarea-form";
import UpdateFeaturePanel from "@/components/modules/update-feature";
import { toCapitalCase } from "@/utils/common";
import { Button } from "@/components/ui/button";
import { FaTerminal, FaWandSparkles } from "react-icons/fa6";
import { SwitchForm } from "@/components/form/switch-form";

export function LevelingSystemFeature({
  featureConfig,
  featureInfo,
  guild,
  feature,
  refetch,
}: any) {
  const { userInfoByDiscord } = usePeachy();
  const [sendMessage, { isLoading: sendMessageLoading }] =
    useSendMessageFeatureMutation();
  const [disableFeature, { isLoading: disableLoading }] =
    useDisableFeatureMutation();
  const [
    updateFeature,
    { isLoading: updateLoading, isSuccess: updateSuccess },
  ] = useUpdateFeatureMutation();

  const formik = useFormik({
    initialValues: {
      isActive: featureInfo?.isActive ?? true,
      channel: featureInfo?.channel,
      content: featureInfo?.content ?? "",
    },
    // validationSchema,
    onSubmit: async (values) => {
      try {
        const body = {
          guild,
          feature,
          ...values,
        };
        await updateFeature(body).unwrap();
        toast.success(`Updated Leveling`, {
          description: "Leveling settings saved successfully.",
          className: "bg-gradient-to-r from-pink-500 to-purple-500 text-white",
        });
        refetch();
      } catch (error) {
        toast.error(`Failed to update leveling`, {
          duration: 1000,
        });
      }
    },
  });

  useEffect(() => {
    if (updateSuccess) {
      formik.resetForm({ values: formik.values });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSuccess]);

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
      className="w-full container mx-auto xl:px-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex flex-col">
          <h1 className="text-primary text-3xl md:text-4xl font-bold">
            {featureConfig.name}
          </h1>
          <p className="text-muted-foreground">{featureConfig.description}</p>
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
            <div className="flex flex-row items-center justify-between gap-2 min-w-0">
              <div className="flex-1 min-w-0">
                <SwitchForm
                  control={{
                    id: "isActive",
                    label: "Active",
                    description: "Enable or Disable this feature",
                  }}
                  checked={formik.values.isActive}
                  onChange={(checked) =>
                    formik.setFieldValue("isActive", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-end gap-2">
                <Button
                  className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg"
                  aria-label="Pick an emoji"
                >
                  <FaTerminal size="20" />
                </Button>
                <Button
                  className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg"
                  aria-label="Test message"
                  disabled={sendMessageLoading}
                  onClick={async () => {
                    try {
                      await sendMessage({
                        test: true,
                        guild,
                        feature,
                        userId: userInfoByDiscord.id,
                      }).unwrap();
                      toast.success("Message sent successfully!", {
                        duration: 2000,
                      });
                    } catch (error) {
                      toast.error("Failed to send message.", {
                        duration: 2000,
                      });
                    }
                  }}
                >
                  <FaWandSparkles size="20" />
                </Button>
              </div>
            </div>
          </div>

          <div className="col-span-12 sm:col-span-12 lg:col-span-6">
            <ChannelSelectForm
              control={{
                id: "channel",
                label: "Channel",
              }}
              description="Where to send the leveling up message"
              guild={guild}
              value={formik.values.channel}
              onChange={(value) => formik.setFieldValue("channel", value)}
              type={0}
              className="w-full"
            />
          </div>

          <div className="col-span-12 sm:col-span-12 lg:col-span-6">
            <TextAreaForm
              control={{
                id: "content",
                label: "Message Content",
                description: "The content of the message",
              }}
              placeholder="Type in the leveling up of the message"
              enableEmoji
              value={formik.values.content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                formik.setFieldValue("content", e.target.value)
              }
            />
          </div>

          <div className="col-span-12 gap-4">
            {formik.dirty && (
              <UpdateFeaturePanel
                onSubmit={formik.handleSubmit}
                onReset={formik.resetForm}
                isLoading={updateLoading}
              />
            )}
          </div>
        </div>
      </form>
    </motion.div>
  );
}

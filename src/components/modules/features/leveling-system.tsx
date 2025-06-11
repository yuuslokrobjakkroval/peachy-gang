"use client";

import React, { useEffect, useState } from "react";
import * as Yup from "yup";
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
import LevelingDialog from "@/components/layouts/dialogs/leveling-variable";
import { useTranslations } from "next-intl";

const validationSchema = Yup.object({
  isActive: Yup.boolean(),
  channel: Yup.string().required("Channel is required"),
  content: Yup.string().required("Content is required"),
});

export function LevelingSystemFeature({
  featureConfig,
  featureInfo,
  guild,
  feature,
  refetch,
}: any) {
  // Use two translation hooks: one for global and one for feature-specific
  const tCommon = useTranslations("common");
  const tFeature = useTranslations("features");
  const t = useTranslations("levelingFeature");

  const { userInfoByDiscord } = usePeachy();
  const [open, setOpen] = useState<boolean>(false);
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
    validationSchema: Yup.object({
      isActive: Yup.boolean(),
      channel: Yup.string().required(tCommon("validation.channelRequired")),
      content: Yup.string().required(tCommon("validation.contentRequired")),
    }),
    onSubmit: async (values) => {
      try {
        const body = {
          guild,
          feature,
          ...values,
        };
        await updateFeature(body).unwrap();
        toast.success(t("updateSuccess"), {
          description: t("updateSuccessDescription"),
          className: "bg-gradient-to-r from-pink-500 to-purple-500 text-white",
        });
        refetch();
      } catch (error) {
        toast.error(t("updateError"), {
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
      toast.success(
        tCommon("disableSuccess", { feature: toCapitalCase(feature) }),
        {
          description: tCommon("disableSuccessDescription"),
          duration: 1000,
          className: "bg-gradient-to-r from-pink-500 to-purple-500 text-white",
        }
      );
      refetch();
    } catch (error) {
      toast.error(
        tCommon("disableError", { feature: toCapitalCase(feature) }),
        {
          duration: 1000,
        }
      );
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
            {tFeature("leveling-system")}
          </h1>
          <p className="text-muted-foreground">
            {tFeature("leveling-system_description")}
          </p>
        </div>
        <Button
          variant="destructive"
          aria-label={tCommon("disableButtonLabel", { feature })}
          disabled={disableLoading}
          onClick={handleDisableClick}
          className="w-full sm:w-auto"
        >
          {disableLoading ? tCommon("disabling") : tCommon("disable")}
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
                    label: t("switch.activeLabel"),
                    description: t("switch.activeDescription"),
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
                  aria-label={tCommon("pickVariableLabel")} // Updated to match common key
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(true);
                  }}
                >
                  <FaTerminal size="20" />
                </Button>
                <Button
                  className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg"
                  aria-label={tCommon("testMessageLabel")}
                  disabled={sendMessageLoading}
                  onClick={async (e) => {
                    e.preventDefault();
                    try {
                      await sendMessage({
                        test: true,
                        guild,
                        feature,
                        userId: userInfoByDiscord.id,
                      }).unwrap();
                      toast.success(tCommon("sendMessageSuccess"), {
                        duration: 2000,
                      });
                    } catch (error) {
                      toast.error(tCommon("sendMessageError"), {
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
                label: t("channel.label"),
              }}
              description={t("channel.description")}
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
                label: t("content.label"),
                description: t("content.description"),
              }}
              placeholder={t("content.placeholder")}
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
        <LevelingDialog
          isOpen={open}
          onClose={() => {
            setOpen(false);
          }}
        />
      </form>
    </motion.div>
  );
}

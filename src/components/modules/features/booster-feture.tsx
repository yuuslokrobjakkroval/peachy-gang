"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { usePeachy } from "@/contexts/peachy";
import {
  useSendMessageFeatureMutation,
  useDisableFeatureMutation,
  useUpdateFeatureMutation,
} from "@/redux/api/guild";
import { toCapitalCase } from "@/utils/common";
import { motion } from "framer-motion";
import BoosterVariableDialog from "@/components/dialogs/booster-variable";
import { SwitchForm } from "@/components/form/switch-form";
import { ChannelSelectForm } from "@/components/form/channel-select-form";
import { TextAreaForm } from "@/components/form/textarea-form";
import { InputForm } from "@/components/form/input-form";
import { CustomImagePage } from "@/components/modules/image-card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { FaTerminal, FaWandSparkles } from "react-icons/fa6";
import UpdateFeaturePanel from "../update-feature";
import { styles } from "@/styles";
import { useTranslations } from "next-intl";

const validationSchema = Yup.object({
  isActive: Yup.boolean(),
  channel: Yup.string().required("Channel is required"),
  isCustomImage: Yup.boolean(),
  content: Yup.string().required("Content is required"),
});

export function BoosterMessageFeature({
  featureConfig,
  featureInfo,
  guild,
  feature,
  refetch,
}: any) {
  // Use two translation hooks: one for global and one for feature-specific
  const tCommon = useTranslations("common");
  const tFeature = useTranslations("features");
  const t = useTranslations("boosterFeature");

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

  const formik = useFormik({
    initialValues: {
      channel: featureInfo.channel,
      isActive: featureInfo.isActive ?? true,
      isEmbed: featureInfo.isEmbed ?? false,
      content: featureInfo.content ?? "",
      isCustomImage: featureInfo.isCustomImage ?? true,
      message: {
        author: featureInfo.message?.author ?? { name: "", iconURL: "" },
        title: featureInfo.message?.title ?? "",
        description: featureInfo.message?.description ?? "",
        color: featureInfo.message?.color ?? "#F582AE",
        thumbnail: featureInfo.message?.thumbnail ?? "",
        image: featureInfo.message?.image ?? "",
        fields: featureInfo.message?.fields ?? [],
        footer: featureInfo.message?.footer ?? { text: "", iconURL: "" },
      },
      image: {
        layout: featureInfo.image?.layout ?? "classic",
        feature: featureInfo.image?.feature ?? "BOOSTER",
        avatarShape: featureInfo.image?.avatarShape ?? "Circle",
        circleColor: featureInfo.image?.circleColor ?? "#77CDFF",
        featureColor: featureInfo.image?.featureColor ?? "#77CDFF",
        usernameColor: featureInfo.image?.usernameColor ?? "#333333",
        messageColor: featureInfo.image?.messageColor ?? "#333333",
        backgroundImage: featureInfo.image?.backgroundImage ?? "",
        message: featureInfo.image?.message ?? "",
      },
    },
    validationSchema: Yup.object({
      isActive: Yup.boolean(),
      channel: Yup.string().required(tCommon("validation.channelRequired")),
      isCustomImage: Yup.boolean(),
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
        toast.success(
          tCommon("updateSuccess", { feature: toCapitalCase(feature) }),
          {
            description: tCommon("updateSuccessDescription"),
            duration: 2000,
            className:
              "bg-gradient-to-r from-pink-500 to-purple-500 text-white",
          }
        );
        refetch();
      } catch (error) {
        toast.error(
          tCommon("updateError", { feature: toCapitalCase(feature) }),
          {
            duration: 1000,
          }
        );
      }
    },
  });

  useEffect(() => {
    if (updateSuccess) {
      formik.resetForm({ values: formik.values });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSuccess]);

  const backgroundStyle = formik.values.image?.backgroundImage
    ? {
        background: `url(${formik.values.image?.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        aspectRatio: "16 / 9",
      }
    : { backgroundColor: "#77CDFF" };

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
            {tFeature("booster-message")}
          </h1>
          <p className="text-muted-foreground">
            {tFeature("booster-message_description")}
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
                  aria-label={tCommon("pickVariableLabel")}
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

          <div className="col-span-12">
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

          <div className="col-span-12">
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

          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <SwitchForm
              control={{
                id: "isCustomImage",
                label: t("customImage.label"),
                description: t("customImage.description"),
              }}
              checked={formik.values.isCustomImage}
              onChange={(checked) =>
                formik.setFieldValue("isCustomImage", checked)
              }
            />
          </div>
          <div className="col-span-8" />

          {formik.values.isCustomImage ? (
            <CustomImagePage
              userInfoByDiscord={userInfoByDiscord}
              formik={formik}
            />
          ) : (
            <>
              <div className="col-span-6">
                <InputForm
                  control={{
                    id: "image.backgroundImage",
                    label: t("backgroundImage.label"),
                    description: t("backgroundImage.description"),
                  }}
                  placeholder={t("backgroundImage.placeholder")}
                  value={formik.values.image?.backgroundImage || ""}
                  onChange={(e: any) =>
                    formik.setFieldValue(
                      "image.backgroundImage",
                      e.target.value
                    )
                  }
                />
              </div>

              {formik.values.image?.backgroundImage.startsWith("https:") ? (
                <div className="col-span-12">
                  <Card className="p-4">
                    <div className="rounded-xl" style={backgroundStyle} />
                  </Card>
                </div>
              ) : (
                <div className="col-span-12">
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground">
                      {t("noBackgroundImage")}
                    </p>
                  </Card>
                </div>
              )}
            </>
          )}

          <div
            style={styles}
            className="fixed left-1/2 z-50 mx-auto rounded-2xl"
          >
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

      <BoosterVariableDialog
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </motion.div>
  );
}

// app/feature/page.tsx
"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useDisableFeatureMutation,
  useUpdateFeatureMutation,
} from "@/redux/api/guild";
import { toCapitalCase } from "@/utils/common";
import { motion } from "framer-motion";
import { SwitchForm } from "@/components/form/switch-form";
import { ChannelSelectForm } from "@/components/form/channel-select-form";
import { TextAreaForm } from "@/components/form/textarea-form";
import { InputForm } from "@/components/form/input-form";
import { CustomImagePage } from "@/components/modules/image-card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

const validationSchema = Yup.object({
  isActive: Yup.boolean(),
  channel: Yup.string().required("Channel is required"),
  isCustomImage: Yup.boolean(),
  content: Yup.string().required("Content is required"),
});

export function WelcomeMessageFeature({
  featureInfo,
  guild,
  feature,
  refetch,
}: any) {
  const [disableFeature, { isLoading: disableLoading }] =
    useDisableFeatureMutation();
  const [updateFeature, { isLoading: updateLoading }] =
    useUpdateFeatureMutation();

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
        layout: featureInfo.image?.layout ?? "",
        feature: featureInfo.image?.feature ?? "WELCOME",
        avatarShape: featureInfo.image?.avatarShape ?? "Circle",
        circleColor: featureInfo.image?.circleColor ?? "#77CDFF",
        featureColor: featureInfo.image?.featureColor ?? "#77CDFF",
        usernameColor: featureInfo.image?.usernameColor ?? "#333333",
        messageColor: featureInfo.image?.messageColor ?? "#333333",
        backgroundImage: featureInfo.image?.backgroundImage ?? "",
        message: featureInfo.image?.message ?? "",
      },
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
          <div className="col-span-4">
            <SwitchForm
              control={{
                id: "isActive",
                label: "Active",
                description: "Enable or Disable this feature",
              }}
              checked={formik.values.isActive}
              onChange={(checked) => formik.setFieldValue("isActive", checked)}
            />
          </div>
          <div className="col-span-8" />

          <div className="col-span-12">
            <ChannelSelectForm
              control={{
                id: "channel",
                label: "Channel",
              }}
              description="Where to send the welcome message"
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
                label: "Message Content",
                description: "The content of the message",
              }}
              placeholder="Type in the main content of the message"
              enableEmoji
              value={formik.values.content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                formik.setFieldValue("content", e.target.value)
              }
            />
          </div>

          <div className="col-span-4">
            <SwitchForm
              control={{
                id: "isCustomImage",
                label: "Custom Image",
                description: "Enable for customize image",
              }}
              checked={formik.values.isCustomImage}
              onChange={(checked) =>
                formik.setFieldValue("isCustomImage", checked)
              }
            />
          </div>
          <div className="col-span-8" />

          {formik.values.isCustomImage ? (
            <CustomImagePage parentFormik={formik} />
          ) : (
            <>
              <div className="col-span-6">
                <InputForm
                  control={{
                    id: "image.backgroundImage",
                    label: "Background Image",
                    description: "Provide a link to the background image",
                  }}
                  placeholder="Type in image URL"
                  value={formik.values.image?.backgroundImage || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    formik.setFieldValue(
                      "image.backgroundImage",
                      e.target.value,
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
                    <p className="text-sm text-muted-foreground italic">
                      No background image provided
                    </p>
                  </Card>
                </div>
              )}
            </>
          )}

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

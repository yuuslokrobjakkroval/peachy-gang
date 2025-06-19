"use client";

import React from "react";
import Image from "next/image";
import { layoutOptions, avatarShapeOptions } from "@/components/contents/utils";
import { SelectForm } from "@/components/form/select-form";
import { RadioGroupForm } from "@/components/form/radio-group-form";
import { InputForm } from "@/components/form/input-form";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { avatarUrl } from "@/utils/common";
import { useTranslations } from "next-intl";
import { ColorPickerWithPresetsForm } from "@/components/form/color-picker-with-preset-form";

export function CustomImagePage({ userInfoByDiscord, formik }: any) {
  const t = useTranslations("common"); // Use global "common" namespace

  const safeLayoutOptions =
    Array.isArray(layoutOptions) && layoutOptions.length > 0
      ? layoutOptions
      : [{ value: "", label: "No layouts available" }];

  return (
    <>
      <div className="col-span-12 sm:col-span-6 lg:col-span-6">
        <SelectForm
          control={{
            id: "image.layout",
            label: t("customImage.layout.label"),
            description: t("customImage.layout.description"),
            error:
              formik.touched.image?.layout && formik.errors.image?.layout
                ? formik.errors.image.layout
                : undefined,
          }}
          placeholder={t("customImage.layout.placeholder")}
          options={safeLayoutOptions}
          value={formik.values.image?.layout || ""}
          onChange={(value) => formik.setFieldValue("image.layout", value)}
        />
      </div>

      <div className="col-span-12 sm:col-span-12 lg:col-span-6">
        <RadioGroupForm
          control={{
            id: "image.avatarShape",
            label: t("customImage.avatarShape.label"),
            description: t("customImage.avatarShape.description"),
            error:
              formik.touched.image?.avatarShape &&
              formik.errors.image?.avatarShape
                ? formik.errors.image.avatarShape
                : undefined,
          }}
          layout="row"
          options={avatarShapeOptions}
          value={formik.values.image?.avatarShape}
          onChange={(value) => formik.setFieldValue("image.avatarShape", value)}
        />
      </div>

      <div className="col-span-12 xl:col-span-3 lg:col-span-6 sm:col-span-12">
        <ColorPickerWithPresetsForm
          control={{
            id: "image.circleColor",
            label: t("customImage.circleColor.label"),
            description: t("customImage.circleColor.description"),
            error:
              formik.touched.image?.circleColor &&
              formik.errors.image?.circleColor
                ? formik.errors.image.circleColor
                : undefined,
          }}
          value={formik.values.image?.circleColor}
          onChange={(value) => formik.setFieldValue("image.circleColor", value)}
        />
      </div>

      <div className="col-span-12 xl:col-span-3 lg:col-span-6 sm:col-span-6">
        <ColorPickerWithPresetsForm
          control={{
            id: "image.featureColor",
            label: t("customImage.featureColor.label"),
            description: t("customImage.featureColor.description"),
            error:
              formik.touched.image?.featureColor &&
              formik.errors.image?.featureColor
                ? formik.errors.image.featureColor
                : undefined,
          }}
          value={formik.values.image?.featureColor}
          onChange={(value) =>
            formik.setFieldValue("image.featureColor", value)
          }
        />
      </div>

      <div className="col-span-12 xl:col-span-3 lg:col-span-6 sm:col-span-6">
        <ColorPickerWithPresetsForm
          control={{
            id: "image.usernameColor",
            label: t("customImage.usernameColor.label"),
            description: t("customImage.usernameColor.description"),
            error:
              formik.touched.image?.usernameColor &&
              formik.errors.image?.usernameColor
                ? formik.errors.image.usernameColor
                : undefined,
          }}
          value={formik.values.image?.usernameColor}
          onChange={(value) =>
            formik.setFieldValue("image.usernameColor", value)
          }
        />
      </div>

      <div className="col-span-12 xl:col-span-3 lg:col-span-6 sm:col-span-6 ">
        <ColorPickerWithPresetsForm
          control={{
            id: "image.messageColor",
            label: t("customImage.messageColor.label"),
            description: t("customImage.messageColor.description"),
            error:
              formik.touched.image?.messageColor &&
              formik.errors.image?.messageColor
                ? formik.errors.image.messageColor
                : undefined,
          }}
          value={formik.values.image?.messageColor || "#333333"}
          onChange={(value) =>
            formik.setFieldValue("image.messageColor", value)
          }
        />
      </div>

      <div className="col-span-12 sm:col-span-6 lg:col-span-6">
        <InputForm
          control={{
            id: "image.backgroundImage",
            label: t("customImage.backgroundImage.label"),
            description: t("customImage.backgroundImage.description"),
          }}
          placeholder={t("customImage.backgroundImage.placeholder")}
          value={formik.values.image?.backgroundImage || ""}
          onChange={(value) =>
            formik.setFieldValue("image.backgroundImage", value)
          }
        />
      </div>

      <div className="col-span-12 sm:col-span-6 lg:col-span-6">
        <InputForm
          control={{
            id: "image.message",
            label: t("customImage.message.label"),
            description: t("customImage.message.description"),
          }}
          placeholder={t("customImage.message.placeholder")}
          value={formik.values.image?.message || ""}
          onChange={(value) => formik.setFieldValue("image.message", value)}
        />
      </div>

      {formik.values.image?.backgroundImage.startsWith("https:") ? (
        <div className="col-span-12">
          <Card className="p-4 flex justify-center items-center">
            <div
              className={cn(
                "relative rounded-xl w-full flex flex-col items-center justify-center overflow-hidden"
              )}
              style={{
                background: `url(${formik.values.image?.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                aspectRatio: "16 / 9",
              }}
            >
              {/* Avatar */}
              <div
                className={cn(
                  "relative overflow-hidden object-cover rounded-[8px]",
                  formik.values.image?.layout === "classic" && "mx-auto",
                  formik.values.image?.layout === "left" && "mr-auto ml-4",
                  formik.values.image?.layout === "right" && "ml-auto mr-4"
                )}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "clamp(100px, 15vw, 200px)",
                  height: "clamp(100px, 15vw, 200px)",
                  maxWidth: "256px",
                  maxHeight: "256px",
                  minWidth: "120px",
                  minHeight: "120px",
                  borderWidth: "3px",
                  borderColor: formik.values.image?.circleColor || "#FFFFFF",
                  borderStyle: "solid",
                  borderRadius:
                    formik.values.image?.avatarShape === "Circle"
                      ? "50%"
                      : "16px",
                  aspectRatio: "1 / 1",
                }}
              >
                {/* Avatar Image */}
                <Image
                  src={avatarUrl(userInfoByDiscord)}
                  alt="Profile Avatar"
                  width={256}
                  height={256}
                  className="object-cover"
                  style={{
                    borderRadius:
                      formik.values.image?.avatarShape === "Circle"
                        ? "50%"
                        : "8px",
                  }}
                />
              </div>

              {/* Welcome Text */}
              <p
                className={cn(
                  "font-extrabold",
                  formik.values.image?.layout === "classic" &&
                    "text-center mx-auto",
                  formik.values.image?.layout === "left" && "mr-auto ml-4",
                  formik.values.image?.layout === "right" && "ml-auto mr-4"
                )}
                style={{
                  fontSize: "clamp(32px, 4vw, 64px)",
                }}
              >
                {formik.values.image?.feature}
              </p>

              {/* Username */}
              <p
                className={cn(
                  "font-bold",
                  formik.values.image?.layout === "classic" &&
                    "text-center mx-auto",
                  formik.values.image?.layout === "left" && "mr-auto ml-4",
                  formik.values.image?.layout === "right" && "ml-auto mr-4"
                )}
                style={{
                  fontSize: "clamp(16px, 2vw, 32px)",
                  color: formik.values.image?.usernameColor || "#333333",
                }}
              >
                {userInfoByDiscord?.username}
              </p>

              {/* Message */}
              <p
                className={cn(
                  "font-bold",
                  formik.values.image?.layout === "classic" &&
                    "text-center mx-auto",
                  formik.values.image?.layout === "left" && "mr-auto ml-4",
                  formik.values.image?.layout === "right" && "ml-auto mr-4"
                )}
                style={{
                  fontSize: "clamp(12px, 1.2vw, 20px)",
                  color: formik.values.image?.messageColor || "#333333",
                }}
              >
                {formik.values.image?.message}
              </p>
            </div>
          </Card>
        </div>
      ) : (
        <div className="col-span-12">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">
              {t("customImage.noBackgroundImage")}
            </p>
          </Card>
        </div>
      )}
    </>
  );
}

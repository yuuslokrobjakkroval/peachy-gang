"use client";

import React from "react";
import Image from "next/image";
import { layoutOptions, avatarShapeOptions } from "@/components/contents/utils";
import { SelectForm } from "@/components/form/select-form";
import { RadioGroupForm } from "@/components/form/radio-group-form";
import { InputForm } from "@/components/form/input-form";
import { Card } from "@/components/ui/card";
import { ColorPickerForm } from "@/components/form/color-picker-form";
import { cn } from "@/lib/utils";
import { avatarUrl, decorationUrl } from "@/utils/common";

export function CustomImagePage({ userInfoByDiscord, formik }: any) {
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
            label: "Layout",
            description: "Choose the layout for the custom image",
            error:
              formik.touched.image?.layout && formik.errors.image?.layout
                ? formik.errors.image.layout
                : undefined,
          }}
          placeholder="Select a layout"
          options={safeLayoutOptions}
          value={formik.values.image?.layout || ""}
          onChange={(value) => formik.setFieldValue("image.layout", value)}
        />
      </div>

      <div className="col-span-12 sm:col-span-12 lg:col-span-6">
        <RadioGroupForm
          control={{
            id: "image.avatarShape",
            label: "Avatar Shape",
            description: "Choose the shape of the avatar in the custom image",
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
        <ColorPickerForm
          control={{
            id: "image.circleColor",
            label: "Circle Color",
            description: "Choose for the circle",
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
        <ColorPickerForm
          control={{
            id: "image.featureColor",
            label: "Welcome Color",
            description: "Choose for the feature text",
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
        <ColorPickerForm
          control={{
            id: "image.usernameColor",
            label: "Username Color",
            description: "Choose for the username text",
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
        <ColorPickerForm
          control={{
            id: "image.messageColor",
            label: "Message Color",
            description: "Choose for the message text",
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
            label: "Background Image",
            description: "Provide a link to the background image",
          }}
          placeholder="Type in image URL"
          value={formik.values.image?.backgroundImage || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            formik.setFieldValue("image.backgroundImage", e.target.value)
          }
        />
      </div>

      <div className="col-span-12 sm:col-span-6 lg:col-span-6">
        <InputForm
          control={{
            id: "image.message",
            label: "Message",
            description: "Provide message to the background image",
          }}
          placeholder="Type in message"
          value={formik.values.image?.message || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            formik.setFieldValue("image.message", e.target.value)
          }
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
              No background image provided
            </p>
          </Card>
        </div>
      )}
    </>
  );
}

"use client";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { usePeachy } from "@/contexts/peachy";
import {
  useSendMessageFeatureMutation,
  useUpdateFeatureMutation,
} from "@/redux/api/guild";
import { toCapitalCase } from "@/utils/common";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SwitchForm } from "@/components/form/switch-form";
import { ChannelSelectForm } from "@/components/form/channel-select-form";
import { TextAreaForm } from "@/components/form/textarea-form";
import { SelectForm } from "@/components/form/select-form";
import { InputForm } from "@/components/form/input-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FaTerminal, FaWandSparkles } from "react-icons/fa6";
import UpdateFeaturePanel from "@/components/modules/update-feature";

// Define TypeScript interfaces
interface Schedule {
  _id?: string;
  channel: string;
  isActive: boolean;
  content: string;
  scheduleType: "DAILY" | "WEEKLY" | "MONTHLY";
  scheduleTime: string;
  scheduleDay?: string;
  scheduleDate?: number;
  winners: number;
  prize: number;
}

interface CreateScheduleDialogProps {
  guild: string;
  feature: string;
  refetch: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schedule?: Schedule;
}

// Validation schema
const validationSchema = Yup.object({
  isActive: Yup.boolean(),
  channel: Yup.string().required("Channel is required"),
  content: Yup.string().required("Content is required"),
  scheduleType: Yup.string()
    .oneOf(["DAILY", "WEEKLY", "MONTHLY"], "Invalid schedule type")
    .required("Schedule type is required"),
  scheduleTime: Yup.string()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)")
    .required("Schedule time is required"),
  scheduleDay: Yup.string().when("scheduleType", {
    is: "WEEKLY",
    then: (schema) =>
      schema
        .oneOf(
          [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          "Invalid day"
        )
        .required("Day of the week is required for weekly schedule"),
    otherwise: (schema) => schema.optional(),
  }),
  scheduleDate: Yup.number().when("scheduleType", {
    is: "MONTHLY",
    then: (schema) =>
      schema
        .min(1, "Date must be between 1 and 28")
        .max(28, "Date must be between 1 and 28")
        .required("Date of the month is required for monthly schedule"),
    otherwise: (schema) => schema.optional(),
  }),
  winners: Yup.number()
    .min(1, "At least one winner is required")
    .required("Number of winners is required"),
  prize: Yup.number()
    .min(0, "Prize amount cannot be negative")
    .required("Prize amount is required"),
});

export function CreateScheduleDialog({
  guild,
  feature,
  refetch,
  open,
  onOpenChange,
  schedule,
}: CreateScheduleDialogProps) {
  const { userInfoByDiscord } = usePeachy();
  const [sendMessage, { isLoading: sendMessageLoading }] =
    useSendMessageFeatureMutation();
  const [
    updateFeature,
    { isLoading: updateLoading, isSuccess: updateSuccess },
  ] = useUpdateFeatureMutation();

  const isEditing = !!schedule?._id;

  const formik = useFormik({
    initialValues: {
      _id: schedule?._id || undefined,
      channel: schedule?.channel || "",
      isActive: schedule?.isActive ?? true,
      content: schedule?.content || "",
      scheduleType: schedule?.scheduleType || "DAILY",
      scheduleTime: schedule?.scheduleTime || "12:00",
      scheduleDay: schedule?.scheduleDay || "Monday",
      scheduleDate: schedule?.scheduleDate || 1,
      winners: schedule?.winners ?? 1,
      prize: schedule?.prize ?? 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const body = {
          guild,
          feature,
          schedule: [{ ...values }],
        };
        await updateFeature(body).unwrap();
        toast.success(
          `${isEditing ? "Updated" : "Created"} ${toCapitalCase(feature)} Schedule`,
          {
            description: `Schedule ${isEditing ? "updated" : "saved"} successfully.`,
            className:
              "bg-gradient-to-r from-pink-500 to-purple-500 text-white",
          }
        );
        refetch();
        onOpenChange(false);
        formik.resetForm();
      } catch (error) {
        toast.error(
          `Failed to ${isEditing ? "update" : "create"} ${toCapitalCase(feature)} schedule`,
          {
            duration: 1000,
          }
        );
      }
    },
  });

  useEffect(() => {
    if (updateSuccess) {
      formik.resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSuccess]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing
              ? "Edit Giveaway Schedule"
              : "Create New Giveaway Schedule"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="col-span-12">
              <div className="flex flex-row items-center justify-between gap-2 min-w-0">
                <div className="flex-1 min-w-0">
                  <SwitchForm
                    control={{
                      id: "isActive",
                      label: "Active",
                      description: "Enable or Disable this schedule",
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
                    type="button"
                  >
                    <FaTerminal size="20" />
                  </Button>
                  <Button
                    className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg"
                    aria-label="test message"
                    type="button"
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

            <div className="col-span-12">
              <ChannelSelectForm
                control={{
                  id: "channel",
                  label: "Channel",
                }}
                description="Where to send the giveaway message"
                guild={guild}
                value={formik.values.channel}
                onChange={(value) => formik.setFieldValue("channel", value)}
                type={0}
                className="w-full"
              />
            </div>

            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <InputForm
                control={{
                  id: "winners",
                  label: "Number of Winners",
                  description: "How many winners for the giveaway",
                  error:
                    formik.touched.winners && formik.errors.winners
                      ? formik.errors.winners
                      : undefined,
                }}
                type="number"
                value={formik.values.winners?.toString()}
                onChange={(value) =>
                  formik.setFieldValue("winners", parseInt(value) || 1)
                }
              />
            </div>

            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <InputForm
                control={{
                  id: "prize",
                  label: "Prize Amount",
                  description: "The prize amount or value for the giveaway",
                  error:
                    formik.touched.prize && formik.errors.prize
                      ? formik.errors.prize
                      : undefined,
                }}
                type="number"
                value={formik.values.prize?.toString()}
                onChange={(value) =>
                  formik.setFieldValue("prize", parseInt(value) || 0)
                }
              />
            </div>

            <div className="col-span-12">
              <TextAreaForm
                control={{
                  id: "content",
                  label: "Message Content",
                  description: "The content of the giveaway message",
                }}
                placeholder="Type in the main content of the giveaway message"
                enableEmoji
                value={formik.values.content}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  formik.setFieldValue("content", e.target.value)
                }
              />
            </div>

            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <SelectForm
                control={{
                  id: "scheduleType",
                  label: "Schedule Type",
                  description: "Choose how often the giveaway runs",
                  error:
                    formik.touched.scheduleType && formik.errors.scheduleType
                      ? formik.errors.scheduleType
                      : undefined,
                }}
                options={[
                  { value: "DAILY", label: "Daily" },
                  { value: "WEEKLY", label: "Weekly" },
                  { value: "MONTHLY", label: "Monthly" },
                ]}
                value={formik.values.scheduleType}
                onChange={(value) =>
                  formik.setFieldValue("scheduleType", value)
                }
              />
            </div>

            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <InputForm
                control={{
                  id: "scheduleTime",
                  label: "Time (24h)",
                  description: "Set the time for the giveaway (HH:MM)",
                  error:
                    formik.touched.scheduleTime && formik.errors.scheduleTime
                      ? formik.errors.scheduleTime
                      : undefined,
                }}
                placeholder="e.g., 18:00"
                value={formik.values.scheduleTime}
                onChange={(value) =>
                  formik.setFieldValue("scheduleTime", value)
                }
              />
            </div>

            {formik.values.scheduleType === "WEEKLY" && (
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <SelectForm
                  control={{
                    id: "scheduleDay",
                    label: "Day of Week",
                    description: "Choose the day for weekly giveaways",
                    error:
                      formik.touched.scheduleDay && formik.errors.scheduleDay
                        ? formik.errors.scheduleDay
                        : undefined,
                  }}
                  options={[
                    { value: "Monday", label: "Monday" },
                    { value: "Tuesday", label: "Tuesday" },
                    { value: "Wednesday", label: "Wednesday" },
                    { value: "Thursday", label: "Thursday" },
                    { value: "Friday", label: "Friday" },
                    { value: "Saturday", label: "Saturday" },
                    { value: "Sunday", label: "Sunday" },
                  ]}
                  value={formik.values.scheduleDay}
                  onChange={(value) =>
                    formik.setFieldValue("scheduleDay", value)
                  }
                />
              </div>
            )}

            {formik.values.scheduleType === "MONTHLY" && (
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <InputForm
                  control={{
                    id: "scheduleDate",
                    label: "Date of Month",
                    description: "Choose the date (1-28) for monthly giveaways",
                    error:
                      formik.touched.scheduleDate && formik.errors.scheduleDate
                        ? formik.errors.scheduleDate
                        : undefined,
                  }}
                  type="number"
                  value={formik.values.scheduleDate?.toString()}
                  onChange={(value) =>
                    formik.setFieldValue("scheduleDate", parseInt(value) || 1)
                  }
                />
              </div>
            )}

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
      </DialogContent>
    </Dialog>
  );
}
